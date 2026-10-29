"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { config } from "@/config";
import { CONSENT_EVENT, ConsentChoice, OPEN_CONSENT_EVENT, readConsent, saveConsent } from "@/lib/analytics";

// Cookie consent (brief 4.4, Nigeria Data Protection Act 2023): GA4 and the
// HubSpot tracking code only load after the visitor accepts.
const Analytics = () => {
    const [consent, setConsent] = useState<ConsentChoice | null>(null);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const stored = readConsent();
        setConsent(stored);
        setShowBanner(stored === null);

        const onOpen = () => setShowBanner(true);
        window.addEventListener(OPEN_CONSENT_EVENT, onOpen);
        return () => window.removeEventListener(OPEN_CONSENT_EVENT, onOpen);
    }, []);

    const choose = (choice: ConsentChoice) => {
        const wasGranted = consent === "granted";
        saveConsent(choice);
        setConsent(choice);
        setShowBanner(false);

        // Scripts can't be unloaded once running, so a withdrawal reloads the page without them.
        if (wasGranted && choice === "denied") window.location.reload();
    };

    useEffect(() => {
        const onChange = (event: Event) => setConsent((event as CustomEvent<ConsentChoice>).detail);
        window.addEventListener(CONSENT_EVENT, onChange);
        return () => window.removeEventListener(CONSENT_EVENT, onChange);
    }, []);

    return (
        <>
            {consent === "granted" && config.GA_MEASUREMENT_ID && <GoogleAnalytics gaId={config.GA_MEASUREMENT_ID} />}
            {consent === "granted" && config.HUBSPOT_PORTAL_ID && (
                <Script
                    id="hs-script-loader"
                    src={`https://js.hs-scripts.com/${config.HUBSPOT_PORTAL_ID}.js`}
                    strategy="afterInteractive"
                />
            )}

            {showBanner && (
                <div
                    role="dialog"
                    aria-live="polite"
                    aria-label="Cookie consent"
                    className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-xl rounded-3xl border border-line bg-surface p-6 shadow-[0_30px_80px_#00000099] sm:left-6 sm:right-auto sm:mx-0"
                >
                    <p className="font-display text-lg font-bold tracking-tight">Cookies, with your permission</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-soft">
                        We use analytics cookies to understand how visitors use this site and to improve it. They stay off unless you accept.{" "}
                        <Link href="/privacy-policy" className="text-green underline-offset-4 hover:underline">Privacy policy</Link>
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => choose("granted")}
                            className="btn rounded-full bg-green px-6 py-3 text-[15px] font-semibold text-ink"
                        >
                            Accept analytics
                        </button>
                        <button
                            type="button"
                            onClick={() => choose("denied")}
                            className="rounded-full border border-slate px-6 py-3 text-[15px] font-medium text-white transition-colors hover:border-green"
                        >
                            Decline
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Analytics;
