import type { CaseStudy, InsightPost, Service } from "./types";
import { services } from "./data/services";
import { caseStudies, trustedBy } from "./data/work";
import { insights } from "./data/insights";
import { studioPhotos, team, values } from "./data/about";

// Single entry point for site content. Every page reads content through these
// async functions, so connecting the CMS later only means changing their bodies
// (e.g. to Sanity GROQ queries) — no page or component needs to change.

export type { CaseStudy, InsightPost, Service, TeamMember } from "./types";

export async function getAbout() {
  return { values, team, studioPhotos };
}

export async function getServices(): Promise<Service[]> {
  return services;
}

export async function getService(slug: string): Promise<Service | null> {
  return services.find((service) => service.slug === slug) ?? null;
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return caseStudies;
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  return caseStudies.find((study) => study.slug === slug) ?? null;
}

export async function getTrustedBy(): Promise<string[]> {
  return trustedBy;
}

export async function getInsights(): Promise<InsightPost[]> {
  return [...insights].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getInsight(slug: string): Promise<InsightPost | null> {
  return insights.find((post) => post.slug === slug) ?? null;
}
