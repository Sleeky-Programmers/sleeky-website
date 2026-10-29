import ButtonLink from "@/components/ui/ButtonLink";
import { site, whatsappLink } from "@/lib/site";
import HeroVisual from "./hero/HeroVisual";

const Hero = () => (
    <section className="relative -mt-[104px] flex min-h-[880px] flex-col pt-[104px]">
        <div aria-hidden="true" className="glow pointer-events-none absolute left-1/2 top-[18%] h-[620px] w-[620px] rounded-full bg-green opacity-[0.22]" />
        <div aria-hidden="true" className="floor-wrap pointer-events-none absolute -left-[20%] -right-[20%] top-[62%] h-[520px]">
            <div className="floor" />
        </div>

        <div className="relative z-[2] mx-auto flex w-full max-w-site flex-1 flex-wrap items-center gap-10 px-6 pb-[60px] pt-10">
            <div className="min-w-0 flex-[1_1_560px]">
                <p className="fi m-0 mb-7 text-sm uppercase tracking-[0.14em] text-muted">Websites · Apps · Automation — Lagos, Nigeria</p>
                <h1 className="m-0 font-display text-[clamp(56px,9vw,132px)] font-extrabold leading-[0.92] tracking-[-0.045em]">
                    <span className="ln"><span>Software</span></span>
                    <span className="ln d2"><span>that <span className="text-green">grows</span></span></span>
                    <span className="ln d3"><span>your business.</span></span>
                </h1>
                <p className="fi2 m-0 mt-9 max-w-[520px] text-xl leading-relaxed text-soft">
                    Clean, reliable websites, apps and automation for businesses in Nigeria and beyond — built to look exceptional and run themselves.
                </p>
                <div className="fi2 mt-10 flex flex-wrap gap-3">
                    <ButtonLink href="/start-a-project" arrow>Start a project</ButtonLink>
                    <ButtonLink href={whatsappLink()} variant="outline" whatsappIcon trackLocation="hero">
                        WhatsApp {site.phone.display}
                    </ButtonLink>
                </div>
            </div>

            <HeroVisual />
        </div>

        <div className="relative z-[2] mx-auto flex w-full max-w-site items-end justify-between gap-4 px-6 pb-10 text-[13px] uppercase tracking-[0.1em] text-muted">
            <div className="flex items-center gap-3.5">
                <div aria-hidden="true" className="h-12 w-px overflow-hidden bg-line"><div className="cue h-4 w-px bg-green" /></div>
                <span>Scroll to explore</span>
            </div>
            <span>Est. 2023</span>
        </div>
    </section>
);

export default Hero;
