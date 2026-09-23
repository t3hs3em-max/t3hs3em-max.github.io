import { site } from "@/content/site";
import type { Project } from "@/content/types";

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: site.fullName,
    alternateName: site.name,
    jobTitle: "UI/UX Designer",
    description: site.description,
    url: site.url,
    email: `mailto:${site.email}`,
    telephone: site.phone,
    image: `${site.url}/profile/tehseem-headshot.jpg`,
    sameAs: site.social.map((s) => s.href),
    knowsAbout: ["UI Design", "UX Design", "Product Design", "Design Systems", "Figma", "Mobile App Design", "Web App Design", "Prototyping"],
    address: { "@type": "PostalAddress", addressCountry: "PK" },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: `${site.name} — UI/UX Designer Portfolio`,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": personId },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function caseStudyJsonLd(p: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${site.url}/work/${p.slug}/#case-study`,
    name: `${p.title} — UX case study`,
    headline: p.tagline,
    description: p.seoDescription,
    url: `${site.url}/work/${p.slug}/`,
    image: `${site.url}${p.cover.src}.webp`,
    author: { "@id": personId },
    creator: { "@id": personId },
    genre: "UX case study",
    keywords: [...p.categories, ...p.tools].join(", "),
    inLanguage: "en",
    isPartOf: { "@id": websiteId },
  };
}

export function collectionJsonLd(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: `${site.url}/work/`,
    name: `Selected work — ${site.name}`,
    description: "UI/UX case studies: mobile apps, web apps, dashboards and design systems.",
    isPartOf: { "@id": websiteId },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${site.url}/work/${p.slug}/`,
        name: p.title,
      })),
    },
  };
}
