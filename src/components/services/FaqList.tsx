import type { Faq } from "@/lib/content/types";

// Native <details> keeps the answers in the HTML for search engines and works without JavaScript.
const FaqList = ({ faqs }: { faqs: Faq[] }) => (
    <div className="border-b border-line">
        {faqs.map((faq) => (
            <details key={faq.question} className="rv border-t border-line py-[26px]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[21px] font-semibold tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span aria-hidden="true" className="plus text-[28px] font-normal leading-none text-green">+</span>
                </summary>
                <p className="m-0 mt-3.5 max-w-[680px] text-base leading-[1.65] text-muted">{faq.answer}</p>
            </details>
        ))}
    </div>
);

export default FaqList;
