import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Zero-pads an index for editorial numbering: 1 → "01". */
export function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Picks black or white text for a given hex background (WCAG relative luminance). */
export function readableOn(hex: string) {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return (1.05) / (L + 0.05) >= (L + 0.05) / 0.05 ? "#ffffff" : "#0b0b0d";
}

/** Absolute URL helper for metadata / JSON-LD. */
export function absoluteUrl(path: string, base: string) {
  return new URL(path, base).toString();
}
