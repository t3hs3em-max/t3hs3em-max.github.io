import type { Metadata } from "next";
import { Page } from "@/components/layout/Page";
import { ProcessInteractive } from "@/components/about/ProcessInteractive";
import { ContactCTA } from "@/components/home/ContactCTA";
import { Button } from "@/components/ui/Button";
import { Chip, Em, SectionHeading } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { philosophy, site, skills } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "About — UI/UX & Product Designer",
  description: `About ${site.fullName}: a UI/UX and product designer who designs mobile apps, web apps and design systems in Figma. Design philosophy, skills, tools and process.`,
  alternates: { canonical: "/about/" },
  openGraph: { title: `About ${site.name} — UI/UX & Product Designer`, url: "/about/" },
};

export default function AboutPage() {
  return (
    <Page>
      {/* Intro */}
      <section className="pt-[calc(var(--header-h)+3rem)] pb-16 md:pt-[calc(var(--header-h)+5rem)] md:pb-24" aria-labelledby="about-title">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">About</p>
            <h1 id="about-title" className="mt-4 text-h1 font-medium tracking-tight text-ink">
              I design products that are <Em>simple</Em> to use and <Em>built</Em> to last.
            </h1>
            <div className="prose-case mt-8">
              <p>
                I&apos;m {site.fullName}, a UI/UX and product designer based in Pakistan working with clients worldwide. I design mobile apps, web apps and dashboards in Figma, from the first sketch and wireframes through to high-fidelity screens, design systems and clickable prototypes.
              </p>
              <p>
                What I enjoy most is the structural part of the work: understanding the real problem, turning it into flows and information architecture, and then building a token-based system so every screen after the first is faster and more consistent. I care about the handoff as much as the pixels: organised layers, auto layout, documented states and responsive rules that developers can actually use.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/work" icon="arrowRight">
                See the work
              </Button>
              <Button href="/contact" variant="secondary" icon="arrowUpRight">
                Get in touch
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:pt-10">
            <dl className="surface-card grid grid-cols-2 gap-x-6 gap-y-6 p-6 md:p-8">
              {[
                { k: "Based in", v: "Pakistan" },
                { k: "Working with", v: "Clients worldwide, remote" },
                { k: "Focus", v: "Mobile apps, web apps, dashboards, design systems" },
                { k: "Primary tool", v: "Figma" },
                { k: "Availability", v: site.availability },
                { k: "Languages", v: "English, Urdu" },
              ].map((r) => (
                <div key={r.k}>
                  <dt className="eyebrow">{r.k}</dt>
                  <dd className="mt-1.5 text-[0.9375rem] text-ink">{r.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-t border-border bg-surface/40 py-[var(--section)]" aria-labelledby="philosophy-title">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Design philosophy" title={<span id="philosophy-title">Four principles behind every decision.</span>} />
          </Reveal>
          <RevealGroup as="ol" className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {philosophy.map((p, i) => (
              <RevealItem key={p.title} as="li" className="surface-card flex flex-col gap-4 p-6">
                <span className="font-display text-[2.5rem] leading-none text-accent-text">0{i + 1}</span>
                <h3 className="text-h4 font-medium text-ink">{p.title}</h3>
                <p className="text-small text-text-2">{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Process */}
      <section className="py-[var(--section)]" aria-labelledby="process-page-title">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Design process" title={<span id="process-page-title">Research → Define → Ideate → Wireframe → Design → Prototype → Test</span>} description="Select a step to see what it involves and why it comes where it does." />
          </Reveal>
          <Reveal className="mt-12">
            <ProcessInteractive />
          </Reveal>
        </div>
      </section>

      {/* Skills & tools */}
      <section className="border-t border-border bg-surface/40 py-[var(--section)]" aria-labelledby="skills-title">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <Reveal>
              <SectionHeading eyebrow="Skills" title={<span id="skills-title">What I do</span>} />
            </Reveal>
            <RevealGroup as="ul" className="mt-8 flex flex-wrap gap-2" stagger={0.03}>
              {skills.design.map((s) => (
                <RevealItem key={s} as="li" y={8}>
                  <Chip>{s}</Chip>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal className="mt-12">
              <p className="eyebrow">Professional interests</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {skills.interests.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-[0.9375rem] text-text-2">
                    <Icon name="spark" size={14} className="text-accent-text" />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <SectionHeading eyebrow="Tools" title="What I use" />
            </Reveal>
            <RevealGroup as="ul" className="mt-8 grid gap-3 sm:grid-cols-2" stagger={0.06}>
              {skills.tools.map((t) => (
                <RevealItem key={t.name} as="li" className="group surface-card flex items-center gap-4 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0">
                  <span className="grid size-12 shrink-0 place-items-center rounded-[var(--radius-md)] bg-ink font-mono text-[0.8125rem] font-medium text-bg transition-colors group-hover:bg-accent group-hover:text-accent-ink">{t.mark}</span>
                  <div className="min-w-0">
                    <p className="text-[0.9375rem] font-medium text-ink">{t.name}</p>
                    <p className="mt-0.5 text-small text-muted">{t.note}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <ContactCTA />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about/" }])} />
    </Page>
  );
}
