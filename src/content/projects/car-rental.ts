import type { Project } from "../types";

/**
 * Car Rental Website — home page UI for clients in the United States and
 * Germany. One 1440×2965 desktop frame exported from the Figma file
 * "All designs" (Desktop - 1). Copy, colours and type are read from the file.
 */
export const carRental: Project = {
  slug: "car-rental-website",
  title: "Car Rental Website",
  tagline: "A luxury car-rental home page built around one job: choose a location, pick dates, request the car.",
  categories: ["Web", "UX Design", "UI Design"],
  type: "Website · Home page",
  platform: "Web · desktop 1440",
  role: "UX research, sketching, wireframes, UI design, custom assets",
  tools: ["Figma"],
  timeline: "[Timeline]",
  year: "2025",
  client: "Clients based in the United States and Germany (names withheld)",
  status: "Client project",
  featured: false,
  order: 6,
  accent: "#E8890A",
  accentSoft: "#2A2118",
  cover: {
    src: "/projects/car-rental-website/cover",
    alt: "Car rental website home page hero shown in a browser window: Be a luxury header, request form and three black cars",
    width: 1600,
    height: 1200,
  },
  screens: [
    { src: "/projects/car-rental-website/home-top", alt: "Home page hero: navigation, headline “Need a Car On Rent? You Choose, We Deliver” and a booking request panel with location, from, to and time", width: 2160, height: 1350, frame: "browser", caption: "Hero — the booking request sits inside the first screen" },
    { src: "/projects/car-rental-website/home-full", alt: "Full-length home page: hero with request form and three black cars, customer support, services with brand logos (Aston Martin, Ford, BMW, McLaren, Mercedes-Benz) and service promises", width: 2160, height: 4448, frame: "browser", caption: "Full page — hero, support, services, promises" },
  ],
  wireframes: [],
  overview:
    "Home page UI design for a car rental service, for clients based in the United States and Germany. I ran UX research and sketching to define the booking journey (search, vehicle selection, pricing, call to action), produced wireframes, then a high-fidelity visual design with custom assets that keeps the page clear and conversion-focused.",
  problem: [
    "A rental home page has to do two things at once: sell the fleet (luxury brands, comfort, reliability) and get the visitor into a booking request without friction. Many pages do the first and hide the second below the fold.",
  ],
  research: {
    methods: ["UX research and sketching to define the booking journey before layout.", "Wireframes of the full page prior to visual design (not included in this export)."],
    assumptions: ["Visitors decide on a rental company within the first screen, so the request form must be visible immediately (design assumption)."],
    competitive: ["[Competitive analysis] Add the rental sites that were reviewed and the takeaways."],
    findings: [
      "The request panel (location, from, to, time) belongs in the hero, next to the headline, not on a separate page.",
      "Brand marques and the hero imagery do the persuading; the service promises (no delays, quality, support, selection) close the page.",
    ],
  },
  persona: null,
  journey: [
    { stage: "Land", doing: "Reads the headline and sees the fleet", thinking: "Is this the level of car I want?", feeling: 4, opportunity: "Luxury brands and a bold “Be a luxury” statement in the first screen." },
    { stage: "Request", doing: "Fills location, dates and time", thinking: "How quickly can I get one?", feeling: 3, opportunity: "Request panel inside the hero with four fields and one button." },
    { stage: "Reassure", doing: "Scrolls the vehicle and service sections", thinking: "Will they deliver on time?", feeling: 4, opportunity: "Service promises: no delays, high quality, premium support, diverse selection." },
    { stage: "Contact", doing: "Uses the contact section", thinking: "I have a question first.", feeling: 4, opportunity: "Customer support details and a send form at the end of the page." },
  ],
  ia: {
    label: "Home page",
    children: [
      { label: "Header", children: [{ label: "Home · Rent · Vehicle · Blog · Shop" }, { label: "Phone numbers · locations" }] },
      { label: "Hero", children: [{ label: "Headline" }, { label: "Request here: location, from, to, time" }] },
      { label: "Services", children: [{ label: "Aston Martin · Ford · BMW · McLaren · Mercedes-Benz" }, { label: "Customer support" }] },
      { label: "Why us", children: [{ label: "No delays · High quality · Premium support · Diverse selection" }] },
      { label: "Finest transport", children: [{ label: "Ride to destinations with maximum comfort" }] },
    ],
  },
  flow: {
    title: "From landing to a rental request",
    nodes: [
      { id: "start", label: "Lands on the hero", kind: "start" },
      { id: "ready", label: "Ready to request?", kind: "decision" },
      { id: "form", label: "Choose location, from, to, time", kind: "step" },
      { id: "scroll", label: "Browse fleet and service promises", kind: "step" },
      { id: "send", label: "Request / Send", kind: "step" },
      { id: "end", label: "Request received", kind: "end" },
    ],
    edges: [
      { from: "start", to: "ready" },
      { from: "ready", to: "form", label: "Yes" },
      { from: "ready", to: "scroll", label: "Not yet" },
      { from: "scroll", to: "form" },
      { from: "form", to: "send" },
      { from: "send", to: "end" },
    ],
  },
  prototype: { note: "Static home page design; no interactive prototype was part of this delivery." },
  links: [{ label: "Figma file — All designs", href: "https://www.figma.com/design/xhOm00zrgeOXTOny4Kf430/All-designs" }],
  designSystem: {
    colors: [
      { name: "Black", hex: "#0A0A0A", role: "Canvas" },
      { name: "White", hex: "#FFFFFF", role: "Headlines, navigation" },
      { name: "Silver", hex: "#B5B5B5", role: "Secondary text, dividers" },
      { name: "Amber", hex: "#E8890A", role: "Customer support, highlights" },
      { name: "Bronze", hex: "#A75F0A", role: "Subtle accents" },
    ],
    type: [
      { name: "Display", family: "Homenaje", size: "60 / 64", weight: "400", sample: "BE A LUXURY" },
      { name: "Headline", family: "Homenaje", size: "50–55 / 58", weight: "400", sample: "Need a Car On Rent? You Choose, We Deliver" },
      { name: "Section", family: "Homenaje", size: "35 / 40", weight: "400", sample: "FINEST TRANSPORT" },
      { name: "Body", family: "Homenaje / Inter", size: "25–28 / 34", weight: "400", sample: "Ride To Destinations With Maximum Comfort" },
      { name: "Label", family: "Inter", size: "22 / 28", weight: "500", sample: "CHOOSE LOCATION" },
    ],
    radius: [
      { name: "Panel", value: "8px" },
      { name: "Button", value: "4px" },
    ],
    notes: ["Colour and type values are read from the Figma file. The condensed display face (Homenaje) carries the automotive, uppercase voice; Inter is used for form labels."],
    theme: { primary: "#E8890A", primaryInk: "#0A0A0A", surface: "#161616", bg: "#0A0A0A", text: "#FFFFFF", muted: "#B5B5B5", border: "#2A2A2A", radius: "6px", font: "inherit" },
  },
  solution: [
    "The hero pairs a confident headline with the booking request panel (location, from, to, time), so the primary action is available before any scrolling.",
    "A statement (“What we provide is the luxury transport and most comfortable experience”), a customer-support line and a row of luxury marques do the persuading; four service promises answer the usual objections at the end.",
    "A black canvas with white type, silver rules and a single amber accent gives the page an automotive, premium tone; the condensed uppercase display face and the three black cars do the rest.",
  ],
  outcome: {
    measured: false,
    headline: "A modern, conversion-focused home page design delivered ready for development.",
    items: ["Full-length desktop home page", "Booking request panel and section components", "Custom assets per section"],
    note: "No traffic or conversion data is available for this project.",
  },
  contentStatus: "partial",
  seoDescription: "Web UI/UX case study: a luxury car rental home page with an in-hero booking request, fleet showcase and service promises, designed in Figma.",
};
