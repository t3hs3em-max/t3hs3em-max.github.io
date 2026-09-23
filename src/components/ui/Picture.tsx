import type { ComponentProps } from "react";
import type { ProjectImage } from "@/content/types";
import { cn } from "@/lib/utils";

interface PictureProps extends Omit<ComponentProps<"img">, "src" | "alt" | "width" | "height" | "srcSet"> {
  image: ProjectImage;
  /** CSS `sizes` hint so the browser picks the smaller file when it can. */
  sizes?: string;
  priority?: boolean;
}

/**
 * Responsive image: every project image exists as `<name>.webp` (full) and
 * `<name>-800.webp` (half). Intrinsic width/height are always set so the
 * layout never shifts while the image loads.
 */
export function Picture({ image, sizes = "(min-width: 1024px) 50vw, 100vw", priority = false, className, ...rest }: PictureProps) {
  const full = `${image.src}.webp`;
  const small = `${image.src}-800.webp`;
  return (
    <img
      src={full}
      srcSet={`${small} 800w, ${full} ${image.width}w`}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : undefined}
      className={cn("h-auto w-full", className)}
      {...rest}
    />
  );
}
