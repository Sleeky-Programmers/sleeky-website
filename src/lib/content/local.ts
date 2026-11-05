import type { ContentSource } from "./source";
import type { Service } from "./types";
import { about } from "./data/about";
import { home } from "./data/home";
import { insights } from "./data/insights";
import { privacy } from "./data/privacy";
import { services, type ServiceSource } from "./data/services";
import { siteSettings } from "./data/site-settings";
import { caseStudies } from "./data/work";

// Content from the files in ./data: the website's own copy, used when the CMS
// isn't connected (no CMS_API_URL).

function toService(source: ServiceSource): Service {
  return {
    slug: source.slug,
    number: source.number,
    name: source.name,
    summary: source.summary,
    seo: { title: source.metaTitle, description: source.metaDescription },
    hero: {
      headline: `${source.headline.lines.join("\n")} *${source.headline.accent}*`,
      intro: source.intro,
      ctaLabel: source.ctaLabel,
      whatsappMessage: source.whatsappMessage,
    },
    flow: { ...source.flow, steps: [...source.flow.steps] },
    problems: source.problems,
    tools: source.tools,
    process: { heading: `${source.process.lead}\n*${source.process.accent}*`, steps: source.process.steps },
    related: source.relatedWork,
    faqs: { heading: source.faqHeading, items: source.faqs },
    closing: { heading: source.ctaHeading.join("\n") },
  };
}

const sortedInsights = () => [...insights].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const localSource: ContentSource = {
  getSiteSettings: async () => siteSettings,
  getHome: async () => home,
  getAbout: async () => about,
  getPrivacy: async () => privacy,
  getServices: async () => services.map(toService),
  getCaseStudies: async () => caseStudies,
  getCaseStudy: async (slug) => {
    const index = caseStudies.findIndex((study) => study.slug === slug);
    if (index === -1) return null;
    const next = caseStudies.length > 1 ? caseStudies[(index + 1) % caseStudies.length] : null;
    return { caseStudy: caseStudies[index], next: next ? { slug: next.slug, client: next.client } : null };
  },
  getInsights: async () => sortedInsights().map(({ html: _html, ...post }) => post),
  getInsight: async (slug) => insights.find((post) => post.slug === slug) ?? null,
};
