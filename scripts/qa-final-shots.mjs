import { chromium } from "playwright";
const base = "http://localhost:4173";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium", args: ["--disable-background-networking"] });
async function shot(name, url, vp, opts = {}) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, colorScheme: opts.dark ? "dark" : "light", reducedMotion: "reduce", isMobile: vp.width < 500, hasTouch: vp.width < 500 });
  const page = await ctx.newPage();
  await page.goto(base + url, { waitUntil: "load" });
  await page.waitForTimeout(800);
  if (opts.full) {
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); } window.scrollTo(0, 0); });
    await page.evaluate(() => Promise.all([...document.images].map((img) => (img.complete ? 0 : new Promise((r) => { img.onload = img.onerror = r; })))));
    await page.waitForTimeout(800);
  }
  if (opts.scrollTo) { await page.evaluate((s) => document.querySelector(s)?.scrollIntoView(), opts.scrollTo); await page.waitForTimeout(900); }
  await page.screenshot({ path: `qa/final/${name}.png`, fullPage: !!opts.full });
  await ctx.close();
  console.log("✓", name);
}
await import("node:fs").then(fs => fs.mkdirSync("qa/final", { recursive: true }));
const D = { width: 1440, height: 900 }, T = { width: 1024, height: 1366 }, M = { width: 390, height: 844 };
await shot("01-home-hero-desktop", "/", D);
await shot("02-home-hero-dark", "/", D, { dark: true });
await shot("03-home-full-desktop", "/", D, { full: true });
await shot("04-work-desktop", "/work/", D, { full: true });
await shot("05-case-salon-desktop", "/work/salon-control/", D, { full: true });
await shot("06-case-movesmart-desktop", "/work/movesmart/", D, { full: true });
await shot("07-case-inkwell-dark", "/work/inkwell-pens/", D, { full: true, dark: true });
await shot("08-case-car-rental-ui", "/work/car-rental-website/", D, { scrollTo: "#ui" });
await shot("09-about-desktop", "/about/", D, { full: true });
await shot("10-contact-desktop", "/contact/", D);
await shot("11-home-mobile", "/", M, { full: true });
await shot("12-work-mobile", "/work/", M, { full: true });
await shot("13-case-mobile-dark", "/work/movesmart/", M, { full: true, dark: true });
await shot("14-home-tablet", "/", T);
await browser.close();
