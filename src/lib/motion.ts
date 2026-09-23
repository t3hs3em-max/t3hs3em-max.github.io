import type { Transition, Variants } from "motion/react";

/**
 * Shared motion vocabulary. Keeping easing + distances here means every
 * reveal on the site moves the same way, which is what makes motion feel
 * like a system instead of a collection of effects.
 */
export const easeOut: Transition["ease"] = [0.22, 1, 0.36, 1];

export const spring: Transition = { type: "spring", stiffness: 380, damping: 32, mass: 0.8 };
export const springSoft: Transition = { type: "spring", stiffness: 220, damping: 28, mass: 1 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: easeOut } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: easeOut } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const viewportOnce = { once: true, amount: 0.12, margin: "0px 0px -6% 0px" } as const;
