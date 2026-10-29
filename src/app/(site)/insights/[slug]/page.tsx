import Image from "next/image";
import { notFound } from "next/navigation";
import CtaFooter from "@/components/layout/CtaFooter";
import ButtonLink from "@/components/ui/ButtonLink";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/ui/PageHero";
import type { InsightBlock } from "@/lib/content/types";
import { getInsight, getInsights } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

type Params = { params: { slug: string } };

// New CMS articles render on first request and are cached for an hour.
export const revalidate = 3600;

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

// Renders the CMS-neutral blocks. When Sanity is connected, Portable Text maps onto these.
const Block = ({ block }: { block: InsightBlock }) => {
  switch (block.type) {
    case "heading":
      return <h2 className="m-0 mt-14 font-display text-[clamp(28px,3vw,40px)] font-bold tracking-[-0.03em]">{block.text}</h2>;
    case "list":
      return (
        <ul className="mt-6 flex list-disc flex-col gap-3 pl-6 text-lg leading-relaxed text-soft marker:text-green">
          {block.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      );
    case "image":
      return (
        <figure className="m-0 mt-10">
          <Image src={block.image.src} alt={block.image.alt} width={block.image.width} height={block.image.height} className="h-auto w-full rounded-[20px]" sizes="(min-width: 800px) 760px, 90vw" />
          {block.caption && <figcaption className="mt-3 text-sm text-muted">{block.caption}</figcaption>}
        </figure>
      );
    default:
      return <p className="m-0 mt-6 text-lg leading-[1.75] text-soft">{block.text}</p>;
  }
};

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

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <main id="main">
      <PageHero
        crumbs={[{ name: "Insights", path: "/insights" }, { name: post.title, path: `/insights/${post.slug}` }]}
        eyebrow={`${post.category} · ${dateFormat.format(new Date(post.publishedAt))} · ${post.author}`}
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
            className="mb-6 h-auto w-full rounded-[20px]"
            sizes="(min-width: 800px) 760px, 90vw"
          />
        )}
        {post.body.map((block, index) => <Block key={index} block={block} />)}
        <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-line pt-10">
          <p className="m-0 text-lg text-soft">Want help putting this into practice?</p>
          <ButtonLink href="/start-a-project" size="md" arrow>Start a project</ButtonLink>
        </div>
      </article>
      </main>
      <CtaFooter heading={["Let’s talk."]} size="lg" headingLinks />
    </>
  );
}
