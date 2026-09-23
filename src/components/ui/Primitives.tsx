import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ---------- Layout ---------- */

export function Container({ className, ...rest }: ComponentProps<"div">) {
  return <div className={cn("container-x", className)} {...rest} />;
}

export function Section({ className, ...rest }: ComponentProps<"section">) {
  return <section className={cn("section-y", className)} {...rest} />;
}

/* ---------- Typography ---------- */

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
  action?: ReactNode;
}

/**
 * Editorial heading block: mono eyebrow with a numbered feel, a large
 * heading and an optional description. Used at the top of every section so
 * hierarchy is identical everywhere.
 */
export function SectionHeading({ eyebrow, title, description, align = "left", className, as: Tag = "h2", action }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-5 md:flex-row md:items-end md:justify-between", align === "center" && "md:flex-col md:items-center text-center", className)}>
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <Tag className={cn(Tag === "h1" ? "text-h1" : "text-h2", "font-medium tracking-tight")}>{title}</Tag>
        {description && <p className="mt-4 text-lead text-text-2">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Italic serif emphasis inside a heading: "Simple and <Em>meaningful</Em>". */
export function Em({ children, className }: { children: ReactNode; className?: string }) {
  return <em className={cn("font-display-italic text-[1.06em] text-accent-text", className)}>{children}</em>;
}

/* ---------- Small labels ---------- */

export function Tag({ className, children, tone = "neutral", ...rest }: ComponentProps<"span"> & { tone?: "neutral" | "accent" | "success" | "warning" }) {
  const tones = {
    neutral: "bg-surface-2 text-text-2 border-transparent",
    accent: "bg-accent-soft text-accent-text border-transparent",
    success: "bg-success-soft text-success border-transparent",
    warning: "bg-[color:var(--tint-peach)] text-[color:#8a4a1e] dark:text-[color:#ffb58a] border-transparent",
  };
  return (
    <span className={cn("inline-flex h-7 items-center rounded-full border px-3 text-[0.75rem] font-medium tracking-[0.01em]", tones[tone], className)} {...rest}>
      {children}
    </span>
  );
}

export function Chip({ className, children, ...rest }: ComponentProps<"span">) {
  return (
    <span className={cn("inline-flex h-9 items-center gap-2 rounded-full border border-border bg-surface px-4 text-[0.875rem] text-text", className)} {...rest}>
      {children}
    </span>
  );
}

/** Two-column meta row used in overviews: label / value. */
export function Meta({ label, value, className }: { label: string; value: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <dt className="eyebrow">{label}</dt>
      <dd className="text-[0.9375rem] leading-snug text-ink">{value}</dd>
    </div>
  );
}

/* ---------- Cards ---------- */

export function Card({ className, ...rest }: ComponentProps<"div">) {
  return <div className={cn("surface-card", className)} {...rest} />;
}

/** Marks content that is a placeholder / assumption without breaking the layout. */
export function Placeholder({ title, children, className }: { title: string; children?: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[var(--radius-lg)] border border-dashed border-border-strong bg-surface-2/60 p-6 md:p-8", className)}>
      <p className="eyebrow mb-2">Pending content</p>
      <p className="font-medium text-ink">{title}</p>
      {children && <div className="mt-2 text-small text-text-2">{children}</div>}
    </div>
  );
}

export function Note({ children, className, tone = "neutral" }: { children: ReactNode; className?: string; tone?: "neutral" | "accent" }) {
  return (
    <div className={cn("rounded-[var(--radius-md)] border px-4 py-3 text-small leading-relaxed", tone === "accent" ? "border-accent/20 bg-accent-soft/60 text-text-2" : "border-border bg-surface-2/60 text-text-2", className)}>
      {children}
    </div>
  );
}
