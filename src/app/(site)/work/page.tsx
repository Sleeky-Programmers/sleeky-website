import { notFound, redirect } from "next/navigation";
import { getCaseStudies } from "@/lib/content";

// "Work" opens the first case study (design canvas). Which one comes first is set
// by the order of case studies in the CMS, so this follows reordering and renames.
// Rendered per request so the redirect is a real HTTP redirect (a prerendered one
// only redirects in the browser); the case study list itself is cached.
export const dynamic = "force-dynamic";

export default async function WorkPage() {
  const [first] = await getCaseStudies();
  if (!first) notFound();
  redirect(`/work/${first.slug}`);
}
