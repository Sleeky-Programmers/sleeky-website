import { createHash, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { tagsForPing } from "@/lib/content/tags";

// The Sleeky CMS calls this after content changes:
//   POST /api/revalidate   Authorization: Bearer <REVALIDATE_SECRET>
//   { "type": "insights" | "case-studies" | "pages", "slugs": [...] }
// The matching cached content is cleared, so the change shows on the next visit.

export const dynamic = "force-dynamic";

/** Constant-time comparison (hashing first makes the lengths equal). */
const sameSecret = (given: string, expected: string) =>
  timingSafeEqual(createHash("sha256").update(given).digest(), createHash("sha256").update(expected).digest());

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || secret.length < 16) {
    return Response.json({ error: "Revalidation isn't set up on this website." }, { status: 503 });
  }

  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token || !sameSecret(token, secret)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { type?: unknown; slugs?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send JSON: { type, slugs }" }, { status: 400 });
  }

  const tags = tagsForPing(body.type, body.slugs);
  if (tags.length === 0) return Response.json({ error: "Nothing to refresh for that type." }, { status: 400 });

  tags.forEach((tag) => revalidateTag(tag));
  return Response.json({ revalidated: tags });
}
