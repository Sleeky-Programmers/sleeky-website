import Link from "next/link";
import ButtonLink from "@/components/ui/ButtonLink";
import { HighlightedLines, plainHeading } from "@/components/ui/Highlight";
import { getSiteSettings } from "@/lib/content";
import { whatsappLink } from "@/lib/site";
import FooterBar from "./FooterBar";

type CtaFooterProps = {
    /** Closing headline; each "\n" starts a new line */
    heading: string;
    /** "display": oversized headline with buttons below (Service, About).
        "inline": headline and button on one row (Case study). */
    variant?: "display" | "inline";
    size?: "md" | "lg";
    /** Makes the headline itself a link to Start a project (About: "Work with us.") */
    headingLinks?: boolean;
    /** Button text, or "number" for "WhatsApp <phone number>" */
    whatsappLabel?: string;
    whatsappMessage?: string;
};

const sizes = {
    md: "text-[clamp(56px,10vw,160px)]",
    lg: "text-[clamp(64px,12vw,190px)]",
};

const CtaFooter = async ({
    heading,
    variant = "display",
    size = "md",
    headingLinks = false,
    whatsappLabel = "WhatsApp us",
    whatsappMessage,
}: CtaFooterProps) => {
    if (variant === "inline") {
        return (
            <footer className="border-t border-line">
                <div className="mx-auto max-w-site px-6 pb-12 pt-[72px]">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <h2 className="m-0 font-display text-[clamp(36px,4.6vw,64px)] font-extrabold tracking-[-0.04em]">{plainHeading(heading)}</h2>
                        <ButtonLink href="/start-a-project">Start a project</ButtonLink>
                    </div>
                    <div className="mt-[72px]"><FooterBar /></div>
                </div>
            </footer>
        );
    }

    const settings = await getSiteSettings();
    const headingClass = `m-0 block font-display ${sizes[size]} font-extrabold leading-[0.9] tracking-[-0.055em] text-white no-underline`;
    const lines = <HighlightedLines text={heading} />;

    return (
        <footer className="relative overflow-hidden border-t border-line">
            <div aria-hidden="true" className="glow pointer-events-none absolute left-[10%] top-0 h-[520px] w-[520px] rounded-full bg-green opacity-[0.12]" />
            <div className="relative mx-auto max-w-site px-6 pb-14 pt-[120px]">
                <div className="rv">
                    {headingLinks ? (
                        <Link href="/start-a-project" className={`big ${headingClass}`}>{lines}</Link>
                    ) : (
                        <h2 className={headingClass}>{lines}</h2>
                    )}
                </div>
                <div className="rv mt-11 flex flex-wrap gap-3">
                    <ButtonLink href="/start-a-project">Start a project</ButtonLink>
                    <ButtonLink href={whatsappLink(settings, whatsappMessage)} variant="outline" trackLocation="footer_cta">
                        {whatsappLabel === "number" ? `WhatsApp ${settings.phone.display}` : whatsappLabel}
                    </ButtonLink>
                </div>
                <div className="mt-24"><FooterBar /></div>
            </div>
        </footer>
    );
};

export default CtaFooter;
