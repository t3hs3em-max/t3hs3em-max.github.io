import { processSteps as process } from "@/content/site";
import { Em, SectionHeading } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { pad } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function ProcessStrip() {
  return (
    <section className="section-y border-t border-border bg-surface/40" aria-labelledby="process-title">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="02 — How I work"
            title={
              <span id="process-title">
                A process that keeps <Em>people</Em> at the centre.
              </span>
            }
            description="Seven steps, in the order that reduces risk: understand first, structure second, polish last."
            action={
              <Button href="/about" variant="secondary" icon="arrowRight">
                About me
              </Button>
            }
          />
        </Reveal>

        <RevealGroup as="div" className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-xl)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7" stagger={0.06}>
          {process.map((s, i) => (
            <RevealItem key={s.step} as="div" className="group relative flex min-h-[200px] flex-col gap-5 bg-surface p-5 transition-colors hover:bg-bg xl:min-h-[240px]">
              <span className="font-mono text-[0.75rem] text-muted">{pad(i + 1)}</span>
              <div>
                <h3 className="text-h4 font-medium text-ink">{s.step}</h3>
                <p className="mt-2 text-small text-text-2">{s.summary}</p>
              </div>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-x-100" aria-hidden />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
