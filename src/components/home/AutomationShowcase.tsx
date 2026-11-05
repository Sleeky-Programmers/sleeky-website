import ButtonLink from "@/components/ui/ButtonLink";
import { HighlightedLines } from "@/components/ui/Highlight";
import { ChatBubble } from "@/components/ui/icons";
import type { HomeContent } from "@/lib/content";

const iconProps = {
    "aria-hidden": true,
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
};

// One icon per step, in order: brief, CRM, WhatsApp alert, confirmation email.
const icons = [
    <svg key="brief" {...iconProps} stroke="#58D68D"><path d="M4 4h16v16H4z" /><path d="M8 9h8M8 13h5" /></svg>,
    <svg key="crm" {...iconProps} stroke="#FF9A5C">
        <circle cx="12" cy="12" r="3" /><circle cx="12" cy="4" r="1.5" /><circle cx="19" cy="16" r="1.5" /><circle cx="5" cy="16" r="1.5" />
        <path d="M12 5.5V9M17.7 15.2l-3.1-1.7M6.3 15.2l3.1-1.7" />
    </svg>,
    <ChatBubble key="whatsapp" size={20} color="#25D366" />,
    <svg key="email" {...iconProps} stroke="#58D68D"><path d="M4 6h16v12H4z" /><path d="M4 7l8 6 8-6" /></svg>,
];

// The four lead-flow steps light up in sequence on a loop (brief 5.6).
const AutomationShowcase = ({ content }: { content: HomeContent["automation"] }) => (
    <section id="automation" className="border-y border-line bg-ink-raised">
        <div className="mx-auto flex max-w-site flex-wrap items-center gap-16 px-6 py-[120px] md:py-[140px]">
            <div className="min-w-0 flex-[1_1_480px]">
                <p className="rv m-0 text-sm uppercase tracking-[0.14em] text-green">{content.eyebrow}</p>
                <h2 className="rv m-0 mt-5 font-display text-[clamp(40px,5.4vw,76px)] font-extrabold leading-[0.98] tracking-[-0.04em]">
                    <HighlightedLines text={content.heading} />
                </h2>
                <p className="rv m-0 mt-7 max-w-[520px] text-[19px] leading-relaxed text-soft">{content.body}</p>
                <div className="rv mt-10">
                    <ButtonLink href="/start-a-project" variant="white" size="md">{content.buttonLabel}</ButtonLink>
                </div>
            </div>

            <ol className="rv flex min-w-0 max-w-[560px] flex-[1_1_440px] flex-col gap-3.5">
                {content.steps.slice(0, icons.length).map((step, index) => (
                    <li key={index} className={`fr ${index ? `fr${index + 1}` : ""} flex items-center gap-4 rounded-[18px] p-5`}>
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-chip">{icons[index]}</div>
                        <div className="min-w-0 flex-1">
                            <div className="text-base font-semibold">{step.title}</div>
                            <div className="mt-[3px] text-sm text-muted">{step.detail}</div>
                        </div>
                        <span className="text-[13px] text-muted">{step.time}</span>
                    </li>
                ))}
            </ol>
        </div>
    </section>
);

export default AutomationShowcase;
