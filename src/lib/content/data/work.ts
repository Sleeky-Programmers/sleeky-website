import type { CaseStudy } from "../types";

// Votely copy comes from the approved design canvas. The challenge, sector,
// results and client quote are placeholders on the canvas and still "Open" in
// the brief (section 9); each section appears once its data is added here.
// Screenshots: export them from the canvas into public/assets/work/<slug>/ and
// set `heroImage`, `secondaryImage` and each feature's `image`.

export const caseStudies: CaseStudy[] = [
  {
    slug: "votely",
    client: "Votely",
    tags: ["Web app", "Product design"],
    summary:
      "A performance-voting platform that lets organisations run award and evaluation cycles — by individual or by department — with live progress and results.",
    metaTitle: "Votely — Performance Voting Platform | Sleeky Programmers",
    metaDescription:
      "How Sleeky Programmers designed and built Votely, a performance-voting platform for award and evaluation cycles with live progress and results.",
    theme: "surface",
    liveUrl: "https://app.votely.com.ng",
    built: {
      headline: "Voting cycles anyone can run, and everyone can follow.",
      body: "Members join departments, see their active voting sessions and deadlines on one dashboard, and evaluate colleagues or whole departments. Organisers track progress live and publish results when a cycle closes.",
    },
    features: [
      {
        title: "Vote by individual or department",
        body: "One switch moves an award between people and teams, with progress shown against each cycle's deadline.",
      },
      {
        title: "Members manage their own departments",
        body: "Self-service joining keeps the organisation chart current without an admin updating it by hand.",
      },
    ],
    services: ["web-apps"],
  },
  {
    slug: "straitpay",
    client: "straitPay",
    tags: ["Fintech", "Admin dashboard"],
    summary: "Admin dashboard for payments operations.",
    metaTitle: "straitPay — Payments Admin Dashboard | Sleeky Programmers",
    metaDescription: "How Sleeky Programmers built an admin dashboard for straitPay's payments operations team.",
    theme: "slate",
    built: {
      headline: "One dashboard for payments operations.",
      body: "An admin dashboard that gives straitPay's operations team a clear view of payments activity and the tools to manage it.",
    },
    features: [],
    services: ["web-apps", "api-integrations"],
  },
  {
    slug: "tiqwa-travels",
    client: "Tiqwa Travels",
    tags: ["Travel", "Website"],
    summary: "Website development for a travel brand.",
    metaTitle: "Tiqwa Travels — Travel Website | Sleeky Programmers",
    metaDescription: "How Sleeky Programmers developed the website for Tiqwa Travels, a travel brand.",
    theme: "green",
    built: {
      headline: "A website that presents the brand clearly.",
      body: "A website for Tiqwa Travels that presents its travel services clearly and makes it easy for customers to get in touch.",
    },
    features: [],
    services: ["websites"],
  },
];

/** Client names shown in the "Trusted by" row */
export const trustedBy = ["Votely", "Tiqwa Travels", "straitPay", "OneFarm", "Nexterra", "Tyda"];
