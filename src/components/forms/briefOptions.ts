// Option ids must match the contact API's brief DTO (sleeky-website-contact-api/src/brief).

export const serviceOptions = [
    { id: "business-automation", label: "Business automation", desc: "CRM, invoicing, workflows, reports" },
    { id: "website", label: "Website", desc: "Company site, landing pages, e-commerce" },
    { id: "web-app", label: "Web app", desc: "Portals, dashboards, internal tools" },
    { id: "mobile-app", label: "Mobile app", desc: "iOS and Android" },
    { id: "api-integration", label: "API integration", desc: "Payments, banking, third-party systems" },
    { id: "branding", label: "Branding", desc: "Logo, identity, brand guide" },
];

export const existingOptions = [
    { id: "none", label: "No, starting fresh" },
    { id: "rebuild", label: "Yes — needs a rebuild" },
    { id: "improve", label: "Yes — needs improving" },
];

export const timelineOptions = [
    { id: "flexible", label: "Flexible", desc: "No fixed date yet" },
    { id: "1-3-months", label: "1–3 months", desc: "A planned launch" },
    { id: "asap", label: "ASAP", desc: "We have a hard deadline" },
];

export type Channel = "whatsapp" | "email" | "phone";

export const channelOptions: { id: Channel; label: string; text: string }[] = [
    { id: "whatsapp", label: "WhatsApp", text: "WhatsApp" },
    { id: "email", label: "Email", text: "email" },
    { id: "phone", label: "Phone call", text: "phone" },
];

export const stepNames = ["Services", "Your project", "Timeline", "Contact"];

// Vercel serverless functions accept request bodies up to 4.5 MB, so attachments
// are capped at 4 MB until uploads go direct to storage.
export const MAX_FILE_BYTES = 4 * 1024 * 1024;
export const ACCEPTED_FILE_TYPES = ".pdf,.doc,.docx,.png,.jpg,.jpeg";
export const ACCEPTED_EXTENSIONS = ["pdf", "doc", "docx", "png", "jpg", "jpeg"];

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const BRIEF_STORAGE_KEY = "sleeky-brief-sent";
