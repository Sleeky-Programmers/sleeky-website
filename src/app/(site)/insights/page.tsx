import Link from "next/link";
import CtaFooter from "@/components/layout/CtaFooter";
import ButtonLink from "@/components/ui/ButtonLink";
import PageHero from "@/components/ui/PageHero";
import { ArrowUpRight } from "@/components/ui/icons";
import { getInsights } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

// New articles show as soon as the CMS reports them (see /api/revalidate), or within a minute.
export const revalidate = 60;

export const metadata = pageMetadata({
  title: "Insights: Websites, Apps & Automation | Sleeky",
  description:
    "Articles and practical guides from Sleeky Programmers on websites, apps, automation and growing a business with software in Nigeria.",
  path: "/insights",
});

const dateFormat = new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "long", year: "numeric" });

export default async function InsightsPage() {
  const posts = await getInsights();

  return (
    <>
      <main id="main">
      <PageHero
        crumbs={[{ name: "Insights", path: "/insights" }]}
        eyebrow="Insights"
        title={<>Ideas worth<br /><span className="text-green">building on</span></>}
        intro="Practical thinking on websites, apps and automation for growing businesses."
      />

      <section className="mx-auto max-w-site px-6 pb-32">
        {posts.length === 0 ? (
          <div className="rv rounded-[28px] border border-line bg-surface p-8 md:p-14">
            <h2 className="m-0 font-display text-[clamp(28px,3vw,44px)] font-bold tracking-[-0.03em]">Our first articles are on the way.</h2>
            <p className="m-0 mt-4 max-w-[560px] text-lg leading-relaxed text-muted">
              In the meantime, see what we&rsquo;ve built or tell us about your project.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/work" variant="outline" size="md">See our work</ButtonLink>
              <ButtonLink href="/start-a-project" size="md" arrow>Start a project</ButtonLink>
            </div>
          </div>
        ) : (
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-6">
            {posts.map((post) => (
              <li key={post.slug} className="rv">
                <Link
                  href={`/insights/${post.slug}`}
                  className="tilt flex h-full min-h-[320px] flex-col justify-between rounded-[28px] border border-line bg-surface p-8 text-white no-underline"
                >
                  <div>
                    <p className="m-0 text-[13px] uppercase tracking-[0.12em] text-muted">
                      {post.category} · <time dateTime={post.publishedAt}>{dateFormat.format(new Date(post.publishedAt))}</time>
                    </p>
                    <h2 className="m-0 mt-5 font-display text-[28px] font-bold leading-tight tracking-[-0.025em]">{post.title}</h2>
                    <p className="m-0 mt-3 text-base leading-relaxed text-muted">{post.excerpt}</p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-green">
                    Read article <ArrowUpRight size={16} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      </main>
      <CtaFooter heading="Let’s talk." size="lg" headingLinks />
    </>
  );
}
