import type { AboutContent, CaseStudy, HomeContent, Insight, InsightPost, PrivacyContent, Service, SiteSettings } from "./types";

/** Where content comes from: the CMS (./cms.ts) or the local data files (./local.ts). */
export type ContentSource = {
  getSiteSettings(): Promise<SiteSettings>;
  getHome(): Promise<HomeContent>;
  getAbout(): Promise<AboutContent>;
  getPrivacy(): Promise<PrivacyContent>;
  /** All services, in listing order */
  getServices(): Promise<Service[]>;
  /** Published case studies, in website order */
  getCaseStudies(): Promise<CaseStudy[]>;
  /** One case study and the next one in order (wrapping around), for "Next project" */
  getCaseStudy(slug: string): Promise<{ caseStudy: CaseStudy; next: { slug: string; client: string } | null } | null>;
  /** Published articles, newest first */
  getInsights(): Promise<InsightPost[]>;
  getInsight(slug: string): Promise<Insight | null>;
};
