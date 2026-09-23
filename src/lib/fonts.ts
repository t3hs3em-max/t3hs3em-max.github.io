import localFont from "next/font/local";

/**
 * Self-hosted, subset (latin) variable fonts. No network request at build or
 * runtime; Next.js preloads them and generates size-adjusted fallbacks so
 * there is no layout shift while they load.
 */
export const fontSans = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    { path: "../fonts/geist-latin-wght-normal.woff2", style: "normal", weight: "100 900" },
    { path: "../fonts/geist-latin-wght-italic.woff2", style: "italic", weight: "100 900" },
  ],
  fallback: ["system-ui", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
});

export const fontDisplay = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "../fonts/instrument-serif-latin-400-normal.woff2", style: "normal", weight: "400" },
    { path: "../fonts/instrument-serif-latin-400-italic.woff2", style: "italic", weight: "400" },
  ],
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const fontMono = localFont({
  variable: "--font-mono",
  display: "swap",
  src: [{ path: "../fonts/geist-mono-latin-wght-normal.woff2", style: "normal", weight: "100 900" }],
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});
