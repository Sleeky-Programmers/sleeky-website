"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { whatsappLink } from "@/lib/site";
import { BRIEF_STORAGE_KEY, Channel, channelOptions } from "./briefOptions";

type SentBrief = { firstName?: string; channel?: Channel; hasEmail?: boolean };

// Confirmation screen from the design canvas (brief 4.1: reply within 24 hours by the chosen channel).
const BriefConfirmation = () => {
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

    return (
        <div className="mx-auto max-w-[1180px] px-6 pb-32 pt-14">
            <div className="pop flex h-[72px] w-[72px] items-center justify-center rounded-full bg-green">
                <svg aria-hidden="true" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#070B10" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </div>
            <h1 className="step-in m-0 mt-8 font-display text-[clamp(40px,5.4vw,68px)] font-extrabold leading-none tracking-[-0.04em]">
                Got it{brief.firstName ? `, ${brief.firstName} —` : " —"}<br />
                <span className="text-green">we&rsquo;re on it.</span>
            </h1>
            <p className="step-in m-0 mt-6 max-w-[560px] text-[19px] leading-relaxed text-soft">
                A Sleeky specialist will review your brief and reach out by {channelText} within 24 hours to book a short discovery call.
                {brief.hasEmail && " A confirmation is on its way to your inbox."}
            </p>
            <div className="step-in mt-10 flex flex-wrap items-center gap-3">
                <a
                    href={whatsappLink("Hi Sleeky, I just sent a project brief on your website.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track-location="thank_you"
                    className="btn inline-flex items-center gap-2.5 rounded-full bg-whatsapp px-7 py-[17px] text-base font-semibold text-ink no-underline"
                >
                    Can&rsquo;t wait? WhatsApp us now
                </a>
                <Link href="/" className="inline-flex items-center rounded-full border border-slate px-7 py-[17px] text-base font-medium text-white no-underline transition-colors hover:border-green">
                    Back to home
                </Link>
                <Link href="/start-a-project" className="px-2 py-[17px] text-[15px] font-medium text-green no-underline">
                    Send another brief
                </Link>
            </div>
        </div>
    );
}

export default BriefConfirmation;
