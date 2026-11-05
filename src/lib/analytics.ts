// GA4 events from brief section 7.1. Events are dropped silently until the
// visitor accepts analytics cookies, because GA is only loaded after consent.

export type AnalyticsEvent =
  | "generate_lead"
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "form_step"
  | "file_upload"
  /** Any button or link click: label, location (page section), link_type, link_url */
  | "button_click"
  /** How far down a page the visitor scrolled: percent = 25, 50, 75 or 90 */
  | "scroll_depth";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, { page: window.location.pathname, ...params });
}

export type ConsentChoice = "granted" | "denied";

const CONSENT_KEY = "sleeky-consent";
export const CONSENT_EVENT = "sleeky:consent-change";
export const OPEN_CONSENT_EVENT = "sleeky:open-consent";

export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_EVENT, { detail: choice }));
}
