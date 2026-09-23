"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ProjectImage } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface LightboxProps {
  images: ProjectImage[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

/**
 * Full-screen image viewer. Keyboard: ← → navigate, Esc closes. Focus is
 * trapped inside while open and returned to the trigger on close. Swipe on
 * touch devices. Announces the current position for screen readers.
 */
const subscribeNoop = () => () => {};

export function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  const reduce = useReducedMotion();
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const touchStart = useRef<number | null>(null);

  const prev = useCallback(() => {
    if (index === null) return;
    onIndexChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onIndexChange]);
  const next = useCallback(() => {
    if (index === null) return;
    onIndexChange((index + 1) % images.length);
  }, [index, images.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => dialogRef.current?.querySelector<HTMLElement>("[data-close]")?.focus(), 10);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Tab" && dialogRef.current) {
        const f = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button, [href], [tabindex]:not([tabindex='-1'])"));
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      restoreRef.current?.focus();
    };
  }, [open, onClose, prev, next]);

  if (!mounted) return null;
  const img = index !== null ? images[index] : null;

  return createPortal(
    <AnimatePresence>
      {open && img && (
        <motion.div
          key="lightbox"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${index + 1} of ${images.length}: ${img.alt}`}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25, ease: easeOut }}
          className="fixed inset-0 z-[200] flex flex-col bg-black/90 text-white backdrop-blur-sm"
          onClick={onClose}
          onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStart.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStart.current;
            if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
            touchStart.current = null;
          }}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6" onClick={(e) => e.stopPropagation()}>
            <p className="font-mono text-[0.75rem] tracking-[0.08em] text-white/70" aria-live="polite">
              {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </p>
            <button data-close type="button" onClick={onClose} aria-label="Close image viewer" className="grid size-11 place-items-center rounded-full border border-white/20 bg-white/10 transition-colors hover:bg-white/20">
              <Icon name="close" size={20} />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-14 pb-4 md:px-24">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={img.src}
                initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: easeOut }}
                className="flex max-h-full max-w-full flex-col items-center gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={`${img.src}.webp`}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  className={cn("max-h-[calc(100vh-11rem)] w-auto max-w-full rounded-lg object-contain shadow-2xl", img.frame === "phone" && "rounded-[1.5rem]")}
                />
                {img.caption && <figcaption className="max-w-xl text-center text-small text-white/70">{img.caption}</figcaption>}
              </motion.figure>
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 transition-colors hover:bg-white/20 md:left-6"
                >
                  <Icon name="arrowLeft" size={20} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 transition-colors hover:bg-white/20 md:right-6"
                >
                  <Icon name="arrowRight" size={20} />
                </button>
              </>
            )}
          </div>
          <p className="pb-4 text-center text-[0.75rem] text-white/40">Use ← → to navigate · Esc to close</p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
