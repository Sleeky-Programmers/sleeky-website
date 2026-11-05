import SectionHeading from "@/components/ui/SectionHeading";
import type { HomeContent } from "@/lib/content";

// The process line draws itself as it enters the viewport (brief 5.3).
const Process = ({ content, id = "process" }: { content: HomeContent["process"]; id?: string }) => (
    <section id={id} className="mx-auto max-w-site px-6 pb-[120px] pt-[120px] md:pt-[140px]">
        <SectionHeading heading={content.heading} />
        <div className="relative mt-20">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />
            <div aria-hidden="true" className="line absolute inset-x-0 top-0 h-px bg-green" />
            <ol className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8">
                {content.steps.map((step, index) => (
                    <li key={index} className="rv pt-9">
                        <div aria-hidden="true" className="font-display text-[64px] font-extrabold tracking-[-0.04em] text-line">{String(index + 1).padStart(2, "0")}</div>
                        <h3 className="m-0 mt-3 font-display text-[26px] font-bold tracking-[-0.02em]">{step.title}</h3>
                        <p className="m-0 mt-2.5 text-base leading-relaxed text-muted">{step.description}</p>
                    </li>
                ))}
            </ol>
        </div>
    </section>
);

export default Process;
