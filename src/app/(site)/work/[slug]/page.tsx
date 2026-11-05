import Link from "next/link";
import { notFound } from "next/navigation";
import CtaFooter from "@/components/layout/CtaFooter";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/ui/JsonLd";
import Screenshot from "@/components/work/Screenshot";
import { getCaseStudies, getCaseStudy } from "@/lib/content";
import { caseStudyJsonLd, pageMetadata } from "@/lib/seo";

type Params = { params: { slug: string } };

// Published case studies are built ahead; ones published later in the CMS render
// on first visit (unknown addresses get the 404 page).
export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Params) {
  const study = (await getCaseStudy(params.slug))?.caseStudy;
  if (!study) return {};
  return pageMetadata({
    title: study.metaTitle,
    absoluteTitle: true,
    description: study.metaDescription,
    path: `/work/${study.slug}`,
    type: "article",
  });
}

const detailLabel = "text-xs uppercase tracking-[0.12em] text-muted";

// Case study template (design canvas: /work/votely)
export default async function CaseStudyPage({ params }: Params) {
  const result = await getCaseStudy(params.slug);
  if (!result) notFound();

  const { caseStudy: study, next } = result;
  const hasResults = !!study.results?.length;

  return (
    <>
      <JsonLd data={caseStudyJsonLd(study)} />
      <main id="main">
        {/* HERO */}
        <section className="mx-auto max-w-site px-6 pt-10">
          <Breadcrumbs items={[{ name: "Work", path: "/work" }, { name: study.client, path: `/work/${study.slug}` }]} />
          <h1 className="m-0 mt-12 font-display text-[clamp(72px,13vw,200px)] font-extrabold leading-[0.88] tracking-[-0.06em]">
            <span className="ln"><span>{study.client}<span className="text-green">.</span></span></span>
          </h1>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-10">
            <p className="fi m-0 max-w-[680px] text-[clamp(20px,2vw,26px)] leading-[1.45] text-soft">{study.summary}</p>
            <dl className="fi m-0 grid grid-cols-[repeat(2,minmax(140px,1fr))] gap-x-12 gap-y-5">
              <div>
                <dt className={detailLabel}>Client</dt>
                <dd className="m-0 mt-1.5 text-base">{study.client}</dd>
              </div>
              <div>
                <dt className={detailLabel}>Services</dt>
                <dd className="m-0 mt-1.5 text-base">{study.tags.join(" · ")}</dd>
              </div>
              {study.sector && (
                <div>
                  <dt className={detailLabel}>Sector</dt>
                  <dd className="m-0 mt-1.5 text-base">{study.sector}</dd>
                </div>
              )}
              {study.liveUrl && (
                <div>
                  <dt className={detailLabel}>Live at</dt>
                  <dd className="m-0 mt-1.5 text-base">
                    <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="text-green hover:text-green-hover">
                      {study.liveUrl.replace(/^https?:\/\//, "")}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
          <Screenshot
            image={study.heroImage}
            label={study.client}
            chrome="lg"
            priority
            sizes="(min-width: 1320px) 1272px, 95vw"
            className="hero-shot mt-[72px] rounded-t-3xl border-b-0 shadow-[0_-20px_120px_#58D68D22]"
          />
        </section>

        {/* CHALLENGE / WHAT WE BUILT */}
        <section className="bg-[#F4F6F8] text-ink">
          <div className="mx-auto grid max-w-site grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-16 px-6 py-[120px]">
            {study.challenge && (
              <div className="rv">
                <p className="m-0 text-sm uppercase tracking-[0.14em] text-slate">The challenge</p>
                <h2 className="m-0 mt-[18px] font-display text-[clamp(32px,3.6vw,48px)] font-extrabold leading-[1.05] tracking-[-0.035em]">{study.challenge.headline}</h2>
                <p className="m-0 mt-5 text-lg leading-[1.65] text-[#3A4A5A]">{study.challenge.body}</p>
              </div>
            )}
            <div className={`rv ${study.challenge ? "" : "max-w-[760px]"}`}>
              <p className="m-0 text-sm uppercase tracking-[0.14em] text-slate">What we built</p>
              <h2 className="m-0 mt-[18px] font-display text-[clamp(32px,3.6vw,48px)] font-extrabold leading-[1.05] tracking-[-0.035em]">{study.built.headline}</h2>
              <p className="m-0 mt-5 text-lg leading-[1.65] text-[#3A4A5A]">{study.built.body}</p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        {study.features.length > 0 && (
          <section className="mx-auto flex max-w-site flex-col gap-[120px] px-6 pb-[60px] pt-[140px]">
            {study.features.map((feature, featureIndex) => {
              const reversed = featureIndex % 2 === 1;
              const text = (
                <div className="rv min-w-0 flex-[1_1_340px]">
                  <div className="font-display text-[15px] font-extrabold text-green">{String(featureIndex + 1).padStart(2, "0")}</div>
                  <h3 className="m-0 mt-3.5 font-display text-[clamp(30px,3.4vw,44px)] font-bold tracking-[-0.035em]">{feature.title}</h3>
                  <p className="m-0 mt-3.5 text-[17px] leading-[1.65] text-muted">{feature.body}</p>
                </div>
              );
              const image = (
                <div className="rv min-w-0 flex-[1.5_1_520px]">
                  <Screenshot image={feature.image} label={feature.title} className="rounded-[18px] shadow-[0_40px_100px_#00000080]" />
                </div>
              );
              return (
                <div key={featureIndex} className={`flex items-center gap-14 ${reversed ? "flex-wrap-reverse" : "flex-wrap"}`}>
                  {reversed ? <>{image}{text}</> : <>{text}{image}</>}
                </div>
              );
            })}
          </section>
        )}

        {/* RESULTS */}
        {(hasResults || study.quote) && (
          <section className="mx-auto max-w-site px-6 pb-[120px] pt-20">
            {hasResults && (
              <>
                <h2 className="rv m-0 text-sm font-normal uppercase tracking-[0.14em] text-muted">Results</h2>
                <dl className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
                  {study.results!.map((item, index) => (
                    <div key={index} className="rv flex flex-col-reverse border-t-2 border-green pt-6">
                      <dt className="mt-2.5 text-base text-muted">{item.label}</dt>
                      <dd className="m-0 font-display text-[clamp(56px,6vw,88px)] font-extrabold leading-none tracking-[-0.05em]">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
            {study.quote && (
              <figure className={`rv m-0 max-w-[1000px] ${hasResults ? "mt-[100px]" : ""}`}>
                <blockquote className="m-0 font-display text-[clamp(28px,3.4vw,46px)] font-semibold leading-[1.2] tracking-[-0.025em]">
                  &ldquo;{study.quote.text}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-base text-muted">{study.quote.author}, {study.quote.role}</figcaption>
              </figure>
            )}
          </section>
        )}

        {/* NEXT PROJECT */}
        {next && (
          <Link href={`/work/${next.slug}`} className="next block bg-slate text-white no-underline">
            <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-6 px-6 py-24">
              <div>
                <div className="text-sm uppercase tracking-[0.14em] text-soft">Next project</div>
                <div className="mt-4 font-display text-[clamp(56px,9vw,140px)] font-extrabold leading-[0.9] tracking-[-0.055em]">{next.client}</div>
              </div>
              <svg className="arr" aria-hidden="true" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#58D68D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16" /><path d="M14 6l6 6-6 6" /></svg>
            </div>
          </Link>
        )}
      </main>

      <CtaFooter heading="Want results like these?" variant="inline" />
    </>
  );
}
