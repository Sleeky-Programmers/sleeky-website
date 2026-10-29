import Link from "next/link";
import type { CaseStudy } from "@/lib/content/types";
import { ArrowUpRight, LogomarkWatermark } from "@/components/ui/icons";
import BrowserFrame from "./BrowserFrame";

const Tag = ({ children, tone }: { children: string; tone: CaseStudy["theme"] }) => {
    const styles = {
        surface: "border border-slate text-soft",
        slate: "bg-white/10 text-white",
        green: "bg-ink/[0.08] text-ink",
    };
    return <span className={`rounded-full px-3.5 py-[7px] text-[13px] ${styles[tone]}`}>{children}</span>;
};

/** Large featured card with two screenshot frames (Votely on the design canvas) */
export const FeaturedCaseCard = ({ study, headingLevel = "h3" }: { study: CaseStudy; headingLevel?: "h2" | "h3" }) => {
    const Heading = headingLevel;
    const first = study.heroImage;
    const second = study.secondaryImage;

    return (
        <div className="rv">
            <Link
                href={`/work/${study.slug}`}
                className="tilt block overflow-hidden rounded-[28px] border border-line bg-surface px-6 pt-8 text-white no-underline md:px-12 md:pt-12"
            >
                <div className="flex flex-wrap items-start justify-between gap-6">
                    <div className="max-w-[560px]">
                        <div className="flex flex-wrap gap-2">{study.tags.map((tag) => <Tag key={tag} tone="surface">{tag}</Tag>)}</div>
                        <Heading className="m-0 mt-5 font-display text-[clamp(32px,4vw,52px)] font-bold tracking-[-0.035em]">{study.client}</Heading>
                        <p className="m-0 mt-3 text-lg leading-relaxed text-muted">{study.summary}</p>
                    </div>
                    <span className="inline-flex items-center gap-2.5 text-base font-semibold text-green">
                        View case study <ArrowUpRight />
                    </span>
                </div>
                <div className="relative mt-14 h-[260px] sm:h-[360px] md:h-[460px]">
                    <BrowserFrame
                        image={first}
                        placeholderLabel={study.client}
                        className="absolute left-0 top-[60px] w-[62%]"
                    />
                    <BrowserFrame
                        image={second}
                        placeholderLabel={study.client}
                        className="absolute right-0 top-0 w-[54%] shadow-[0_30px_80px_#00000099]"
                    />
                </div>
            </Link>
        </div>
    );
};

/** Colour block card (straitPay and Tiqwa Travels on the design canvas) */
export const CaseCard = ({ study, headingLevel = "h3" }: { study: CaseStudy; headingLevel?: "h2" | "h3" }) => {
    const Heading = headingLevel;
    const themes = {
        surface: { card: "border border-line bg-surface text-white", body: "text-muted", mark: "#FFFFFF", opacity: 0.08 },
        slate: { card: "bg-slate text-white", body: "text-[#D3DBE2]", mark: "#FFFFFF", opacity: 0.12 },
        green: { card: "bg-green text-ink", body: "text-green-ink", mark: "#070B10", opacity: 0.14 },
    };
    const theme = themes[study.theme];

    return (
        <div className="rv">
            <Link
                href={`/work/${study.slug}`}
                className={`tilt relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[28px] p-10 no-underline ${theme.card}`}
            >
                <LogomarkWatermark fill={theme.mark} opacity={theme.opacity} />
                <div className="relative flex flex-wrap gap-2">{study.tags.map((tag) => <Tag key={tag} tone={study.theme}>{tag}</Tag>)}</div>
                <div className="relative">
                    <Heading className="m-0 font-display text-[40px] font-bold tracking-[-0.035em]">{study.client}</Heading>
                    <p className={`m-0 mt-2.5 text-[17px] leading-relaxed ${theme.body}`}>{study.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold">
                        View case study <ArrowUpRight size={16} />
                    </span>
                </div>
            </Link>
        </div>
    );
};
