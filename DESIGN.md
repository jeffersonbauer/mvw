# DESIGN.md — Visual System

The dashboard targets **executive readers**. Tone: Bloomberg / Capital IQ — dense, confident, dark, precise. Not a marketing site.

## 2026-04-26 — Switch to light executive theme (supersedes the dark palette)

The dashboard moves from the dark slate base to a clean light surface. Two reasons:

1. **Brand colors pop.** On the dark theme, Hilton's `#002C51` navy was so dim it needed a `#1268B3` lift to render thin elements. On a white panel the literal navy is sharp and authentic — no lift needed. MVW's blue and TNL's green also gain saturation against light surfaces.
2. **Less perceived "wash-out".** The original dark navy panel-on-darker-navy bg gave low surface-to-surface contrast and a flat feel. White panels with subtle borders + 1px shadow read as discrete cards.

### New tokens

```
--bg-base:      #F4F6FA     /* warm-cool off-white page background */
--bg-panel:     #FFFFFF      /* card / panel surface */
--bg-elevated:  #EDF1F7      /* tinted for nested surfaces, callouts, scorecard headers */
--bg-input:     #F8FAFC

--text-primary:    #0F172A   /* deep navy text */
--text-secondary:  #475569
--text-tertiary:   #94A3B8

--border-subtle:   rgba(15, 23, 42, 0.08)
--border-strong:   rgba(15, 23, 42, 0.16)

--accent-gold:     #B8860B   /* darker gold so it reads on white (was #D4AF37) */
```

### Brand colors (unchanged primary, lift token retired)

- MVW `#0862A7`, HGV `#002C51`, TNL `#1D6B44` — same as before.
- `--brand-primary-on-dark` now equals `--brand-primary` for all themes (kept as a token only so future dark-mode work doesn't need a search-and-replace).
- `js/data.js` `brandAccent` collapses to `brandColor` for HGV (`#002C51`).
- `js/charts.js` palette HGV is back to the literal navy.

### Other affected styles

- `.panel` gets a 1px shadow (`0 1px 3px rgba(15, 23, 42, 0.04)`).
- Risk-cell heat colors switched from translucent dark to translucent green/gold/amber/red on white.
- Leaflet tile layer switched from CartoDB **Dark Matter** to CartoDB **Positron** (light).
- Chart.js defaults: `color = #475569`, gridlines `rgba(15, 23, 42, 0.06)`, tooltip background white with subtle border.
- Scorecard leader-cell tint is a softer gold on white.

### Bug fix bundled with this commit

`setActiveNav()` in `js/app.js` was passing the result of a short-circuit boolean expression to `classList.toggle(className, force)`. When `slug` was `undefined` (overview route), the second argument evaluated to `undefined`, which modern browsers treat as the "no force given" case → the class is *toggled* rather than set. That caused the symptom where navigating HGV → Overview lit up MVW + TNL while turning HGV off.

Fix: compute an explicit boolean before passing to `toggle()`.

## 2026-04-26 — Topbar simplification + risk-matrix redesign

**Topbar.** Removed the MVW mark icon in the header — the dashboard is for the executive who already knows they opened it. Title text changed from "Competitive Intelligence" to **"Timeshare Competitive Intelligence"** so the subject is unambiguous. Subtitle updated to "Timeshare Industry · FY2025 Snapshot" to match. The browser tab `<title>` was also updated for consistency.

**Risk matrix.** Three problems were fixed in one redesign:

1. *The matrix took the full panel width and felt sparse.* The 5×5 grid now sits in a 2-column layout next to the verbatim risk-factor list. The grid is constrained to ~520px wide (cells 80px × 56px); the list takes the other column. On screens narrower than ~1100px the layout collapses to a single column via the existing `.grid--2` responsive break.

2. *The Y-axis title "Severity" was implemented in code but never actually rendered.* The variable holding the rotated label was built but the wrong identifier was concatenated into the output. The new layout has a real rotated `.risk-y-title` cell occupying col 1 spanning rows 2–6, and a horizontal `.risk-x-title` placed below the grid.

3. *Bare 1–5 axis numbers told the reader nothing.* Each axis tick now pairs the analyst score with a descriptive word — standard ISO 31000 / risk-matrix vocabulary:

   | Score | Severity (Y) | Likelihood (X) |
   |---|---|---|
   | 5 | Severe | Almost Certain |
   | 4 | Major | Likely |
   | 3 | Moderate | Possible |
   | 2 | Low | Unlikely |
   | 1 | Minor | Rare |

   The numeric column is mono / brand-coloured; the descriptive word is small caps / tertiary text. Together they read clearly without needing a separate legend row.

   Same vocabulary appears in the verbatim list's per-row meta line (e.g., "Severity: 5/5 — Severe").

CSS classes added to `css/main.css`: `.risk-matrix-wrap`, `.risk-matrix`, `.risk-y-title`, `.risk-x-title`, `.risk-x-label`, `.risk-y-label`, `.risk-axis-num`, `.risk-axis-word`. Old `.risk-grid`, `.risk-axis-label`, `.risk-axis-row` rules removed.

## 2026-04-26 — `--brand-primary-on-dark` lift token + topbar mark fix

**Two changes, both addressing things the literal HGV navy + the gradient app icon were doing badly:**

1. **`--brand-primary-on-dark` cascading token.** The literal `#002C51` Hilton navy stays in place for solid surfaces (the company-hero mark — a white-text-on-navy block that reads fine), but a new `--hgv-primary-on-dark: #1268B3` lift is now used wherever the brand color appears as a *thin* accent on the `--bg-base` slate (active-tab underline, panel border-tops, links, dot markers, chart series, leaflet map markers, tag chips). MVW and TNL set `--brand-primary-on-dark` to the same value as `--brand-primary` — only HGV needs the lift.

   Mirrored in `js/data.js` as a per-company `brandAccent` field (HGV = `#1268B3`, others = same as `brandColor`). Used by `heroCard()`, `headerCell()` swatches, the Leaflet marker color, the risk dot color, and all four trend-chart series via `afterFinancials()`. The chart palette in `js/charts.js` also points HGV at the lift.

   The `theme-{slug}` blocks now set both `--brand-primary` and `--brand-primary-on-dark` together. Inline overrides in `heroCard()` set both as well so the cascade still works inside per-card themes on the overview.

2. **Topbar mark is now solid MVW blue.** The previous gradient (`linear-gradient(135deg, var(--mvw-primary), var(--accent-gold))`) felt decorative; the user wanted the chrome icon to match the company hero marks (flat color block, white wordmark on top). Single-line change in `.topbar__mark`.

## 2026-04-26 — Corrected brand palette (supersedes the prior 2026-04-26 entry)

User correction: MVW is **blue**, not red. The earlier red palette assumed Marriott corporate; MVW publishes its own brand identity built around Pantone 641 C blue.

| Company | New | Provenance (user-supplied) |
|---|---|---|
| MVW | **`#0862A7`** | Pantone PMS 641 C — Marriott Vacations Worldwide rich blue (paired with PMS Black 6 C `#000000`) |
| HGV | **`#002C51`** | Hilton corporate brand navy — used across HGV investor pages, digital properties, and logo backgrounds. Hilton's metallic accent palette (Teak `#B09A61`, Tide `#B6B1AD`) is reserved for premium/print, not used in this UI |
| TNL | **`#1D6B44`** | Travel + Leisure deep forest — center of the documented `#1B5E3B`–`#1D6B44` range observed in TNL's wordmark and corporate surfaces. (TNL's identity is younger — rebranded from Wyndham Destinations in Feb 2021 — and not yet catalogued in major brand-color registries.) |

Soft variants (panel tints, in `css/main.css`):
- `--mvw-soft: rgba(8, 98, 167, 0.18);`
- `--hgv-soft: rgba(0, 44, 81, 0.30);` — slightly higher opacity than peers because the base navy is dark; needs the lift to register as a tint
- `--tnl-soft: rgba(29, 107, 68, 0.18);`

**Contrast note:** the Hilton navy `#002C51` against `--bg-base` `#0B1220` has a roughly 1.4:1 contrast ratio — borderline for use as a thin underline or 1–2 px chart line. We accept this trade-off in favor of brand fidelity. If a specific element becomes unreadable, raise it here and we'll define a `--hgv-primary-on-dark` lift token rather than overload `--hgv-primary`.

These tokens are mirrored in: `css/main.css`, `js/data.js` (per-company `brandColor` + segment `color`), `js/charts.js` (palette), `js/views.js` (heroCard / headerCell args), `index.html` (nav swatches). Any future change must update all six locations.

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
