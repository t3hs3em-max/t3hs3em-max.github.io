"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/content/site";

/**
 * The hero illustration is built from real UI, not a stock render: a phone
 * screen, a token card, a component sheet and a multiplayer cursor. Layers
 * drift on a slow loop and respond to the pointer with different depths.
 * Everything is CSS/SVG, so it costs a few KB and paints instantly.
 */
export function HeroScene() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 60, damping: 20, mass: 1.2 });
  const y = useSpring(my, { stiffness: 60, damping: 20, mass: 1.2 });

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX / w - 0.5) * 2);
      my.set((e.clientY / h - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  // Depth layers: further back = less travel.
  const backX = useTransform(x, (v) => v * -10);
  const backY = useTransform(y, (v) => v * -8);
  const midX = useTransform(x, (v) => v * 14);
  const midY = useTransform(y, (v) => v * 10);
  const frontX = useTransform(x, (v) => v * 24);
  const frontY = useTransform(y, (v) => v * 18);

  return (
    <div ref={ref} className="relative mx-auto aspect-[4/5] w-full select-none sm:aspect-square lg:aspect-[4/5]" aria-hidden="true">
      {/* Ambient gradient + dot grid */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl" style={{ background: "radial-gradient(closest-side, var(--tint-sky), transparent 70%)" }} />
        <div className="absolute right-[6%] top-[12%] h-[45%] w-[45%] rounded-full opacity-60 blur-3xl" style={{ background: "radial-gradient(closest-side, var(--tint-peach), transparent 70%)" }} />
        <div className="absolute inset-[6%] bg-dots opacity-70" />
      </div>

      {/* Back layer: component sheet */}
      <motion.div style={{ x: backX, y: backY }} className="absolute left-0 top-[9%] w-[40%]">
        <div className="anim-float-sm surface-card rounded-[var(--radius-xl)] p-4 shadow-md" style={{ animationDelay: "-2s" }}>
          <div className="mb-3 flex items-center justify-between">
            <span className="eyebrow whitespace-nowrap !text-[0.625rem]">Button / Primary</span>
            <span className="hidden whitespace-nowrap rounded-full bg-accent-soft px-2 py-0.5 text-[0.625rem] font-medium text-accent-text sm:inline">4 states</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Default", cls: "bg-ink text-bg" },
              { label: "Hover", cls: "bg-accent text-accent-ink" },
              { label: "Pressed", cls: "bg-accent-hover text-accent-ink scale-[0.97]" },
              { label: "Disabled", cls: "bg-surface-2 text-muted" },
            ].map((b) => (
              <div key={b.label} className="flex flex-col gap-1.5">
                <div className={`flex h-8 items-center justify-center rounded-full text-[0.6875rem] font-medium ${b.cls}`}>Save</div>
                <span className="text-[0.5625rem] text-muted">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Back layer: token card */}
      <motion.div style={{ x: backX, y: backY }} className="absolute bottom-[4%] right-0 w-[29%]">
        <div className="anim-float-sm surface-card rounded-[var(--radius-xl)] p-4 shadow-md" style={{ animationDelay: "-4s" }}>
          <div className="mb-3 flex items-center gap-2">
            <Icon name="layers" size={14} className="text-muted" />
            <span className="eyebrow !text-[0.625rem]">Colour tokens</span>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { n: "accent/500", c: "var(--accent)" },
              { n: "ink/900", c: "var(--ink)" },
              { n: "surface/200", c: "var(--surface-3)" },
              { n: "tint/peach", c: "var(--tint-peach)" },
            ].map((t) => (
              <div key={t.n} className="flex items-center gap-2">
                <span className="size-5 rounded-md border border-border" style={{ background: t.c }} />
                <span className="font-mono text-[0.625rem] text-text-2">{t.n}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Mid layer: phone */}
      <motion.div style={{ x: midX, y: midY }} className="absolute left-[33%] top-[15%] w-[39%]">
        <div className="anim-float rounded-[2.2rem] border border-border bg-ink p-[6px] shadow-lg" style={{ animationDelay: "-1s" }}>
          <div className="relative overflow-hidden rounded-[1.85rem] bg-bg">
            <div className="aspect-[9/19.2] p-4 pt-8 text-ink">
              <div className="absolute left-1/2 top-2.5 h-[18px] w-[34%] -translate-x-1/2 rounded-full bg-ink" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.5625rem] text-muted">Good morning</p>
                  <p className="text-[0.8125rem] font-semibold tracking-tight">{site.firstName}</p>
                </div>
                <span className="grid size-7 place-items-center rounded-full bg-accent-soft text-[0.5625rem] font-semibold text-accent-text">TK</span>
              </div>
              <div className="mt-4 rounded-2xl bg-ink p-3 text-bg">
                <p className="text-[0.5625rem] opacity-70">This week</p>
                <div className="mt-1 flex items-end justify-between">
                  <p className="text-[1.25rem] font-semibold leading-none tracking-tight">12<span className="text-[0.625rem] font-normal opacity-70"> screens</span></p>
                  <span className="rounded-full bg-accent px-1.5 py-0.5 text-[0.5rem] font-medium text-accent-ink">+4</span>
                </div>
                <div className="mt-3 flex h-8 items-end gap-1">
                  {[40, 65, 50, 85, 70, 95, 60].map((h, i) => (
                    <span key={i} className="flex-1 rounded-sm bg-bg/25" style={{ height: `${h}%`, background: i === 5 ? "var(--accent)" : undefined }} />
                  ))}
                </div>
              </div>
              <div className="mt-3 flex flex-col gap-2">
                {["Wireframes", "UI design", "Prototype"].map((t, i) => (
                  <div key={t} className="flex items-center gap-2 rounded-xl border border-border bg-surface px-2.5 py-2">
                    <span className={`grid size-4 place-items-center rounded-full ${i < 2 ? "bg-accent text-accent-ink" : "border border-border-strong"}`}>{i < 2 && <Icon name="check" size={9} strokeWidth={2.5} />}</span>
                    <span className="text-[0.625rem] font-medium">{t}</span>
                    <span className="ml-auto text-[0.5rem] text-muted">{i < 2 ? "Done" : "Today"}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex h-8 items-center justify-center rounded-full bg-ink text-[0.625rem] font-medium text-bg">Share with client</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Front layer: multiplayer cursor */}
      <motion.div style={{ x: frontX, y: frontY }} className="absolute left-[8%] top-[70%]">
        <div className="anim-cursor flex items-start">
          <svg width="18" height="20" viewBox="0 0 18 20" className="drop-shadow-sm">
            <path d="M1 1l6.5 16 2.3-6.2L16 8.5 1 1Z" fill="var(--accent)" stroke="white" strokeWidth="1.2" />
          </svg>
          <span className="ml-1 mt-3 rounded-full bg-accent px-2 py-0.5 text-[0.625rem] font-medium text-accent-ink shadow-sm">{site.firstName}</span>
        </div>
      </motion.div>

      {/* Front layer: handoff toast */}
      <motion.div style={{ x: frontX, y: frontY }} className="absolute right-[2%] top-[3%] w-[50%]">
        <div className="anim-float-sm surface-card flex items-center gap-2.5 rounded-full py-2 pl-2 pr-3 shadow-md" style={{ animationDelay: "-3s" }}>
          <span className="grid size-7 place-items-center rounded-full bg-success-soft text-success">
            <Icon name="check" size={14} strokeWidth={2.25} />
          </span>
          <div className="leading-tight">
            <p className="text-[0.6875rem] font-medium text-ink">Ready for handoff</p>
            <p className="text-[0.5625rem] text-muted">Auto layout · variables · states</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
