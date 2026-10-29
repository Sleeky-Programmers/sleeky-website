export const site = {
  name: "Sleeky Programmers",
  legalName: "Sleeky Programmers Ltd",
  url: (process.env.NEXT_PUBLIC_BASE_URL || "https://sleekyprogrammers.com").replace(/\/$/, ""),
  tagline: "Software that grows your business.",
  description:
    "Websites, web and mobile apps, and business automation for ambitious businesses in Lagos, Nigeria and beyond.",
  foundingDate: "2023-01",
  phone: {
    display: "0916 095 2000",
    e164: "+2349160952000",
  },
  whatsappNumber: "2349160952000",
  email: "support@sleekyprogrammers.com",
  // e.g. "Mon–Fri, 9am–6pm". Shown on About and added to structured data once set (brief 6.2).
  openingHours: undefined as string | undefined,
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=20+Olanrewaju+Street%2C+Akoka%2C+Lagos",
  address: {
    street: "20 Olanrewaju Street",
    locality: "Akoka",
    region: "Lagos",
    country: "NG",
  },
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/sleeky-programmers-limited/" },
    { label: "Instagram", href: "https://www.instagram.com/sleekyprogrammers" },
    { label: "X", href: "https://x.com/sleekydevs" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61565977402117" },
  ],
  logo: {
    onDark: "/brand/logo-on-dark.svg",
    mark: "/brand/logomark.svg",
    width: 650,
    height: 232,
  },
};

// Main navigation, as on the design canvas: Work opens the case study page and
// Services the service page. `section` keeps the item highlighted across that section.
export const mainNav = [
  { label: "Work", href: "/work/votely", section: "/work" },
  { label: "Services", href: "/services/business-automation", section: "/services" },
  { label: "About", href: "/about", section: "/about" },
  { label: "Insights", href: "/insights", section: "/insights" },
];

export const DEFAULT_WHATSAPP_MESSAGE = "Hi Sleeky Programmers, I'd like to discuss a project.";

export const whatsappLink = (message: string = DEFAULT_WHATSAPP_MESSAGE) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const absoluteUrl = (path: string = "/") => `${site.url}${path === "/" ? "" : path}`;
