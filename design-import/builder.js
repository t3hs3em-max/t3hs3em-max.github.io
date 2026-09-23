// Figma-side builder: window.__figBuild(json, { parent, x, y, name, imageBase })
// Runs in the Figma editor page context (window.figma = Plugin API).
window.__figBuild = async function (root, opts = {}) {
  const F = window.figma;
  const stats = { frames: 0, texts: 0, svgs: 0, images: 0, errors: [] };
  // ---------- fonts ----------
  if (!window.__figFonts) {
    const avail = await F.listAvailableFontsAsync();
    const byFam = {};
    for (const f of avail) (byFam[f.fontName.family] = byFam[f.fontName.family] || []).push(f.fontName.style);
    window.__figFonts = { byFam, loaded: new Set() };
  }
  const { byFam, loaded } = window.__figFonts;
  const W = { 100: ['Thin', 'Hairline'], 200: ['ExtraLight', 'Extra Light', 'UltraLight'], 300: ['Light'], 400: ['Regular', 'Normal', 'Book', 'Roman'], 500: ['Medium'], 600: ['SemiBold', 'Semi Bold', 'DemiBold', 'Demi Bold'], 700: ['Bold'], 800: ['ExtraBold', 'Extra Bold', 'UltraBold', 'Heavy'], 900: ['Black', 'Heavy'] };
  function fontFor(r) {
    let fam = r.fam;
    if (!byFam[fam]) { stats.errors.push('missing font ' + fam); fam = 'Inter'; }
    const styles = byFam[fam];
    const want = Math.min(900, Math.max(100, Math.round((r.w || 400) / 100) * 100));
    const order = [100, 200, 300, 400, 500, 600, 700, 800, 900].sort((a, b) => Math.abs(a - want) - Math.abs(b - want) || b - a);
    for (const ww of order) for (const n of W[ww]) {
      const s = r.it ? (n === 'Regular' ? 'Italic' : n + ' Italic') : n;
      if (styles.includes(s)) return { family: fam, style: s };
    }
    return { family: fam, style: styles.includes('Regular') ? 'Regular' : styles[0] };
  }
  async function ensureFont(fn) {
    const k = fn.family + '|' + fn.style;
    if (loaded.has(k)) return;
    await F.loadFontAsync(fn);
    loaded.add(k);
  }
  // collect & preload all fonts
  const need = new Map();
  (function scan(n) { if (n.t === 'T') for (const r of n.runs) { const fn = fontFor(r); need.set(fn.family + '|' + fn.style, fn); } (n.ch || []).forEach(scan); })(root);
  for (const fn of need.values()) { try { await ensureFont(fn); } catch (e) { stats.errors.push('font ' + fn.family + ' ' + fn.style); } }

  // ---------- paints ----------
  const col = c => ({ r: c.r, g: c.g, b: c.b });
  const inv = m => { const [[a, b, c], [d, e, f]] = m; const det = a * e - b * d; return [[e / det, -b / det, (b * f - e * c) / det], [-d / det, a / det, (d * c - a * f) / det]]; };
  const stopsOf = s => s.map(x => ({ color: { r: x.c.r, g: x.c.g, b: x.c.b, a: x.c.a }, position: x.p }));
  const imgCache = window.__figImgCache = window.__figImgCache || {};
  async function imagePaint(f) {
    const base = f.src.split('/').pop();
    const hash = base.replace(/\.[a-z0-9]+$/i, '');
    let h = imgCache[base];
    if (!h) {
      let img = null;
      const isHash = /^[0-9a-f]{40}$/.test(hash);
      if (isHash) { try { img = F.getImageByHash(hash); } catch (e) { img = null; } }
      if (!img && opts.imageBase) { try { img = await F.createImageAsync(opts.imageBase + base); } catch (e) { stats.errors.push('img ' + base + ' ' + String(e).slice(0, 60)); } }
      if (img) h = img.hash; else if (isHash) h = hash; else return null;
      imgCache[base] = h;
    }
    stats.images++;
    return { type: 'IMAGE', imageHash: h, scaleMode: f.fit || 'FILL' };
  }
  async function paints(list, w, h) {
    const out = [];
    for (const f of list || []) {
      if (f.t === 'S') out.push({ type: 'SOLID', color: col(f.c), opacity: f.c.a });
      else if (f.t === 'L') {
        const th = f.angle * Math.PI / 180, dx = Math.sin(th), dy = -Math.cos(th);
        const L = Math.abs(w * Math.sin(th)) + Math.abs(h * Math.cos(th));
        const sx = w / 2 - dx * L / 2, sy = h / 2 - dy * L / 2, ex = w / 2 + dx * L / 2, ey = h / 2 + dy * L / 2;
        const S = { x: sx / w, y: sy / h }, E = { x: ex / w, y: ey / h };
        const Dp = { x: ex - sx, y: ey - sy };
        const Pn = { x: -Dp.y / w, y: Dp.x / h };
        const A = [[E.x - S.x, Pn.x, S.x - 0.5 * Pn.x], [E.y - S.y, Pn.y, S.y - 0.5 * Pn.y]];
        out.push({ type: 'GRADIENT_LINEAR', gradientTransform: inv(A), gradientStops: stopsOf(f.stops) });
      } else if (f.t === 'R') {
        const rx = Math.max(f.rx, 0.0001), ry = Math.max(f.ry, 0.0001);
        out.push({ type: 'GRADIENT_RADIAL', gradientTransform: [[1 / (2 * rx), 0, 0.5 - f.cx / (2 * rx)], [0, 1 / (2 * ry), 0.5 - f.cy / (2 * ry)]], gradientStops: stopsOf(f.stops) });
      } else if (f.t === 'I') { const p = await imagePaint(f); if (p) out.push(p); }
    }
    return out;
  }
  function effects(list) {
    const out = [];
    for (const e of list || []) {
      if (e.t === 'DROP' || e.t === 'IN') out.push({ type: e.t === 'DROP' ? 'DROP_SHADOW' : 'INNER_SHADOW', color: { r: e.c.r, g: e.c.g, b: e.c.b, a: e.c.a }, offset: { x: e.x, y: e.y }, radius: e.blur, spread: e.spread, visible: true, blendMode: 'NORMAL' });
      else if (e.t === 'BG') out.push({ type: 'BACKGROUND_BLUR', radius: e.blur, visible: true });
      else if (e.t === 'LAYER') out.push({ type: 'LAYER_BLUR', radius: e.blur, visible: true });
    }
    return out;
  }
  function setEffects(node, list) {
    const fx = effects(list);
    if (!fx.length) return;
    try { node.effects = fx; } catch (e) {
      try { node.effects = fx.map(x => x.type.includes('BLUR') ? Object.assign({ blurType: 'NORMAL' }, x) : x); } catch (e2) { stats.errors.push('fx ' + String(e2).slice(0, 80)); }
    }
  }

  // ---------- nodes ----------
  async function make(n, parent, px, py) {
    try {
      if (n.t === 'F') {
        const fr = F.createFrame();
        parent.appendChild(fr);
        fr.name = n.n || 'Frame';
        fr.resize(Math.max(0.01, n.w), Math.max(0.01, n.h));
        fr.x = n.x - px; fr.y = n.y - py;
        fr.fills = await paints(n.fills, n.w, n.h);
        fr.clipsContent = !!n.clip;
        if (n.stroke) {
          fr.strokes = [{ type: 'SOLID', color: col(n.stroke.c), opacity: n.stroke.c.a }];
          fr.strokeAlign = 'INSIDE';
          const [t, r, b, l] = n.stroke.w;
          if (t === r && r === b && b === l) fr.strokeWeight = t;
          else { fr.strokeTopWeight = t; fr.strokeRightWeight = r; fr.strokeBottomWeight = b; fr.strokeLeftWeight = l; }
          if (n.stroke.dash) fr.dashPattern = [4, 4];
        }
        if (n.r) { fr.topLeftRadius = n.r[0]; fr.topRightRadius = n.r[1]; fr.bottomRightRadius = n.r[2]; fr.bottomLeftRadius = n.r[3]; }
        setEffects(fr, n.fx);
        if (n.op != null && n.op < 1) fr.opacity = n.op;
        stats.frames++;
        for (const c of n.ch || []) await make(c, fr, n.x, n.y);
        return fr;
      }
      if (n.t === 'T') {
        const t = F.createText();
        parent.appendChild(t);
        const f0 = fontFor(n.runs[0]);
        t.fontName = f0;
        t.characters = n.chars;
        for (const r of n.runs) {
          const fn = fontFor(r);
          t.setRangeFontName(r.s, r.e, fn);
          t.setRangeFontSize(r.s, r.e, Math.max(1, r.sz));
          t.setRangeFills(r.s, r.e, [{ type: 'SOLID', color: col(r.c), opacity: r.c.a }]);
          if (r.ls) t.setRangeLetterSpacing(r.s, r.e, { unit: 'PIXELS', value: r.ls });
          if (r.deco) t.setRangeTextDecoration(r.s, r.e, r.deco === 'U' ? 'UNDERLINE' : 'STRIKETHROUGH');
        }
        if (n.lh) t.lineHeight = { unit: 'PIXELS', value: n.lh };
        if (n.tt === 'uppercase') t.textCase = 'UPPER'; else if (n.tt === 'capitalize') t.textCase = 'TITLE'; else if (n.tt === 'lowercase') t.textCase = 'LOWER';
        t.textAlignHorizontal = n.align || 'LEFT';
        if (n.auto === 'WH') t.textAutoResize = 'WIDTH_AND_HEIGHT';
        else { t.textAutoResize = 'HEIGHT'; t.resize(Math.max(1, n.w + 0.5), Math.max(1, t.height)); }
        t.name = n.n || n.chars.slice(0, 30);
        t.x = n.x - px; t.y = n.y - py;
        if (n.shadow) setEffects(t, n.shadow);
        if (n.op != null && n.op < 1) t.opacity = n.op;
        stats.texts++;
        return t;
      }
      if (n.t === 'C') {
        const comp = await F.getNodeByIdAsync(n.id);
        if (!comp) throw new Error('component ' + n.id + ' missing');
        const inst = comp.type === 'COMPONENT' ? comp.createInstance() : comp.clone();
        parent.appendChild(inst);
        inst.name = n.n || inst.name;
        if (inst.width > 0 && Math.abs(inst.width - n.w) > 0.5) { try { inst.rescale(n.w / inst.width); } catch (e) { inst.resize(Math.max(0.01, n.w), Math.max(0.01, n.h)); } }
        inst.x = n.x - px; inst.y = n.y - py;
        if (n.rot) inst.rotation = n.rot;
        if (n.op != null && n.op < 1) inst.opacity = n.op;
        stats.svgs++;
        return inst;
      }
      if (n.t === 'S') {
        const s = F.createNodeFromSvg(n.svg);
        parent.appendChild(s);
        s.name = n.n || 'icon';
        s.x = n.x - px; s.y = n.y - py;
        s.fills = [];
        s.clipsContent = false;
        if (n.op != null && n.op < 1) s.opacity = n.op;
        stats.svgs++;
        return s;
      }
    } catch (e) { stats.errors.push((n.n || n.t) + ': ' + String(e).slice(0, 100)); }
  }

  const parent = opts.parent || F.currentPage;
  const top = await make(root, parent, 0, 0);
  if (top) {
    if (opts.name) top.name = opts.name;
    top.x = opts.x || 0; top.y = opts.y || 0;
  }
  stats.id = top && top.id;
  return stats;
};
