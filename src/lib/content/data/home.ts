import type { HomeContent } from "../types";

// Homepage copy from the design canvas. Used until the CMS is connected (CMS_API_URL);
// after that it's edited in the CMS under Pages > Homepage.

export const home: HomeContent = {
  seo: {
    title: "Sleeky Programmers | Websites, Apps & Automation in Lagos",
    description:
      "Sleeky Programmers builds premium websites, web and mobile apps, and business automation for ambitious businesses in Lagos, Nigeria and beyond.",
  },
  hero: {
    eyebrow: "Websites · Apps · Automation — Lagos, Nigeria",
    headline: "Software\nthat *grows*\nyour business.",
    intro: "Clean, reliable websites, apps and automation for businesses in Nigeria and beyond — built to look exceptional and run themselves.",
    ctaLabel: "Start a project",
  },
  marquee: ["Websites", "Web apps", "Mobile apps", "Business automation", "API integrations", "Branding"],
  statement: {
    text: "We design and engineer digital products for ambitious businesses —",
    mutedText: "then automate the busywork that slows them down.",
    clientsLabel: "Trusted by",
    clients: ["Votely", "Tiqwa Travels", "straitPay", "OneFarm", "Nexterra", "Tyda"],
  },
  work: {
    heading: "Featured\n*work*",
    description: "Products we've shipped for teams across Nigeria — from voting platforms to fintech dashboards.",
  },
  services: {
    heading: "What we\n*build*",
    description: "Hover a service. Each one opens its own page — built to rank on Google for what clients search.",
  },
  automation: {
    eyebrow: "Automation, live",
    heading: "This website runs on what we sell.",
    body: "Start a project and watch our own automation take over: your request lands in our CRM, the right person is alerted on WhatsApp and you get a confirmation — in seconds, with nobody copying and pasting.",
    buttonLabel: "Try it — start a project",
    steps: [
      { title: "Project brief submitted", detail: "Service, goals, timeline and any attached brief", time: "0s" },
      { title: "Contact & deal created in HubSpot", detail: "Lead source and pages viewed recorded", time: "2s" },
      { title: "Team alerted on WhatsApp", detail: "Lead owner assigned automatically", time: "4s" },
      { title: "Branded confirmation sent", detail: "“We’ll be in touch within 24 hours”", time: "5s" },
    ],
  },
  process: {
    heading: "How we\n*work*",
    steps: [
      { title: "Discover", description: "We map your goals, users and the manual work worth removing." },
      { title: "Design", description: "Clickable designs you approve before any code is written." },
      { title: "Build", description: "Weekly demos, clear milestones, a shared progress board." },
      { title: "Launch & grow", description: "Go-live, training, monthly analytics and ongoing support." },
    ],
  },
  closing: {
    eyebrow: "Have a project in mind?",
    heading: "Let’s talk.",
  },
};
