"use client";

import { motion } from "motion/react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Em } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icon";
import { easeOut } from "@/lib/motion";
import { HeroScene } from "./HeroScene";

const headline: { text: string; em?: boolean }[] = [
  { text: "UI/UX Designer" },
  { text: "creating" },
  { text: "simple" },
  { text: "and" },
  { text: "meaningful", em: true },
  { text: "digital" },
  { text: "experiences." },
];

export function Hero() {
  // Reduced motion is handled by <MotionConfig reducedMotion="user">, which
  // drops the transforms and keeps a short fade, so markup stays identical.
  const wordAnim = (i: number) => ({
    initial: { y: "110%", opacity: 0 },
    animate: { y: "0%", opacity: 1 },
    transition: { duration: 0.7, ease: easeOut, delay: 0.15 + i * 0.05 },
  });
  const blockAnim = (delay: number) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: easeOut, delay } });

  return (
    <section className="relative overflow-hidden pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)]" aria-labelledby="hero-title">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        <div className="max-w-3xl">
          <motion.p {...blockAnim(0.05)} className="eyebrow flex items-center gap-3">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            {site.availability}
          </motion.p>

          <motion.p {...blockAnim(0.1)} className="mt-6 text-lead text-text-2">
            Hi, I&apos;m {site.firstName}.
          </motion.p>

          <h1 id="hero-title" className="mt-3 text-display font-medium tracking-tight text-ink" aria-label={site.tagline}>
            {headline.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-top pb-[0.12em] -mb-[0.12em] pr-[0.22em]" aria-hidden="true">
                <motion.span className="inline-block" {...wordAnim(i)}>
                  {w.em ? <Em>{w.text}</Em> : w.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p {...blockAnim(0.55)} className="mt-6 max-w-xl text-lead text-text-2">
            I design mobile apps, web apps and the design systems behind them, from research and wireframes to high-fidelity screens and clickable prototypes that developers can build from.
          </motion.p>

          <motion.div {...blockAnim(0.65)} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button href="/work" size="lg" icon="arrowRight">
                View my work
              </Button>
            </Magnetic>
            <Magnetic strength={6}>
              <Button href="/contact" size="lg" variant="secondary" icon="arrowUpRight">
                Let&apos;s connect
              </Button>
            </Magnetic>
          </motion.div>

          <motion.ul {...blockAnim(0.75)} className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-small text-muted" aria-label="Roles">
            {site.roles.map((r, i) => (
              <li key={r} className="flex items-center gap-3">
                {i > 0 && <span className="size-1 rounded-full bg-border-strong" aria-hidden />}
                {r}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: easeOut, delay: 0.3 }} className="relative w-full max-w-[520px] justify-self-center lg:justify-self-end">
          <HeroScene />
        </motion.div>
      </div>

      <motion.a
        {...blockAnim(1.1)}
        href="#work"
        className="container-x mt-14 flex items-center gap-3 text-small text-muted transition-colors hover:text-ink md:mt-20"
        aria-label="Scroll to selected work"
      >
        <span className="relative grid h-10 w-6 place-items-start justify-center rounded-full border border-border-strong pt-2">
          <span className="anim-scroll-hint block h-2 w-1 rounded-full bg-ink" />
        </span>
        <span>Scroll to explore</span>
        <Icon name="arrowDown" size={14} />
      </motion.a>
    </section>
  );
}
