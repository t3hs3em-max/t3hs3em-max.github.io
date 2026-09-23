import type { ReactNode } from "react";
import type { ProjectImage } from "@/content/types";
import { Picture } from "@/components/ui/Picture";
import { cn } from "@/lib/utils";

/**
 * Device chrome drawn in CSS so real screenshots (or the user's own
 * exports) drop in at their native aspect ratio. Frames are decorative and
 * hidden from assistive tech; the image alt carries the meaning.
 */
export function DeviceFrame({ image, className, sizes, priority, children }: { image: ProjectImage; className?: string; sizes?: string; priority?: boolean; children?: ReactNode }) {
  const frame = image.frame ?? "none";
  if (frame === "phone") {
    return (
      <div className={cn("relative mx-auto w-full max-w-[340px]", className)}>
        <div className="rounded-[2.6rem] bg-[#0b0b0d] p-[7px] shadow-lg ring-1 ring-black/10 dark:ring-white/10">
          <div className="relative overflow-hidden rounded-[2.15rem] bg-[#111]" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
            <Picture image={image} sizes={sizes ?? "(min-width: 768px) 340px, 80vw"} priority={priority} className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute left-1/2 top-3 size-3 -translate-x-1/2 rounded-full bg-[#0b0b0d] ring-2 ring-white/5" aria-hidden />
          </div>
        </div>
        {children}
      </div>
    );
  }
  if (frame === "browser") {
    const tall = image.height / image.width > 0.85;
    return (
      <div className={cn("relative w-full overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-md", className)}>
        <div className="flex h-10 items-center gap-1.5 border-b border-border bg-surface-2 px-4" aria-hidden>
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="ml-3 h-5 flex-1 rounded-md border border-border bg-surface" />
        </div>
        {tall ? (
          <div className="max-h-[560px] overflow-y-auto overscroll-contain md:max-h-[680px]" tabIndex={0} role="region" aria-label="Full-page design (scroll to see more)">
            <Picture image={image} sizes={sizes ?? "(min-width: 1024px) 1200px, 100vw"} priority={priority} className="w-full" />
          </div>
        ) : (
          <Picture image={image} sizes={sizes ?? "(min-width: 1024px) 1200px, 100vw"} priority={priority} className="w-full" />
        )}
        {children}
      </div>
    );
  }
  return (
    <div className={cn("relative overflow-hidden rounded-[var(--radius-lg)] border border-border", className)}>
      <Picture image={image} sizes={sizes} priority={priority} />
      {children}
    </div>
  );
}
