import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Page } from "@/components/layout/Page";
import { CaseStudy } from "@/components/case-study/CaseStudy";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProject, projects } from "@/content/projects";
import { breadcrumbJsonLd, caseStudyJsonLd } from "@/lib/seo";
import { site } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.title} — ${p.type.split("·")[0].trim()} UX Case Study`;
  return {
    title,
    description: p.seoDescription,
    alternates: { canonical: `/work/${p.slug}/` },
    openGraph: {
      type: "article",
      title: `${p.title} — UX case study by ${site.name}`,
      description: p.seoDescription,
      url: `/work/${p.slug}/`,
      images: [{ url: `${p.cover.src}.webp`, width: p.cover.width, height: p.cover.height, alt: p.cover.alt }],
    },
    twitter: { card: "summary_large_image", title, description: p.seoDescription, images: [`${p.cover.src}.webp`] },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  return (
    <Page>
      <CaseStudy project={p} />
      <JsonLd
        data={[
          caseStudyJsonLd(p),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work/" },
            { name: p.title, path: `/work/${p.slug}/` },
          ]),
        ]}
      />
    </Page>
  );
}
