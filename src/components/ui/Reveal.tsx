"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { easeOut, viewportOnce } from "@/lib/motion";

type Tag = "div" | "section" | "li" | "ul" | "ol" | "span" | "p" | "h1" | "h2" | "h3" | "figure" | "article" | "header";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  as?: Tag;
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * Scroll-triggered reveal: one fade + short rise, once.
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">:
 * the transform is dropped and only a quick opacity change remains, so the
 * server-rendered markup is identical for every visitor (no hydration drift).
 */
export function Reveal({ as = "div", delay = 0, y = 18, children, className, ...rest }: RevealProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.65, ease: easeOut, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Staggers direct children that are themselves <RevealItem>. */
export function RevealGroup({ children, className, stagger = 0.08, as = "div" }: { children: React.ReactNode; className?: string; stagger?: number; as?: Tag }) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp className={className} initial="hidden" whileInView="show" viewport={viewportOnce} variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}>
      {children}
    </Comp>
  );
}

export function RevealItem({ children, className, as = "div", y = 18 }: { children: React.ReactNode; className?: string; as?: Tag; y?: number }) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp className={className} variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } } }}>
      {children}
    </Comp>
  );
}
