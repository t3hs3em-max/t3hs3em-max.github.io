import type { ProjectImage } from "./types";
import { projects } from "./projects";

/**
 * Standalone screens shown in the gallery on /work. By default this pulls
 * the first two screens of every project; add extra one-off explorations
 * (single screens, splash variants, experiments) to `extras`.
 */
const extras: ProjectImage[] = [
  { src: "/projects/shots/r-orange-bar", alt: "Orange Bar juice promo screen, refreshed: Orange Bar title, a glass of orange juice with an orange splash, and a frosted bar with Orange juice, 500 ml and a Drink now button", width: 720, height: 1600, frame: "phone", caption: "Orange Bar — juice promo screen, September 2026 refresh" },
  { src: "/projects/shots/r-branding-welcome", alt: "Local B. welcome screen, refreshed: purple header with the logo, “Welcome to the future of branding”, two feature rows and a Get started button", width: 780, height: 1688, frame: "phone", caption: "Local B. — onboarding: welcome (refresh)" },
  { src: "/projects/shots/r-branding-login", alt: "Local B. log in or create an account screen, refreshed, with Google and Apple sign-in", width: 780, height: 1688, frame: "phone", caption: "Local B. — onboarding: log in or sign up (refresh)" },
  { src: "/projects/shots/r-branding-signup", alt: "Local B. sign-up form, refreshed, with labelled fields, a password rule and a terms checkbox", width: 780, height: 1688, frame: "phone", caption: "Local B. — onboarding: create account (refresh)" },
  { src: "/projects/shots/orange-bar", alt: "Orange Bar juice ordering app as originally designed: a single bold orange screen with the words drink now", width: 720, height: 1600, frame: "phone", caption: "Orange Bar — original screen" },
  { src: "/projects/shots/branding-welcome", alt: "Local B. welcome screen as originally designed", width: 780, height: 1688, frame: "phone", caption: "Local B. — original welcome screen" },
];

export const shots: ProjectImage[] = [
  ...projects.flatMap((p) => p.screens.slice(0, 2).map((s) => ({ ...s, caption: `${p.title} — ${s.caption ?? s.alt}` }))),
  ...extras,
];
