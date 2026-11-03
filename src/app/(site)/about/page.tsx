import Image from "next/image";
import StudioMap from "@/components/about/StudioMap";
import CtaFooter from "@/components/layout/CtaFooter";
import { AnimatedLines, HighlightedLines } from "@/components/ui/Highlight";
import { LOGOMARK_PATH, LOGOMARK_VIEWBOX } from "@/components/ui/icons";
import JsonLd from "@/components/ui/JsonLd";
import { getAbout, getSiteSettings, type CaseStudyImage } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { fullAddress } from "@/lib/site";

export async function generateMetadata() {
  const { seo } = await getAbout();
  return pageMetadata({ title: seo.title, absoluteTitle: true, description: seo.description, path: "/about" });
}

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
  const [{ hero, studio, mission, values, team, visit, closing }, settings] = await Promise.all([getAbout(), getSiteSettings()]);
  const showTeam = team.members.length > 0 && team.members.every((member) => member.role);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <main id="main">
        {/* HERO */}
        <section className="relative mx-auto max-w-site px-6 pb-[120px] pt-[60px]">
          <div aria-hidden="true" className="glow pointer-events-none absolute left-[40%] top-0 h-[600px] w-[600px] rounded-full bg-green opacity-[0.15]" />
          <p className="fi relative m-0 mb-7 text-sm uppercase tracking-[0.14em] text-muted">{hero.eyebrow}</p>
          <h1 className="relative m-0 font-display text-[clamp(52px,8.4vw,124px)] font-extrabold leading-[0.92] tracking-[-0.05em]">
            <AnimatedLines text={hero.headline} />
          </h1>
          <div className="relative mt-14 flex flex-wrap items-end justify-between gap-10">
            <p className="fi m-0 max-w-[620px] text-[21px] leading-relaxed text-soft">{hero.intro}</p>
            <div aria-hidden="true" className="fi relative h-[150px] w-[150px] flex-none">
              <svg className="badge h-[150px] w-[150px]" viewBox="0 0 150 150">
                <defs><path id="about-badge-circle" d="M75 75m-58 0a58 58 0 1 1 116 0a58 58 0 1 1-116 0" /></defs>
                <text fontFamily="var(--font-archivo), Archivo, sans-serif" fontSize="13" fontWeight="700" letterSpacing="3.2" fill="#9AA7B4">
                  <textPath href="#about-badge-circle">{hero.badge}</textPath>
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
          <StudioPhoto image={studio.widePhoto} className="min-h-[300px] md:min-h-[460px]" />
          <div className="grid gap-4 md:grid-rows-2">
            <StudioPhoto image={studio.detailPhoto} className="min-h-[200px]" />
            <div className="rv flex min-h-[200px] flex-col justify-end rounded-[28px] bg-slate p-8">
              <div className="font-display text-[64px] font-extrabold leading-none tracking-[-0.05em]">{studio.foundedYear}</div>
              <div className="mt-2 text-[15px] text-[#D3DBE2]">{studio.foundedCaption}</div>
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section className="bg-[#F4F6F8] text-ink">
          <div className="mx-auto max-w-site px-6 py-[140px]">
            <h2 className="rv m-0 text-sm font-normal uppercase tracking-[0.14em] text-slate">{mission.label}</h2>
            <p className="rv m-0 mt-6 max-w-[1100px] font-display text-[clamp(32px,4.4vw,62px)] font-bold leading-[1.1] tracking-[-0.035em]">
              {mission.text}
              {mission.mutedText && <> <span className="text-dim">{mission.mutedText}</span></>}
            </p>
          </div>
        </section>

        {/* VALUES */}
        <section className="mx-auto max-w-site px-6 pb-[120px] pt-[140px]">
          <h2 className={`rv ${sectionHeading}`}><HighlightedLines text={values.heading} /></h2>
          <ul className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] border-l border-t border-line">
            {values.items.map((value, index) => (
              <li key={index} className="rv">
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
              <h2 className={`rv ${sectionHeading}`}><HighlightedLines text={team.heading} /></h2>
              <p className="rv m-0 max-w-[380px] text-[17px] leading-relaxed text-muted">{team.intro}</p>
            </div>
            <ul className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-5">
              {team.members.map((member, index) => (
                <li key={index} className="person rv">
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
              <p className="m-0 text-sm uppercase tracking-[0.14em] text-green">{visit.label}</p>
              <h2 className="m-0 mt-[18px] font-display text-[clamp(32px,3.6vw,48px)] font-extrabold tracking-[-0.035em]">
                {settings.address.street},<br />{settings.address.locality}, {settings.address.region}
              </h2>
              <div className="mt-7 flex flex-col gap-2.5 text-[17px]">
                <a href={`tel:${settings.phone.e164}`} data-track-location="about_visit" className="text-white no-underline hover:text-green">Call or WhatsApp: {settings.phone.display}</a>
                <a href={`mailto:${settings.email}`} data-track-location="about_visit" className="text-white no-underline hover:text-green">{settings.email}</a>
                {settings.openingHours && <span className="text-muted">{settings.openingHours}</span>}
              </div>
            </div>
            <div className="min-w-0 flex-[1_1_420px]">
              <StudioMap
                address={fullAddress(settings)}
                shortAddress={`${settings.address.street}, ${settings.address.locality}`}
                mapsUrl={settings.mapsUrl}
              />
            </div>
          </div>
        </section>
      </main>

      <CtaFooter heading={closing.heading} size="lg" headingLinks />
    </>
  );
}
