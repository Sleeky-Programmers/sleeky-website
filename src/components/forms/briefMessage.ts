import { parsePhoneNumberFromString } from "libphonenumber-js/min";
import { channelOptions, existingOptions, serviceOptions, timelineOptions, type Channel } from "./briefOptions";

// The same rules as the contact API (sleeky-website-contact-api/src/brief/phone.ts),
// with lighter number data (checks lengths and prefixes per country) to keep the
// form page small. The API checks every number again in full and has the last word.

export const INVALID_PHONE_MESSAGE = "Enter a valid WhatsApp number, e.g. 0803 123 4567 or +44 7911 123456.";

/** A real number in international format (+2348031234567), or null. Numbers without a country code are read as Nigerian. */
export function normalisePhone(value: string): string | null {
    const parsed = parsePhoneNumberFromString(value.trim(), "NG");
    return parsed?.isValid() ? parsed.number : null;
}

/** "+234 803 123 4567" for display in the message. */
const displayPhone = (value: string) => parsePhoneNumberFromString(value.trim(), "NG")?.formatInternational() ?? value.trim();

const GOAL_MAX = 700;

export type BriefDetails = {
    name: string;
    company?: string;
    email?: string;
    phone?: string;
    channel: Channel;
    services: string[];
    timeline: string | null;
    existing: string | null;
    goal: string;
    /** Private, expiring link to the attached file, from the contact API. */
    fileUrl?: string;
    fileName?: string;
};

const label = (options: { id: string; label: string }[], id: string | null) => options.find((option) => option.id === id)?.label;

/** The message a client sends us on WhatsApp after submitting the form: their brief, ready to send. */
export function briefWhatsAppMessage(brief: BriefDetails): string {
    const goal = brief.goal.trim();
    const lines = [
        "Hi Sleeky Programmers, I've just sent a project brief on your website.",
        "",
        `Name: ${brief.name.trim()}`,
        brief.company?.trim() ? `Company: ${brief.company.trim()}` : null,
        `Services: ${brief.services.map((id) => label(serviceOptions, id) ?? id).join(", ")}`,
        brief.timeline ? `Timeline: ${label(timelineOptions, brief.timeline)}` : null,
        brief.existing ? `Existing site or app: ${label(existingOptions, brief.existing)}` : null,
        brief.email?.trim() ? `Email: ${brief.email.trim()}` : null,
        brief.phone?.trim() ? `WhatsApp: ${displayPhone(brief.phone)}` : null,
        `Reply by: ${label(channelOptions, brief.channel)}`,
        "",
        "What I want to achieve:",
        goal.length > GOAL_MAX ? `${goal.slice(0, GOAL_MAX).trimEnd()}…` : goal,
        ...(brief.fileUrl ? ["", `File${brief.fileName ? ` (${brief.fileName})` : ""}: ${brief.fileUrl}`] : []),
    ];
    return lines.filter((line): line is string => typeof line === "string").join("\n");
}
