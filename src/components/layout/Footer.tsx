import Link from "next/link";
import type { Route } from "next";
import { nav, site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-bg">
      <div className="container-x py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <ProfileAvatar />
              <span className="text-[0.9375rem] font-medium tracking-tight text-ink">{site.name}</span>
            </Link>
            <p className="mt-5 max-w-sm text-small text-muted">
              {site.roles.join(" · ")}. {site.location}.
            </p>
            <a href={`mailto:${site.email}`} className="mt-4 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink underline-offset-4 hover:underline">
              <Icon name="mail" size={16} className="text-muted" />
              {site.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow mb-4">Explore</p>
            <ul className="flex flex-col gap-2.5">
              {[{ label: "Home", href: "/" as Route }, ...nav].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-[0.9375rem] text-text-2 transition-colors hover:text-ink">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-4">Elsewhere</p>
            <ul className="flex flex-col gap-2.5">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-[0.9375rem] text-text-2 transition-colors hover:text-ink">
                    {s.label}
                    <Icon name="arrowUpRight" size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
              <li>
                <a href={site.phoneHref} className="text-[0.9375rem] text-text-2 transition-colors hover:text-ink">
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-small text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.fullName}. All rights reserved.</p>
          <p>Designed and built with intent · Figma, Next.js, care.</p>
        </div>
      </div>
    </footer>
  );
}
