/**
 * Site-wide content. Edit this file to change your name, links and copy.
 * Anything wrapped in [square brackets] is a placeholder waiting for real info.
 */
export const site = {
  name: "Tehseem Khan",
  fullName: "Muhammad Tehseem Khan",
  firstName: "Tehseem",
  role: "UI/UX Designer",
  roles: ["UI/UX Designer", "Product Designer", "Creative Problem Solver"],
  tagline: "UI/UX Designer creating simple and meaningful digital experiences.",
  location: "Pakistan · working with clients worldwide",
  /** Set NEXT_PUBLIC_SITE_URL in production (e.g. https://yourdomain.com). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  email: "rt326k@gmail.com",
  phone: "+92 336 5373 122",
  phoneHref: "tel:+923365373122",
  availability: "Available for freelance and full-time roles",
  description:
    "Portfolio of Tehseem Khan, a UI/UX and product designer who designs mobile apps, web apps and design systems in Figma. Case studies covering research, wireframes, UI design and prototypes.",
  keywords: [
    "UI/UX Designer",
    "UI UX Designer Portfolio",
    "Product Designer",
    "User Experience Designer",
    "User Interface Designer",
    "Mobile App UI UX Designer",
    "Web Designer",
    "UX Case Studies",
    "Figma Designer",
    "Design Systems",
  ],
  social: [
    { label: "LinkedIn", handle: "in/t3hs3em", href: "https://www.linkedin.com/in/t3hs3em" },
    { label: "Fiverr", handle: "prime_pikachu", href: "https://www.fiverr.com/prime_pikachu" },
  ],
  /**
   * Optional contact-form endpoint (Formspree, Web3Forms, Basin…). When empty
   * the form falls back to opening the visitor's email client with the
   * message pre-filled, so the site works with zero back-end setup.
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const processSteps = [
  {
    step: "Research",
    summary: "Understand the people, the business and the constraints before touching pixels.",
    detail:
      "Stakeholder conversations, product walkthroughs, heuristic reviews and competitor scans. The goal is a clear, shared picture of the real problem.",
  },
  {
    step: "Define",
    summary: "Turn findings into a problem statement, personas and success criteria.",
    detail:
      "Who are we designing for, what are they trying to do, and how will we know the design works? Everything downstream is measured against this.",
  },
  {
    step: "Ideate",
    summary: "Explore several directions quickly; sketches, flows and information architecture.",
    detail:
      "Low cost, high volume. User flows and IA diagrams settle the structure so the visual layer can focus on clarity.",
  },
  {
    step: "Wireframe",
    summary: "Low-fidelity layouts that settle hierarchy, content and interaction patterns.",
    detail:
      "Greyscale screens in Figma that can be tested and changed cheaply before any visual polish is applied.",
  },
  {
    step: "Design",
    summary: "High-fidelity UI built on a token-based design system.",
    detail:
      "Colour, type, spacing and radius live as variables; components use auto layout and variants so screens stay consistent and easy to hand off.",
  },
  {
    step: "Prototype",
    summary: "Clickable prototypes that show real motion, states and edge cases.",
    detail:
      "Hover, focus, loading, error and empty states are prototyped, not just described, so developers and stakeholders see the same thing.",
  },
  {
    step: "Test",
    summary: "Put the design in front of people, learn, and iterate.",
    detail:
      "Walkthroughs and usability checks feed back into the flows and components. Outcomes are only reported when they were actually measured.",
  },
] as const;

export const philosophy = [
  {
    title: "Clarity over decoration",
    body: "Every element earns its place. If it does not help someone understand or act, it goes.",
  },
  {
    title: "Systems, not screens",
    body: "Tokens, components and variants keep products consistent long after the first release ships.",
  },
  {
    title: "Honest outcomes",
    body: "Design decisions are explained, assumptions are labelled, and results are reported only when measured.",
  },
  {
    title: "Built to be built",
    body: "Files are organised for developers: auto layout, named layers, documented states and responsive rules.",
  },
] as const;

export const skills = {
  design: [
    "UI Design",
    "UX Design",
    "Product Design",
    "Mobile App Design (iOS & Android)",
    "Web App & Dashboard Design",
    "Design Systems & Tokens",
    "Wireframing",
    "Interactive Prototyping",
    "User Flows & IA",
    "Heuristic Evaluation",
    "Responsive Design",
    "Developer Handoff",
  ],
  tools: [
    { name: "Figma", note: "Primary tool · auto layout, variants, variables, prototyping", mark: "Fg" },
    { name: "Adobe XD", note: "Wireframes and UI for earlier client work", mark: "Xd" },
    { name: "Adobe Photoshop", note: "Custom assets, retouching, presentation mockups", mark: "Ps" },
    { name: "Adobe Illustrator", note: "Icons and vector illustration", mark: "Ai" },
    { name: "Canva Pro", note: "Presentation mockups and quick marketing visuals", mark: "Cv" },
    { name: "HTML & CSS", note: "Working knowledge for realistic handoff and prototypes", mark: "</>" },
  ],
  interests: [
    "Design systems and tokens",
    "AI-assisted product design",
    "Dashboards and data-heavy interfaces",
    "Travel & booking products",
    "Accessible, inclusive interfaces",
  ],
} as const;
