"use client";

import { useState } from "react";
import type { ProjectImage } from "@/content/types";
import { DeviceFrame } from "./DeviceFrame";
import { Lightbox } from "./Lightbox";
import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: ProjectImage[];
  /** "auto" lays phones in a 2–3 column grid and browser shots full width. */
  layout?: "auto" | "phones" | "stack";
  className?: string;
  captions?: boolean;
}

/**
 * Grid of framed screens; every item opens the shared Lightbox. Buttons (not
 * divs) so keyboard users can open images, with the alt text as the label.
 */
export function ImageGallery({ images, layout = "auto", className, captions = true }: ImageGalleryProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <RevealGroup as="div" className={cn(layout === "stack" ? "flex flex-col gap-10" : "grid gap-8 sm:grid-cols-2 lg:grid-cols-3", className)} stagger={0.06}>
        {images.map((img, i) => {
          const wide = img.frame === "browser" && layout === "auto";
          return (
            <RevealItem key={img.src} as="figure" className={cn("group/fig flex flex-col gap-3", wide && "sm:col-span-2 lg:col-span-3")}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="relative rounded-[var(--radius-lg)] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                aria-label={`Open full-screen: ${img.alt}`}
                data-cursor="Zoom"
              >
                <DeviceFrame image={img} className={cn(img.frame === "phone" && "transition-transform duration-500 ease-[var(--ease-out)] group-hover/fig:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover/fig:translate-y-0")} />
                <span className="pointer-events-none absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-white/90 text-black opacity-0 shadow-md transition-opacity duration-300 group-hover/fig:opacity-100 group-focus-visible/fig:opacity-100 [@media(hover:none)]:opacity-100" aria-hidden>
                  <Icon name="zoom" size={16} />
                </span>
              </button>
              {captions && img.caption && <figcaption className="text-small text-muted">{img.caption}</figcaption>}
            </RevealItem>
          );
        })}
      </RevealGroup>
      <Lightbox images={images} index={active} onClose={() => setActive(null)} onIndexChange={setActive} />
    </>
  );
}
