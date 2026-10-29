import SectionHeading from "@/components/ui/SectionHeading";

export const processSteps = [
    { n: "01", title: "Discover", description: "We map your goals, users and the manual work worth removing." },
    { n: "02", title: "Design", description: "Clickable designs you approve before any code is written." },
    { n: "03", title: "Build", description: "Weekly demos, clear milestones, a shared progress board." },
    { n: "04", title: "Launch & grow", description: "Go-live, training, monthly analytics and ongoing support." },
];

// The process line draws itself as it enters the viewport (brief 5.3).
const Process = ({ id = "process" }: { id?: string }) => (
    <section id={id} className="mx-auto max-w-site px-6 pb-[120px] pt-[120px] md:pt-[140px]">
        <SectionHeading lead="How we" accent="work" />
        <div className="relative mt-20">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />
            <div aria-hidden="true" className="line absolute inset-x-0 top-0 h-px bg-green" />
            <ol className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8">
                {processSteps.map((step) => (
                    <li key={step.n} className="rv pt-9">
                        <div aria-hidden="true" className="font-display text-[64px] font-extrabold tracking-[-0.04em] text-line">{step.n}</div>
                        <h3 className="m-0 mt-3 font-display text-[26px] font-bold tracking-[-0.02em]">{step.title}</h3>
                        <p className="m-0 mt-2.5 text-base leading-relaxed text-muted">{step.description}</p>
                    </li>
                ))}
            </ol>
        </div>
    </section>
);

export default Process;
