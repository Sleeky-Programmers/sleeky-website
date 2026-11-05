import Image from "next/image";
import { notFound } from "next/navigation";
import CtaFooter from "@/components/layout/CtaFooter";
import ButtonLink from "@/components/ui/ButtonLink";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/ui/PageHero";
import { getInsight, getInsights } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

type Params = { params: { slug: string } };

// Articles published later in the CMS render on first visit, then stay cached
// until the CMS reports a change (or an hour passes).
export async function generateStaticParams() {
  const posts = await getInsights();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params) {
  const post = await getInsight(params.slug);
  if (!post) return {};
  return pageMetadata({
    title: `${post.title} | Sleeky`,
    description: post.metaDescription,
    path: `/insights/${post.slug}`,
    type: "article",
  });
}

const dateFormat = new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "long", year: "numeric" });

export default async function InsightPage({ params }: Params) {
  const post = await getInsight(params.slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: absoluteUrl(`/insights/${post.slug}`),
    ...(post.coverImage ? { image: absoluteUrl(post.coverImage.src) } : {}),
  };

  const byline = [post.category, dateFormat.format(new Date(post.publishedAt)), post.author, post.readingMinutes && `${post.readingMinutes} min read`]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <main id="main">
        <PageHero
          crumbs={[{ name: "Insights", path: "/insights" }, { name: post.title, path: `/insights/${post.slug}` }]}
          eyebrow={byline}
          title={post.title}
          intro={post.excerpt}
        />
        <article className="mx-auto max-w-[760px] px-6 pb-32">
          {post.coverImage && (
            <Image
              src={post.coverImage.src}
              alt={post.coverImage.alt}
              width={post.coverImage.width}
              height={post.coverImage.height}
              priority
              className="mb-12 h-auto w-full rounded-[20px]"
              sizes="(min-width: 800px) 760px, 90vw"
            />
          )}
          {/* Cleaned by the CMS on save and rendered only through its editor schema. */}
          <div className="rich-text" dangerouslySetInnerHTML={{ __html: post.html }} />
          <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-line pt-10">
            <p className="m-0 text-lg text-soft">Want help putting this into practice?</p>
            <ButtonLink href="/start-a-project" size="md" arrow>Start a project</ButtonLink>
          </div>
        </article>
      </main>
      <CtaFooter heading="Let’s talk." size="lg" headingLinks />
    </>
  );
}
