// Content shapes for the whole site. They follow what the Sleeky CMS serves
// (sleeky-cms: /api/public/*), and the local data files are converted to the
// same shapes, so pages render the same way whichever source is in use.
//
// Headings marked "Highlighted" use the CMS convention: each "\n" starts a new
// line and *words in asterisks* are shown in green (see components/ui/Highlight).

export type Faq = {
  question: string;
  answer: string;
};

export type Step = { title: string; description: string };

export type Seo = { title: string; description: string };

export type CaseStudyImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** Contact details and links used across the site (CMS: Site settings). */
export type SiteSettings = {
  phone: { display: string; e164: string };
  whatsappNumber: string;
  /** Pre-filled message for WhatsApp buttons without their own. */
  whatsappMessage: string;
  email: string;
  address: { street: string; locality: string; region: string; country: string };
  mapsUrl?: string;
  openingHours?: string;
  socials: { label: string; href: string }[];
  footerTagline: string;
};

export type HomeContent = {
  seo: Seo;
  /** headline: Highlighted */
  hero: { eyebrow: string; headline: string; intro: string; ctaLabel: string };
  marquee: string[];
  statement: { text: string; mutedText: string; clientsLabel: string; clients: string[] };
  /** heading: Highlighted */
  work: { heading: string; description: string };
  /** heading: Highlighted */
  services: { heading: string; description: string };
  /** heading: Highlighted. Exactly four steps (each has its own icon). */
  automation: { eyebrow: string; heading: string; body: string; buttonLabel: string; steps: { title: string; detail: string; time: string }[] };
  /** heading: Highlighted */
  process: { heading: string; steps: Step[] };
  closing: { eyebrow: string; heading: string };
};

export type TeamMember = {
  name: string;
  role?: string;
  photo?: CaseStudyImage;
};

export type AboutContent = {
  seo: Seo;
  /** headline: Highlighted */
  hero: { eyebrow: string; headline: string; intro: string; badge: string };
  studio: { widePhoto?: CaseStudyImage; detailPhoto?: CaseStudyImage; foundedYear: string; foundedCaption: string };
  mission: { label: string; text: string; mutedText: string };
  /** heading: Highlighted */
  values: { heading: string; items: Step[] };
  /** heading: Highlighted */
  team: { heading: string; intro: string; members: TeamMember[] };
  visit: { label: string };
  closing: { heading: string };
};

export type PrivacyContent = {
  seo: Seo;
  intro: string;
  /** The policy as HTML (headings and paragraphs), cleaned by the CMS. */
  html: string;
};

/** Service page template (design canvas: /services/business-automation) */
export type Service = {
  slug: string;
  /** "01"… in the order the services are listed */
  number: string;
  name: string;
  /** One line used in the services list on the homepage */
  summary: string;
  seo: Seo;
  /** headline: Highlighted */
  hero: { headline: string; intro: string; ctaLabel: string; whatsappMessage: string };
  /** Hero flow diagram: five short steps (about 14 characters each) */
  flow: { title: string; steps: string[]; note: string };
  problems: { intro: string; items: Step[] };
  tools: { heading: string; body: string; items: string[]; extra: string };
  /** heading: Highlighted */
  process: { heading: string; steps: Step[] };
  /** Related case study, by its address; absent to hide the section */
  related?: { slug: string; blurb: string };
  faqs: { heading: string; items: Faq[] };
  /** Closing call to action; each "\n" starts a new line */
  closing: { heading: string };
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

export type InsightPost = {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  readingMinutes?: number;
  coverImage?: CaseStudyImage;
};

/** A full article: the body is HTML, cleaned by the CMS. */
export type Insight = InsightPost & { html: string };
