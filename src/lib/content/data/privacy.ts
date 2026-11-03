import type { PrivacyContent } from "../types";
import { siteSettings } from "./site-settings";

// DRAFT: the privacy policy text is still "Open" in the brief (section 9). This draft
// describes what the site actually collects; Sleeky must have it reviewed before launch.
// Used until the CMS is connected (CMS_API_URL); after that it's edited in the CMS.

const { address, email } = siteSettings;

const sections: [string, string[]][] = [
  [
    "Who we are",
    [
      `Sleeky Programmers Ltd ("we", "us") is a software company at ${address.street}, ${address.locality}, ${address.region}, Nigeria. We are responsible for the personal data collected through this website.`,
    ],
  ],
  [
    "What we collect",
    [
      "Project briefs: when you start a project, we collect your name, company, email address, WhatsApp number, preferred contact channel, project details, timeline and any document you choose to attach.",
      "Analytics: if you accept analytics cookies, we use Google Analytics and HubSpot to understand how visitors find and use the site, including pages viewed and how you arrived.",
      "Messages: if you contact us by WhatsApp, phone or email, we receive the details you share in that conversation.",
    ],
  ],
  [
    "How we use it",
    [
      "We use the details in your brief only to respond to your request, prepare a proposal and follow up through the channel you chose.",
      "We use analytics data in aggregate to improve the website and understand which pages and channels bring enquiries.",
      "We do not sell your personal data.",
    ],
  ],
  [
    "Cookies",
    [
      'Analytics cookies stay off until you accept them in the cookie banner. You can change your choice at any time using "Cookie settings" at the bottom of every page.',
    ],
  ],
  [
    "Who we share it with",
    [
      "We use trusted service providers to run this website and handle enquiries, including our hosting provider, email provider, Google (Analytics and reCAPTCHA) and HubSpot (customer relationship management). They process data on our behalf and only as needed to provide their services.",
    ],
  ],
  [
    "How long we keep it",
    [
      "We keep enquiry details for as long as needed to respond and, if we work together, for the duration of our relationship and any period required by law.",
    ],
  ],
  [
    "Your rights",
    [
      "Under the Nigeria Data Protection Act 2023, you can ask to access, correct or delete your personal data, object to or restrict how we use it, and withdraw consent at any time.",
      `To make a request, email ${email}. You can also lodge a complaint with the Nigeria Data Protection Commission.`,
    ],
  ],
];

const escape = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const privacy: PrivacyContent = {
  seo: {
    title: "Privacy Policy | Sleeky Programmers",
    description:
      "How Sleeky Programmers collects, uses and protects personal data submitted through this website, in line with the Nigeria Data Protection Act 2023.",
  },
  intro: "How we collect, use and protect the information you share with us through this website.",
  html: sections
    .map(([title, paragraphs]) => `<h2>${escape(title)}</h2>${paragraphs.map((text) => `<p>${escape(text)}</p>`).join("")}`)
    .join(""),
};
