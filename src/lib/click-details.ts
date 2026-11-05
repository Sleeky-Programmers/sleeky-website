// Describes a clicked button or link for analytics: what it said, where on the
// page it was, and where it leads. GA4 keeps parameter values up to 100 characters.

const MAX = 100;
const clip = (value: string) => value.replace(/\s+/g, " ").trim().slice(0, MAX);

export type LinkType = "whatsapp" | "phone" | "email" | "internal" | "external" | "button";

/** The section of the page: an explicit data-track-location, else the nearest section id, else header/footer/nav. */
export function clickLocation(element: Element): string {
    const tagged = element.closest("[data-track-location]")?.getAttribute("data-track-location");
    if (tagged) return clip(tagged);
    const section = element.closest("section[id], [id][data-section]");
    if (section?.id) return clip(section.id);
    const landmark = element.closest("header, footer, nav, aside, form, [role=dialog]");
    if (landmark) return landmark.getAttribute("role") === "dialog" ? "dialog" : landmark.tagName.toLowerCase();
    return "page";
}

/** Visible text, or its accessible name for icon-only buttons. */
export function clickLabel(element: Element): string {
    const text = clip(element.textContent ?? "");
    return text || clip(element.getAttribute("aria-label") ?? element.getAttribute("title") ?? "") || "(no label)";
}

export function linkType(href: string | null): LinkType {
    if (href === null) return "button";
    if (href.startsWith("https://wa.me/")) return "whatsapp";
    if (href.startsWith("tel:")) return "phone";
    if (href.startsWith("mailto:")) return "email";
    try {
        const url = new URL(href, window.location.href);
        return url.origin === window.location.origin ? "internal" : "external";
    } catch {
        return "internal";
    }
}

/** Link target without the query string (which can hold personal data, e.g. a pre-filled message). */
export function linkUrl(href: string | null): string | undefined {
    if (!href) return undefined;
    try {
        const url = new URL(href, window.location.href);
        if (url.protocol === "tel:" || url.protocol === "mailto:") return clip(`${url.protocol}…`);
        return clip(url.origin === window.location.origin ? url.pathname + url.hash : url.origin + url.pathname);
    } catch {
        return clip(href.split("?")[0]);
    }
}
