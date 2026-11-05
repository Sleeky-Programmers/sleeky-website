"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChatBubble } from "@/components/ui/icons";
import { BRIEF_STORAGE_KEY, Channel, channelOptions } from "./briefOptions";

type SentBrief = {
    firstName?: string;
    channel?: Channel;
    hasEmail?: boolean;
    /** WhatsApp briefs: a chat with us with the brief already typed in */
    whatsappHref?: string;
};

const secondaryLinks = (
    <>
        <Link href="/" className="inline-flex items-center rounded-full border border-slate px-7 py-[17px] text-base font-medium text-white no-underline transition-colors hover:border-green">
            Back to home
        </Link>
        <Link href="/start-a-project" className="px-2 py-[17px] text-[15px] font-medium text-green no-underline">
            Send another brief
        </Link>
    </>
);

// Confirmation screen from the design canvas (brief 4.1: reply within 24 hours by the chosen channel).
const BriefConfirmation = ({ whatsappHref }: { whatsappHref: string }) => {
    const [brief, setBrief] = useState<SentBrief>({});

    useEffect(() => {
        try {
            const stored = window.sessionStorage.getItem(BRIEF_STORAGE_KEY);
            if (stored) setBrief(JSON.parse(stored));
        } catch {
            // Generic copy below works without the stored details.
        }
    }, []);

    const channelText = channelOptions.find((option) => option.id === brief.channel)?.text ?? "your chosen channel";
    const sendOnWhatsApp = brief.channel === "whatsapp" && brief.whatsappHref;

    return (
        <div className="mx-auto max-w-[1180px] px-6 pb-32 pt-14">
            <div className="pop flex h-[72px] w-[72px] items-center justify-center rounded-full bg-green">
                <svg aria-hidden="true" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#070B10" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </div>
            <h1 className="step-in m-0 mt-8 font-display text-[clamp(40px,5.4vw,68px)] font-extrabold leading-none tracking-[-0.04em]">
                Got it{brief.firstName ? `, ${brief.firstName} —` : " —"}<br />
                <span className="text-green">{sendOnWhatsApp ? "one last tap." : "we’re on it."}</span>
            </h1>

            {sendOnWhatsApp ? (
                <>
                    <p className="step-in m-0 mt-6 max-w-[580px] text-[19px] leading-relaxed text-soft">
                        Your brief is saved. Tap <strong className="font-semibold text-white">Send via WhatsApp</strong> to open a chat with us with your brief already typed in, then press send. A Sleeky specialist will reply there within 24 hours.
                        {brief.hasEmail && " A confirmation is also on its way to your inbox."}
                    </p>
                    <div className="step-in mt-10 flex flex-wrap items-center gap-3">
                        <a
                            href={sendOnWhatsApp}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-track-location="thank_you_send_brief"
                            className="btn inline-flex items-center gap-2.5 rounded-full bg-whatsapp px-7 py-[17px] text-base font-semibold text-ink no-underline"
                        >
                            <ChatBubble size={18} color="#070B10" />
                            Send via WhatsApp
                        </a>
                        {secondaryLinks}
                    </div>
                    <p className="step-in m-0 mt-5 max-w-[560px] text-sm text-muted">
                        Nothing is sent until you press send in WhatsApp. You can edit the message first.
                    </p>
                </>
            ) : (
                <>
                    <p className="step-in m-0 mt-6 max-w-[560px] text-[19px] leading-relaxed text-soft">
                        A Sleeky specialist will review your brief and reach out by {channelText} within 24 hours to book a short discovery call.
                        {brief.hasEmail && " A confirmation is on its way to your inbox."}
                    </p>
                    <div className="step-in mt-10 flex flex-wrap items-center gap-3">
                        <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-track-location="thank_you"
                            className="btn inline-flex items-center gap-2.5 rounded-full bg-whatsapp px-7 py-[17px] text-base font-semibold text-ink no-underline"
                        >
                            Can&rsquo;t wait? WhatsApp us now
                        </a>
                        {secondaryLinks}
                    </div>
                </>
            )}
        </div>
    );
};

export default BriefConfirmation;
