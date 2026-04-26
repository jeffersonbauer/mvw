# MVW Competitive Intelligence Dashboard

Executive-grade competitive analysis dashboard for **Marriott Vacations Worldwide (NYSE: VAC)** vs. its two largest pure-play timeshare peers — **Hilton Grand Vacations (NYSE: HGV)** and **Travel + Leisure Co. (NYSE: TNL)**.

All numbers are sourced from the latest **FY2025 10-K filings** on SEC EDGAR (filed Feb 2026). No projections, no estimates, no fabrication — every cited figure traces back to a specific filing.

## Quick start

**Live site (GitHub Pages):** https://jeffersonbauer.github.io/mvw/

**Local:** No build step. Serve the directory with any static server:

```bash
cd /path/to/mvw
python3 -m http.server 8080
# then open http://localhost:8080
```

Or just double-click `index.html` (most browsers will load it as a `file://` URL).

## What's inside

- **Comparative overview** — side-by-side scorecard of all timeshare KPIs that matter (revenue, Adj EBITDA, contract sales, VPG, tours, owners, FICO, default rate, debt, capital return). Leader cell highlighted in gold.
- **Per-company drill-down** — six fixed tabs:
  1. **Executive Overview** — leadership, headline KPIs, current-chapter narrative.
  2. **Segment Drill-Down** — revenue mix, segment EBITDA, brand portfolio.
  3. **Global Footprint** — interactive Leaflet map of disclosed regions.
  4. **Financial Deep Dive** — trends, debt structure, capital allocation, receivables & credit.
  5. **Growth Catalysts** — disclosed strategic initiatives.
  6. **Risk Matrix** — 5×5 severity × likelihood heat map of 10-K Item 1A risks.

## Tech stack

Vanilla HTML + CSS + JS. No build, no npm. Charts via Chart.js (CDN), maps via Leaflet (CDN).

## Project files

- `index.html` — app shell.
- `css/main.css` — dark executive theme.
- `js/data.js` — **single source of truth**; all SEC-sourced facts with citations.
- `js/charts.js` — Chart.js helpers.
- `js/views.js` — overview + 6 company tabs.
- `js/app.js` — hash router.

## Governance

Read these in order before making changes:

- `CLAUDE.md` — operating instructions for AI assistants working on this repo.
- `DECISIONS.md` — architectural and data-shape decisions.
- `DESIGN.md` — visual system tokens and component patterns.
- `REQUIREMENTS.md` — what's in / out of scope.

When the user gives a new instruction, log it in the right governance file before implementing.

## Refreshing for a new fiscal period

1. Pull the new 10-K from SEC EDGAR for VAC, HGV, TNL.
2. Update each company's block in `js/data.js`. Keep prior-year comparatives.
3. Update each company's `lastUpdated` and `fiscal.sourceUrl`.
4. Spot-check the dashboard — open each company × each tab.

## Data integrity

Every figure in `js/data.js` includes a `source` field referencing the originating filing. The risk-matrix severity / likelihood overlays are explicitly labeled as analyst-coded — they are not company disclosures.
