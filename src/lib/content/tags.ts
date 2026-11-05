// Cache tags on CMS requests. The CMS pings /api/revalidate after a change and
// the matching tags are cleared, so the change shows on the next visit.

export const TAGS = {
  insights: "insights",
  caseStudies: "case-studies",
  /** One CMS page: "home", "about", "privacy-policy", "site" or "service-<slug>" */
  page: (key: string) => `page:${key}`,
};

/** Tags to clear for a CMS ping `{ type, slugs }`. Unknown types clear nothing. */
export function tagsForPing(type: unknown, slugs: unknown): string[] {
  const keys = Array.isArray(slugs) ? slugs.filter((slug): slug is string => typeof slug === "string" && /^[a-z0-9-]{1,80}$/.test(slug)) : [];
  switch (type) {
    // Lists change too (new, renamed or unpublished items), so the whole type is refreshed.
    case "insights":
      return [TAGS.insights];
    case "case-studies":
      return [TAGS.caseStudies];
    case "pages":
      return keys.map(TAGS.page);
    default:
      return [];
  }
}
