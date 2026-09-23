import { ViewTransition } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Wraps every route's content. The View Transition gives route changes a
 * short fade/rise (old page out fast, new page in gently); shared project
 * images morph between the card and the case-study hero. Reduced-motion
 * users get an instant swap via the CSS in globals.css.
 */
export function Page({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <main id="main" className={cn("flex-1", className)} tabIndex={-1}>
        {children}
      </main>
    </ViewTransition>
  );
}
