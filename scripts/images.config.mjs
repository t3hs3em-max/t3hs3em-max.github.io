/**
 * Image pipeline configuration.
 *
 * Sources live in `assets/figma/<folder>/` (PNG exports from Figma).
 * Outputs go to `public/projects/<slug>/<name>.webp` + `<name>-800.webp`.
 *
 * `cover` describes the composition rendered by scripts/cover-template.html:
 *   layout: "phones" (1–3 phones), "browser" (one desktop shot), "mix" (browser + phone)
 */
export const projects = [
  {
    slug: "pen-world",
    source: "pen-world",
    accent: "#FC9A28",
    bg: ["#141214", "#2A1F14"],
    dark: true,
    screens: { home: "home.png", product: "product.png" },
    cover: { layout: "phones", images: ["home", "product"] },
  },
  {
    slug: "car-rental-website",
    source: "car-rental",
    accent: "#E8890A",
    bg: ["#0B0B0B", "#1E1A16"],
    dark: true,
    screens: { "home-top": "home-top.png", "home-full": "home-full.png" },
    cover: { layout: "browser", images: ["home-top"] },
  },
  {
    slug: "shots",
    source: "shots",
    accent: "#FF8A00",
    bg: ["#fff", "#fff"],
    dark: false,
    screens: { "orange-bar": "orange-bar.png", "branding-welcome": "branding-welcome.png", "branding-login": "branding-login.png", "branding-signup": "branding-signup.png" },
    cover: null,
  },
  {
    slug: "inkwell-pens",
    source: "inkwell-pens",
    accent: "#FFD36B",
    bg: ["#0B2F33", "#134A45"],
    dark: true,
    screens: { home: "home.png", explore: "explore.png", "wf-home": "wf-home.png", "pen-illustrations": "pen-illustrations.png" },
    cover: { layout: "phones", images: ["home", "explore"] },
  },
  {
    slug: "real-estate-app",
    source: "real-estate",
    accent: "#1A6155",
    bg: ["#EAF8E1", "#FFFFFF"],
    dark: false,
    screens: { home: "home.png", listed: "listed.png", detail: "detail.png" },
    cover: { layout: "phones", images: ["listed", "home", "detail"] },
  },
  {
    slug: "salon-control",
    source: "salon-control",
    accent: "#0F6E56",
    bg: ["#EAF3EF", "#F6F7F5"],
    dark: false,
    screens: {
      dashboard: "dashboard.png",
      "quick-sale": "quick-sale.png",
      appointments: "appointments.png",
      "new-appointment": "new-appointment.png",
      customers: "customers.png",
      cash: "cash.png",
      "mobile-dashboard": "mobile-dashboard.png",
      "mobile-quick-sale": "mobile-quick-sale.png",
      "wf-dashboard": "wf-dashboard.png",
      "wf-quick-sale": "wf-quick-sale.png",
      "wf-mobile": "wf-mobile.png",
    },
    cover: { layout: "mix", images: ["dashboard", "mobile-dashboard"] },
  },
  {
    slug: "movesmart",
    source: "movesmart",
    accent: "#A3E635",
    bg: ["#0E1012", "#1A1F12"],
    dark: true,
    screens: {
      home: "06-home-page-5-124.png",
      library: "07-exercise-library-5-160.png",
      profile: "08-user-profile-5-178.png",
      "profile-info": "15-add-profile-info-104-83.png",
      welcome: "11-welcome-page-104-12.png",
      "sign-in": "13-sign-in-104-40.png",
      "sign-up": "14-sign-up-104-61.png",
      splash: "10-splash-screen-104-2.png",
      finished: "05-finished-5-109.png",
      "welcome-v1": "00-welcome-page-5-12.png",
      "sign-in-v1": "02-sign-in-5-40.png",
      "login-v1": "01-login-or-sign-up-5-27.png",
      "home-v2": "home-v2.png",
      goals: "goals.png",
      "library-v2": "library-v2.png",
    },
    cover: { layout: "phones", images: ["home-v2", "welcome", "library-v2"] },
  },
];
