/** Behavioural checks against the static export (serve `out/` on :4173 first). */
import { chromium } from "playwright";
const base = process.env.BASE || "http://localhost:4173";
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
const results = [];
const check = (name, ok, extra = "") => { results.push({ name, ok, extra }); console.log(`${ok ? "✓" : "✗"} ${name}${extra ? " — " + extra : ""}`); };

const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 } });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

// 1. Filters
await page.goto(`${base}/work/`, { waitUntil: "networkidle" });
const allCount = await page.locator("article").count();
await page.getByRole("radio", { name: /^Mobile/ }).click();
await page.waitForTimeout(700);
const mobileCount = await page.locator("article").count();
check("filter: Mobile reduces card count", mobileCount > 0 && mobileCount < allCount, `${allCount} → ${mobileCount}`);
check("filter: hash updated", page.url().endsWith("#mobile"), page.url());
await page.goto(`${base}/work/#web`, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
check("filter: restored from hash", await page.getByRole("radio", { name: /^Web/ }).getAttribute("aria-checked") === "true");
// keyboard filter
await page.getByRole("radio", { name: /^All/ }).focus();
await page.keyboard.press("Enter");
await page.waitForTimeout(400);
check("filter: keyboard Enter selects All", await page.locator("article").count() === allCount);

// 2. Lightbox
await page.goto(`${base}/work/movesmart/`, { waitUntil: "networkidle" });
await page.locator("#ui").scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
const firstShot = page.locator("#ui button[aria-label^='Open full-screen']").first();
await firstShot.click();
await page.waitForTimeout(400);
const dialog = page.getByRole("dialog");
check("lightbox: opens", await dialog.isVisible());
const counter1 = await dialog.locator("p[aria-live]").innerText();
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(350);
const counter2 = await dialog.locator("p[aria-live]").innerText();
check("lightbox: ArrowRight advances", counter1 !== counter2, `${counter1} → ${counter2}`);
check("lightbox: focus inside dialog", await page.evaluate(() => !!document.activeElement?.closest("[role='dialog']")));
await page.keyboard.press("Escape");
await page.waitForTimeout(700);
check("lightbox: Escape closes", (await page.getByRole("dialog").count()) === 0);
check("lightbox: focus restored to trigger", await page.evaluate(() => document.activeElement?.getAttribute("aria-label")?.startsWith("Open full-screen") ?? false));

// 3. Compare slider keyboard
const range = page.locator("#iterations input[type=range]").first();
await range.focus();
await page.keyboard.press("ArrowLeft");
check("compare: range responds to keyboard", (await range.inputValue()) === "49");

// 4. Contact form validation
await page.goto(`${base}/contact/`, { waitUntil: "networkidle" });
await page.getByRole("button", { name: /send message/i }).click();
await page.waitForTimeout(400);
check("form: error summary shown", await page.locator("form [role=alert]").first().isVisible());
check("form: focus moved to first invalid field", await page.evaluate(() => document.activeElement?.getAttribute("name") === "name"));
check("form: aria-invalid set", (await page.locator("input[name=email]").getAttribute("aria-invalid")) === "true");
await page.fill("input[name=name]", "Test Person");
await page.fill("input[name=email]", "test@example.com");
await page.fill("textarea[name=message]", "This is a sufficiently long test message for validation.");
check("form: errors clear after valid input", (await page.locator("[aria-invalid='true']").count()) === 0);

// 5. Theme toggle persists
await page.goto(`${base}/about/`, { waitUntil: "networkidle" });
const before = await page.evaluate(() => document.documentElement.classList.contains("dark"));
await page.getByRole("button", { name: /switch to (dark|light) mode/i }).click();
await page.waitForTimeout(300);
const after = await page.evaluate(() => document.documentElement.classList.contains("dark"));
check("theme: toggle flips class", before !== after);
await page.reload({ waitUntil: "networkidle" });
check("theme: persists across reload", (await page.evaluate(() => document.documentElement.classList.contains("dark"))) === after);

// 6. Skip link + focus visibility
await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.keyboard.press("Tab");
check("a11y: skip link is first tab stop", await page.evaluate(() => document.activeElement?.classList.contains("skip-link")));

// 7. Process tabs keyboard
await page.goto(`${base}/about/`, { waitUntil: "networkidle" });
await page.getByRole("tab", { name: /Research/ }).focus();
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(300);
check("process: ArrowRight moves to Define", (await page.getByRole("tab", { name: /Define/ }).getAttribute("aria-selected")) === "true");

await ctx.close();

// 8. Mobile menu
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const mp = await mctx.newPage();
mp.on("pageerror", (e) => errors.push(e.message));
await mp.goto(`${base}/`, { waitUntil: "networkidle" });
await mp.getByRole("button", { name: "Open menu" }).tap();
await mp.waitForTimeout(400);
check("mobile: menu opens", await mp.getByRole("dialog", { name: "Menu" }).isVisible());
check("mobile: body scroll locked", await mp.evaluate(() => document.body.style.overflow === "hidden"));
await mp.keyboard.press("Escape");
await mp.waitForTimeout(400);
check("mobile: Escape closes menu", (await mp.getByRole("dialog", { name: "Menu" }).count()) === 0);
const hasHScroll = await mp.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
check("mobile: no horizontal overflow on home", !hasHScroll);
for (const p of ["/work/", "/work/salon-control/", "/about/", "/contact/"]) {
  await mp.goto(`${base}${p}`, { waitUntil: "networkidle" });
  const sw = await mp.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
  check(`mobile: no horizontal overflow on ${p}`, sw[0] <= sw[1] + 1, sw.join("/"));
}
await mctx.close();

// 9. View transition morph availability (Chromium)
const vctx = await browser.newContext({ viewport: { width: 1280, height: 860 } });
const vp = await vctx.newPage();
await vp.goto(`${base}/work/`, { waitUntil: "networkidle" });
const hasVT = await vp.evaluate(() => "startViewTransition" in document);
const vtNames = await vp.evaluate(() => [...document.querySelectorAll("[style*='view-transition-name']")].length);
check("view transitions: API available & names applied", hasVT && vtNames > 0, `${vtNames} named elements`);
await vp.locator("article a").first().click();
await vp.waitForURL(/\/work\/[a-z-]+\/$/);
await vp.waitForTimeout(800);
check("nav: card click navigates to case study", /\/work\/[a-z-]+\/$/.test(vp.url()), vp.url());
await vctx.close();

await browser.close();
check("no page errors during checks", errors.length === 0, errors.slice(0, 3).join(" | "));
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} checks passed`);
process.exit(failed ? 1 : 0);
