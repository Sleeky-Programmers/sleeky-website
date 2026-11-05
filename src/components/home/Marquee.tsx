import { Sparkle } from "@/components/ui/icons";

// Services ticker (brief 5.3). The list is doubled so the -50% loop is seamless.
const Marquee = ({ items }: { items: string[] }) => (
    <section aria-label="What we build" className="overflow-hidden border-y border-line bg-ink-raised py-7">
        <p className="sr-only">{items.join(", ")}</p>
        <div aria-hidden="true" className="mq whitespace-nowrap font-display text-[32px] font-bold tracking-[-0.02em] md:text-[44px]">
            {items.concat(items).map((label, index) => (
                <span key={index} className={`inline-flex items-center gap-11 pr-11 ${index % 2 ? "text-white" : "text-dim"}`}>
                    {label}
                    <Sparkle />
                </span>
            ))}
        </div>
    </section>
);

export default Marquee;
