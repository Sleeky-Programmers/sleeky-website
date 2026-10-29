import Image from "next/image";
import StudioMap from "@/components/about/StudioMap";
import CtaFooter from "@/components/layout/CtaFooter";
import { LOGOMARK_PATH, LOGOMARK_VIEWBOX } from "@/components/ui/icons";
import JsonLd from "@/components/ui/JsonLd";
import { getAbout } from "@/lib/content";
import type { CaseStudyImage } from "@/lib/content/types";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Sleeky Programmers — Software Company in Akoka, Lagos",
  absoluteTitle: true,
  description:
    "Sleeky Programmers is a software company in Akoka, Lagos, founded in 2023, designing and building websites, apps and automation for ambitious businesses.",
  path: "/about",
});

const sectionHeading = "m-0 font-display text-[clamp(44px,6.4vw,96px)] font-extrabold leading-[0.95] tracking-[-0.045em]";

// Studio photo, or a branded tile until photography is supplied (brief section 9).
const StudioPhoto = ({ image, className = "" }: { image?: CaseStudyImage; className?: string }) => (
  <div className={`rv relative overflow-hidden rounded-[28px] border border-line bg-surface ${className}`}>
    {image ? (
      <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" />
    ) : (
      <svg aria-hidden="true" viewBox={LOGOMARK_VIEWBOX} className="absolute -bottom-10 -right-10 w-[60%] max-w-[360px] opacity-[0.06]">
        <path fill="#58D68D" fillRule="evenodd" d={LOGOMARK_PATH} />
      </svg>
    )}
  </div>
);

// About page (design canvas: /about)
export default async function AboutPage() {
  const { values, team, studioPhotos } = await getAbout();
  const showTeam = team.length > 0 && team.every((member) => member.role);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <main id="main">
        {/* HERO */}
        <section className="relative mx-auto max-w-site px-6 pb-[120px] pt-[60px]">
          <div aria-hidden="true" className="glow pointer-events-none absolute left-[40%] top-0 h-[600px] w-[600px] rounded-full bg-green opacity-[0.15]" />
          <p className="fi relative m-0 mb-7 text-sm uppercase tracking-[0.14em] text-muted">About us · Akoka, Lagos</p>
          <h1 className="relative m-0 font-display text-[clamp(52px,8.4vw,124px)] font-extrabold leading-[0.92] tracking-[-0.05em]">
            <span className="ln"><span>Built in Lagos.</span></span>
            <span className="ln d2"><span>Built for</span></span>
            <span className="ln d3"><span><span className="text-green">ambitious</span> business.</span></span>
          </h1>
          <div className="relative mt-14 flex flex-wrap items-end justify-between gap-10">
            <p className="fi m-0 max-w-[620px] text-[21px] leading-relaxed text-soft">
              Sleeky Programmers is a software company founded in January 2023. We design and build websites, apps and automation with one aim: software that exceeds what its users expect, and pays for itself in the time it saves.
            </p>
            <div aria-hidden="true" className="fi relative h-[150px] w-[150px] flex-none">
              <svg className="badge h-[150px] w-[150px]" viewBox="0 0 150 150">
                <defs><path id="about-badge-circle" d="M75 75m-58 0a58 58 0 1 1 116 0a58 58 0 1 1-116 0" /></defs>
                <text fontFamily="var(--font-archivo), Archivo, sans-serif" fontSize="13" fontWeight="700" letterSpacing="3.2" fill="#9AA7B4">
                  <textPath href="#about-badge-circle">EST. 2023 · AKOKA · LAGOS · NIGERIA ·</textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#070B10" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PHOTO BAND */}
        <section aria-label="Our studio" className="mx-auto grid max-w-site gap-4 px-6 pb-[120px] md:grid-cols-[2fr_1fr]">
          <StudioPhoto image={studioPhotos.wide} className="min-h-[300px] md:min-h-[460px]" />
          <div className="grid gap-4 md:grid-rows-2">
            <StudioPhoto image={studioPhotos.detail} className="min-h-[200px]" />
            <div className="rv flex min-h-[200px] flex-col justify-end rounded-[28px] bg-slate p-8">
              <div className="font-display text-[64px] font-extrabold leading-none tracking-[-0.05em]">2023</div>
              <div className="mt-2 text-[15px] text-[#D3DBE2]">Founded in Akoka, Lagos</div>
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section className="bg-[#F4F6F8] text-ink">
          <div className="mx-auto max-w-site px-6 py-[140px]">
            <h2 className="rv m-0 text-sm font-normal uppercase tracking-[0.14em] text-slate">Our mission</h2>
            <p className="rv m-0 mt-6 max-w-[1100px] font-display text-[clamp(32px,4.4vw,62px)] font-bold leading-[1.1] tracking-[-0.035em]">
              To exceed user expectations by building software around how people actually behave — <span className="text-dim">and to set a new standard for software made in Nigeria.</span>
            </p>
          </div>
        </section>

        {/* VALUES */}
        <section className="mx-auto max-w-site px-6 pb-[120px] pt-[140px]">
          <h2 className={`rv ${sectionHeading}`}>What we<br /><span className="text-green">stand for</span></h2>
          <ul className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] border-l border-t border-line">
            {values.map((value, index) => (
              <li key={value.title} className="rv">
                <div className="val flex h-full min-h-[300px] flex-col justify-between border-b border-r border-line px-8 py-10">
                  <span className="vn font-display text-[15px] font-bold text-green">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="m-0 font-display text-[34px] font-extrabold tracking-[-0.035em]">{value.title}</h3>
                    <p className="vd m-0 mt-3 text-base leading-relaxed text-muted">{value.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* TEAM */}
        {showTeam && (
          <section className="mx-auto max-w-site px-6 pb-[120px] pt-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className={`rv ${sectionHeading}`}>The <span className="text-green">team</span></h2>
              <p className="rv m-0 max-w-[380px] text-[17px] leading-relaxed text-muted">Designers and engineers who care about the details your customers notice.</p>
            </div>
            <ul className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-5">
              {team.map((member) => (
                <li key={member.name} className="person rv">
                  <div className="overflow-hidden rounded-[22px] border border-line bg-surface">
                    <div className="ph relative aspect-[4/5]">
                      {member.photo && <Image src={member.photo.src} alt={member.photo.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />}
                    </div>
                  </div>
                  <h3 className="m-0 mt-[18px] font-display text-[21px] font-bold">{member.name}</h3>
                  <p className="m-0 mt-1 text-[15px] text-muted">{member.role}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* VISIT */}
        <section className="mx-auto max-w-site px-6 pb-[120px]">
          <div className="rv flex flex-wrap overflow-hidden rounded-[28px] border border-line bg-surface">
            <div className="min-w-0 flex-[1_1_420px] p-8 md:p-14">
              <p className="m-0 text-sm uppercase tracking-[0.14em] text-green">Visit the studio</p>
              <h2 className="m-0 mt-[18px] font-display text-[clamp(32px,3.6vw,48px)] font-extrabold tracking-[-0.035em]">
                {site.address.street},<br />{site.address.locality}, {site.address.region}
              </h2>
              <div className="mt-7 flex flex-col gap-2.5 text-[17px]">
                <a href={`tel:${site.phone.e164}`} data-track-location="about_visit" className="text-white no-underline hover:text-green">Call or WhatsApp: {site.phone.display}</a>
                <a href={`mailto:${site.email}`} data-track-location="about_visit" className="text-white no-underline hover:text-green">{site.email}</a>
                {site.openingHours && <span className="text-muted">{site.openingHours}</span>}
              </div>
            </div>
            <div className="min-w-0 flex-[1_1_420px]">
              <StudioMap />
            </div>
          </div>
        </section>
      </main>

      <CtaFooter heading={["Work with us."]} size="lg" headingLinks />
    </>
  );
}
