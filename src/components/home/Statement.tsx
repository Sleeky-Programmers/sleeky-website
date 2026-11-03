import type { HomeContent } from "@/lib/content";

const Statement = ({ content }: { content: HomeContent["statement"] }) => (
    <section className="mx-auto max-w-site px-6 pb-[120px] pt-[120px] md:pt-[160px]">
        <p className="rv m-0 max-w-[1180px] font-display text-[clamp(32px,4.6vw,64px)] font-semibold leading-[1.12] tracking-[-0.03em]">
            {content.text}
            {content.mutedText && <> <span className="text-dim">{content.mutedText}</span></>}
        </p>
        {content.clients.length > 0 && (
            <div className="rv mt-16 flex flex-wrap items-center gap-x-16 gap-y-6">
                <h2 className="m-0 text-sm font-normal uppercase tracking-[0.14em] text-muted">{content.clientsLabel}</h2>
                <ul className="flex flex-wrap gap-x-14 gap-y-5 font-display text-[28px] font-bold tracking-[-0.02em] text-dim">
                    {content.clients.map((client) => <li key={client}>{client}</li>)}
                </ul>
            </div>
        )}
    </section>
);

export default Statement;
