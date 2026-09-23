"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { easeOut } from "@/lib/motion";

function Logo() {
  return (
    <Link
      href="/"
      className="group/logo flex items-center gap-3 rounded-full py-1 pr-2"
      aria-label={`${site.name} — home`}
    >
      <span className="grid size-9 place-items-center rounded-full bg-ink text-bg font-display text-[1.05rem] leading-none tracking-tight transition-colors group-hover/logo:bg-accent group-hover/logo:text-accent-ink">
        T
      </span>
      <span className="hidden text-[0.9375rem] font-medium tracking-tight text-ink sm:block">
        {site.name}
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on route change (state adjusted during render, no effect needed).
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  // Scroll lock + Escape + focus management for the mobile menu.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          "a, button, [tabindex]:not([tabindex='-1'])",
        );
        const list = Array.from(focusables);
        if (list.length === 0) return;
        const firstEl = list[0];
        const lastEl = list[list.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
          scrolled || open
            ? "border-b border-border bg-bg/80 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/70"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-full border border-border/70 bg-surface/60 p-1 backdrop-blur">
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative z-10 block rounded-full px-4 py-2 text-[0.875rem] font-medium transition-colors",
                        active ? "text-bg" : "text-text-2 hover:text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 420, damping: 36 }
                        }
                        className="absolute inset-0 rounded-full bg-ink"
                        aria-hidden
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              href="/contact"
              size="sm"
              className="hidden md:inline-flex"
              icon="arrowUpRight"
            >
              Let&apos;s talk
            </Button>
            <button
              ref={toggleRef}
              type="button"
              className="grid size-10 place-items-center rounded-full border border-border bg-surface/70 text-ink backdrop-blur md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? "close" : "menu"} size={20} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 flex flex-col overflow-y-auto bg-bg md:hidden"
          >
            <div className="container-x flex flex-1 flex-col pt-6 pb-10">
              <ul className="flex flex-col divide-y divide-border border-y border-border">
                {[{ label: "Home", href: "/" as Route }, ...nav].map(
                  (item, i) => (
                    <motion.li
                      key={item.href}
                      initial={reduce ? false : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.05 * i,
                        duration: 0.35,
                        ease: easeOut,
                      }}
                    >
                      <Link
                        href={item.href}
                        aria-current={
                          isActive(item.href) && item.href !== "/"
                            ? "page"
                            : undefined
                        }
                        className="flex items-center justify-between py-5 text-h3 font-medium tracking-tight text-ink"
                      >
                        {item.label}
                        <Icon
                          name="arrowUpRight"
                          size={22}
                          className="text-muted"
                        />
                      </Link>
                    </motion.li>
                  ),
                )}
              </ul>
              <div className="mt-auto pt-10">
                <p className="eyebrow mb-3">Get in touch</p>
                <a
                  href={`mailto:${site.email}`}
                  className="text-lead font-medium text-ink underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>
                <div className="mt-6 flex flex-wrap gap-2">
                  {site.social.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-small text-text-2"
                    >
                      {s.label}
                      <Icon name="arrowUpRight" size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
