"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { clickLabel, clickLocation, linkType, linkUrl } from "@/lib/click-details";

// Every button and link click is sent as button_click (label, page section, link
// type and target), so the CMS can show which buttons people use. WhatsApp, phone
// and email links also send their own events (brief 4.3, 7.1), including the
// floating WhatsApp button.
const ClickTracker = () => {
    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            const element = (event.target as Element | null)?.closest?.("a[href], button, [role=button], input[type=submit]");
            if (!element || (element as HTMLButtonElement).disabled) return;

            const href = element.tagName === "A" ? element.getAttribute("href") : null;
            const type = linkType(href);
            const location = clickLocation(element);

            track("button_click", {
                label: clickLabel(element),
                location,
                link_type: type,
                ...(linkUrl(href) ? { link_url: linkUrl(href)! } : {}),
            });

            if (type === "whatsapp") track("whatsapp_click", { location });
            else if (type === "phone") track("phone_click", { location });
            else if (type === "email") track("email_click", { location });
        };

        document.addEventListener("click", onClick, { capture: true });
        return () => document.removeEventListener("click", onClick, { capture: true });
    }, []);

    return null;
};

export default ClickTracker;
