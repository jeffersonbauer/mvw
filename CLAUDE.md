# CLAUDE.md — Project Operating Instructions

This file is loaded into context at the start of every Claude Code session. Read it first.

## What this project is

An interactive **executive competitive-intelligence dashboard** comparing **Marriott Vacations Worldwide (MVW / NYSE: VAC)** against its two largest pure-play timeshare peers:

- **Hilton Grand Vacations (HGV)**
- **Travel + Leisure Co. (TNL)**

The dashboard is a static, single-page web app (HTML / CSS / vanilla JS) that runs locally or on any static host. It is intended for use by executives evaluating market position, growth catalysts, and risk exposure.

Repo: https://github.com/jeffersonbauer/mvw

## Source-of-truth rules (read every time)

1. **Facts come from filings.** The only acceptable sources for figures, KPIs, segment data, risk language, and corporate facts are:
   - SEC EDGAR filings (10-K, 10-Q, 8-K, DEF 14A) for VAC, HGV, TNL
   - The companies' official investor-relations websites
2. **Never fabricate.** If a number is not in a filing or on the company's site, **do not invent or estimate**. Mark the field "not disclosed" or ask the user. Calculated values must say "calculated from disclosed inputs" inline.
3. **Cite the filing.** Every figure in `js/data.js` must include the filing source (e.g., `"10-K FY2025, MD&A"`).
4. **Date-stamp the snapshot.** Each company's data block has a `lastUpdated` and `sourceFiling` field. Update both whenever data is refreshed.

## Required file maintenance — read this every session

There are **three governance files** in the repo root. Treat them as the project's working memory. **Always update them when conversational instructions change scope, design, or architecture.**

| File | When to update | Read before |
|---|---|---|
| `DECISIONS.md` | The user changes architecture, data shape, file structure, framework, or build approach | Changing architecture or data shape |
| `DESIGN.md` | The user changes color palette, typography, component patterns, layout primitives, or UX behavior | Touching colors, fonts, or component patterns |
| `REQUIREMENTS.md` | The user adds/removes a feature, view, KPI, or company; clarifies in/out of scope | Adding any feature |

**Rule:** when the user gives an instruction in conversation that would land in one of those buckets, append it to the corresponding file (with the date) **before** implementing. If you implement first and forget to log it, log it before ending the turn.

## Workflow when starting a new session

1. Read `MEMORY.md` (auto-loaded).
2. Read `DECISIONS.md`, `DESIGN.md`, `REQUIREMENTS.md` in that order.
3. Read this file (`CLAUDE.md`).
4. Skim `js/data.js` to refresh which fiscal period is loaded.
5. Then begin work.

## Workflow when the user gives a new instruction

1. Classify it: architecture (→ DECISIONS), design (→ DESIGN), scope (→ REQUIREMENTS), or implementation only (no log needed).
2. If logged, append a dated bullet under the relevant section. Use today's date (UTC) in `YYYY-MM-DD` format.
3. Implement.
4. If the implementation differed from what was planned, update the log entry with the actual outcome.

## Tech stack (locked — see DECISIONS.md before changing)

- **No build step.** Plain HTML, CSS, vanilla JS. Open `index.html` in a browser or serve with `python3 -m http.server`.
- **Charts:** Chart.js via CDN.
- **Maps:** Leaflet via CDN with OpenStreetMap tiles.
- **Styling:** Custom CSS — no Tailwind, no preprocessors. Design tokens live as CSS custom properties in `css/main.css`.
- **Data:** All facts live in `js/data.js`. One module, one global (`window.MVW_DATA`). Per-company shape is documented at the top of that file.

## Data refresh checklist

When refreshing for a new fiscal period:

1. Pull the new 10-K (or 10-Q) from SEC EDGAR for VAC, HGV, TNL.
2. Update each company's block in `js/data.js`. Keep prior-year comparatives — many KPIs (VPG, contract sales, tours) need YoY context.
3. Update `lastUpdated` and `sourceFiling` on each company.
4. Spot-check: revenue, Adj EBITDA, contract sales, VPG, tours, FICO, default rate, owner count, resort count.
5. Open the dashboard, click into each company, verify all six tabs render.

## What NOT to do

- Don't add a build step or framework without updating DECISIONS.md and getting user buy-in.
- Don't introduce a 4th company without updating REQUIREMENTS.md.
- Don't change brand colors without updating DESIGN.md — they map to MVW/HGV/TNL identity.
- Don't fabricate any number, ever. If unknown, ask or mark "not disclosed".
- Don't commit secrets or API keys — there shouldn't be any in this project.
