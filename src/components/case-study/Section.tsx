import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export interface SectionDef {
  id: string;
  label: string;
}

/** Every case-study section shares this shell so the rhythm is identical. */
export function CaseSection({ id, number, title, intro, children, className, wide = false }: { id: string; number: string; title: string; intro?: ReactNode; children: ReactNode; className?: string; wide?: boolean }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("scroll-mt-28 border-t border-border py-14 md:py-20", className)}>
      <div className={cn("grid grid-cols-[minmax(0,1fr)] gap-8 lg:gap-16", wide ? "" : "lg:grid-cols-[220px_minmax(0,1fr)]")}>
        <Reveal className={cn(wide && "max-w-3xl")}>
          <p className="eyebrow">{number}</p>
          <h2 id={`${id}-title`} className="mt-3 text-h3 font-medium tracking-tight text-ink lg:sticky lg:top-28">
            {title}
          </h2>
          {intro && <div className="mt-4 text-small text-muted lg:hidden">{intro}</div>}
        </Reveal>
        <div className="min-w-0">
          {intro && <Reveal className="mb-8 hidden text-lead text-text-2 lg:block">{intro}</Reveal>}
          {children}
        </div>
      </div>
    </section>
  );
}
