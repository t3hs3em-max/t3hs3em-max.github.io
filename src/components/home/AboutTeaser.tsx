import { philosophy, site, skills } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Chip, Em, SectionHeading } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function AboutTeaser() {
  return (
    <section className="section-y" aria-labelledby="about-teaser-title">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal>
          <SectionHeading
            eyebrow="03 — About"
            title={
              <span id="about-teaser-title">
                Designer first, <Em>systems</Em> thinker always.
              </span>
            }
          />
          <div className="prose-case mt-6">
            <p>
              I&apos;m {site.fullName}, a UI/UX and product designer based in Pakistan working with clients worldwide. I design mobile apps, web apps and dashboards in Figma, and I care as much about the structure underneath (flows, tokens, components) as the screens on top.
            </p>
            <p>
              Most of my work starts with a rough idea or an existing product and ends with organised, developer-ready files and a prototype that shows how it should feel.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {skills.tools.slice(0, 5).map((t) => (
              <Chip key={t.name}>
                <span className="font-mono text-[0.6875rem] text-muted">{t.mark}</span>
                {t.name}
              </Chip>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/about" variant="secondary" icon="arrowRight">
              More about me
            </Button>
          </div>
        </Reveal>

        <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
          {philosophy.map((p, i) => (
            <RevealItem key={p.title} as="li" className="surface-card flex flex-col gap-3 p-6">
              <span className="font-mono text-[0.75rem] text-muted">0{i + 1}</span>
              <h3 className="text-h4 font-medium text-ink">{p.title}</h3>
              <p className="text-small text-text-2">{p.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
