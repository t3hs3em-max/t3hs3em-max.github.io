import type { Metadata } from "next";
import { Page } from "@/components/layout/Page";
import { ContactForm } from "@/components/contact/ContactForm";
import { Em } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact — Hire a UI/UX Designer",
  description: `Get in touch with ${site.name} for UI/UX design, product design, mobile app and web app projects. Email, phone, LinkedIn and Fiverr.`,
  alternates: { canonical: "/contact/" },
  openGraph: { title: `Contact ${site.name} — UI/UX Designer`, url: "/contact/" },
};

export default function ContactPage() {
  return (
    <Page>
      <section className="relative overflow-hidden pt-[calc(var(--header-h)+3rem)] pb-[var(--section)] md:pt-[calc(var(--header-h)+5rem)]" aria-labelledby="contact-title">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-dots opacity-60" aria-hidden />
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Have a project in mind?</p>
            <h1 id="contact-title" className="mt-4 text-h1 font-medium tracking-tight text-ink">
              Let&apos;s create something <Em>meaningful.</Em>
            </h1>
            <p className="mt-6 max-w-lg text-lead text-text-2">
              Tell me about the product, the people it&apos;s for and your timeline. I usually reply within a day or two with a clear next step.
            </p>

            <ul className="mt-10 flex flex-col divide-y divide-border border-y border-border">
              <li>
                <a href={`mailto:${site.email}`} className="group flex items-center gap-4 py-4 transition-colors hover:text-ink">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-2 text-text-2 transition-colors group-hover:bg-accent-soft group-hover:text-accent-text">
                    <Icon name="mail" size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="eyebrow block">Email</span>
                    <span className="mt-0.5 block truncate text-[0.9375rem] font-medium text-ink">{site.email}</span>
                  </span>
                  <Icon name="arrowUpRight" size={16} className="ml-auto text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="group flex items-center gap-4 py-4 transition-colors hover:text-ink">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-2 text-text-2 transition-colors group-hover:bg-accent-soft group-hover:text-accent-text">
                    <Icon name="phone" size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="eyebrow block">Phone / WhatsApp</span>
                    <span className="mt-0.5 block text-[0.9375rem] font-medium text-ink">{site.phone}</span>
                  </span>
                  <Icon name="arrowUpRight" size={16} className="ml-auto text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-4 transition-colors hover:text-ink">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-2 font-mono text-[0.75rem] font-medium text-text-2 transition-colors group-hover:bg-accent-soft group-hover:text-accent-text">{s.label.slice(0, 2)}</span>
                    <span className="min-w-0">
                      <span className="eyebrow block">{s.label}</span>
                      <span className="mt-0.5 block text-[0.9375rem] font-medium text-ink">{s.handle}</span>
                    </span>
                    <Icon name="arrowUpRight" size={16} className="ml-auto text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-small text-muted">{site.location}. {site.availability}.</p>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact/" }])} />
    </Page>
  );
}
