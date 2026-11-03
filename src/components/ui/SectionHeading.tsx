import { HighlightedLines } from "./Highlight";

type SectionHeadingProps = {
    /** e.g. "Featured\n*work*": new lines break, *starred* words are green */
    heading: string;
    description?: string;
    as?: "h1" | "h2";
};

// "Featured / work", "What we / build" pattern from the design canvas.
const SectionHeading = ({ heading, description, as: Tag = "h2" }: SectionHeadingProps) => (
    <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="rv">
            <Tag className="m-0 font-display text-[clamp(48px,7vw,104px)] font-extrabold leading-[0.95] tracking-[-0.045em]">
                <HighlightedLines text={heading} />
            </Tag>
        </div>
        {description && (
            <div className="rv max-w-[380px]">
                <p className="m-0 text-[17px] leading-relaxed text-muted">{description}</p>
            </div>
        )}
    </div>
);

export default SectionHeading;
