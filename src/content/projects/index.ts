import type { Project, ProjectCategory } from "../types";
import { salonControl } from "./salon-control";
import { penWorld } from "./pen-world";
import { moveSmart } from "./movesmart";
import { realEstate } from "./real-estate";
import { inkwellPens } from "./inkwell-pens";
import { carRental } from "./car-rental";

/**
 * To add a project: create `src/content/projects/<slug>.ts`, export a
 * `Project`, import it here and add it to the array. Images live in
 * `public/projects/<slug>/` as `<name>.webp` plus `<name>-800.webp`
 * (run `npm run images` to regenerate from the mockup templates, or drop in
 * your own exports at the same sizes).
 */
export const projects: Project[] = [salonControl, moveSmart, inkwellPens, realEstate, penWorld, carRental].sort(
  (a, b) => a.order - b.order,
);

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  return { prev, next };
}

export function filterProjects(category: ProjectCategory | "All") {
  if (category === "All") return projects;
  return projects.filter((p) => p.categories.includes(category));
}
