import type { ContentSource } from "./source";
import { TAGS } from "./tags";
import type { AboutContent, CaseStudy, CaseStudyImage, HomeContent, Insight, InsightPost, Service, SiteSettings } from "./types";
import { services as localServices } from "./data/services";

// Content from the Sleeky CMS's public, read-only API (sleeky-cms: /api/public/*).
// Responses are cached and refreshed hourly, or straight away when the CMS pings
// /api/revalidate. If the CMS can't be reached, the request throws: Next keeps
// serving the last good version of the page rather than older local copy.

/** Refresh at least this often even without a ping from the CMS. */
const REVALIDATE_SECONDS = 3600;

/** The six service pages, in listing order. Their addresses are fixed; the content is edited in the CMS. */
const SERVICE_SLUGS = localServices.map((service) => service.slug);

type StoredImage = { url: string; alt: string; width: number; height: number } | null | undefined;

const image = (stored: StoredImage): CaseStudyImage | undefined =>
  stored ? { src: stored.url, alt: stored.alt, width: stored.width, height: stored.height } : undefined;

export function createCmsSource(baseUrl: string): ContentSource {
  const base = baseUrl.replace(/\/$/, "");

  async function get<T>(path: string, tags: string[]): Promise<T | null> {
    const response = await fetch(`${base}/api/public${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS, tags },
    });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`CMS request failed (${response.status}): ${path}`);
    return (await response.json()) as T;
  }

  /** A page's content; every CMS page exists (unedited ones serve their original text). */
  async function page<T>(key: string): Promise<T> {
    const result = await get<{ page: { content: T } }>(`/pages/${key}`, [TAGS.page(key)]);
    if (!result) throw new Error(`CMS page "${key}" not found`);
    return result.page.content;
  }

  type SiteContent = {
    contact: { phoneDisplay: string; phoneInternational: string; whatsappNumber: string; whatsappMessage: string; email: string };
    address: { street: string; locality: string; region: string; mapsUrl: string; openingHours: string };
    socials: { label: string; url: string }[];
    footerTagline: string;
  };

  type AboutPage = Omit<AboutContent, "studio" | "team"> & {
    studio: { widePhoto: StoredImage; detailPhoto: StoredImage; foundedYear: string; foundedCaption: string };
    team: { heading: string; intro: string; members: { name: string; role: string; photo: StoredImage }[] };
  };

  type ServicePage = Omit<Service, "slug" | "number" | "name" | "summary" | "related"> & {
    listing: { name: string; summary: string };
    related: { caseStudy: string; blurb: string };
  };

  type ArticleSummary = Omit<InsightPost, "coverImage"> & { coverImage: StoredImage };

  const toPost = ({ coverImage, ...post }: ArticleSummary): InsightPost => ({ ...post, coverImage: image(coverImage) });

  return {
    async getSiteSettings(): Promise<SiteSettings> {
      const { contact, address, socials, footerTagline } = await page<SiteContent>("site");
      return {
        phone: { display: contact.phoneDisplay, e164: contact.phoneInternational },
        whatsappNumber: contact.whatsappNumber,
        whatsappMessage: contact.whatsappMessage,
        email: contact.email,
        address: { street: address.street, locality: address.locality, region: address.region, country: "NG" },
        mapsUrl: address.mapsUrl || undefined,
        openingHours: address.openingHours || undefined,
        socials: socials.map((social) => ({ label: social.label, href: social.url })),
        footerTagline,
      };
    },

    getHome: () => page<HomeContent>("home"),

    async getAbout(): Promise<AboutContent> {
      const content = await page<AboutPage>("about");
      return {
        ...content,
        studio: {
          ...content.studio,
          widePhoto: image(content.studio.widePhoto),
          detailPhoto: image(content.studio.detailPhoto),
        },
        team: {
          ...content.team,
          members: content.team.members.map((member) => ({ name: member.name, role: member.role || undefined, photo: image(member.photo) })),
        },
      };
    },

    async getPrivacy() {
      const content = await page<{ seo: { title: string; description: string }; intro: string; body: { html: string } }>("privacy-policy");
      return { seo: content.seo, intro: content.intro, html: content.body.html };
    },

    async getServices(): Promise<Service[]> {
      const pages = await Promise.all(SERVICE_SLUGS.map((slug) => page<ServicePage>(`service-${slug}`)));
      return pages.map(({ listing, related, ...content }, index) => ({
        ...content,
        slug: SERVICE_SLUGS[index],
        number: String(index + 1).padStart(2, "0"),
        name: listing.name,
        summary: listing.summary,
        related: related.caseStudy ? { slug: related.caseStudy, blurb: related.blurb } : undefined,
      }));
    },

    async getCaseStudies() {
      return (await get<{ caseStudies: CaseStudy[] }>("/case-studies", [TAGS.caseStudies]))?.caseStudies ?? [];
    },

    async getCaseStudy(slug) {
      return get<{ caseStudy: CaseStudy; next: { slug: string; client: string } | null }>(`/case-studies/${encodeURIComponent(slug)}`, [TAGS.caseStudies]);
    },

    async getInsights() {
      const result = await get<{ articles: ArticleSummary[] }>("/insights", [TAGS.insights]);
      return (result?.articles ?? []).map(toPost);
    },

    async getInsight(slug): Promise<Insight | null> {
      const result = await get<{ article: ArticleSummary & { html: string } }>(`/insights/${encodeURIComponent(slug)}`, [TAGS.insights]);
      if (!result) return null;
      const { html, ...post } = result.article;
      return { ...toPost(post), html };
    },
  };
}
