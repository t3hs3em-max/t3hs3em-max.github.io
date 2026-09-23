/**
 * Captures screens from the Salon Control interactive prototype
 * (assets/salon-prototype/index.html) into assets/figma/salon-control/.
 * Run once, then `npm run images -- salon-control`.
 */
import path from "node:path";
import { mkdir, readFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = pathToFileURL(path.join(root, "assets/salon-prototype/index.html")).href;
const out = path.join(root, "assets/figma/salon-control");
await mkdir(out, { recursive: true });

const interNormal = await readFile(path.join(root, "node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2"));
const fontCss = `@font-face{font-family:Inter;font-style:normal;font-weight:100 900;src:url(data:font/woff2;base64,${interNormal.toString("base64")}) format("woff2")}`;

const wireframeCss = `
  html{filter:grayscale(1) contrast(.92)}
  *{box-shadow:none!important;text-shadow:none!important;border-radius:4px!important;transition:none!important;animation:none!important}
  body,.app,.main,.content{background:#fff!important}
  .sidebar{background:#e9e9e9!important;color:#333!important}
  .sidebar .logo,.nav-item.active{background:#cfcfcf!important;color:#222!important}
  .nav-item.active::before{background:#777!important}
  .card,.tile,.kpi,.modal,.iconbtn,.profile,.search input,.ctl,.fbtn,.paymeth button,.tab{background:#fff!important;border:1.5px solid #9a9a9a!important;color:#222!important}
  .btn.p,.btn.d,.btn.sub,.badge,.pill,.delta,.avatar,.ki,.ai,.ni,.bar .b,.progress i,.toast,.logo,.store{background:#bdbdbd!important;color:#222!important;border-color:#9a9a9a!important}
  .badge::before,.fd{background:#777!important}
  img,svg.i{opacity:.55}
  h1,h2,h3,b,p,span,td,th,label,input{color:#222!important}
  .topbar{background:#f4f4f4!important;border-bottom:1.5px solid #9a9a9a!important}
  .tbl th{background:#eee!important}
  .tbl td,.tbl th{border-color:#bbb!important}
`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium" });

async function capture({ name, viewport, scale, screen, modal, wireframe }) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: scale, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.route(/fonts\.googleapis|fonts\.gstatic/, (r) => r.abort());
  await page.goto(src);
  await page.addStyleTag({ content: fontCss });
  if (wireframe) await page.addStyleTag({ content: wireframeCss });
  await page.waitForTimeout(400);
  if (screen && screen !== "dashboard") {
    await page.evaluate((s) => document.querySelector(`.sb-nav [data-nav="${s}"]`)?.dispatchEvent(new MouseEvent("click", { bubbles: true })), screen);
    await page.waitForTimeout(500);
  }
  if (modal) {
    await page.evaluate((m) => document.querySelector(`[data-open="${m}"]`)?.dispatchEvent(new MouseEvent("click", { bubbles: true })), modal);
    await page.waitForTimeout(500);
  }
  // Let the dashboard skeleton resolve and chart bars grow
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(out, `${name}.png`), type: "png" });
  console.log("  ✓", name);
  await ctx.close();
}

const desktop = { width: 1440, height: 900 };
const mobile = { width: 390, height: 844 };

await capture({ name: "dashboard", viewport: desktop, scale: 1.5, screen: "dashboard" });
await capture({ name: "quick-sale", viewport: desktop, scale: 1.5, screen: "quick-sale" });
await capture({ name: "appointments", viewport: desktop, scale: 1.5, screen: "appointments" });
await capture({ name: "new-appointment", viewport: desktop, scale: 1.5, screen: "dashboard", modal: "apptModal" });
await capture({ name: "customers", viewport: desktop, scale: 1.5, screen: "customers" });
await capture({ name: "cash", viewport: desktop, scale: 1.5, screen: "cash" });
await capture({ name: "mobile-dashboard", viewport: mobile, scale: 2, screen: "dashboard" });
await capture({ name: "mobile-quick-sale", viewport: mobile, scale: 2, screen: "quick-sale" });
await capture({ name: "wf-dashboard", viewport: desktop, scale: 1.5, screen: "dashboard", wireframe: true });
await capture({ name: "wf-quick-sale", viewport: desktop, scale: 1.5, screen: "quick-sale", wireframe: true });
await capture({ name: "wf-mobile", viewport: mobile, scale: 2, screen: "dashboard", wireframe: true });

await browser.close();
