import type { PersonaProfile } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { Note } from "@/components/ui/Primitives";
import { readableOn } from "@/lib/utils";

function initials(name: string) {
  return name
    .replace(/^The\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function PersonaCard({ persona, accent }: { persona: PersonaProfile; accent: string }) {
  return (
    <div className="surface-card overflow-hidden">
      <div className="flex flex-col gap-8 p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
          <div className="flex items-center gap-4 md:min-w-[280px]">
            <span className="grid size-16 shrink-0 place-items-center rounded-full text-[1.125rem] font-semibold" style={{ background: accent, color: readableOn(accent) }} aria-hidden>
              {initials(persona.name)}
            </span>
            <div>
              <h3 className="text-h4 font-medium text-ink">{persona.name}</h3>
              <p className="mt-1 text-small text-muted">{persona.descriptor}</p>
            </div>
          </div>
          <blockquote className="relative pl-6 text-[1.0625rem] leading-snug text-text-2 md:border-l md:border-border md:pl-8">
            <Icon name="quote" size={16} className="absolute left-0 top-1 text-faint md:left-3" />
            <span className="font-display-italic text-[1.2em] text-ink">“{persona.quote}”</span>
          </blockquote>
        </div>
        <div className="grid gap-6 border-t border-border pt-6 sm:grid-cols-3">
          {[
            { title: "Goals", items: persona.goals, tone: "text-success" },
            { title: "Frustrations", items: persona.frustrations, tone: "text-danger" },
            { title: "Behaviours", items: persona.behaviours, tone: "text-accent-text" },
          ].map((g) => (
            <div key={g.title}>
              <p className={`eyebrow ${g.tone}`}>{g.title}</p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {g.items.map((it) => (
                  <li key={it} className="flex gap-2.5 text-small text-text-2">
                    <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-border-strong" aria-hidden />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border bg-surface-2/60 px-6 py-3 md:px-8">
        <Note className="border-0 bg-transparent px-0 py-0">
          <strong className="font-medium text-ink">Basis: </strong>
          {persona.basis}
        </Note>
      </div>
    </div>
  );
}
