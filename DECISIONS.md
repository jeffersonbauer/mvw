# DECISIONS.md — Architectural & Data-Shape Decisions

Append-only log. Each entry is dated and explains the *why* so future-you can judge whether the decision still holds. Never silently overwrite a prior decision — supersede it with a new dated entry that references the old one.

---

## 2026-04-26 — Initial scaffold

### Tech stack: static, no build step
- Plain HTML, CSS, vanilla JS. No bundler, no framework, no npm.
- **Why:** the consumer is an executive, not a developer. The dashboard needs to open with a double-click or sit on any static host (S3, GitHub Pages, internal SharePoint). A build step adds friction and makes it harder for the next analyst to update SEC numbers without a Node install.
- **Trade-off accepted:** no JSX, no TS, no hot-reload. We mitigate with disciplined module boundaries (`data.js` / `views.js` / `charts.js` / `app.js`).

### Charts: Chart.js via CDN
- **Why:** ubiquitous, well-documented, supports the chart types we need (bar, line, doughnut, radar). No license cost. CDN means zero install.
- **Alternatives considered:** D3 (too low-level for this scope), Recharts (requires React), ECharts (heavier, less familiar).

### Maps: Leaflet via CDN with OSM tiles
- **Why:** lightweight, free tiles, easy marker clustering, no API key.
- **Alternatives considered:** Mapbox (requires token + billing), Google Maps (requires key + billing), D3 + TopoJSON (more work, less interactive).

### Routing: hash-based, no library
- `#/` → comparative overview. `#/company/<slug>/<tab>` → company detail.
- **Why:** static hosting friendly (no server rewrites). Trivially shareable URLs. No router dependency.

### Data: single global `window.MVW_DATA`
- All facts in `js/data.js` exported as `window.MVW_DATA = { companies: { mvw, hgv, tnl }, ... }`.
- Per-company shape is fixed and documented at the top of `data.js`. Each leaf with a number must carry a `source` string.
- **Why:** one place to update for fiscal-period refresh. Easy to diff in PRs. Forces citation discipline.
- **Trade-off accepted:** no schema validation at runtime. Mitigated by keeping the shape narrow and documented.

### Source of truth: SEC EDGAR filings
- Latest available 10-K used for each company:
  - **MVW**: FY2025 10-K filed 2026-02 (period ended 2025-12-31)
  - **HGV**: FY2025 10-K filed 2026-02-26 (period ended 2025-12-31)
  - **TNL**: FY2025 10-K filed 2026-02-18 (period ended 2025-12-31), with Q1 2026 10-Q for current quarter context
- Prior-year comparatives (FY2024) included for YoY KPIs.
- **Why:** mandated by the project brief. No fabrication permitted.

### Six fixed tabs per company
Per the project brief: Executive Overview, Segment Drill-Down, Global Footprint, Financial Deep Dive, Growth Catalysts, Risk Matrix. Adding or renaming tabs requires a new dated entry here.

### Risk Matrix: severity × likelihood are analyst-coded, not company-disclosed
- Risk *titles* and *descriptions* come verbatim from each 10-K Item 1A. The 2-axis grid placement (severity × likelihood) is an analyst overlay, not a company disclosure.
- **Why:** 10-Ks list risks as flat enumerations without scores; a heat map adds executive value but the scoring is interpretation. The dashboard labels this clearly in the UI ("analyst-coded — not company-disclosed").
- **If user disagrees with placement,** they can override in `data.js`'s `risks` array.
