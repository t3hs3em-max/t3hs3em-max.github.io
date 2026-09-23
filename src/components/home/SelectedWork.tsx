import { featuredProjects } from "@/content/projects";
import { Button } from "@/components/ui/Button";
import { Em, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/work/ProjectCard";

export function SelectedWork() {
  const [first, ...rest] = featuredProjects;
  return (
    <section id="work" className="section-y scroll-mt-20" aria-labelledby="selected-work-title">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="01 — Selected work"
            title={
              <span id="selected-work-title">
                Case studies with the <Em>thinking</Em> shown.
              </span>
            }
            description="Research, structure, wireframes, final UI and what happened next. Assumptions are labelled; results are only claimed when they were measured."
            action={
              <Button href="/work" variant="secondary" icon="arrowRight">
                All projects
              </Button>
            }
          />
        </Reveal>

        <div className="mt-12 flex flex-col gap-14 md:mt-16 md:gap-20">
          {first && (
            <Reveal>
              <ProjectCard project={first} index={0} priority variant="feature" />
            </Reveal>
          )}
          <div className="grid gap-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <ProjectCard project={p} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
