import type { ProjectImage } from "./types";
import { projects } from "./projects";

/**
 * Standalone screens shown in the gallery on /work. By default this pulls
 * the first two screens of every project; add extra one-off explorations
 * (single screens, splash variants, experiments) to `extras`.
 */
const extras: ProjectImage[] = [
  { src: "/projects/shots/orange-bar", alt: "Orange Bar juice ordering app: a single bold orange screen with the words drink now", width: 720, height: 1600, frame: "phone", caption: "Orange Bar — single-screen juice ordering concept for a UK client" },
  { src: "/projects/shots/branding-welcome", alt: "Local B. welcome screen: Welcome to the future of branding, with a Get Started button", width: 780, height: 1688, frame: "phone", caption: "Local B. — onboarding exploration: welcome" },
  { src: "/projects/shots/branding-login", alt: "Log in or sign up choice screen in deep purple", width: 780, height: 1688, frame: "phone", caption: "Local B. — onboarding exploration: log in or sign up" },
  { src: "/projects/shots/branding-signup", alt: "Sign up form with name, email and password fields", width: 780, height: 1688, frame: "phone", caption: "Local B. — onboarding exploration: sign up" },
];

export const shots: ProjectImage[] = [
  ...projects.flatMap((p) => p.screens.slice(0, 2).map((s) => ({ ...s, caption: `${p.title} — ${s.caption ?? s.alt}` }))),
  ...extras,
];
