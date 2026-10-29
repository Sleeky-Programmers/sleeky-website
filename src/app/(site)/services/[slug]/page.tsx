import Link from "next/link";
import { notFound } from "next/navigation";
import CtaFooter from "@/components/layout/CtaFooter";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ButtonLink from "@/components/ui/ButtonLink";
import JsonLd from "@/components/ui/JsonLd";
import { ArrowRight } from "@/components/ui/icons";
import FaqList from "@/components/services/FaqList";
import ServiceFlow from "@/components/services/ServiceFlow";
import Screenshot from "@/components/work/Screenshot";
import { getCaseStudy, getService, getServices } from "@/lib/content";
import { faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

type Params = { params: { slug: string } };

export const dynamicParams = false;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params) {
  const service = await getService(params.slug);
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

const sectionHeading = "m-0 font-display text-[clamp(40px,5.6vw,80px)] font-extrabold leading-[0.98] tracking-[-0.04em]";

// Service page template (design canvas: /services/business-automation)
export default async function ServicePage({ params }: Params) {
  const service = await getService(params.slug);
  if (!service) notFound();

  const [allServices, related] = await Promise.all([
    getServices(),
    service.relatedWork ? getCaseStudy(service.relatedWork.slug) : Promise.resolve(null),
  ]);
  const others = allServices.filter((item) => item.slug !== service.slug);
  const lastLine = service.headline.lines.length - 1;

  return (
    <>
      <JsonLd data={[serviceJsonLd(service), faqJsonLd(service.faqs)]} />
      <main id="main">
        {/* HERO */}
        <section className="relative mx-auto max-w-site px-6 pb-[120px] pt-10">
          <div aria-hidden="true" className="glow pointer-events-none absolute right-0 top-0 h-[560px] w-[560px] rounded-full bg-green opacity-[0.16]" />
          <Breadcrumbs items={[{ name: "Services", path: "/services" }, { name: service.name, path: `/services/${service.slug}` }]} />
          <div className="relative mt-12 flex flex-wrap items-center gap-14">
            <div className="min-w-0 flex-[1_1_600px]">
              <h1 className="fi m-0 mb-6 text-sm font-normal uppercase tracking-[0.14em] text-green">
                <span aria-hidden="true">Service {service.number} · </span>{service.name}
              </h1>
              <p className="m-0 font-display text-[clamp(48px,7vw,104px)] font-extrabold leading-[0.94] tracking-[-0.045em]">
                {service.headline.lines.map((line, index) => (
                  <span key={line} className={`ln ${index === 1 ? "d2" : index > 1 ? "d3" : ""}`}>
                    <span>
                      {line}
                      {index === lastLine && <> <span className="text-green">{service.headline.accent}</span></>}
                    </span>
                  </span>
                ))}
              </p>
              <p className="fi m-0 mt-8 max-w-[560px] text-xl leading-relaxed text-soft">{service.intro}</p>
              <div className="fi mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/start-a-project">{service.ctaLabel}</ButtonLink>
                <ButtonLink href={whatsappLink(service.whatsappMessage)} variant="outline" whatsappIcon trackLocation="service_hero">
                  Ask on WhatsApp
                </ButtonLink>
              </div>
            </div>
            <ServiceFlow flow={service.flow} />
          </div>
        </section>

        {/* PROBLEMS */}
        <section className="mx-auto max-w-site px-6 pb-[120px] pt-[60px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className={`rv max-w-[760px] ${sectionHeading}`}>Sound <span className="text-green">familiar?</span></h2>
            <p className="rv m-0 max-w-[400px] text-[17px] leading-relaxed text-muted">{service.problems.intro}</p>
          </div>
          <ul className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-4">
            {service.problems.items.map((problem, index) => (
              <li key={problem.title} className="rv">
                <div className="card h-full min-h-[180px] rounded-[22px] border border-line bg-surface p-[30px]">
                  <div className="font-display text-[15px] font-bold text-green">{String(index + 1).padStart(2, "0")}</div>
                  <h3 className="m-0 mt-4 font-display text-[22px] font-bold tracking-[-0.02em]">{problem.title}</h3>
                  <p className="m-0 mt-2.5 text-[15px] leading-relaxed text-muted">{problem.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* TOOLS */}
        <section className="border-y border-line bg-ink-raised">
          <div className="mx-auto flex max-w-site flex-wrap items-center gap-12 px-6 py-[100px]">
            <div className="min-w-0 flex-[1_1_420px]">
              <h2 className="rv m-0 font-display text-[clamp(36px,4.6vw,64px)] font-extrabold leading-none tracking-[-0.04em]">{service.tools.heading}</h2>
              <p className="rv m-0 mt-6 max-w-[480px] text-lg leading-relaxed text-soft">{service.tools.body}</p>
            </div>
            <ul className="rv flex min-w-0 flex-[1_1_520px] flex-wrap gap-3">
              {service.tools.items.map((tool) => (
                <li key={tool} className="rounded-full border border-slate bg-surface px-[22px] py-3.5 text-base font-medium">{tool}</li>
              ))}
              <li className="rounded-full border border-dashed border-green px-[22px] py-3.5 text-base font-medium text-green">{service.tools.extra}</li>
            </ul>
          </div>
        </section>

        {/* PROCESS */}
        <section className="mx-auto max-w-site px-6 pb-20 pt-[120px]">
          <h2 className={`rv ${sectionHeading}`}>{service.process.lead}<br /><span className="text-green">{service.process.accent}</span></h2>
          <ol className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            {service.process.steps.map((step, index) => (
              <li key={step.title} className="rv border-t-2 border-green pt-7">
                <div aria-hidden="true" className="font-display text-[56px] font-extrabold tracking-[-0.04em] text-line">{String(index + 1).padStart(2, "0")}</div>
                <h3 className="m-0 mt-2 font-display text-2xl font-bold">{step.title}</h3>
                <p className="m-0 mt-2.5 text-[15px] leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* RELATED WORK */}
        {related && service.relatedWork && (
          <section className="mx-auto max-w-site px-6 pb-[100px] pt-[60px]">
            <p className="rv m-0 text-sm uppercase tracking-[0.14em] text-muted">Related work</p>
            <div className="rv mt-6">
              <Link
                href={`/work/${related.slug}`}
                className="tilt flex flex-wrap items-center gap-10 rounded-[28px] border border-line bg-surface p-8 text-white no-underline md:p-10"
              >
                <div className="min-w-0 flex-[1_1_360px]">
                  <h3 className="m-0 font-display text-[44px] font-bold tracking-[-0.035em]">{related.client}</h3>
                  <p className="m-0 mt-3 text-[17px] leading-relaxed text-muted">{service.relatedWork.blurb}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold text-green">Read the case study <ArrowRight size={16} /></span>
                </div>
                <Screenshot
                  image={related.secondaryImage ?? related.heroImage}
                  label={related.client}
                  className="min-w-0 flex-[1_1_440px] rounded-2xl"
                />
              </Link>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mx-auto flex max-w-site flex-wrap gap-14 px-6 pb-[100px] pt-10">
          <div className="min-w-0 flex-[1_1_340px]">
            <h2 className="rv m-0 font-display text-[clamp(36px,4.6vw,60px)] font-extrabold leading-none tracking-[-0.04em]">{service.faqHeading}</h2>
            <p className="rv m-0 mt-[18px] text-base leading-relaxed text-muted">
              Something else?{" "}
              <a href={whatsappLink(service.whatsappMessage)} target="_blank" rel="noopener noreferrer" data-track-location="service_faq" className="text-green hover:text-green-hover">
                Ask us on WhatsApp
              </a>.
            </p>
          </div>
          <div className="min-w-0 flex-[2_1_560px]">
            <FaqList faqs={service.faqs} />
          </div>
        </section>

        {/* OTHER SERVICES */}
        <section className="mx-auto max-w-site px-6 pb-[100px] pt-5">
          <h2 className="rv m-0 mb-4 text-sm font-normal uppercase tracking-[0.14em] text-muted">Other services</h2>
          <ul className="border-b border-line">
            {others.map((other) => (
              <li key={other.slug} className="rv">
                <Link href={`/services/${other.slug}`} className="other flex items-center justify-between gap-4 border-t border-line py-[22px] text-white no-underline">
                  <span className="ot font-display text-[clamp(26px,3vw,40px)] font-bold tracking-[-0.03em]">{other.name}</span>
                  <ArrowRight size={28} strokeWidth={2} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <CtaFooter heading={service.ctaHeading} whatsappLabel="number" whatsappMessage={service.whatsappMessage} />
    </>
  );
}
