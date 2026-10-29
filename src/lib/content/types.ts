// Content shapes shared by the local data files and, later, the Sanity CMS.
// Keep these stable: pages only depend on these types and the functions in ./index.ts.

export type Faq = {
  question: string;
  answer: string;
};

export type Step = { title: string; description: string };

/** Service page template (design canvas: /services/business-automation) */
export type Service = {
  slug: string;
  number: string;
  name: string;
  /** One line used in the services list on the homepage */
  summary: string;
  metaTitle: string;
  metaDescription: string;
  /** Display headline; `accent` is appended to the last line in green */
  headline: { lines: string[]; accent: string };
  intro: string;
  ctaLabel: string;
  whatsappMessage: string;
  /** Hero flow diagram: five short steps (about 14 characters each) */
  flow: { title: string; steps: [string, string, string, string, string]; note: string };
  problems: { intro: string; items: Step[] };
  tools: { heading: string; body: string; items: string[]; extra: string };
  process: { lead: string; accent: string; steps: Step[] };
  relatedWork?: { slug: string; blurb: string };
  faqHeading: string;
  faqs: Faq[];
  /** Closing call to action, one entry per line */
  ctaHeading: string[];
};

export type CaseStudyImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** Case study template (design canvas: /work/votely) */
export type CaseStudy = {
  slug: string;
  client: string;
  tags: string[];
  summary: string;
  metaTitle: string;
  metaDescription: string;
  /** Card colour treatment on the homepage and work listing */
  theme: "surface" | "slate" | "green";
  sector?: string;
  liveUrl?: string;
  /** Main screenshot under the hero; also used on cards */
  heroImage?: CaseStudyImage;
  /** Second screenshot for the homepage featured card */
  secondaryImage?: CaseStudyImage;
  challenge?: { headline: string; body: string };
  built: { headline: string; body: string };
  features: { title: string; body: string; image?: CaseStudyImage }[];
  /** Results, numbers and quotes. Rendered only once supplied (brief section 9). */
  results?: { value: string; label: string }[];
  quote?: { text: string; author: string; role: string };
  /** Service page slugs this project relates to */
  services: string[];
};

/** Rich text block. The Sanity version will map Portable Text onto these. */
export type InsightBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; image: CaseStudyImage; caption?: string };

export type InsightPost = {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  coverImage?: CaseStudyImage;
  body: InsightBlock[];
};

/** About page team member. Photos and roles are still "Open" in the brief. */
export type TeamMember = {
  name: string;
  role?: string;
  photo?: CaseStudyImage;
};
