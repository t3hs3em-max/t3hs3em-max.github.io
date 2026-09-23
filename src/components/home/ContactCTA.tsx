import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Em } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function ContactCTA({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "pb-[var(--section)]" : "section-y"} aria-labelledby="cta-title">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-ink px-6 py-14 text-bg md:px-14 md:py-20">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-40 blur-3xl" style={{ background: "var(--accent)" }} />
            <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full opacity-25 blur-3xl" style={{ background: "var(--tint-peach)" }} />
          </div>
          <div className="relative grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
            <div>
              <p className="eyebrow !text-bg/60">Have a project in mind?</p>
              <h2 id="cta-title" className="mt-4 text-h1 font-medium tracking-tight !text-bg">
                Let&apos;s create something <Em className="!text-[color:var(--accent-hover)]">meaningful.</Em>
              </h2>
              <p className="mt-5 max-w-lg text-lead text-bg/70">
                Mobile app, web app, dashboard or design system: tell me what you&apos;re building and I&apos;ll suggest a clear next step.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <Button href="/contact" size="lg" variant="accent" icon="arrowRight">
                    Start a conversation
                  </Button>
                </Magnetic>
                <Button href={`mailto:${site.email}`} size="lg" variant="ghost" className="!text-bg hover:!bg-bg/10" icon="mail" iconPosition="left">
                  {site.email}
                </Button>
              </div>
            </div>
            <ul className="flex flex-col gap-3 md:items-end">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-[0.9375rem] text-bg/80 transition-colors hover:text-bg">
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-bg/50">{s.label}</span>
                    {s.handle}
                    <Icon name="arrowUpRight" size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
              <li>
                <a href={site.phoneHref} className="inline-flex items-center gap-2 text-[0.9375rem] text-bg/80 transition-colors hover:text-bg">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-bg/50">Phone</span>
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
