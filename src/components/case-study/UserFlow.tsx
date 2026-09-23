import type { FlowEdge, FlowNode } from "@/content/types";
import { readableOn } from "@/lib/utils";

const NODE_W = 200;
const GAP_X = 36;
const GAP_Y = 48;
const PAD = 16;
const LOOP_MARGIN = 56;

function nodeHeight(n: FlowNode) {
  if (n.kind === "decision") return 92;
  if (n.kind === "start" || n.kind === "end") return 54;
  return n.label.length > 44 ? 80 : 64;
}

/**
 * Auto-laid-out, top-to-bottom flow chart. Ranks come from longest-path
 * over forward edges; nodes on the same rank sit side by side; back edges
 * (loops) curve around the right margin. Labels use foreignObject so text
 * wraps naturally, and a text list provides the same information for
 * screen readers.
 */
export function UserFlow({ nodes, edges, accent }: { nodes: FlowNode[]; edges: FlowEdge[]; accent: string }) {
  const index = new Map(nodes.map((n, i) => [n.id, i]));
  const rank = new Map<string, number>(nodes.map((n) => [n.id, 0]));
  const forward = edges.filter((e) => (index.get(e.to) ?? 0) > (index.get(e.from) ?? 0));
  const back = edges.filter((e) => !forward.includes(e));
  for (let pass = 0; pass < nodes.length; pass++) {
    for (const e of forward) rank.set(e.to, Math.max(rank.get(e.to) ?? 0, (rank.get(e.from) ?? 0) + 1));
  }
  const rows = new Map<number, FlowNode[]>();
  for (const n of nodes) {
    const r = rank.get(n.id) ?? 0;
    rows.set(r, [...(rows.get(r) ?? []), n]);
  }
  const maxRank = Math.max(...rank.values());
  const maxPerRow = Math.max(...[...rows.values()].map((r) => r.length));
  const contentW = maxPerRow * NODE_W + (maxPerRow - 1) * GAP_X;
  const W = PAD * 2 + contentW + (back.length ? LOOP_MARGIN : 0);

  const pos = new Map<string, { x: number; y: number; w: number; h: number }>();
  let y = PAD;
  for (let r = 0; r <= maxRank; r++) {
    const ns = rows.get(r) ?? [];
    const rowW = ns.length * NODE_W + (ns.length - 1) * GAP_X;
    let x = PAD + (contentW - rowW) / 2;
    const rowH = Math.max(...ns.map(nodeHeight));
    for (const n of ns) {
      const h = nodeHeight(n);
      pos.set(n.id, { x, y: y + (rowH - h) / 2, w: NODE_W, h });
      x += NODE_W + GAP_X;
    }
    y += rowH + GAP_Y;
  }
  const H = y - GAP_Y + PAD;

  const path = (e: FlowEdge, isBack: boolean) => {
    const a = pos.get(e.from)!;
    const b = pos.get(e.to)!;
    if (!isBack) {
      const x1 = a.x + a.w / 2;
      const y1 = a.y + a.h;
      const x2 = b.x + b.w / 2;
      const y2 = b.y;
      const c = Math.max(18, (y2 - y1) / 2);
      return { d: `M ${x1} ${y1} C ${x1} ${y1 + c}, ${x2} ${y2 - c}, ${x2} ${y2}`, lx: (x1 + x2) / 2, ly: (y1 + y2) / 2 };
    }
    const x1 = a.x + a.w;
    const y1 = a.y + a.h / 2;
    const x2 = b.x + b.w;
    const y2 = b.y + b.h / 2;
    const out = PAD + contentW + LOOP_MARGIN - 10;
    return { d: `M ${x1} ${y1} C ${out} ${y1}, ${out} ${y2}, ${x2 + 4} ${y2}`, lx: out - 4, ly: (y1 + y2) / 2 };
  };

  return (
    <div>
      <div className="overflow-x-auto pb-2" tabIndex={0} role="region" aria-label="User flow diagram (scrollable)">
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="mx-auto block max-w-full" style={{ height: "auto" }} role="img" aria-labelledby="flow-desc">
          <title id="flow-desc">User flow diagram; a text version follows.</title>
          <defs>
            <marker id="flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--border-strong)" />
            </marker>
          </defs>
          {[...forward.map((e) => ({ e, back: false })), ...back.map((e) => ({ e, back: true }))].map(({ e, back: isBack }, i) => {
            const p = path(e, isBack);
            return (
              <g key={i}>
                <path d={p.d} fill="none" stroke="var(--border-strong)" strokeWidth="1.5" strokeDasharray={isBack ? "4 4" : undefined} markerEnd="url(#flow-arrow)" />
                {e.label && (
                  <g>
                    <rect x={p.lx - 17} y={p.ly - 10} width="34" height="20" rx="10" fill="var(--surface)" stroke="var(--border)" />
                    <text x={p.lx} y={p.ly + 4} textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill="var(--text-2)">
                      {e.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
          {nodes.map((n) => {
            const p = pos.get(n.id)!;
            const isTerminal = n.kind === "start" || n.kind === "end";
            const isDecision = n.kind === "decision";
            return (
              <g key={n.id}>
                {isDecision ? (
                  <polygon points={`${p.x + p.w / 2},${p.y} ${p.x + p.w},${p.y + p.h / 2} ${p.x + p.w / 2},${p.y + p.h} ${p.x},${p.y + p.h / 2}`} fill="var(--surface)" stroke={accent} strokeWidth="1.5" />
                ) : (
                  <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={isTerminal ? p.h / 2 : 12} fill={isTerminal ? accent : "var(--surface)"} stroke={isTerminal ? accent : "var(--border)"} strokeWidth="1.5" />
                )}
                <foreignObject x={p.x + (isDecision ? 28 : 12)} y={p.y} width={p.w - (isDecision ? 56 : 24)} height={p.h}>
                  <div
                    // @ts-expect-error xmlns is valid on the wrapper inside foreignObject
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontSize: isTerminal ? 13 : 12, lineHeight: 1.3, fontWeight: isTerminal ? 600 : 500, color: isTerminal ? readableOn(accent) : "var(--ink)", fontFamily: "var(--font-sans)" }}
                  >
                    {n.label}
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>
      <ol className="sr-only">
        {nodes.map((n) => (
          <li key={n.id}>
            {n.label}
            {edges.filter((e) => e.from === n.id).map((e) => ` → ${nodes.find((x) => x.id === e.to)?.label}${e.label ? ` (${e.label})` : ""}`).join("; ")}
          </li>
        ))}
      </ol>
    </div>
  );
}
