import type { SiteSettings } from "./content/types";

// Fixed facts about the company and site. Contact details, address and social
// links are editable (CMS: Site settings) and come from getSiteSettings().
export const site = {
  name: "Sleeky Programmers",
  legalName: "Sleeky Programmers Ltd",
  url: (process.env.NEXT_PUBLIC_BASE_URL || "https://sleekyprogrammers.com").replace(/\/$/, ""),
  tagline: "Software that grows your business.",
  description:
    "Websites, web and mobile apps, and business automation for ambitious businesses in Lagos, Nigeria and beyond.",
  foundingDate: "2023-01",
  logo: {
    onDark: "/brand/logo-on-dark.svg",
    mark: "/brand/logomark.svg",
    width: 650,
    height: 232,
  },
};

// Main navigation, as on the design canvas: Work opens the first case study (see
// app/(site)/work/page.tsx) and Services the service page. `section` keeps the item
// highlighted across that section.
export const mainNav = [
  { label: "Work", href: "/work", section: "/work" },
  { label: "Services", href: "/services/business-automation", section: "/services" },
  { label: "About", href: "/about", section: "/about" },
  { label: "Insights", href: "/insights", section: "/insights" },
];

/** WhatsApp chat link with a pre-filled message (the site's default message unless given). */
export const whatsappLink = (settings: Pick<SiteSettings, "whatsappNumber" | "whatsappMessage">, message?: string) =>
  `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message || settings.whatsappMessage)}`;

export const fullAddress = ({ address }: Pick<SiteSettings, "address">) => `${address.street}, ${address.locality}, ${address.region}`;

/** Full address of a path on this site; addresses that are already absolute (e.g. CMS images) are returned as they are. */
export const absoluteUrl = (path: string = "/") =>
  /^https?:\/\//.test(path) ? path : `${site.url}${path === "/" ? "" : path}`;
