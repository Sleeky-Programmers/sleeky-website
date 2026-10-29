import type { Metadata } from "next";
import type { CaseStudy, Faq, Service } from "./content/types";
import { absoluteUrl, site } from "./site";

type PageMetaInput = {
  /** Page title without the brand suffix, unless `absoluteTitle` is set */
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  noIndex?: boolean;
  type?: "website" | "article";
};

export function pageMetadata({ title, description, path, absoluteTitle, noIndex, type = "website" }: PageMetaInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title,
      description,
      siteName: site.name,
      locale: "en_NG",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

const ORG_ID = `${site.url}/#organization`;
const BUSINESS_ID = `${site.url}/#localbusiness`;

export function organizationJsonLd() {
  const postalAddress = {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  };

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": ORG_ID,
      name: site.legalName,
      alternateName: site.name,
      url: site.url,
      logo: absoluteUrl(site.logo.mark),
      email: site.email,
      telephone: site.phone.e164,
      foundingDate: site.foundingDate,
      address: postalAddress,
      sameAs: site.socials.map((social) => social.href),
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": BUSINESS_ID,
      name: site.legalName,
      url: site.url,
      image: absoluteUrl("/opengraph-image"),
      logo: absoluteUrl(site.logo.mark),
      telephone: site.phone.e164,
      email: site.email,
      address: postalAddress,
      areaServed: ["Lagos", "Nigeria"],
      parentOrganization: { "@id": ORG_ID },
      // TODO: add `openingHoursSpecification` once Sleeky confirms opening hours (brief 6.2).
    },
  ];
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": BUSINESS_ID },
    areaServed: ["Lagos", "Nigeria"],
  };
}

export function caseStudyJsonLd(study: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${study.client} case study`,
    headline: study.metaTitle.split(" | ")[0],
    description: study.metaDescription,
    url: absoluteUrl(`/work/${study.slug}`),
    creator: { "@id": ORG_ID },
    about: study.client,
    keywords: study.tags.join(", "),
    ...(study.heroImage ? { image: absoluteUrl(study.heroImage.src) } : {}),
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
