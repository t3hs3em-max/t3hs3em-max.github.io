export const CATEGORIES = ["All", "Mobile", "Web", "UI Design", "UX Design", "Product Design"] as const;
export type Category = (typeof CATEGORIES)[number];
export type ProjectCategory = Exclude<Category, "All">;

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** Used to choose the device frame the image is shown in. */
  frame?: "phone" | "browser" | "none";
}

export interface PersonaProfile {
  name: string;
  descriptor: string; // "Salon owner · 38 · Dubai"
  quote: string;
  goals: string[];
  frustrations: string[];
  behaviours: string[];
  /** Explains provenance, e.g. "Proto-persona based on product walkthrough, not interviews." */
  basis: string;
}

export interface JourneyStage {
  stage: string;
  doing: string;
  thinking: string;
  /** 1 (frustrated) – 5 (delighted) */
  feeling: 1 | 2 | 3 | 4 | 5;
  opportunity: string;
}

export interface IANode {
  label: string;
  children?: IANode[];
  note?: string;
}

export interface FlowNode {
  id: string;
  label: string;
  kind: "start" | "step" | "decision" | "end";
}
export interface FlowEdge {
  from: string;
  to: string;
  label?: string;
}

export interface DesignSystemSpec {
  colors: { name: string; hex: string; role: string }[];
  type: { name: string; family: string; size: string; weight: string; sample: string }[];
  radius: { name: string; value: string }[];
  spacing?: string;
  notes?: string[];
  /** Tailwind-free inline theme used to render live component samples. */
  theme: { primary: string; primaryInk: string; surface: string; bg: string; text: string; muted: string; border: string; radius: string; font: string };
}

export interface Outcome {
  measured: boolean;
  headline: string;
  items: string[];
  note: string;
}

export type ContentStatus = "documented" | "partial" | "placeholder";

export interface Project {
  slug: string;
  title: string;
  shortTitle?: string;
  tagline: string;
  categories: ProjectCategory[];
  type: string;
  platform: string;
  role: string;
  tools: string[];
  timeline: string;
  year: string;
  client: string;
  status: "Client project" | "Concept redesign" | "Concept project";
  featured: boolean;
  order: number;
  /** Project accent used for hero tints and card hover. */
  accent: string;
  accentSoft: string;
  cover: ProjectImage;
  screens: ProjectImage[];
  wireframes: ProjectImage[];
  /** Optional before/after pairs shown with a compare slider. */
  iterations?: { title: string; note: string; before: ProjectImage; after: ProjectImage; beforeLabel?: string; afterLabel?: string }[];
  /** Optional links to the source files (Figma etc.). */
  links?: { label: string; href: string }[];
  overview: string;
  problem: string[];
  research: {
    methods: string[];
    assumptions: string[];
    competitive: string[];
    findings: string[];
  } | null;
  persona: PersonaProfile | null;
  journey: JourneyStage[] | null;
  ia: IANode | null;
  flow: { title: string; nodes: FlowNode[]; edges: FlowEdge[] } | null;
  designSystem: DesignSystemSpec | null;
  solution: string[];
  outcome: Outcome;
  contentStatus: ContentStatus;
  seoDescription: string;
}
