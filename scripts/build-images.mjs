/**
 * Builds every project image from the Figma PNG exports in `assets/figma/`.
 *
 *   npm run images            → all projects
 *   npm run images -- movesmart
 *
 * Outputs (all WebP, quality 82):
 *   public/projects/<slug>/<name>.webp       full size (max 1600px wide for phones, 2160 for desktop)
 *   public/projects/<slug>/<name>-800.webp   800px wide variant for srcset
 *   public/projects/<slug>/cover.webp        1600×1200 composed cover (+ -800 variant)
 */
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";
import { chromium } from "playwright";
import { projects } from "./images.config.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const only = process.argv.slice(2);

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function toWebp(input, outBase, { maxWidth }) {
  const img = sharp(input);
  const meta = await img.metadata();
  const width = Math.min(meta.width ?? maxWidth, maxWidth);
  await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(`${outBase}.webp`);
  await sharp(input).resize({ width: Math.min(800, width), withoutEnlargement: true }).webp({ quality: 80, effort: 5 }).toFile(`${outBase}-800.webp`);
  const out = await sharp(`${outBase}.webp`).metadata();
  return { width: out.width, height: out.height };
}

async function main() {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 1 });
  const template = pathToFileURL(path.join(root, "scripts/cover-template.html")).href;
  const summary = {};

  for (const p of projects) {
    if (only.length && !only.includes(p.slug)) continue;
    const srcDir = path.join(root, "assets/figma", p.source);
    const outDir = path.join(root, "public/projects", p.slug);
    await mkdir(outDir, { recursive: true });
    summary[p.slug] = {};

    for (const [name, file] of Object.entries(p.screens)) {
      const input = path.join(srcDir, file);
      if (!(await exists(input))) {
        console.warn(`  ! missing ${input}`);
        continue;
      }
      const meta = await sharp(input).metadata();
      const isDesktop = (meta.width ?? 0) > 1200;
      const dims = await toWebp(input, path.join(outDir, name), { maxWidth: isDesktop ? 2160 : 1600 });
      summary[p.slug][name] = dims;
      console.log(`  ✓ ${p.slug}/${name}.webp ${dims.width}×${dims.height}`);
    }

    // Cover composition
    if (p.cover) {
      const images = [];
      for (const key of p.cover.images) {
        const file = path.join(srcDir, p.screens[key]);
        if (!(await exists(file))) continue;
        const buf = await readFile(file);
        images.push(`data:image/png;base64,${buf.toString("base64")}`);
      }
      await page.goto(template);
      await page.evaluate((cfg) => window.render(cfg), { ...p.cover, images, accent: p.accent, bg: p.bg, dark: p.dark });
      await page.waitForTimeout(150);
      const png = await page.screenshot({ type: "png", clip: { x: 0, y: 0, width: 1600, height: 1200 } });
      await sharp(png).webp({ quality: 84 }).toFile(path.join(outDir, "cover.webp"));
      await sharp(png).resize({ width: 800 }).webp({ quality: 80 }).toFile(path.join(outDir, "cover-800.webp"));
      console.log(`  ✓ ${p.slug}/cover.webp`);
    }
  }

  await browser.close();
  await writeFile(path.join(root, "assets/figma/dimensions.json"), JSON.stringify(summary, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
