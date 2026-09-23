"use client";

import { useEffect, useState } from "react";
import type { SectionDef } from "./Section";
import { cn } from "@/lib/utils";

/** "On this page" navigation with scroll-spy. Horizontal chips on mobile. */
export function CaseToc({ sections }: { sections: SectionDef[] }) {
  const [current, setCurrent] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setCurrent(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav aria-label="On this page" className="sticky top-[var(--header-h)] z-30 -mx-[var(--gutter)] border-b border-border bg-bg/85 backdrop-blur-lg lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:backdrop-blur-none">
      <ol className="flex gap-1 overflow-x-auto px-[var(--gutter)] py-2 [scrollbar-width:none] lg:flex-col lg:gap-0.5 lg:px-0 lg:py-0 [&::-webkit-scrollbar]:hidden">
        {sections.map((s, i) => {
          const on = current === s.id;
          return (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-full px-3 py-1.5 text-[0.8125rem] transition-colors lg:rounded-md lg:px-2",
                  on ? "bg-ink text-bg lg:bg-surface-2 lg:text-ink" : "text-muted hover:text-ink",
                )}
              >
                <span className="font-mono text-[0.625rem]">{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
