"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { processSteps as process } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { easeOut } from "@/lib/motion";
import { cn, pad } from "@/lib/utils";

/**
 * Research → Define → Ideate → Wireframe → Design → Prototype → Test.
 * A tablist (real WAI-ARIA tabs with arrow-key navigation) drives a detail
 * panel; the connector line fills up to the active step.
 */
export function ProcessInteractive() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const step = process[i];

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % process.length), 5000);
    return () => window.clearInterval(id);
  }, [reduce, i]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setI((v) => (v + 1) % process.length);
    if (e.key === "ArrowLeft") setI((v) => (v - 1 + process.length) % process.length);
    if (e.key === "Home") setI(0);
    if (e.key === "End") setI(process.length - 1);
  };

  return (
    <div className="surface-card overflow-hidden">
      <div className="relative overflow-x-auto px-4 pt-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" tabIndex={-1}>
        <div role="tablist" aria-label="Design process steps" onKeyDown={onKey} className="relative flex min-w-[680px] items-start justify-between">
          <span className="absolute left-5 right-5 top-5 h-px bg-border" aria-hidden />
          <motion.span className="absolute left-5 top-5 h-px bg-accent" aria-hidden animate={{ width: `calc(${(i / (process.length - 1)) * 100}% - 2.5rem)` }} transition={reduce ? { duration: 0 } : { duration: 0.5, ease: easeOut }} />
          {process.map((s, idx) => {
            const on = idx === i;
            const done = idx < i;
            return (
              <button
                key={s.step}
                role="tab"
                id={`process-tab-${idx}`}
                aria-selected={on}
                aria-controls={`process-panel-${idx}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setI(idx)}
                className="group relative flex w-24 flex-col items-center gap-3 focus-visible:outline-none"
              >
                <span
                  className={cn(
                    "relative z-10 grid size-10 place-items-center rounded-full border text-[0.75rem] font-mono transition-all duration-300",
                    on ? "scale-110 border-accent bg-accent text-accent-ink shadow-md" : done ? "border-accent bg-accent-soft text-accent-text" : "border-border bg-surface text-muted group-hover:border-border-strong",
                    "group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-surface",
                  )}
                >
                  {done ? <Icon name="check" size={14} strokeWidth={2.5} /> : pad(idx + 1)}
                </span>
                <span className={cn("text-[0.8125rem] font-medium transition-colors", on ? "text-ink" : "text-muted group-hover:text-text")}>{s.step}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-border p-6 md:p-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step.step}
            role="tabpanel"
            id={`process-panel-${i}`}
            aria-labelledby={`process-tab-${i}`}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="grid gap-6 md:grid-cols-[1fr_1.4fr] md:gap-10"
          >
            <div>
              <p className="eyebrow">
                Step {pad(i + 1)} of {pad(process.length)}
              </p>
              <h3 className="mt-2 text-h2 font-medium tracking-tight text-ink">{step.step}</h3>
              <p className="mt-3 text-lead text-text-2">{step.summary}</p>
            </div>
            <div className="flex flex-col justify-between gap-6">
              <p className="text-[0.9375rem] leading-relaxed text-text-2">{step.detail}</p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setI((v) => (v - 1 + process.length) % process.length)} className="grid size-10 place-items-center rounded-full border border-border text-text-2 transition-colors hover:border-border-strong hover:text-ink" aria-label="Previous step">
                  <Icon name="arrowLeft" size={16} />
                </button>
                <button type="button" onClick={() => setI((v) => (v + 1) % process.length)} className="grid size-10 place-items-center rounded-full border border-border text-text-2 transition-colors hover:border-border-strong hover:text-ink" aria-label="Next step">
                  <Icon name="arrowRight" size={16} />
                </button>
                <span className="ml-2 text-small text-muted">Use ← → to move between steps</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
