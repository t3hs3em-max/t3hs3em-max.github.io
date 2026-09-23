import type { Metadata } from "next";
import { Page } from "@/components/layout/Page";
import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ProcessStrip } from "@/components/home/ProcessStrip";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { ContactCTA } from "@/components/home/ContactCTA";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} — UI/UX Designer & Product Designer Portfolio`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <Page>
      <Hero />
      <SelectedWork />
      <ProcessStrip />
      <AboutTeaser />
      <ContactCTA />
    </Page>
  );
}
