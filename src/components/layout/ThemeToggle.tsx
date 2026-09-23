"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const subscribeNoop = () => () => {};

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  const isDark = mounted && resolvedTheme === "dark";
  const label = mounted ? (isDark ? "Switch to light mode" : "Switch to dark mode") : "Toggle colour theme";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={cn(
        "relative grid size-10 place-items-center rounded-full border border-border bg-surface/70 text-text-2 backdrop-blur transition-colors hover:border-border-strong hover:text-ink",
        className,
      )}
    >
      <span className={cn("absolute transition-all duration-300 ease-[var(--ease-out)]", isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100")}>
        <Icon name="moon" size={18} />
      </span>
      <span className={cn("absolute transition-all duration-300 ease-[var(--ease-out)]", isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0")}>
        <Icon name="sun" size={18} />
      </span>
    </button>
  );
}
