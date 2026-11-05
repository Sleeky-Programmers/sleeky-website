import type { SiteSettings } from "../types";

// Contact details and links used across the site. Used until the CMS is connected
// (CMS_API_URL); after that they're edited in the CMS under Site settings.

export const siteSettings: SiteSettings = {
  phone: {
    display: "0916 095 2000",
    e164: "+2349160952000",
  },
  whatsappNumber: "2349160952000",
  whatsappMessage: "Hi Sleeky Programmers, I'd like to discuss a project.",
  email: "support@sleekyprogrammers.com",
  address: {
    street: "20 Olanrewaju Street",
    locality: "Akoka",
    region: "Lagos",
    country: "NG",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=20+Olanrewaju+Street%2C+Akoka%2C+Lagos",
  // e.g. "Mon–Fri, 9am–6pm". Shown on About and added to structured data once set (brief 6.2).
  openingHours: undefined,
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/sleeky-programmers-limited/" },
    { label: "Instagram", href: "https://www.instagram.com/sleekyprogrammers" },
    { label: "X", href: "https://x.com/sleekydevs" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61565977402117" },
  ],
  footerTagline: "Websites, apps and automation for ambitious businesses in Nigeria and beyond.",
};
