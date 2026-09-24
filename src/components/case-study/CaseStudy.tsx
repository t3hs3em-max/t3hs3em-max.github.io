import Link from "next/link";
import type { Route } from "next";
import type { Project } from "@/content/types";
import { getAdjacentProjects } from "@/content/projects";
import { CaseHero } from "./CaseHero";
import { CaseSection, type SectionDef } from "./Section";
import { CaseToc } from "./CaseToc";
import { PersonaCard } from "./Persona";
import { JourneyMap } from "./Journey";
import { IATree } from "./IATree";
import { UserFlow } from "./UserFlow";
import { Compare } from "./Compare";
import { DesignSystemSection } from "./DesignSystem";
import { ImageGallery } from "@/components/work/ImageGallery";
import { Picture } from "@/components/ui/Picture";
import { Icon } from "@/components/ui/Icon";
import { Note, Placeholder, Tag } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { ContactCTA } from "@/components/home/ContactCTA";

export function CaseStudy({ project: p }: { project: Project }) {
  const { prev, next } = getAdjacentProjects(p.slug);

  const sections: SectionDef[] = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "research", label: "Research" },
    { id: "persona", label: "Persona" },
    { id: "journey", label: "User journey" },
    { id: "architecture", label: "Information architecture" },
    { id: "flow", label: "User flow" },
    { id: "wireframes", label: "Wireframes" },
    { id: "ui", label: "UI design" },
    ...(p.iterations?.length ? [{ id: "iterations", label: "Iterations" }] : []),
    { id: "design-system", label: "Design system" },
    { id: "solution", label: "Final solution" },
    { id: "outcome", label: "Outcome" },
  ];
  const num = (id: string) => String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");

  return (
    <article>
      <CaseHero project={p} />

      <div className="container-x mt-12 grid grid-cols-[minmax(0,1fr)] gap-10 lg:mt-20 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
        <aside className="min-w-0 overflow-x-clip lg:sticky lg:top-28 lg:self-start lg:overflow-visible">
          <p className="eyebrow mb-3 hidden lg:block">On this page</p>
          <CaseToc sections={sections} />
        </aside>

        <div className="min-w-0">
          {/* 01 Overview */}
          <section id="overview" aria-labelledby="overview-title" className="scroll-mt-28 pb-14 md:pb-20">
            <Reveal>
              <p className="eyebrow">{num("overview")} — Project overview</p>
              <h2 id="overview-title" className="mt-3 text-h3 font-medium tracking-tight text-ink">
                What this project is
              </h2>
              <div className="prose-case mt-6">
                <p>{p.overview}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.links?.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-surface px-4 text-small text-text-2 transition-colors hover:border-border-strong hover:text-ink">
                    {l.label}
                    <Icon name="arrowUpRight" size={14} />
                  </a>
                ))}
                {p.contentStatus !== "documented" && <Tag tone="warning">Some sections are marked as assumptions or pending</Tag>}
              </div>
            </Reveal>
          </section>

          {/* 02 Problem */}
          <CaseSection id="problem" number={`${num("problem")} — Problem statement`} title="What wasn't working">
            <Reveal className="prose-case">
              {p.problem.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </Reveal>
          </CaseSection>

          {/* 03 Research */}
          <CaseSection id="research" number={`${num("research")} — Research`} title="What I learned before designing">
            {p.research ? (
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { title: "User research & methods", items: p.research.methods, icon: "search" as const },
                  { title: "Assumptions (labelled)", items: p.research.assumptions, icon: "info" as const },
                  { title: "Competitive analysis", items: p.research.competitive, icon: "layers" as const },
                  { title: "Key findings", items: p.research.findings, icon: "spark" as const },
                ].map((g, i) => (
                  <Reveal key={g.title} delay={i * 0.05} className="surface-card p-6">
                    <div className="flex items-center gap-2.5">
                      <span className="grid size-8 place-items-center rounded-full bg-surface-2 text-text-2">
                        <Icon name={g.icon} size={16} />
                      </span>
                      <h3 className="text-[0.9375rem] font-medium text-ink">{g.title}</h3>
                    </div>
                    <ul className="mt-4 flex flex-col gap-3">
                      {g.items.map((it) => (
                        <li key={it} className={`flex gap-3 text-small leading-relaxed ${it.startsWith("[") ? "text-muted" : "text-text-2"}`}>
                          <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-border-strong" aria-hidden />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
            ) : (
              <Placeholder title="[Research] No formal research is documented for this project.">Add methods, assumptions, competitive notes and findings in the project&apos;s content file to fill this section.</Placeholder>
            )}
          </CaseSection>

          {/* 04 Persona */}
          <CaseSection id="persona" number={`${num("persona")} — User persona`} title="Who I designed for">
            {p.persona ? <Reveal><PersonaCard persona={p.persona} accent={p.accent} /></Reveal> : <Placeholder title="[Persona] A persona has not been documented for this project." />}
          </CaseSection>

          {/* 05 Journey */}
          <CaseSection id="journey" number={`${num("journey")} — User journey`} title="The journey, stage by stage" wide>
            {p.journey ? (
              <Reveal>
                <JourneyMap stages={p.journey} accent={p.accent} />
                <Note className="mt-4">Emotion levels are design assumptions unless the project notes say otherwise; they show where the experience is expected to dip and where the design intervenes.</Note>
              </Reveal>
            ) : (
              <Placeholder title="[User journey] Not documented for this project." />
            )}
          </CaseSection>

          {/* 06 IA */}
          <CaseSection id="architecture" number={`${num("architecture")} — Information architecture`} title="How the product is organised" wide>
            {p.ia ? <Reveal><IATree root={p.ia} accent={p.accent} /></Reveal> : <Placeholder title="[Information architecture] Not documented for this project." />}
          </CaseSection>

          {/* 07 Flow */}
          <CaseSection id="flow" number={`${num("flow")} — User flow`} title={p.flow?.title ?? "Key user flow"} wide>
            {p.flow ? <Reveal><UserFlow nodes={p.flow.nodes} edges={p.flow.edges} accent={p.accent} /></Reveal> : <Placeholder title="[User flow] Not documented for this project." />}
          </CaseSection>

          {/* 08 Wireframes */}
          <CaseSection id="wireframes" number={`${num("wireframes")} — Wireframes`} title="Low-fidelity first" wide>
            {p.wireframes.length ? (
              <ImageGallery images={p.wireframes} />
            ) : (
              <Placeholder title="[Wireframes] Low-fidelity screens for this project are not included yet.">Export the wireframe frames from Figma into public/projects/{p.slug}/ and list them under `wireframes` in the content file.</Placeholder>
            )}
          </CaseSection>

          {/* 09 UI */}
          <CaseSection id="ui" number={`${num("ui")} — UI design`} title="The final interface" wide>
            <ImageGallery images={p.screens} />
          </CaseSection>

          {/* Iterations */}
          {p.iterations?.length ? (
            <CaseSection id="iterations" number={`${num("iterations")} — Iterations`} title="What changed between versions" wide>
              <div className="grid gap-10 lg:grid-cols-2">
                {p.iterations.map((it) => (
                  <Reveal key={it.title} className="flex flex-col gap-4">
                    <Compare before={it.before} after={it.after} beforeLabel={it.beforeLabel} afterLabel={it.afterLabel} />
                    <div>
                      <h3 className="text-[0.9375rem] font-medium text-ink">{it.title}</h3>
                      <p className="mt-1.5 text-small text-text-2">{it.note}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </CaseSection>
          ) : null}

          {/* Design system */}
          <CaseSection id="design-system" number={`${num("design-system")} — Design system`} title="Tokens and components" wide>
            {p.designSystem ? <Reveal><DesignSystemSection ds={p.designSystem} /></Reveal> : <Placeholder title="[Design system] Not documented for this project." />}
          </CaseSection>

          {/* Solution */}
          <CaseSection id="solution" number={`${num("solution")} — Final solution`} title="How the design answers the problem">
            <Reveal className="prose-case">
              {p.solution.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </Reveal>
          </CaseSection>

          {/* Outcome */}
          <CaseSection id="outcome" number={`${num("outcome")} — Outcome`} title={p.outcome.measured ? "What the results were" : "What was delivered"}>
            <Reveal className="surface-card p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <Tag tone={p.outcome.measured ? "success" : "neutral"}>{p.outcome.measured ? "Measured results" : "Not yet measured"}</Tag>
              </div>
              <p className="mt-4 text-lead text-ink">{p.outcome.headline}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {p.outcome.items.map((it) => (
                  <li key={it} className="flex gap-3 rounded-[var(--radius-md)] bg-surface-2/70 px-4 py-3 text-small text-text-2">
                    <Icon name="check" size={16} className="mt-0.5 shrink-0 text-success" />
                    {it}
                  </li>
                ))}
              </ul>
              <Note className="mt-6" tone="accent">
                {p.outcome.note}
              </Note>
            </Reveal>
          </CaseSection>
        </div>
      </div>

      {/* Prev / next */}
      <nav aria-label="More projects" className="container-x mt-6 grid grid-cols-[minmax(0,1fr)] gap-4 border-t border-border pt-10 md:grid-cols-2 md:pt-14">
        {[
          { label: "Previous project", proj: prev, dir: "prev" as const },
          { label: "Next project", proj: next, dir: "next" as const },
        ].map(({ label, proj, dir }) => (
          <Link
            key={dir}
            href={`/work/${proj.slug}` as Route}
            transitionTypes={[dir === "next" ? "nav-forward" : "nav-back"]}
            className={`group surface-card flex min-w-0 items-center gap-5 p-4 transition-colors hover:border-border-strong ${dir === "next" ? "md:flex-row-reverse md:text-right" : ""}`}
          >
            <div className="h-20 w-28 shrink-0 overflow-hidden rounded-[var(--radius-md)]" style={{ background: proj.accentSoft }}>
              <Picture image={proj.cover} sizes="112px" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="min-w-0">
              <p className="eyebrow flex items-center gap-2">
                {dir === "prev" && <Icon name="arrowLeft" size={12} />}
                {label}
                {dir === "next" && <Icon name="arrowRight" size={12} />}
              </p>
              <p className="mt-1.5 truncate text-h4 font-medium text-ink">{proj.title}</p>
              <p className="mt-0.5 truncate text-small text-muted">{proj.type}</p>
            </div>
          </Link>
        ))}
      </nav>

      <div className="mt-16 md:mt-24">
        <ContactCTA compact />
      </div>
    </article>
  );
}
