# design-import

Temporary data used to build the September 2026 enhanced screens as editable layers in Figma. It is not part of the website build and can be deleted once the Figma files are updated.

- `json/*.json` — one layer tree per screen (frames, fills, gradients, strokes, radii, shadows, background blurs, text runs, vector icons, image fills, component instances), produced from the coded designs.
- `builder.js` — turns one layer tree into Figma nodes via the Plugin API.
- `place.js` + `manifest.json` — which screens go into which Figma file, in which section and where.
