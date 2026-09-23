import type { Project } from "../types";

/**
 * Real Estate App — mobile UI for a repeat client in the UAE on a 1–3 day
 * deadline. Three frames exported from the Figma file "Fiverr project":
 * Home Screen, Listed screen, Property detail (440×956). Copy, colours and
 * type below are read from the file.
 */
const phone = (name: string, alt: string, caption?: string) => ({
  src: `/projects/real-estate-app/${name}`,
  alt,
  width: 880,
  height: 1912,
  frame: "phone" as const,
  caption,
});

export const realEstate: Project = {
  slug: "real-estate-app",
  title: "Real Estate App",
  tagline: "A fresh, photo-led property app for a UAE client, designed and delivered on a one-to-three-day deadline.",
  categories: ["Mobile", "UI Design"],
  type: "Mobile application · Property listings",
  platform: "iOS & Android",
  role: "UI design, component system, flow mapping",
  tools: ["Figma"],
  timeline: "1–3 days",
  year: "2025",
  client: "Repeat client based in the UAE (name withheld)",
  status: "Client project",
  featured: false,
  order: 4,
  accent: "#1A6155",
  accentSoft: "#E2F5DA",
  cover: {
    src: "/projects/real-estate-app/cover",
    alt: "Refreshed real estate app screens on three phones: listings, home and property detail, over a pale green background",
    width: 1600,
    height: 1200,
  },
  screens: [
    phone("r-home", "Refreshed home screen: greeting with location, a serif headline, search with a filter button, category chips, popular places (Dubai, Sharjah, Abu Dhabi) and a featured property card with price, beds, baths and area", "Home — search, places and a featured listing with the facts that matter"),
    phone("r-listed", "Refreshed listings screen: All, For sale and For rent tabs, sort and filter controls, and five property cards with sale or rent badges, area, address and price", "Listings — one card pattern, price always in the same place"),
    phone("r-detail", "Refreshed property detail: photo header with back, share and save buttons, availability badge and rating, title and location, beds, baths and area, description, photo strip, agent card and a sticky Book a viewing bar with the monthly rent", "Detail — facts first, agent one tap away, a sticky booking action"),
  ],
  iterations: [
    {
      title: "Home: delivered version → September 2026 refresh",
      note: "Placeholder text (“User Name Here”, “Description for property available…”) becomes real content, the search gets a clear filter button, category chips are added, and the featured card shows price, beds, baths and area instead of a generic caption.",
      before: phone("home", "Home screen as delivered"),
      after: phone("r-home", "Refreshed home screen"),
      beforeLabel: "Delivered",
      afterLabel: "Refresh",
    },
    {
      title: "Listings: delivered version → refresh",
      note: "The mixed serif and sans lines (“1200 sq feet. AED. 60k”) are split into area and price, price moves to a fixed right-hand position, sale and rent become badges on the photo, and sale/rent tabs plus sort and filters sit above the list.",
      before: phone("listed", "Listings as delivered"),
      after: phone("r-listed", "Refreshed listings"),
      beforeLabel: "Delivered",
      afterLabel: "Refresh",
    },
    {
      title: "Property detail: delivered version → refresh",
      note: "The detail page gains the facts buyers look for first (beds, baths, area, price), a readable left-aligned description, a photo count, and a sticky Book a viewing action; the stray “OR” label is removed.",
      before: phone("detail", "Property detail as delivered"),
      after: phone("r-detail", "Refreshed property detail"),
      beforeLabel: "Delivered",
      afterLabel: "Refresh",
    },
  ],
  wireframes: [],
  overview:
    "A UAE-based repeat client needed a clean mobile UI for a real estate application on a tight one-to-three-day deadline. I mapped the core flow (browse listings, property details, filters, contact the seller), sketched the layout, then designed high-fidelity screens in Figma with a light, photo-led palette of soft greens, a serif display face for warmth and one consistent card component so listings stay easy to scan.",
  problem: [
    "Property listings compete for attention with price, photos, location and size. Without a strict card system the browse screen becomes noisy and comparisons get hard.",
    "The deadline left no room for exploration, so the design had to rely on well-understood patterns executed precisely and a component set that could be reused across every screen.",
  ],
  research: null,
  persona: null,
  journey: null,
  ia: {
    label: "Real Estate App",
    children: [
      { label: "Home", children: [{ label: "Search property" }, { label: "Featured property" }, { label: "Places (Dubai · Sharjah · Abu Dhabi)" }, { label: "Listed property" }] },
      { label: "Properties", children: [{ label: "For sale" }, { label: "For rent" }, { label: "Property detail" }] },
      { label: "Messages" },
      { label: "Profile" },
    ],
  },
  flow: {
    title: "Find a property and contact the seller",
    nodes: [
      { id: "start", label: "Home", kind: "start" },
      { id: "browse", label: "Search, pick a place or open Listed property", kind: "step" },
      { id: "list", label: "Listings: sale and rent cards", kind: "step" },
      { id: "match", label: "Something interesting?", kind: "decision" },
      { id: "detail", label: "Property detail: photos, facts, description", kind: "step" },
      { id: "contact", label: "Contact the seller", kind: "step" },
      { id: "end", label: "Conversation in Messages", kind: "end" },
    ],
    edges: [
      { from: "start", to: "browse" },
      { from: "browse", to: "list" },
      { from: "list", to: "match" },
      { from: "match", to: "browse", label: "No" },
      { from: "match", to: "detail", label: "Yes" },
      { from: "detail", to: "contact" },
      { from: "contact", to: "end" },
    ],
  },
  prototype: { note: "No prototype was part of this delivery." },
  links: [{ label: "Figma file — Fiverr project", href: "https://www.figma.com/design/n9n1BrYYBDMxDloGVJhT35/Fiverr-project" }],
  designSystem: {
    colors: [
      { name: "White", hex: "#FFFFFF", role: "Canvas" },
      { name: "Lime mist", hex: "#CEFFB4", role: "Header, cards, tab bar" },
      { name: "Mint paper", hex: "#EDFFE3", role: "List cards" },
      { name: "Forest", hex: "#1A6155", role: "Icons, active tab, accents" },
      { name: "Black", hex: "#000000", role: "Text" },
    ],
    type: [
      { name: "Display", family: "Crimson Text", size: "22 / 28", weight: "700", sample: "Luxurious Farm House" },
      { name: "Section", family: "Inter", size: "18 / 24", weight: "600", sample: "Featured Property" },
      { name: "Price", family: "Inter", size: "28 / 32", weight: "600", sample: "AED 1.5 Million" },
      { name: "Body", family: "Crimson Text", size: "14–16 / 22", weight: "400–600", sample: "1200 sq feet · Street 02, Sharjah, UAE" },
      { name: "Tab label", family: "Inter", size: "12 / 16", weight: "600", sample: "Properties" },
    ],
    radius: [
      { name: "Card", value: "16px" },
      { name: "Button", value: "12px" },
      { name: "Chip", value: "999px" },
    ],
    notes: ["Colour and type values are read from the Figma file. Soft green surfaces frame the property photography; Crimson Text gives listings a warm, editorial voice while Inter carries the UI chrome.", "The September 2026 refresh keeps this palette and type pairing, adds a warm off-white background (#F5F9F2), white cards with soft forest shadows, and a 44 px minimum touch target."],
    theme: { primary: "#1A6155", primaryInk: "#FFFFFF", surface: "#EDFFE3", bg: "#FFFFFF", text: "#111111", muted: "#5F6B62", border: "#CDEBBE", radius: "12px", font: "inherit" },
  },
  solution: [
    "A single listing-card component with a fixed photo ratio, title, size, price and address keeps every property comparable whether it is for sale or rent.",
    "The home screen combines a featured property, quick place filters (Dubai, Sharjah, Abu Dhabi) and the listing feed so the first screen already answers “what is available near me?”.",
    "The detail screen leads with photography and availability, then facts and description, and ends with the seller so contact is always one tap away.",
    "In September 2026 I produced a higher-fidelity refresh of the three screens (self-initiated, not part of the client delivery): real content instead of placeholders, a consistent price position, sale/rent badges, beds, baths and area icons, category chips, a sticky booking bar and the “Luxerious” typo fixed. The refreshed frames sit next to the originals in the Figma file.",
  ],
  outcome: {
    measured: false,
    headline: "Urgent delivery completed on time, with editable Figma files handed over for development.",
    items: ["Home, listings and property detail screens", "Reusable card, chip and tab-bar components", "Editable Figma source delivered", "September 2026 refresh of all three screens in the same Figma file"],
    note: "No post-launch data is available for this project.",
  },
  contentStatus: "partial",
  seoDescription: "Mobile UI case study: a fresh, photo-led real estate listings app designed in Figma for a UAE client under a 1–3 day deadline.",
};
