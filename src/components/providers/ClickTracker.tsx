"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

// Fires whatsapp_click, phone_click and email_click (brief 4.3, 7.1) for every
// matching link on the site, including the floating WhatsApp button.
const ClickTracker = () => {
    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            const link = (event.target as Element | null)?.closest?.("a[href]");
            if (!link) return;

            const href = link.getAttribute("href") || "";
            const location = link.getAttribute("data-track-location");
            const params: Record<string, string> = location ? { location } : {};

            if (href.startsWith("https://wa.me/")) track("whatsapp_click", params);
            else if (href.startsWith("tel:")) track("phone_click", params);
            else if (href.startsWith("mailto:")) track("email_click", params);
        };

        document.addEventListener("click", onClick, { capture: true });
        return () => document.removeEventListener("click", onClick, { capture: true });
    }, []);

    return null;
}

export default ClickTracker;
