import { cache } from "react";
import { createCmsSource } from "./cms";
import { localSource } from "./local";
import type { ContentSource } from "./source";

// Single entry point for site content. Pages and components read content only
// through these functions.
//
// With CMS_API_URL set (the CMS's address, e.g. https://cms.sleekyprogrammers.com),
// content comes from the Sleeky CMS; without it, from the local files in ./data.

export type {
  AboutContent,
  CaseStudy,
  CaseStudyImage,
  HomeContent,
  Insight,
  InsightPost,
  PrivacyContent,
  Service,
  SiteSettings,
  TeamMember,
} from "./types";

const cmsUrl = process.env.CMS_API_URL?.trim();
const source: ContentSource = cmsUrl ? createCmsSource(cmsUrl) : localSource;

/** True when content comes from the CMS. */
export const usesCms = Boolean(cmsUrl);

// cache(): each piece of content is read once per request, however many components use it.
export const getSiteSettings = cache(() => source.getSiteSettings());
export const getHome = cache(() => source.getHome());
export const getAbout = cache(() => source.getAbout());
export const getPrivacy = cache(() => source.getPrivacy());
export const getServices = cache(() => source.getServices());
export const getCaseStudies = cache(() => source.getCaseStudies());
export const getInsights = cache(() => source.getInsights());
export const getInsight = cache((slug: string) => source.getInsight(slug));

export const getService = cache(async (slug: string) => (await getServices()).find((service) => service.slug === slug) ?? null);

/** A published case study and the next one in order, for "Next project". */
export const getCaseStudy = cache((slug: string) => source.getCaseStudy(slug));
