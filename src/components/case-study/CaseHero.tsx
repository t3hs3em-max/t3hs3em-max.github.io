import Link from "next/link";
import { ViewTransition } from "react";
import type { Project } from "@/content/types";
import { Picture } from "@/components/ui/Picture";
import { Icon } from "@/components/ui/Icon";
import { Meta, Tag } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export function CaseHero({ project: p }: { project: Project }) {
  return (
    <header className="pt-[calc(var(--header-h)+2rem)] md:pt-[calc(var(--header-h)+3.5rem)]">
      <div className="container-x">
        <Reveal>
          <Link href="/work" className="group inline-flex items-center gap-2 text-small text-muted transition-colors hover:text-ink" transitionTypes={["nav-back"]}>
            <Icon name="arrowLeft" size={16} className="transition-transform group-hover:-translate-x-0.5" />
            All work
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal delay={0.05}>
            <div className="flex flex-wrap gap-2">
              {p.categories.map((c) => (
                <Tag key={c}>{c}</Tag>
              ))}
              <Tag tone={p.status === "Client project" ? "success" : "warning"}>{p.status}</Tag>
            </div>
            <h1 className="mt-6 text-h1 font-medium tracking-tight text-ink">{p.title}</h1>
            <p className="mt-5 max-w-2xl text-lead text-text-2">{p.tagline}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-6 sm:grid-cols-3 lg:grid-cols-2">
              <Meta label="Role" value={p.role} />
              <Meta label="Timeline" value={p.timeline} />
              <Meta label="Platform" value={p.platform} />
              <Meta label="Tools" value={p.tools.join(", ")} />
              <Meta label="Project type" value={p.type} />
              <Meta label="Client" value={p.client} />
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-12 md:mt-16">
          <div className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-border" style={{ background: `linear-gradient(135deg, ${p.accentSoft}, var(--surface-2))` }}>
            <ViewTransition name={`project-${p.slug}`} share="project-morph" default="none">
              <div className="aspect-[4/3] md:aspect-[3/2]">
                <Picture image={p.cover} priority sizes="(min-width: 1280px) 1200px, 100vw" className="h-full w-full object-cover" />
              </div>
            </ViewTransition>
          </div>
        </Reveal>
      </div>
    </header>
  );
}
