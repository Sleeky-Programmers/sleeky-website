import Breadcrumbs from "./Breadcrumbs";

type PageHeroProps = {
    crumbs: { name: string; path: string }[];
    eyebrow?: string;
    title: React.ReactNode;
    intro?: React.ReactNode;
    children?: React.ReactNode;
};

// Inner-page hero, following the homepage system: glow, eyebrow, oversized Archivo headline.
const PageHero = ({ crumbs, eyebrow, title, intro, children }: PageHeroProps) => (
    <section className="relative">
        <div aria-hidden="true" className="glow pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-green opacity-[0.14]" />
        <div className="relative mx-auto max-w-site px-6 pb-20 pt-10 md:pb-28 md:pt-16">
            <Breadcrumbs items={crumbs} />
            {eyebrow && <p className="fi mt-12 text-sm uppercase tracking-[0.14em] text-muted">{eyebrow}</p>}
            <h1 className={`font-display text-[clamp(48px,7.4vw,112px)] font-extrabold leading-[0.95] tracking-[-0.045em] ${eyebrow ? "mt-6" : "mt-12"}`}>
                {title}
            </h1>
            {intro && <p className="fi2 mt-9 max-w-[640px] text-lg leading-relaxed text-soft md:text-xl">{intro}</p>}
            {children && <div className="fi2 mt-10 flex flex-wrap gap-3">{children}</div>}
        </div>
    </section>
);

export default PageHero;
