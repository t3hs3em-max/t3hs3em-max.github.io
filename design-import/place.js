// Places the enhanced screens into the open Figma file.
// Run inside the Figma editor tab (window.figma = Plugin API) after loading builder.js:
//   window.__figPlaceRun(BASE, figma.fileKey)   → starts in the background
//   window.__placeState                          → { done, results | err }
// BASE = "https://raw.githubusercontent.com/<owner>/<repo>/main/design-import/"
window.__figPlace = async function (base, fileKey, only) {
  const F = window.figma;
  const manifest = await fetch(base + 'manifest.json', { cache: 'no-store' }).then(r => r.json());
  const cfg = manifest[fileKey];
  if (!cfg) throw new Error('No manifest entry for ' + fileKey);
  if (cfg.page) {
    const pg = F.root.children.find(p => p.id === cfg.page);
    if (pg) await F.setCurrentPageAsync(pg);
  }
  const results = [];
  for (const sec of cfg.sections) {
    if (only && !only.includes(sec.name)) continue;
    // idempotent: replace a previous run of the same section
    for (const n of F.currentPage.children.filter(n => n.type === 'SECTION' && n.name === sec.name)) n.remove();
    const items = [];
    for (const [id, name] of sec.screens) items.push([await fetch(base + 'json/' + id + '.json', { cache: 'no-store' }).then(r => r.json()), name]);
    const cols = sec.cols, gap = sec.gap, pad = sec.pad;
    const rows = Math.ceil(items.length / cols);
    const colW = Array(cols).fill(0), rowH = Array(rows).fill(0);
    items.forEach(([j], i) => { const c = i % cols, r = Math.floor(i / cols); colW[c] = Math.max(colW[c], j.w); rowH[r] = Math.max(rowH[r], j.h); });
    const sum = a => a.reduce((x, y) => x + y, 0);
    const W = pad * 2 + sum(colW) + gap * (cols - 1);
    const H = pad * 2 + sum(rowH) + gap * (rows - 1);
    const s = F.createSection();
    s.name = sec.name;
    s.x = sec.x; s.y = sec.y;
    s.resizeWithoutConstraints(W, H);
    for (let i = 0; i < items.length; i++) {
      const [j, name] = items[i];
      const c = i % cols, r = Math.floor(i / cols);
      const x = pad + sum(colW.slice(0, c)) + gap * c;
      const y = pad + sum(rowH.slice(0, r)) + gap * r;
      const st = await window.__figBuild(j, { parent: s, x, y, name, imageBase: base + 'images/' });
      results.push({ section: sec.name, name, id: st.id, frames: st.frames, texts: st.texts, svgs: st.svgs, images: st.images, errors: st.errors.slice(0, 6), errorCount: st.errors.length });
      window.__placeProgress = results.length;
    }
  }
  return results;
};
window.__figPlaceRun = function (base, fileKey, only) {
  window.__placeState = { done: false };
  window.__placeProgress = 0;
  window.__figPlace(base, fileKey, only)
    .then(results => { window.__placeState = { done: true, results }; })
    .catch(e => { window.__placeState = { done: true, err: String(e && e.stack || e).slice(0, 400) }; });
  return 'started';
};
