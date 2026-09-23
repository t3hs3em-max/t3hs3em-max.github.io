import type { JourneyStage } from "@/content/types";

const faces = ["", "😣", "😕", "😐", "🙂", "😃"];
const labels = ["", "Frustrated", "Uneasy", "Neutral", "Content", "Delighted"];

/**
 * Journey map: stage columns with an SVG emotion curve across the top.
 * The curve is a smooth path through the `feeling` values (1–5).
 */
export function JourneyMap({ stages, accent }: { stages: JourneyStage[]; accent: string }) {
  const n = stages.length;
  const W = 100 * n;
  const H = 120;
  const pts = stages.map((s, i) => ({ x: i * 100 + 50, y: H - 16 - ((s.feeling - 1) / 4) * (H - 40) }));
  const d = pts
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = pts[i - 1];
      const cx = (prev.x + p.x) / 2;
      return `C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
    })
    .join(" ");

  return (
    <div className="overflow-x-auto pb-2" tabIndex={0} role="region" aria-label="User journey map (scrollable)">
      <div style={{ minWidth: `${Math.max(n * 164, 560)}px` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="h-[120px] w-full" role="img" aria-label={`Emotion curve across ${n} stages: ${stages.map((s) => `${s.stage} ${labels[s.feeling].toLowerCase()}`).join(", ")}`} preserveAspectRatio="none">
          {[1, 2, 3, 4, 5].map((v) => (
            <line key={v} x1="0" x2={W} y1={H - 16 - ((v - 1) / 4) * (H - 40)} y2={H - 16 - ((v - 1) / 4) * (H - 40)} stroke="var(--border)" strokeDasharray="2 4" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          ))}
          <path d={d} fill="none" stroke={accent} strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
          {pts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="5" fill="var(--surface)" stroke={accent} strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        <ol className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-border bg-border" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {stages.map((s, i) => (
            <li key={s.stage} className="flex flex-col gap-3 bg-surface p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.6875rem] text-muted">0{i + 1}</span>
                <span className="text-lg" aria-label={labels[s.feeling]} title={labels[s.feeling]}>
                  {faces[s.feeling]}
                </span>
              </div>
              <h3 className="text-[0.9375rem] font-medium text-ink">{s.stage}</h3>
              <dl className="flex flex-col gap-2.5 text-[0.8125rem] leading-snug">
                <div>
                  <dt className="eyebrow !text-[0.5625rem]">Doing</dt>
                  <dd className="mt-1 text-text-2">{s.doing}</dd>
                </div>
                <div>
                  <dt className="eyebrow !text-[0.5625rem]">Thinking</dt>
                  <dd className="mt-1 text-text-2 italic">“{s.thinking}”</dd>
                </div>
                <div className="mt-auto rounded-md px-2.5 py-2" style={{ background: "var(--accent-soft)" }}>
                  <dt className="eyebrow !text-[0.5625rem] !text-accent-text">Opportunity</dt>
                  <dd className="mt-1 text-text">{s.opportunity}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
