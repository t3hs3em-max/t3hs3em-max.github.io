import { chromium } from "playwright";
const base = process.env.BASE || "http://localhost:4173";
const pages = ["/", "/work/", "/work/movesmart/", "/work/salon-control/", "/work/inkwell-pens/", "/work/real-estate-app/", "/work/pen-world/", "/work/car-rental-website/", "/about/", "/contact/"];
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const errors = [];
for (const [label, vp] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, colorScheme: process.env.SCHEME || "light", reducedMotion: process.env.MOTION === "on" ? "no-preference" : "reduce" });
  const page = await ctx.newPage();
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(`[${label}] ${m.type()}: ${m.text().slice(0, 200)}`); });
  page.on("pageerror", (e) => errors.push(`[${label}] pageerror: ${e.message}`));
  page.on("response", (r) => { if (r.status() >= 400) errors.push(`[${label}] ${r.status()} ${r.url()}`); });
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    // scroll through to trigger reveals & lazy images
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } window.scrollTo(0, 0); });
    await page.evaluate(() => Promise.all([...document.images].map((img) => (img.complete ? Promise.resolve() : new Promise((r) => { img.onload = img.onerror = r; })))));
    await page.waitForTimeout(600);
    const name = p === "/" ? "home" : p.replace(/\//g, "-").replace(/^-|-$/g, "");
    await page.screenshot({ path: `qa/${label}-${name}.png`, fullPage: true });
  }
  await ctx.close();
}
await browser.close();
console.log(errors.length ? errors.join("\n") : "no console/network errors");
