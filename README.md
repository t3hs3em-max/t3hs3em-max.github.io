# Tehseem Khan — UI/UX & Product Designer portfolio

A fast, accessible, content-driven portfolio built with **Next.js 16 (React 19) + TypeScript**, **Tailwind CSS v4** on a CSS-variable design-token system, and **Motion** for animation. It compiles to a fully static site (`out/`), so it can be hosted anywhere for free.

```
npm install        # once
npm run dev        # http://localhost:3000
npm run build      # static export → out/
npm start          # serve the export locally (npx serve out)
```

## 1. Where everything lives

| What | File(s) |
| --- | --- |
| Name, title, email, phone, social links, availability, process steps, philosophy, skills & tools | `src/content/site.ts` |
| Projects / case studies (one file each) | `src/content/projects/*.ts` (registered in `src/content/projects/index.ts`) |
| Gallery "shots" on `/work` | `src/content/shots.ts` |
| Design tokens (colours, radii, shadows, type scale, motion) | `src/app/globals.css` → `:root` and `.dark` |
| Fonts (self-hosted, subset) | `src/fonts/` + `src/lib/fonts.ts` |
| Project images | `public/projects/<slug>/` |
| SEO: metadata, sitemap, robots, manifest, JSON-LD | `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts`, `src/lib/seo.ts` |

Anything wrapped in `[square brackets]` in the content files is a **placeholder** waiting for real information (timelines, prototype links, competitive analysis…). Sections that have no data render a clearly marked "Pending content" block rather than invented copy.

## 2. Editing a case study

Each project is a typed object (`Project` in `src/content/types.ts`). The case-study template renders these sections in order: Overview · Problem · Research · Persona · User journey · Information architecture · User flow · Wireframes · UI design · Iterations (optional) · Prototype · Design system · Final solution · Outcome.

* `screens`, `wireframes`, `iterations`: image entries `{ src, alt, width, height, frame, caption }`. `src` is the path **without extension**; each image must exist as `<src>.webp` and `<src>-800.webp`. `frame` is `"phone"`, `"browser"` or `"none"`.
* `research`, `persona`, `journey`, `ia`, `flow`, `designSystem` can be `null` → the section shows a pending block.
* `designSystem.theme` drives the **live component samples** (buttons, inputs, card, tags) rendered from the project's own tokens.
* `outcome.measured`: keep `false` unless you have real numbers. The template labels it "Not yet measured".
* `prototype.url` must start with `https://`.
* `categories` drive the filters on `/work` (`Mobile`, `Web`, `UI Design`, `UX Design`, `Product Design`).

### Adding a project
1. Copy `src/content/projects/movesmart.ts` → `src/content/projects/<slug>.ts`, edit, and add it to the array in `src/content/projects/index.ts`.
2. Put the Figma exports in `assets/figma/<folder>/` and describe them in `scripts/images.config.mjs` (screens + cover composition), then run `npm run images -- <slug>`. This writes optimised WebP files (full + 800px) and a composed 1600×1200 cover to `public/projects/<slug>/`.
   * Or drop your own images straight into `public/projects/<slug>/` using the same naming.
3. `npm run build`.

## 3. Deploying

The site is a static export. `NEXT_PUBLIC_SITE_URL` must be your final address so canonical URLs, Open Graph tags and the sitemap are correct.

* **GitHub Pages (set up in this repo)**: `.github/workflows/deploy.yml` builds and publishes the site on every push to `main`. One-time setup: repository **Settings → Pages → Build and deployment → Source: GitHub Actions**. The workflow reads two optional repository variables (Settings → Secrets and variables → Actions → Variables): `SITE_URL` (your custom domain, defaults to `https://t3hs3em-max.github.io`) and `FORM_ENDPOINT` (contact-form endpoint). `public/.nojekyll` keeps the `_next/` folder from being ignored.
* **Vercel**: import the repo → Framework: Next.js → add env var `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` → Deploy.
* **Netlify / Cloudflare Pages**: build command `npm run build`, publish directory `out`, same env var.
* **Any static host**: run `npm run build` locally and upload the `out/` folder.

The raw Figma exports in `assets/figma/` are not committed (see `.gitignore`); the optimised WebP files the site uses live in `public/projects/`. Keep the raw exports locally if you want to regenerate covers with `npm run images`.

## 4. Contact form

By default the form validates on the client and then opens the visitor's email app with the message pre-filled (works with zero back-end). To receive submissions directly, create a free endpoint at Formspree, Web3Forms or Basin and set `NEXT_PUBLIC_FORM_ENDPOINT=https://…` — the form will POST JSON `{ name, email, message }` and show a success state.

## 5. Quality checks

```
npm run typecheck   # TypeScript
npm run lint        # ESLint (Next + React hooks rules)
npm run build && npm start &   # serve out/ on :3000 (or python3 -m http.server 4173 --directory out)
BASE=http://localhost:4173 npm run qa        # screenshots (desktop + mobile, reduced motion) + console/network errors
BASE=http://localhost:4173 npm run qa:a11y   # axe-core audit, light + dark
BASE=http://localhost:4173 node scripts/qa-interactions.mjs   # filters, lightbox keyboard, form validation, theme, menu, overflow
```

The QA scripts use Playwright; set `CHROMIUM_PATH` if Playwright's own browser is not installed.

## 6. Design system (summary)

* **Type**: Geist (sans, body + headings), Instrument Serif italic (display accents), Geist Mono (labels/eyebrows). Fluid scale via `--text-display … --text-eyebrow`.
* **Colour**: warm paper background, near-black ink, one electric accent (`--accent`), soft tints for ambience; full dark theme under `.dark`. Toggle in the header (system-aware, persisted).
* **Radii**: 6 / 10 / 14 / 20 / 28 / 36px. **Shadows**: four layered levels. **Motion**: one easing family, 160–480ms.
* **Components** (`src/components/ui`): Button (primary / secondary / ghost / accent, magnetic wrapper), Tag, Chip, Card, Meta, Placeholder, Note, SectionHeading, Reveal (scroll reveals), Picture (responsive images), Icon set.
* **Accessibility**: semantic landmarks, skip link, visible focus rings, keyboard-operable filters / lightbox / tabs / compare slider, `aria-live` announcements, reduced-motion support (Motion drops transforms; CSS animations are disabled), WCAG AA contrast checked with axe in both themes.

## 7. Notes on content honesty

Client names, results and metrics are only shown where they were documented. Personas and journey emotions are labelled as proto-personas / assumptions. Outcome sections say "Not yet measured" unless real data exists. Keep it that way — recruiters trust it.
