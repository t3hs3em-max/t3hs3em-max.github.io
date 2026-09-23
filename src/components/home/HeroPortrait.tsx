"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Icon } from "@/components/ui/Icon";
import { Picture } from "@/components/ui/Picture";
import { site } from "@/content/site";

/**
 * Hero visual: Tehseem's portrait (background removed, colour-graded to the
 * site palette) on a soft brand card, framed like a selected layer in a
 * design tool — selection outline, corner handles, a name tag and a size
 * badge — with the floating hand-off toast and multiplayer cursor around it.
 * Pointer parallax is off for touch devices and reduced-motion users.
 */
export function HeroPortrait() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 60, damping: 20, mass: 1.2 });
  const y = useSpring(my, { stiffness: 60, damping: 20, mass: 1.2 });

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  const backX = useTransform(x, (v) => v * -8);
  const backY = useTransform(y, (v) => v * -6);
  const photoX = useTransform(x, (v) => v * 6);
  const photoY = useTransform(y, (v) => v * 4);
  const frontX = useTransform(x, (v) => v * 18);
  const frontY = useTransform(y, (v) => v * 14);

  return (
    <div className="relative mx-auto aspect-[13/15] w-full select-none">
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-[40%] h-[85%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 blur-3xl" style={{ background: "radial-gradient(closest-side, var(--tint-sky), transparent 72%)" }} />
        <div className="absolute bottom-[4%] right-[-6%] h-[45%] w-[50%] rounded-full opacity-70 blur-3xl" style={{ background: "radial-gradient(closest-side, var(--tint-peach), transparent 70%)" }} />
      </div>

      {/* Card behind the portrait */}
      <motion.div style={{ x: backX, y: backY }} className="absolute inset-x-[3%] bottom-[2%] top-[16%]" aria-hidden="true">
        <div
          className="absolute inset-0 overflow-hidden rounded-[2.25rem] border border-border shadow-lg"
          style={{
            background:
              "radial-gradient(90% 70% at 50% 0%, var(--tint-sky) 0%, transparent 70%), radial-gradient(70% 60% at 100% 100%, var(--tint-peach) 0%, transparent 72%), radial-gradient(60% 50% at 0% 100%, var(--tint-mint) 0%, transparent 70%), var(--surface)",
          }}
        >
          <div className="absolute inset-0 bg-dots opacity-60" />
          <div className="absolute left-1/2 top-[-18%] aspect-square w-[78%] -translate-x-1/2 rounded-full border border-accent/20" />
          <div className="absolute left-1/2 top-[-6%] aspect-square w-[56%] -translate-x-1/2 rounded-full border border-dashed border-accent/25" />
        </div>
      </motion.div>

      {/* Portrait — breaks out of the top of the card */}
      <motion.div style={{ x: photoX, y: photoY }} className="absolute inset-x-[3%] bottom-[2%] top-0">
        <Picture
          image={{ src: "/profile/tehseem-portrait", alt: `${site.fullName}, UI/UX and product designer`, width: 1040, height: 1200 }}
          sizes="(min-width: 1024px) 480px, 90vw"
          priority
          className="absolute bottom-0 left-0 h-full w-full object-contain object-bottom drop-shadow-[0_24px_40px_rgba(16,17,20,0.18)]"
        />
      </motion.div>

      {/* Selection frame, like a selected layer in Figma */}
      <motion.div style={{ x: backX, y: backY }} className="pointer-events-none absolute inset-x-[3%] bottom-[2%] top-[16%]" aria-hidden="true">
        <div className="absolute -inset-[6px] rounded-[2.5rem] border-[1.5px] border-accent/70" />
        {["-left-[10px] -top-[10px]", "-right-[10px] -top-[10px]", "-left-[10px] -bottom-[10px]", "-right-[10px] -bottom-[10px]"].map((pos) => (
          <span key={pos} className={`absolute ${pos} size-[9px] rounded-[2px] border-[1.5px] border-accent bg-surface`} />
        ))}
        <span className="absolute -top-[34px] left-[-6px] rounded-md bg-accent px-2 py-0.5 font-mono text-[0.6875rem] font-medium text-accent-ink">{site.firstName}.frame</span>
        <span className="absolute -bottom-[34px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-accent px-2 py-0.5 font-mono text-[0.6875rem] font-medium text-accent-ink">UI/UX · Product Designer</span>
      </motion.div>

      {/* Front: hand-off toast */}
      <motion.div style={{ x: frontX, y: frontY }} className="absolute left-[-9%] top-[21%] w-[50%] max-w-[240px]" aria-hidden="true">
        <div className="anim-float-sm surface-card flex items-center gap-2.5 rounded-full py-2 pl-2 pr-3 shadow-md" style={{ animationDelay: "-3s" }}>
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-success-soft text-success">
            <Icon name="check" size={14} strokeWidth={2.25} />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[0.6875rem] font-medium text-ink">Ready for handoff</p>
            <p className="truncate text-[0.5625rem] text-muted">Auto layout · variables · states</p>
          </div>
        </div>
      </motion.div>

      {/* Front: multiplayer cursor */}
      <motion.div style={{ x: frontX, y: frontY }} className="absolute right-[-2%] top-[50%]" aria-hidden="true">
        <div className="anim-cursor flex items-start">
          <svg width="18" height="20" viewBox="0 0 18 20" className="drop-shadow-sm">
            <path d="M1 1l6.5 16 2.3-6.2L16 8.5 1 1Z" fill="var(--accent)" stroke="white" strokeWidth="1.2" />
          </svg>
          <span className="ml-1 mt-3 rounded-full bg-accent px-2 py-0.5 text-[0.625rem] font-medium text-accent-ink shadow-sm">{site.firstName}</span>
        </div>
      </motion.div>

      {/* Front: colour swatch chip */}
      <motion.div style={{ x: frontX, y: frontY }} className="absolute bottom-[12%] left-[-6%] hidden sm:block" aria-hidden="true">
        <div className="anim-float-sm surface-card flex items-center gap-2 rounded-2xl px-3 py-2 shadow-md" style={{ animationDelay: "-1.5s" }}>
          <span className="flex -space-x-1.5">
            {["var(--accent)", "var(--ink)", "var(--tint-peach)", "var(--tint-mint)"].map((c) => (
              <span key={c} className="size-4 rounded-full border-2 border-surface" style={{ background: c }} />
            ))}
          </span>
          <span className="font-mono text-[0.625rem] text-text-2">tokens</span>
        </div>
      </motion.div>
    </div>
  );
}
