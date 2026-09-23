import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap select-none rounded-full transition-[background-color,color,border-color,transform,box-shadow] duration-200 ease-[var(--ease-out)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-bg hover:bg-accent hover:text-accent-ink shadow-sm hover:shadow-md",
  secondary: "bg-transparent text-ink border border-border-strong hover:border-ink hover:bg-surface",
  ghost: "bg-transparent text-text-2 hover:text-ink hover:bg-surface-2",
  accent: "bg-accent text-accent-ink hover:bg-accent-hover shadow-sm hover:shadow-md",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-[3.25rem] px-7 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconPosition?: "left" | "right";
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps & Omit<ComponentProps<"button">, "children" | "className"> & { href?: undefined };
type ExternalHref = `https://${string}` | `http://${string}` | `mailto:${string}` | `tel:${string}` | `#${string}`;
type LinkHref = ComponentProps<typeof Link>["href"];
type ButtonAsLink = CommonProps & Omit<ComponentProps<typeof Link>, "children" | "className" | "href"> & { href: LinkHref | ExternalHref };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * The single button used across the site. Icons animate on hover: an arrow
 * slides right, an up-right arrow nudges diagonally — small, purposeful
 * feedback rather than decoration.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", icon, iconPosition = "right", className, children } = props;

  const iconEl = icon ? (
    <Icon
      name={icon}
      size={size === "sm" ? 16 : 18}
      className={cn(
        "shrink-0 transition-transform duration-300 ease-[var(--ease-out)]",
        icon === "arrowRight" && "group-hover/btn:translate-x-0.5",
        icon === "arrowUpRight" && "group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5",
        icon === "arrowDown" && "group-hover/btn:translate-y-0.5",
        icon === "arrowLeft" && "group-hover/btn:-translate-x-0.5",
      )}
    />
  ) : null;

  const content = (
    <>
      {iconPosition === "left" && iconEl}
      <span>{children}</span>
      {iconPosition === "right" && iconEl}
    </>
  );

  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, variant: _v, size: _s, icon: _i, iconPosition: _p, className: _c, children: _ch, ...rest } = props;
    const isExternal = typeof href === "string" && /^https?:|^mailto:|^tel:|^#/.test(href);
    if (isExternal) {
      const h = href as string;
      return (
        <a href={h} className={classes} {...(rest as ComponentProps<"a">)} rel={h.startsWith("http") ? "noopener noreferrer" : undefined} target={h.startsWith("http") ? "_blank" : undefined}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href as LinkHref} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const { variant: _v, size: _s, icon: _i, iconPosition: _p, className: _c, children: _ch, ...rest } = props as ButtonAsButton;
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
