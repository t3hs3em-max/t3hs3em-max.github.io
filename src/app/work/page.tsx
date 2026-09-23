import type { Metadata } from "next";
import { Page } from "@/components/layout/Page";
import { projects } from "@/content/projects";
import { shots } from "@/content/shots";
import { WorkGallery } from "@/components/work/WorkGallery";
import { ImageGallery } from "@/components/work/ImageGallery";
import { ContactCTA } from "@/components/home/ContactCTA";
import { Em, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, collectionJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Work — UX Case Studies & UI Design Projects",
  description:
    "Selected UI/UX design projects and case studies: mobile apps, web apps, dashboards and design systems, with research, wireframes, final UI and prototypes.",
  alternates: { canonical: "/work/" },
  openGraph: { title: "Work — UX Case Studies by Tehseem Khan", url: "/work/" },
};

export default function WorkPage() {
  return (
    <Page>
      <section className="pt-[calc(var(--header-h)+3rem)] pb-[var(--section)] md:pt-[calc(var(--header-h)+5rem)]" aria-labelledby="work-title">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Selected work"
              title={
                <span id="work-title">
                  Projects, with the <Em>process</Em> attached.
                </span>
              }
              description="Filter by platform or discipline. Every project opens a full case study: overview, problem, research, structure, wireframes, final UI, design system and an honest outcome."
            />
          </Reveal>
          <div className="mt-12">
            <WorkGallery projects={projects} />
          </div>
        </div>
      </section>

      {shots.length > 0 && (
        <section className="border-t border-border bg-surface/40 py-[var(--section)]" aria-labelledby="shots-title">
          <div className="container-x">
            <Reveal>
              <SectionHeading
                eyebrow="Gallery"
                title={<span id="shots-title">Screens and explorations.</span>}
                description="Individual screens from the projects above and smaller explorations. Open any image full-screen; use the arrow keys to move between them."
              />
            </Reveal>
            <div className="mt-12">
              <ImageGallery images={shots} />
            </div>
          </div>
        </section>
      )}

      <ContactCTA />
      <JsonLd data={[collectionJsonLd(projects), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Work", path: "/work/" }])]} />
    </Page>
  );
}
