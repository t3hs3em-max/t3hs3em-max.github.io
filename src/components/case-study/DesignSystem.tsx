import type { DesignSystemSpec } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { Note } from "@/components/ui/Primitives";

/**
 * The design-system section renders *live* components from the project's
 * own tokens (not screenshots), so the section demonstrates the system
 * rather than describing it.
 */
export function DesignSystemSection({ ds }: { ds: DesignSystemSpec }) {
  const t = ds.theme;
  const style = {
    ["--p" as string]: t.primary,
    ["--p-ink" as string]: t.primaryInk,
    ["--s" as string]: t.surface,
    ["--b" as string]: t.bg,
    ["--t" as string]: t.text,
    ["--m" as string]: t.muted,
    ["--l" as string]: t.border,
    ["--r" as string]: t.radius,
    fontFamily: t.font === "inherit" ? undefined : t.font,
  } as React.CSSProperties;

  return (
    <div className="flex flex-col gap-10">
      {/* Colours */}
      <div>
        <h3 className="text-h4 font-medium text-ink">Colour</h3>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {ds.colors.map((c) => (
            <li key={c.name} className="surface-card overflow-hidden">
              <div className="h-16 border-b border-border" style={{ background: c.hex }} />
              <div className="p-3">
                <p className="text-small font-medium text-ink">{c.name}</p>
                <p className="font-mono text-[0.6875rem] text-muted">{c.hex}</p>
                <p className="mt-1 text-[0.75rem] text-text-2">{c.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Typography */}
      <div>
        <h3 className="text-h4 font-medium text-ink">Typography</h3>
        <ul className="mt-4 divide-y divide-border rounded-[var(--radius-lg)] border border-border bg-surface">
          {ds.type.map((row) => (
            <li key={row.name} className="grid gap-2 p-4 md:grid-cols-[180px_1fr] md:items-baseline md:gap-8">
              <div>
                <p className="text-small font-medium text-ink">{row.name}</p>
                <p className="font-mono text-[0.6875rem] text-muted">
                  {row.family} · {row.size} · {row.weight}
                </p>
              </div>
              <p className="truncate text-ink" style={{ fontSize: `clamp(1rem, ${parseInt(row.size) / 16}rem, 2.25rem)`, fontWeight: Number(row.weight) || 400, fontFamily: row.family.toLowerCase().includes("serif") && !row.family.toLowerCase().includes("sans") ? "var(--font-display)" : undefined }}>
                {row.sample}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Live components */}
      <div>
        <h3 className="text-h4 font-medium text-ink">Components</h3>
        <p className="mt-1 text-small text-muted">Rendered live from the tokens above: buttons, inputs, a card, tags and icons.</p>
        <div className="mt-4 rounded-[var(--radius-xl)] border border-border p-5 md:p-8" style={{ ...style, background: "var(--b)", color: "var(--t)" }}>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-5">
              <div>
                <p className="mb-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em]" style={{ color: "var(--m)" }}>
                  Buttons
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex h-10 items-center px-4 text-[0.875rem] font-semibold" style={{ background: "var(--p)", color: "var(--p-ink)", borderRadius: "var(--r)" }}>
                    Primary
                  </span>
                  <span className="inline-flex h-10 items-center px-4 text-[0.875rem] font-semibold" style={{ background: "color-mix(in srgb, var(--p) 85%, black)", color: "var(--p-ink)", borderRadius: "var(--r)" }}>
                    Hover
                  </span>
                  <span className="inline-flex h-10 items-center px-4 text-[0.875rem] font-semibold" style={{ background: "var(--s)", color: "var(--t)", border: "1px solid var(--l)", borderRadius: "var(--r)" }}>
                    Secondary
                  </span>
                  <span className="inline-flex h-10 items-center px-4 text-[0.875rem] font-semibold opacity-50" style={{ background: "var(--l)", color: "var(--m)", borderRadius: "var(--r)" }}>
                    Disabled
                  </span>
                </div>
              </div>
              <div>
                <p className="mb-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em]" style={{ color: "var(--m)" }}>
                  Inputs
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex h-10 items-center px-3 text-[0.875rem]" style={{ background: "var(--s)", border: "1px solid var(--l)", borderRadius: "var(--r)", color: "var(--m)" }}>
                    Placeholder
                  </div>
                  <div className="flex h-10 items-center px-3 text-[0.875rem]" style={{ background: "var(--s)", border: "1.5px solid var(--p)", boxShadow: "0 0 0 4px color-mix(in srgb, var(--p) 20%, transparent)", borderRadius: "var(--r)", color: "var(--t)" }}>
                    Focused value
                  </div>
                  <div>
                    <div className="flex h-10 items-center px-3 text-[0.875rem]" style={{ background: "var(--s)", border: "1.5px solid #d14343", borderRadius: "var(--r)", color: "var(--t)" }}>
                      Invalid value
                    </div>
                    <p className="mt-1 flex items-center gap-1 text-[0.75rem]" style={{ color: "#d14343" }}>
                      <Icon name="alert" size={12} /> Please enter a valid email
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="mb-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em]" style={{ color: "var(--m)" }}>
                  Tags & icons
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {["Active", "Pending", "Done"].map((tag, i) => (
                    <span key={tag} className="inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[0.75rem] font-medium" style={{ background: i === 0 ? "color-mix(in srgb, var(--p) 18%, var(--s))" : "var(--s)", color: i === 0 ? "var(--p)" : "var(--t)", border: "1px solid var(--l)" }}>
                      <span className="size-1.5 rounded-full" style={{ background: i === 0 ? "var(--p)" : "var(--m)" }} />
                      {tag}
                    </span>
                  ))}
                  <span className="ml-2 flex items-center gap-2" style={{ color: "var(--t)" }}>
                    <Icon name="search" size={18} />
                    <Icon name="grid" size={18} />
                    <Icon name="mail" size={18} />
                    <Icon name="check" size={18} />
                    <Icon name="plus" size={18} />
                  </span>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em]" style={{ color: "var(--m)" }}>
                Card
              </p>
              <div className="overflow-hidden" style={{ background: "var(--s)", border: "1px solid var(--l)", borderRadius: `calc(var(--r) + 6px)` }}>
                <div className="h-28" style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--p) 35%, var(--s)), color-mix(in srgb, var(--p) 8%, var(--s)))" }} />
                <div className="p-4">
                  <p className="text-[0.9375rem] font-semibold" style={{ color: "var(--t)" }}>
                    Card title
                  </p>
                  <p className="mt-1 text-[0.8125rem]" style={{ color: "var(--m)" }}>
                    Supporting copy explaining the item in one or two lines.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[0.9375rem] font-semibold" style={{ color: "var(--t)" }}>
                      Detail
                    </span>
                    <span className="inline-flex h-8 items-center px-3 text-[0.8125rem] font-semibold" style={{ background: "var(--p)", color: "var(--p-ink)", borderRadius: "var(--r)" }}>
                      Action
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {ds.radius.map((r) => (
                  <div key={r.name} className="flex flex-col items-center gap-1.5">
                    <div className="h-12 w-full" style={{ background: "var(--s)", border: "1px solid var(--l)", borderRadius: r.value }} />
                    <span className="font-mono text-[0.625rem]" style={{ color: "var(--m)" }}>
                      {r.name} · {r.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {(ds.spacing || ds.notes) && (
        <div className="flex flex-col gap-3">
          {ds.spacing && (
            <Note>
              <strong className="font-medium text-ink">Spacing: </strong>
              {ds.spacing}
            </Note>
          )}
          {ds.notes?.map((n) => (
            <Note key={n}>{n}</Note>
          ))}
        </div>
      )}
    </div>
  );
}
