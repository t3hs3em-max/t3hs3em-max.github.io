import type { IANode } from "@/content/types";
import { cn, readableOn } from "@/lib/utils";

/**
 * Information architecture as a real nested list (semantic) styled as a
 * tree: root on top, sections in columns, pages below with connector lines.
 */
export function IATree({ root, accent }: { root: IANode; accent: string }) {
  return (
    <div className="overflow-x-auto pb-2" tabIndex={0} role="region" aria-label="Information architecture diagram (scrollable)">
      <div className="inline-flex min-w-full flex-col items-center">
        <div className="rounded-full px-5 py-2.5 text-[0.9375rem] font-medium" style={{ background: accent, color: readableOn(accent) }}>
          {root.label}
        </div>
        <span className="h-8 w-px bg-border-strong" aria-hidden />
        <ul className="relative flex gap-4 before:absolute before:left-[calc(var(--half)+0px)] before:right-[var(--half)] before:top-0 before:h-px before:bg-border-strong" style={{ ["--half" as string]: `calc(100% / ${(root.children?.length ?? 1) * 2})` }}>
          {root.children?.map((sec) => (
            <li key={sec.label} className="flex min-w-[168px] flex-1 flex-col items-center">
              <span className="h-6 w-px bg-border-strong" aria-hidden />
              <div className="w-full rounded-[var(--radius-md)] border border-border bg-surface px-3 py-2.5 text-center text-[0.875rem] font-medium text-ink shadow-xs">{sec.label}</div>
              {sec.children && (
                <ul className="mt-3 flex w-full flex-col gap-2 border-l border-dashed border-border-strong pl-3">
                  {sec.children.map((pg) => (
                    <li key={pg.label} className="relative">
                      <span className="absolute -left-3 top-1/2 h-px w-3 bg-border-strong" aria-hidden />
                      <div className={cn("rounded-[var(--radius-sm)] border border-border bg-bg px-3 py-2 text-[0.8125rem] text-text-2")}>
                        {pg.label}
                        {pg.note && <span className="mt-0.5 block text-[0.6875rem] text-muted">{pg.note}</span>}
                        {pg.children && (
                          <ul className="mt-1.5 flex flex-wrap gap-1">
                            {pg.children.map((c) => (
                              <li key={c.label} className="rounded-full bg-surface-2 px-2 py-0.5 text-[0.6875rem] text-muted">
                                {c.label}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
