import type { Project } from "../types";

/**
 * Pen World — e-commerce mobile app for a client in Luxembourg.
 * Two frames exported from the Figma file "All designs" (Android Large 1 & 2):
 * a featured-product home screen and a product detail screen. Documented
 * facts come from the designer's portfolio record; details marked as
 * assumptions or placeholders still need the designer's input.
 */
const phone = (name: string, alt: string, caption?: string) => ({
  src: `/projects/pen-world/${name}`,
  alt,
  width: 720,
  height: 1600,
  frame: "phone" as const,
  caption,
});

export const penWorld: Project = {
  slug: "pen-world",
  title: "Pen World",
  tagline: "An e-commerce app for a pen retailer, designed from research and wireframes to a clear path from featured product to purchase.",
  categories: ["Mobile", "UX Design", "UI Design"],
  type: "Mobile application · E-commerce",
  platform: "Android (360×800) · iOS",
  role: "UX research, wireframes, UI design, custom product assets",
  tools: ["Figma"],
  timeline: "[Timeline]",
  year: "2025",
  client: "Client based in Luxembourg (name withheld)",
  status: "Client project",
  featured: false,
  order: 5,
  accent: "#FC9A28",
  accentSoft: "#2A2118",
  cover: {
    src: "/projects/pen-world/cover",
    alt: "Refreshed Pen World home and product-detail screens on two phones over a dark background",
    width: 1600,
    height: 1200,
  },
  screens: [
    phone("r-home", "Refreshed Pen World home: menu, PenWorld wordmark and cart with a count, category chips, the Cross Bailey Light pen and gold nib as the hero, a New arrival badge, price and a Shop now button above a labelled tab bar", "Home — categories, one featured pen, price and one action"),
    phone("r-product", "Refreshed product detail: back, wishlist and cart buttons, product imagery with thumbnails, In stock · 9 left badge, gold title, rating, three feature rows, total price with a quantity stepper, and Add to cart and Buy now buttons", "Product detail — stock, rating and features before the price and actions"),
  ],
  iterations: [
    {
      title: "Home: delivered version → September 2026 refresh",
      note: "The hero pen no longer runs under the headline, category chips and a cart with a count make the screen navigable, the price moves next to the call to action, and a labelled tab bar is added.",
      before: phone("home", "Home screen as delivered"),
      after: phone("r-home", "Refreshed home screen"),
      beforeLabel: "Delivered",
      afterLabel: "Refresh",
    },
    {
      title: "Product detail: delivered version → refresh",
      note: "The hamburger icon becomes a back button, availability becomes a badge, features become scannable rows with icons, the quantity dropdown becomes a stepper, and Buy now is the filled primary action next to an outlined Add to cart.",
      before: phone("product", "Product detail as delivered"),
      after: phone("r-product", "Refreshed product detail"),
      beforeLabel: "Delivered",
      afterLabel: "Refresh",
    },
  ],
  wireframes: [],
  overview:
    "Pen World is a mobile shopping app for a pen retailer based in Luxembourg. I started with research and sketching, wireframed the browse → product → cart → checkout flow, then produced the visual design in Figma together with custom product assets. The two screens shown here are the featured-product home and the product detail page.",
  problem: [
    "A specialist pen is bought on detail: finish, nib, packaging and stock. The product page had to surface those facts without burying the price and the purchase actions.",
    "[Problem details] Add the client's goals and constraints here, for example the existing sales channel and what the app was meant to change.",
  ],
  research: {
    methods: [
      "Desk research and sketching sessions to define the browse, product and checkout layouts before wireframing.",
      "Wireframes for browse → product detail → cart → checkout (not included in this export).",
    ],
    assumptions: ["Buyers compare a small number of premium pens carefully, so a rich product page matters more than a dense catalogue (design assumption)."],
    competitive: ["[Competitive analysis] Add the apps or stores that were reviewed and what was learned."],
    findings: [
      "Availability (“9 in stock”) and packaging (“premium gift box”) belong on the product page above the fold: they answer the two questions a gift buyer asks first.",
      "Two actions, Buy Now and Add to Cart, cover both the decided and the browsing customer without adding a third option.",
    ],
  },
  persona: null,
  journey: null,
  ia: {
    label: "Pen World",
    children: [
      { label: "Home", children: [{ label: "Featured product" }, { label: "New arrivals" }] },
      { label: "Catalogue", children: [{ label: "Categories" }, { label: "Product detail" }] },
      { label: "Cart", children: [{ label: "Quantity" }, { label: "Checkout" }] },
    ],
  },
  flow: {
    title: "Featured product to purchase",
    nodes: [
      { id: "start", label: "Home: featured pen", kind: "start" },
      { id: "shop", label: "Tap Shop Now", kind: "step" },
      { id: "detail", label: "Product detail: finish, nib, box, stock, price", kind: "step" },
      { id: "decide", label: "Ready to buy?", kind: "decision" },
      { id: "cart", label: "Add to Cart, keep browsing", kind: "step" },
      { id: "buy", label: "Buy Now", kind: "step" },
      { id: "end", label: "Checkout", kind: "end" },
    ],
    edges: [
      { from: "start", to: "shop" },
      { from: "shop", to: "detail" },
      { from: "detail", to: "decide" },
      { from: "decide", to: "cart", label: "Later" },
      { from: "decide", to: "buy", label: "Yes" },
      { from: "buy", to: "end" },
      { from: "cart", to: "end" },
    ],
  },
  prototype: { note: "[Prototype link] Add the Figma prototype link here if one can be shared." },
  links: [{ label: "Figma file — All designs", href: "https://www.figma.com/design/xhOm00zrgeOXTOny4Kf430/All-designs" }],
  designSystem: {
    colors: [
      { name: "Ink black", hex: "#1B191B", role: "Canvas" },
      { name: "White", hex: "#FFFFFF", role: "Text, outlined buttons" },
      { name: "Amber", hex: "#FC9A28", role: "NEW badge, accent" },
      { name: "Gold", hex: "#EEBA00", role: "Product title highlight" },
      { name: "Crimson", hex: "#C10000", role: "Emphasis details" },
    ],
    type: [
      { name: "Brand", family: "Lemon", size: "30 / 34", weight: "400", sample: "PenWorld" },
      { name: "Product title", family: "League Spartan", size: "24–28 / 30", weight: "600–700", sample: "Cross Bailey Light Polished Black Resin" },
      { name: "Body", family: "League Spartan", size: "19–21 / 26", weight: "300", sample: "Stainless steel fountain pen nib with gold tone plating" },
      { name: "Price", family: "League Spartan", size: "23 / 28", weight: "600", sample: "Rs 7,650.00" },
      { name: "Button", family: "League Spartan", size: "15–20", weight: "700", sample: "Add to Cart" },
    ],
    radius: [
      { name: "Card", value: "16px" },
      { name: "Button", value: "10px" },
    ],
    notes: ["Colour and type values are read from the Figma file. Display faces (Lemon, Lalezar) are used only for the brand mark and the NEW badge; League Spartan carries all UI text.", "The September 2026 refresh keeps Lemon for the wordmark and League Spartan for product copy, adds Inter for small UI labels, and uses a filled amber (#FC9A28) primary button with dark text for contrast."],
    theme: { primary: "#FC9A28", primaryInk: "#1B191B", surface: "#26232A", bg: "#1B191B", text: "#FFFFFF", muted: "#A8A29E", border: "#3A3540", radius: "10px", font: "inherit" },
  },
  solution: [
    "The home screen behaves like a shop window: a single featured pen photographed against black, a NEW badge and one Shop Now action, so the first impression is about the product, not the interface.",
    "The product page leads with the pen photograph and title, then availability, the key material facts and packaging, followed by price, quantity and two clearly weighted actions.",
    "A near-black canvas with amber and gold accents lets the product photography glow; buttons are quiet outlines so the pen stays the hero.",
    "In September 2026 I produced a higher-fidelity refresh of both screens (self-initiated, not part of the client delivery): the hero image is staged so it never covers the copy, the primary action is a filled amber button, stock, rating and features are scannable, and quantity uses a stepper. The refreshed frames sit next to the originals in the Figma file.",
  ],
  outcome: {
    measured: false,
    headline: "Delivered a complete set of shopping screens with a consistent look and a clear purchasing path.",
    items: ["Home, product detail, cart and checkout screens in Figma", "Custom product assets", "Editable Figma source handed to the client", "September 2026 refresh of the home and product screens"],
    note: "No usage or sales data is available for this project, so no business results are claimed.",
  },
  contentStatus: "partial",
  seoDescription: "Mobile e-commerce UI/UX case study: Pen World, a pen retailer app for a Luxembourg client with a featured-product home screen and a detail-rich product page designed in Figma.",
};
