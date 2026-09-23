"use client";

import Link from "next/link";
import { ViewTransition } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/content/types";
import { Picture } from "@/components/ui/Picture";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Primitives";
import { cn, pad } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index?: number;
  priority?: boolean;
  /** "feature" is the large two-column card used on the home page. */
  variant?: "grid" | "feature";
  /** Heading level so the document outline stays valid wherever the card is used. */
  headingLevel?: "h2" | "h3";
  className?: string;
}

/**
 * Hover choreography (desktop only, ~300ms, one easing):
 *   image scales 1 → 1.03 · a soft overlay fades in · the "View case study"
 *   pill rises · the whole card lifts 4px. Touch devices simply show the
 *   pill statically so the affordance is never hidden.
 */
export function ProjectCard({ project, index = 0, priority = false, variant = "grid", headingLevel: Heading = "h3", className }: ProjectCardProps) {
  const reduce = useReducedMotion();
  const p = project;
  const feature = variant === "feature";

  return (
    <motion.article
      className={cn("group relative", className)}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      data-cursor="View"
    >
      <Link
        href={`/work/${p.slug}`}
        className="block rounded-[var(--radius-xl)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        aria-label={`${p.title}: ${p.tagline} — view case study`}
        transitionTypes={["nav-forward"]}
      >
        <div
          className={cn("relative overflow-hidden rounded-[var(--radius-xl)] border border-border", feature ? "aspect-[16/11]" : "aspect-[4/3]")}
          style={{ background: `linear-gradient(135deg, ${p.accentSoft}, var(--surface-2))` }}
        >
          <ViewTransition name={`project-${p.slug}`} share="project-morph" default="none">
            <div className="absolute inset-0">
              <Picture
                image={p.cover}
                priority={priority}
                sizes={feature ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </div>
          </ViewTransition>

          {/* Overlay + CTA */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none" aria-hidden />
          <span
            className={cn(
              "pointer-events-none absolute bottom-4 left-4 inline-flex h-10 items-center gap-2 rounded-full bg-white/95 px-4 text-[0.8125rem] font-medium text-black shadow-md backdrop-blur",
              "translate-y-2 opacity-0 transition-all duration-500 ease-[var(--ease-out)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100",
              "[@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100 motion-reduce:transition-none",
            )}
          >
            View case study
            <Icon name="arrowUpRight" size={16} />
          </span>

          <span className="absolute right-4 top-4 rounded-full bg-white/85 px-2.5 py-1 font-mono text-[0.6875rem] font-medium tracking-[0.08em] text-black/70 backdrop-blur dark:bg-black/60 dark:text-white/80">
            {pad(index + 1)}
          </span>
        </div>

        <div className={cn("pt-5", feature && "md:grid md:grid-cols-[1fr_auto] md:gap-8")}>
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Heading className={cn("font-medium tracking-tight text-ink", feature ? "text-h3" : "text-[1.25rem]")}>{p.title}</Heading>
              <span className="text-small text-muted">{p.year}</span>
            </div>
            <p className={cn("mt-2 text-text-2", feature ? "max-w-xl text-lead" : "text-[0.9375rem] leading-relaxed")}>{p.tagline}</p>
          </div>
          <dl className={cn("mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-small md:mt-0", feature ? "md:min-w-[260px] md:grid-cols-1 md:gap-y-2.5" : "")}>
            <div>
              <dt className="eyebrow !text-[0.625rem]">Category</dt>
              <dd className="mt-1 text-text">{p.categories.filter((c) => c !== "Mobile" && c !== "Web").join(" · ")}</dd>
            </div>
            <div>
              <dt className="eyebrow !text-[0.625rem]">Platform</dt>
              <dd className="mt-1 text-text">{p.platform.split("·")[0].trim()}</dd>
            </div>
            <div>
              <dt className="eyebrow !text-[0.625rem]">Role</dt>
              <dd className="mt-1 text-text">{p.role.split(",")[0]}</dd>
            </div>
            <div>
              <dt className="eyebrow !text-[0.625rem]">Tools</dt>
              <dd className="mt-1 text-text">{p.tools.slice(0, 2).join(", ")}</dd>
            </div>
          </dl>
        </div>
      </Link>

      <div className="mt-4 flex flex-wrap gap-2">
        {p.categories.slice(0, 3).map((c) => (
          <Tag key={c}>{c}</Tag>
        ))}
        {p.status !== "Client project" && <Tag tone="warning">{p.status}</Tag>}
      </div>
    </motion.article>
  );
}
