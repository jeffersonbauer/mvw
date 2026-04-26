# DESIGN.md — Visual System

The dashboard targets **executive readers**. Tone: Bloomberg / Capital IQ — dense, confident, dark, precise. Not a marketing site.

## 2026-04-26 — Brand-derived accent palette (supersedes initial brand tokens)

Each company's accent now derives from that company's actual brand identity (not generic primary colors).

| Company | Old | New | Provenance |
|---|---|---|---|
| MVW | `#B23E3E` (generic burgundy) | **`#A6192E`** | Pantone 187C — official Marriott corporate red |
| HGV | `#1F6FB2` (mid-blue) | **`#1268B3`** | Hilton brand cobalt — primary digital Hilton blue. The deepest Hilton navy (PMS 287C `#003C7E`) is too dim against `--bg-base`; this is the brighter brand cobalt used in Hilton digital UI, which retains brand identity while reading on a dark surface |
| TNL | `#2E7D52` (mid-green) | **`#2D6A4F`** | Travel + Leisure forest — closer to T+L Co. investor-deck palette; deeper, less mint, more "travel-outdoors" identity |

Soft variants (panel-tint at ~18% opacity, computed inline as `rgba()` in `css/main.css`):
- `--mvw-soft: rgba(166, 25, 46, 0.18);`
- `--hgv-soft: rgba(18, 104, 179, 0.18);`
- `--tnl-soft: rgba(45, 106, 79, 0.18);`

These tokens are mirrored in: `css/main.css`, `js/data.js` (per-company `brandColor`), `js/charts.js` (palette), `js/views.js` (heroCard/headerCell args), `index.html` (nav swatches). Any future change must update all six locations.

## 2026-04-26 — Initial design

### Aesthetic principles

1. **Numbers come first.** Charts and KPI cards dominate. Body copy is concise and supports the numbers.
2. **Dense but breathable.** Tight line-heights on data, generous padding around panels. Avoid card-on-card-on-card.
3. **One screen tells one story.** No infinite scroll. Each tab is structured so a reader can take in the picture in 10 seconds, then dig.
4. **Brand identity is preserved.** When viewing MVW, the accent is MVW red. HGV → Hilton blue. TNL → T+L green. The chrome (nav, background) stays neutral so brand cues only appear *inside* the company you're looking at.
5. **Sources are visible, not hidden.** Every figure has a small `source` tooltip. A "Sources" footer per tab lists every filing referenced.

### Color tokens (CSS custom properties in `css/main.css`)

```
--bg-base:      #0B1220   /* page background, deep navy-black */
--bg-panel:     #131C2E   /* card surface */
--bg-elevated:  #1A2440   /* hover / nested surfaces */
--bg-input:     #0F1729

--text-primary:    #E8EBF0
--text-secondary:  #9BA4B5
--text-tertiary:   #6B7689
--text-inverse:    #0B1220

--border-subtle:   rgba(255, 255, 255, 0.08)
--border-strong:   rgba(255, 255, 255, 0.16)

--accent-gold:     #D4AF37     /* generic executive accent (KPIs, focus rings) */
--accent-gold-dim: #8A7223

/* Brand accents — used ONLY inside the corresponding company view */
--mvw-primary:   #B23E3E       /* Marriott red */
--mvw-soft:      #6E2828
--hgv-primary:   #003C7E       /* Hilton blue */
--hgv-soft:      #0A2647
--tnl-primary:   #2E7D52       /* Travel + Leisure green */
--tnl-soft:      #1B4D33

/* Semantic */
--positive:  #4ADE80
--negative:  #F87171
--neutral:   #9BA4B5
--warn:      #FBBF24
```

### Typography

- **UI / body:** `Inter`, `-apple-system`, `system-ui`. Loaded via `@font-face` from Google Fonts CDN.
- **Numbers / data:** `JetBrains Mono` for tabular figures so columns align without explicit `font-variant-numeric`. Used in KPI cards, tables, axis labels.
- **Headings:** Inter, weights 600–700.

Type scale:
- Display (hero KPI):   42px / 700 / -1px tracking
- H1 (page title):       28px / 600
- H2 (section):          18px / 600 / 0.5px tracking, uppercase
- H3 (subsection):       14px / 600 / 0.8px tracking, uppercase, secondary text color
- Body:                  14px / 400 / 1.55 line-height
- Caption / source:      11px / 500 / tertiary text
- Number (KPI):          28px / 600 / JetBrains Mono / -0.5px tracking
- Number (table cell):   13px / 500 / JetBrains Mono

### Layout primitives

- **Container** max-width 1440px, side padding 32px on desktop, 16px on tablet.
- **Grid** 12-column on desktop, gap 20px. KPI strip uses a 4–6 col responsive grid.
- **Panel** = `.panel` class. Background `--bg-panel`, border `--border-subtle`, border-radius 8px, padding 24px. No shadow (deep bg makes shadows muddy).
- **KPI Card** = `.kpi`. Compact panel, label up top in H3 style, big number, delta below in positive/negative color.

### Component patterns

- **Tabs** (company detail): underline tab bar at top of company view. Active tab uses brand accent underline (3px) and primary text. Inactive tabs are secondary text.
- **Tables** (segment data, brand list): zebra-stripe rows with `--bg-elevated` on alternates. Numbers right-aligned.
- **Charts:** dark canvas, gridlines `rgba(255,255,255,0.06)`, axis labels in `--text-tertiary` 11px. Series colors use brand accents in company views, an MVW/HGV/TNL three-color palette in comparative views.
- **Risk Matrix:** 5×5 grid. Axes: Likelihood (low → high) × Severity (low → high). Cells are translucent gold; risk dots use brand accent. Hover shows risk title + verbatim 10-K language.
- **Map (footprint):** Leaflet with **CartoDB Dark Matter** tiles (free, matches dark UI). Markers use brand accent. Cluster markers when zoomed out.

### Motion

- Fades and small translates only. 180ms ease-out for hover states, 240ms for view transitions. No bouncy springs, no skeleton loaders (data is inline — no async wait).

### Iconography

- Inline SVG only. No icon font, no icon library dependency. A small set of utility icons (arrow, info, external-link) lives in `js/views.js` as string templates.

### Responsive bands

- ≥1280px: full desktop layout.
- 1024–1279: 12-col compresses, KPI strip wraps to 2 rows.
- 768–1023: tablet. Single-column for company tabs. Map keeps full width.
- <768: best-effort. Comparative scorecard becomes vertical. Not the primary target — see REQUIREMENTS.md.

### Accessibility

- Color contrast: data text vs. background ≥ 7:1. Secondary text ≥ 4.5:1.
- Focus rings: 2px `--accent-gold` outline on tab and link focus.
- All charts have an adjacent `<table class="sr-only">` (or aria-described summary) where feasible.
- Map is decorative-plus — supplemented by a regional table that's keyboard-navigable.

### What we explicitly DON'T do

- No emojis in UI. No flag icons (politicized + small inconsistent renderings).
- No glassmorphism, no neon glow, no animated backgrounds. This is an exec dashboard, not a Dribbble shot.
- No light theme in v1 (would need a separate token pass and chart re-color).
