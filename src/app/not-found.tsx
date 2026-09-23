import type { Metadata } from "next";
import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/Button";
import { Em } from "@/components/ui/Primitives";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <Page>
      <section className="container-x flex min-h-[70vh] flex-col items-start justify-center pt-[var(--header-h)]">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-h1 font-medium tracking-tight text-ink">
          This page took a <Em>wrong turn.</Em>
        </h1>
        <p className="mt-5 max-w-md text-lead text-text-2">The link may be old or mistyped. The work and contact pages are one click away.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" icon="arrowLeft" iconPosition="left">
            Back home
          </Button>
          <Button href="/work" variant="secondary" icon="arrowRight">
            View work
          </Button>
        </div>
      </section>
    </Page>
  );
}
