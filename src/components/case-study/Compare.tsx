"use client";

import { useId, useState } from "react";
import type { ProjectImage } from "@/content/types";

/**
 * Before/after slider. The handle is a native range input, so it works with
 * keyboard, screen readers and touch without any custom drag code.
 */
export function Compare({ before, after, beforeLabel = "Before", afterLabel = "After" }: { before: ProjectImage; after: ProjectImage; beforeLabel?: string; afterLabel?: string }) {
  const [v, setV] = useState(50);
  const id = useId();
  const phone = before.frame === "phone";
  return (
    <div className={phone ? "mx-auto w-full max-w-[360px]" : "w-full"}>
      <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface-2 shadow-md" style={{ aspectRatio: `${before.width} / ${before.height}` }}>
        <img src={`${after.src}.webp`} alt={after.alt} width={after.width} height={after.height} className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${v}%` }} aria-hidden>
          <img src={`${before.src}.webp`} alt="" width={before.width} height={before.height} className="absolute inset-0 h-full max-w-none object-cover" style={{ width: `${10000 / v}%` }} loading="lazy" decoding="async" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,.25)]" style={{ left: `calc(${v}% - 1px)` }} aria-hidden>
          <span className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-md">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 4 2 8l4 4M10 4l4 4-4 4" />
            </svg>
          </span>
        </div>
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[0.6875rem] font-medium text-white backdrop-blur">{beforeLabel}</span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[0.6875rem] font-medium text-white backdrop-blur">{afterLabel}</span>
        <label htmlFor={id} className="sr-only">
          Reveal {beforeLabel} versus {afterLabel}
        </label>
        <input id={id} type="range" min={0} max={100} value={v} onChange={(e) => setV(Number(e.target.value))} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" aria-valuetext={`${v}% ${beforeLabel}`} />
      </div>
    </div>
  );
}
