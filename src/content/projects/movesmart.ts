import type { Project } from "../types";

/**
 * MoveSmart — AI-powered real-time exercise trainer app.
 * Screens are exported from the Figma file "All designs" (two iterations of
 * the onboarding flow plus home, exercise library and profile). Descriptions
 * of the client brief come from the designer's portfolio record; anything
 * marked as an assumption or placeholder still needs the designer's input.
 */
const img = (name: string, alt: string, caption?: string) => ({
  src: `/projects/movesmart/${name}`,
  alt,
  width: 824,
  height: 1834,
  frame: "phone" as const,
  caption,
});

export const moveSmart: Project = {
  slug: "movesmart",
  title: "MoveSmart",
  tagline: "UX and UI for an AI exercise trainer that tracks your movement and coaches your form in real time.",
  categories: ["Mobile", "UX Design", "UI Design", "Product Design"],
  type: "Mobile application · Health & fitness",
  platform: "Android & iOS",
  role: "UX design, user flow, UI design, custom icons & illustrations",
  tools: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Canva Pro"],
  timeline: "[Timeline]",
  year: "2025",
  client: "Client project (name withheld)",
  status: "Client project",
  featured: true,
  order: 2,
  accent: "#FF4500",
  accentSoft: "#2A2A2A",
  cover: {
    src: "/projects/movesmart/cover",
    alt: "Three MoveSmart screens on phones: the home screen with activity and goals, the welcome screen with a runner silhouette, and the exercise library",
    width: 1600,
    height: 1200,
  },
  screens: [
    img("home-v2", "MoveSmart home screen, second iteration: welcome message, Start Exercise card, Activity with calories burned and workout time, and Goals tiles for water and calories", "Home (v2) — start, activity and today's goals on one screen"),
    img("goals", "Calories Goal screen with calories burned, a progress bar showing calories left for today, workout time and goal tiles, plus edit and auto-detect actions", "Goals — calories, workout time and a clear amount left for today"),
    img("library-v2", "Exercise Library screen listing Lunges and Plank with photos, descriptions and Start now buttons", "Exercise Library — photo, short description, one button per exercise"),
    img("profile-info", "Add profile info screen with fields for age, weight, height and sex over a silhouette background", "Add profile info — the data the AI needs to estimate calories"),
    img("welcome", "Welcome screen: MoveSmart, AI-Powered Realtime Exercise Trainer, with a Get Started button", "Welcome — second iteration with athlete silhouettes"),
    img("sign-in", "Sign in screen with email and password fields inside a dark card", "Sign in"),
    img("profile", "User profile screen with gender, age, weight and height tiles", "Profile — the four values that drive the calorie goal"),
    img("splash", "Splash screen with the MoveSmart logo", "Splash"),
    img("finished", "Setup finished confirmation screen", "Setup complete"),
  ],
  wireframes: [],
  iterations: [
    {
      title: "Home, first pass → second pass",
      note: "Version one had a single Start Exercise card and a lot of empty space. Version two keeps the card in the same place and fills the rest with what people check before and after a session: activity (calories burned, workout time) and today's goals (water, calories).",
      before: img("home", "First version of the home screen with only a Start Exercise card"),
      after: img("home-v2", "Second version of the home screen with activity and goal tiles"),
      beforeLabel: "Version 1",
      afterLabel: "Version 2",
    },
    {
      title: "Welcome screen, first pass → second pass",
      note: "The first version relied on flat dark surfaces alone. The second iteration adds athlete silhouettes and a subtle spotlight so the onboarding feels energetic before a single word is read, while keeping the same content and button placement.",
      before: img("welcome-v1", "First version of the welcome screen: flat dark background with a green Welcome heading"),
      after: img("welcome", "Second version of the welcome screen with a runner silhouette behind the heading"),
      beforeLabel: "Version 1",
      afterLabel: "Version 2",
    },
    {
      title: "Sign in, first pass → second pass",
      note: "Same form, stronger framing: the card gains contrast against the silhouette background and the primary button keeps its blue so it stays the most visible element.",
      before: img("sign-in-v1", "First version of the sign-in screen"),
      after: img("sign-in", "Second version of the sign-in screen with a silhouette background"),
      beforeLabel: "Version 1",
      afterLabel: "Version 2",
    },
  ],
  overview:
    "MoveSmart is an AI-powered real-time exercise trainer: the app watches a workout through the phone camera, tracks movement and posture, and gives guidance as you go. I designed the user experience and interface for the onboarding flow (splash, welcome, login, sign-up and profile setup), the home screen, the exercise library and the user profile, then iterated the visual direction once the flow was settled. Custom icons and illustrations were produced in Photoshop, Illustrator and Canva.",
  problem: [
    "People who exercise at home rarely get feedback on their form, and generic workout videos cannot see what they are doing. The product's promise is real-time correction, so the interface has to collect a little personal data up front (age, weight, height, sex) to calibrate calorie targets, without making onboarding feel like a medical form.",
    "During a session the screen is glanced at from a distance. Anything that matters mid-workout needs to be large, high-contrast and reduced to one action.",
  ],
  research: {
    methods: [
      "Mapped the end-to-end flow before designing screens: splash → welcome → login or sign-up → profile info → ready → home → exercise → progress.",
      "Reviewed how fitness apps handle first-run data collection and how they present exercises (photo, short description, single start action).",
    ],
    assumptions: [
      "Users set the phone down 1–2 metres away during exercise, so mid-workout UI uses larger type and single actions (design assumption, not yet validated).",
      "A short, four-field profile step is acceptable when the app explains why the data is needed (the copy on the profile screen does exactly that).",
    ],
    competitive: ["[Competitive analysis] Add the apps that were reviewed and the specific takeaways."],
    findings: [
      "Every exercise card needs the same three things: a photo showing the movement, a one-line description, and one button. Anything more competes with the photo.",
      "Dark surfaces keep the focus on imagery and the accent buttons, which matters for a camera-based product.",
    ],
  },
  persona: {
    name: "The Home Exerciser",
    descriptor: "Trains at home without a coach · wants to avoid injury · motivated by daily goals",
    quote: "I never know if I'm doing lunges right. I just want something to tell me.",
    goals: ["Exercise with correct form without paying for a trainer", "Hit a daily calorie and water goal", "Keep sessions short and structured"],
    frustrations: ["Videos that cannot see what you are doing", "Long sign-up forms before any value", "Apps that bury the start button"],
    behaviours: ["Works out 3–4 times a week in a small space", "Checks goals on the home screen before and after a session"],
    basis: "Proto-persona based on the brief and design assumptions; it was not derived from user interviews.",
  },
  journey: [
    { stage: "Discover", doing: "Opens the app for the first time", thinking: "What is this and what will it do for me?", feeling: 3, opportunity: "Welcome screen states the promise in one line: AI-powered realtime exercise trainer." },
    { stage: "Sign up", doing: "Creates an account and enters profile info", thinking: "Why do you need my weight?", feeling: 2, opportunity: "Explain on the same screen that the data is used to calculate calories and give reference points." },
    { stage: "Choose", doing: "Picks an exercise from the library", thinking: "Which one, and how do I do it?", feeling: 4, opportunity: "Photo + short description + one Start now button per exercise." },
    { stage: "Train", doing: "Performs the exercise while the AI tracks posture", thinking: "Am I doing this right?", feeling: 3, opportunity: "Large, single-message feedback during the session." },
    { stage: "Review", doing: "Checks calories, workout minutes and water on the home screen", thinking: "Did I hit today's goal?", feeling: 4, opportunity: "Goal tiles on the home screen with what is left for the day." },
  ],
  ia: {
    label: "MoveSmart",
    children: [
      { label: "Onboarding", children: [{ label: "Splash" }, { label: "Welcome" }, { label: "Log in / Sign up" }, { label: "Add profile info" }, { label: "Ready" }] },
      { label: "Home", children: [{ label: "Start exercise" }, { label: "Activity & goals" }, { label: "Calories · Workout · Water" }] },
      { label: "Exercise Library", children: [{ label: "Lunges" }, { label: "Plank" }, { label: "More exercises" }] },
      { label: "Profile", children: [{ label: "Gender · Age · Weight · Height" }, { label: "Edit goals" }] },
    ],
  },
  flow: {
    title: "First run to first exercise",
    nodes: [
      { id: "start", label: "Splash → Welcome", kind: "start" },
      { id: "account", label: "Have an account?", kind: "decision" },
      { id: "signin", label: "Sign in", kind: "step" },
      { id: "signup", label: "Sign up", kind: "step" },
      { id: "profile", label: "Add profile info: age, weight, height, sex", kind: "step" },
      { id: "ready", label: "MoveSmart is ready to use", kind: "step" },
      { id: "home", label: "Home: Start Exercise", kind: "step" },
      { id: "library", label: "Exercise Library: choose Lunges / Plank", kind: "step" },
      { id: "end", label: "Live session with posture tracking", kind: "end" },
    ],
    edges: [
      { from: "start", to: "account" },
      { from: "account", to: "signin", label: "Yes" },
      { from: "account", to: "signup", label: "No" },
      { from: "signup", to: "profile" },
      { from: "profile", to: "ready" },
      { from: "ready", to: "home" },
      { from: "signin", to: "home" },
      { from: "home", to: "library" },
      { from: "library", to: "end" },
    ],
  },
  prototype: { note: "[Prototype link] Add the Figma prototype link here if one can be shared." },
  links: [{ label: "Figma file — All designs", href: "https://www.figma.com/design/xhOm00zrgeOXTOny4Kf430/All-designs" }],
  designSystem: {
    colors: [
      { name: "Charcoal", hex: "#222222", role: "Background" },
      { name: "Panel", hex: "#2A2A2A", role: "Cards and fields" },
      { name: "Signal orange", hex: "#FF4500", role: "Start / primary exercise actions" },
      { name: "Action blue", hex: "#0A84FF", role: "Account actions (Log in, Sign up)" },
      { name: "Brand green", hex: "#2BE92B", role: "Logo, welcome heading, success" },
      { name: "Amber", hex: "#F4B467", role: "Goal highlights" },
      { name: "Soft grey", hex: "#DEDEDE", role: "Body text on dark" },
      { name: "White", hex: "#FFFFFF", role: "Headings" },
    ],
    type: [
      { name: "Screen title", family: "Calistoga", size: "20 / 24", weight: "400", sample: "Exercise Library" },
      { name: "Heading", family: "Arial", size: "20 / 24", weight: "700", sample: "Add profile info" },
      { name: "Body", family: "Arial", size: "15–17 / 22", weight: "400", sample: "Track your movements, perfect your posture, and achieve your goals." },
      { name: "Button", family: "Arial", size: "14 / 16", weight: "700", sample: "Start now" },
      { name: "Metric", family: "Arial", size: "23 / 28", weight: "700", sample: "2150 CAL" },
    ],
    radius: [
      { name: "Card", value: "16px" },
      { name: "Field", value: "10px" },
      { name: "Button", value: "6px" },
    ],
    notes: [
      "Colour and type values are read from the Figma file. The file predates a formal token setup; a next step would be to convert these into Figma variables and a button component set.",
    ],
    theme: { primary: "#FF4500", primaryInk: "#FFFFFF", surface: "#2A2A2A", bg: "#222222", text: "#F5F5F5", muted: "#A0A0A0", border: "#3A3A3A", radius: "10px", font: "inherit" },
  },
  solution: [
    "Onboarding is five short steps with one decision (log in or sign up). The profile step explains, on the same screen, that age, weight, height and sex are used to calculate calories and give reference points, so the request feels reasonable rather than intrusive.",
    "The home screen leads with a single Start Exercise card and a motivational line; the second iteration adds activity, calorie, workout-time and water goals so the screen also answers “how am I doing today?”.",
    "Each exercise in the library is a photo, one sentence and one Start now button, so choosing a movement takes a glance. Orange is reserved for exercise actions and blue for account actions, giving each type of action a consistent colour.",
    "The visual direction was iterated once the flow was stable: version two layers athlete silhouettes behind the onboarding cards to add energy without changing layout or content.",
  ],
  outcome: {
    measured: false,
    headline: "Delivered a consistent set of screens ready for developer handoff, with two documented visual iterations.",
    items: ["Onboarding, home, exercise library and profile screens in Figma", "Two iterations of the onboarding visuals", "Custom icon set and illustrations"],
    note: "No usage data is available. The next step would be moderated tests of the profile step and a live session to validate the distance-readability assumption.",
  },
  contentStatus: "partial",
  seoDescription: "Mobile UX/UI case study: MoveSmart, an AI-powered real-time exercise trainer app. Onboarding flow, exercise library, profile setup and two visual iterations designed in Figma.",
};
