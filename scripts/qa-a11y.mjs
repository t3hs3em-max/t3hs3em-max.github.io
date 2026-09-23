/** Runs axe-core against every page of the static export (serve `out/` first). */
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
const base = process.env.BASE || "http://localhost:4173";
const pages = ["/", "/work/", "/work/movesmart/", "/work/salon-control/", "/work/inkwell-pens/", "/work/real-estate-app/", "/work/pen-world/", "/work/car-rental-website/", "/about/", "/contact/"];
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
let total = 0;
for (const scheme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: scheme });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: "networkidle" });
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(800);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"]).analyze();
    const v = results.violations;
    total += v.length;
    console.log(`\n[${scheme}] ${p} — ${v.length} violation(s)`);
    for (const x of v) { console.log(`  • ${x.id} (${x.impact}): ${x.help} — ${x.nodes.length} node(s)`); for (const n of x.nodes.slice(0, 20)) console.log(`      - ${n.target.join(" ")} :: ${(n.any[0]?.message || "").slice(0, 110)}`); }
  }
  await ctx.close();
}
await browser.close();
console.log(`\nTotal violations: ${total}`);
process.exit(total ? 1 : 0);
