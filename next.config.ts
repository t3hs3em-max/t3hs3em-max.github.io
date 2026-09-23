import type { NextConfig } from "next";

/**
 * Static export: the site builds to plain HTML/CSS/JS in `out/` and can be
 * hosted anywhere (Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3…).
 * Images are pre-optimised at build time by `scripts/generate-mockups.mjs`,
 * so the Next.js image optimiser is not needed.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  typedRoutes: true,
};

export default nextConfig;
