import type { Project } from "../types";

/**
 * Inkwell Pens — concept e-commerce app for a specialist pen retailer.
 * Frames exported from the Figma file "Claud Project": a high-fidelity Home
 * screen, its low-fidelity wireframe twin, and the Explore screen. Text,
 * colours and type below are read from the Figma file.
 */
const phone = (name: string, alt: string, caption?: string) => ({
  src: `/projects/inkwell-pens/${name}`,
  alt,
  width: 780,
  height: 1688,
  frame: "phone" as const,
  caption,
});

export const inkwellPens: Project = {
  slug: "inkwell-pens",
  title: "Inkwell Pens",
  tagline: "A pen-shop app designed wireframe-first: the same home screen taken from grey boxes to a deep-green, gold-accented storefront.",
  categories: ["Mobile", "UX Design", "UI Design", "Product Design"],
  type: "Mobile application · E-commerce",
  platform: "iOS & Android",
  role: "UX structure, wireframes, UI design, component library",
  tools: ["Figma"],
  timeline: "September 2026",
  year: "2026",
  client: "Self-initiated concept",
  status: "Concept project",
  featured: true,
  order: 3,
  accent: "#0B2F33",
  accentSoft: "#D6EFE6",
  cover: {
    src: "/projects/inkwell-pens/cover",
    alt: "Refined Inkwell Pens home and explore screens on two phones over a deep green background",
    width: 1600,
    height: 1200,
  },
  screens: [
    phone("r-home", "Refined Inkwell Pens home screen: greeting, notification and cart buttons, search, category chips, a flash-sale banner with an end time and Shop now button, and trending products with ratings, struck-through old prices and add buttons above a labelled floating tab bar", "Home — search, categories, flash sale and trending pens"),
    phone("r-explore", "Refined Explore screen with a category grid (Fountain, Rollerball, Ballpoint, Gel, Calligraphy, Gift sets), item counts and a Signature Gold Edition banner", "Explore — categories with item counts and a collection banner"),
  ],
  wireframes: [phone("wf-home", "Low-fidelity wireframe of the home screen with grey placeholders for imagery and labelled blocks", "Home wireframe — same structure, no colour or imagery")],
  iterations: [
    {
      title: "Home: wireframe → high fidelity",
      note: "The wireframe fixed the order of things first: greeting, search, category chips, a promotional banner, then a trending grid. The visual pass added the deep-green glass surfaces, gold accents, product illustrations, ratings and discount badges without moving a single block.",
      before: phone("wf-home", "Home screen wireframe"),
      after: phone("home", "Home screen high-fidelity design"),
      beforeLabel: "Wireframe",
      afterLabel: "Hi-fi",
    },
    {
      title: "Home: first hi-fi → September 2026 refinement",
      note: "A usability pass on the same layout: 40 px chips and add buttons, higher-contrast secondary text, struck-through old prices, a clearer “ends in” sale timer, and a floating tab bar with labels and a solid active state. The pens are the same Figma components.",
      before: phone("home", "First high-fidelity home screen"),
      after: phone("r-home", "Refined home screen"),
      beforeLabel: "First hi-fi",
      afterLabel: "Refined",
    },
  ],
  overview:
    "Inkwell Pens is a concept storefront for a specialist pen retailer. The goal was to make a small, premium catalogue feel effortless to browse on a phone: quick paths into categories, a clear promotional slot, and trending products that show price, discount and rating at a glance. I designed the home screen wireframe-first, then the high-fidelity version and the Explore screen, with product illustrations built as reusable components.",
  problem: [
    "Pen buyers range from someone grabbing a gel pen to a collector comparing fountain-pen nibs. One home screen has to serve both without becoming a wall of products.",
    "Small retailers rely on promotions and new collections to drive repeat visits, so the layout needs a permanent, prominent slot for them that does not push the catalogue out of view.",
  ],
  research: {
    methods: [
      "Structure first: a greyscale wireframe of the home screen settled the hierarchy (search → categories → promotion → trending) before any visual decisions.",
      "Reviewed how specialist retail apps present a small catalogue with strong categories and time-limited offers.",
    ],
    assumptions: [
      "Most sessions start with a category or a search rather than scrolling a long feed (design assumption).",
      "A countdown flash sale increases engagement more than a static banner (assumption; would need A/B data to confirm).",
    ],
    competitive: ["Informal review of stationery and specialist retail apps; no formal competitive matrix was produced."],
    findings: [
      "Category chips directly under the search bar cover the two dominant entry points in one row.",
      "Trending cards need exactly four facts: image, name, rating and price (with the discount made obvious).",
    ],
  },
  persona: {
    name: "The Pen Enthusiast",
    descriptor: "Collects fountain pens · buys inks regularly · shops on the phone in the evening",
    quote: "Show me what's new and what's on sale; I already know what I like.",
    goals: ["Jump straight to a category or a search", "Spot new collections and offers quickly", "Compare price and rating without opening every product"],
    frustrations: ["Generic storefronts with endless feeds", "Offers hidden behind menus", "Product cards that omit price or rating"],
    behaviours: ["Checks the app when a sale notification arrives", "Wishlists first, buys later"],
    basis: "Proto-persona for a concept project; not based on interviews.",
  },
  journey: [
    { stage: "Arrive", doing: "Opens the app in the evening", thinking: "Anything new or on sale?", feeling: 3, opportunity: "Flash-sale banner with a countdown right under the categories." },
    { stage: "Browse", doing: "Taps Fountain or searches for an ink", thinking: "Where are the fountain pens?", feeling: 4, opportunity: "Category chips on the home screen and a full category grid in Explore." },
    { stage: "Compare", doing: "Scans trending cards", thinking: "Is that a good price?", feeling: 4, opportunity: "Original price struck through, discount badge, rating and review count on every card." },
    { stage: "Save or buy", doing: "Adds to wishlist or cart", thinking: "I'll come back for this.", feeling: 4, opportunity: "One-tap add and a Wishlist tab in the bottom navigation." },
  ],
  ia: {
    label: "Inkwell Pens",
    children: [
      { label: "Home", children: [{ label: "Search" }, { label: "Categories (All, Fountain, Gel, Ballpoint)" }, { label: "Flash sale" }, { label: "Trending now" }] },
      { label: "Explore", children: [{ label: "Fountain · Rollerball · Ballpoint" }, { label: "Gel · Calligraphy · Gift sets" }, { label: "New collection" }] },
      { label: "Wishlist" },
      { label: "Profile", children: [{ label: "Orders" }, { label: "Addresses" }] },
    ],
  },
  flow: {
    title: "From the home screen to a saved or purchased pen",
    nodes: [
      { id: "start", label: "Home", kind: "start" },
      { id: "entry", label: "Know what you want?", kind: "decision" },
      { id: "search", label: "Search or tap a category chip", kind: "step" },
      { id: "explore", label: "Explore categories / new collection", kind: "step" },
      { id: "list", label: "Product list", kind: "step" },
      { id: "detail", label: "Product detail", kind: "step" },
      { id: "act", label: "Buy now?", kind: "decision" },
      { id: "wish", label: "Save to wishlist", kind: "step" },
      { id: "end", label: "Cart → checkout", kind: "end" },
    ],
    edges: [
      { from: "start", to: "entry" },
      { from: "entry", to: "search", label: "Yes" },
      { from: "entry", to: "explore", label: "No" },
      { from: "search", to: "list" },
      { from: "explore", to: "list" },
      { from: "list", to: "detail" },
      { from: "detail", to: "act" },
      { from: "act", to: "wish", label: "Later" },
      { from: "act", to: "end", label: "Yes" },
    ],
  },
  prototype: { note: "[Prototype link] Add the Figma prototype link here if one is shared." },
  links: [{ label: "Figma file — Claud Project", href: "https://www.figma.com/design/XgTrKBnlHj290RPGtC9QxC/Claud-Project" }],
  designSystem: {
    colors: [
      { name: "Deep teal", hex: "#0B2F33", role: "Background base, dark surfaces" },
      { name: "Forest glass", hex: "#1F6B5A", role: "Gradient mid-tone, translucent cards" },
      { name: "Gold", hex: "#FFD36B", role: "Accent, sale banner, add-to-cart" },
      { name: "Soft gold", hex: "#FFE3A0", role: "Banner tint" },
      { name: "Espresso", hex: "#3A2408", role: "Text on gold" },
      { name: "Mint", hex: "#10E6A0", role: "Positive states, discount" },
      { name: "Coral", hex: "#FF5A5F", role: "Countdown, urgency" },
      { name: "White", hex: "#FFFFFF", role: "Primary text, chips" },
    ],
    type: [
      { name: "Screen title", family: "Inter", size: "32 / 36", weight: "700", sample: "Explore" },
      { name: "Section", family: "Inter", size: "18 / 24", weight: "700", sample: "Trending now" },
      { name: "Card title", family: "Inter", size: "15 / 20", weight: "600", sample: "Aurora Fountain" },
      { name: "Body", family: "Inter", size: "13 / 18", weight: "500", sample: "Find the perfect pen for every hand" },
      { name: "Label", family: "Inter", size: "10 / 12", weight: "700", sample: "FLASH SALE · 02:14:36" },
    ],
    radius: [
      { name: "Chip", value: "999px" },
      { name: "Card", value: "16px" },
      { name: "Banner", value: "20px" },
    ],
    notes: [
      "Colour and type values are read from the Figma file. Cards are translucent panels over a deep green-to-teal gradient; the pen illustrations live in a dedicated component section so every product card reuses the same drawing system.",
      "The wireframe uses a neutral grey scale (#111827, #6B7280, #E5E7EB) so structure can be judged without colour.",
    ],
    theme: { primary: "#FFD36B", primaryInk: "#3A2408", surface: "#17453F", bg: "#0B2F33", text: "#FFFFFF", muted: "#9FC4B8", border: "#2A5E55", radius: "14px", font: "inherit" },
  },
  solution: [
    "The home screen keeps the wireframe's order exactly: greeting and cart, search, category chips, a flash-sale banner with a live countdown, then a trending grid. Nothing competes with the catalogue for space.",
    "Trending cards carry image, name, rating with review count, current price and the original price struck through, with a discount badge in the corner, so comparison happens on the grid.",
    "Explore turns the same categories into a full grid with item counts and gives new collections a dedicated banner, giving returning customers a second, browse-led entry point.",
    "A deep green-to-teal gradient with translucent cards and gold accents signals a premium, specialist shop rather than a generic marketplace, and lets the coloured pen illustrations carry the page.",
    "A September 2026 refinement pass kept the layout and raised the usability floor: 40–44 px touch targets, stronger contrast on secondary text, clearer sale timing and a labelled tab bar with a solid active state.",
  ],
  outcome: {
    measured: false,
    headline: "A concept storefront with a documented wireframe-to-hi-fi progression and reusable product illustration components.",
    items: ["Home (wireframe + hi-fi) and Explore screens", "Pen illustration component set", "Consistent card, chip and banner components", "September 2026 refinement of both screens, built from the same pen components"],
    note: "Concept project; no usage or sales data exists. Next steps: product detail, cart and checkout screens, then a moderated test of the browse-to-cart path.",
  },
  contentStatus: "partial",
  seoDescription: "Mobile e-commerce UI/UX concept: Inkwell Pens, a pen-shop app designed wireframe-first in Figma with a warm, gold-accented storefront and reusable product components.",
};
