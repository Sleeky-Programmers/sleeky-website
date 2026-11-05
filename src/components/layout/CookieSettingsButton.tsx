"use client";

import { OPEN_CONSENT_EVENT } from "@/lib/analytics";

const CookieSettingsButton = () => (
    <button
        type="button"
        onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
        className="text-faint transition-colors hover:text-white"
    >
        Cookie settings
    </button>
);

export default CookieSettingsButton;
