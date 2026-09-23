"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * A quiet trailing ring for mouse users. The native cursor stays visible
 * (accessibility first); the ring grows over interactive elements and shows a
 * short label over project cards (data-cursor="View"). It is never rendered on
 * touch devices or for people who prefer reduced motion.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("a, button, [role='button'], input, textarea, select, label, [data-cursor]");
      const custom = target?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? null;
      setLabel(custom);
      setHovering(Boolean(target));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  const size = label ? 72 : hovering ? 40 : 24;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[999] flex items-center justify-center rounded-full mix-blend-normal"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
    >
      <motion.div
        animate={{ width: size, height: size, backgroundColor: label ? "var(--ink)" : "transparent", borderColor: label ? "transparent" : "var(--ink)", opacity: label ? 0.92 : hovering ? 0.6 : 0.35 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        className="flex items-center justify-center rounded-full border"
        style={{ borderWidth: 1.5 }}
      >
        {label && <span className="text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-bg">{label}</span>}
      </motion.div>
    </motion.div>
  );
}
