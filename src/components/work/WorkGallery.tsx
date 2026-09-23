"use client";

import { useMemo, useSyncExternalStore } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { CATEGORIES, type Category, type Project } from "@/content/types";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";
import { easeOut } from "@/lib/motion";

/**
 * Filterable project grid. Filters are real buttons in a `radiogroup`, the
 * URL hash mirrors the selection (shareable, back-button friendly, no page
 * reload), and the grid re-flows with layout animation. A live region
 * announces the result count for screen readers.
 */
/* Tiny external store: the URL hash is the single source of truth for the
   active filter, so the state is shareable and survives back/forward. */
const listeners = new Set<() => void>();
const subscribeHash = (cb: () => void) => {
  listeners.add(cb);
  window.addEventListener("hashchange", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("hashchange", cb);
  };
};
const readHash = () => window.location.hash;
const serverHash = () => "";
const toCategory = (hash: string): Category => {
  const key = decodeURIComponent(hash.replace("#", "")).replace(/-/g, " ").toLowerCase();
  return CATEGORIES.find((c) => c.toLowerCase() === key) ?? "All";
};

export function WorkGallery({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const hash = useSyncExternalStore(subscribeHash, readHash, serverHash);
  const active = toCategory(hash);

  const select = (c: Category) => {
    const next = c === "All" ? "" : `#${c.toLowerCase().replace(/\s+/g, "-")}`;
    history.replaceState(null, "", window.location.pathname + next);
    listeners.forEach((l) => l());
  };

  const visible = useMemo(() => (active === "All" ? projects : projects.filter((p) => p.categories.includes(active))), [active, projects]);

  return (
    <div>
      <div role="radiogroup" aria-label="Filter projects by category" className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <LayoutGroup id="filters">
          {CATEGORIES.map((c) => {
            const on = c === active;
            const count = c === "All" ? projects.length : projects.filter((p) => p.categories.includes(c)).length;
            return (
              <button
                key={c}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => select(c)}
                className={cn(
                  "relative inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-[0.875rem] font-medium transition-colors",
                  on ? "border-transparent text-bg" : "border-border bg-surface text-text-2 hover:border-border-strong hover:text-ink",
                )}
              >
                {on && <motion.span layoutId="filter-pill" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }} className="absolute inset-0 rounded-full bg-ink" aria-hidden />}
                <span className="relative">{c}</span>
                <span className={cn("relative font-mono text-[0.6875rem]", on ? "text-bg/70" : "text-muted")}>{count}</span>
              </button>
            );
          })}
        </LayoutGroup>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "project" : "projects"} shown{active !== "All" ? ` in ${active}` : ""}.
      </p>

      <motion.div layout={!reduce} className="mt-10 grid gap-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p, i) => (
            <motion.div
              key={p.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.97, transition: { duration: 0.18 } }}
              transition={{ duration: 0.4, ease: easeOut, delay: reduce ? 0 : Math.min(i * 0.04, 0.2) }}
            >
              <ProjectCard project={p} index={projects.indexOf(p)} priority={i < 2} headingLevel="h2" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
