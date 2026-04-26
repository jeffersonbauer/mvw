# REQUIREMENTS.md — Scope

What's in scope, what's out, and what's still open. Append-only with dated entries.

---

## 2026-04-26 — Initial scope

### In scope

**Companies covered (3):**
1. Marriott Vacations Worldwide (MVW / NYSE: VAC) — primary subject
2. Hilton Grand Vacations (HGV / NYSE: HGV) — peer
3. Travel + Leisure Co. (TNL / NYSE: TNL) — peer

**Top-level views (2):**
1. **Comparative overview** (default landing): side-by-side scorecard of MVW vs. HGV vs. TNL on the timeshare KPIs that matter to executives — revenue, Adj EBITDA, margin, contract sales, VPG, tours, owner base, resort footprint, FICO, default rate, leverage, capital return.
2. **Company detail** (per-company drill-down) with six fixed tabs:
   - **Executive Overview** — leadership, headline KPIs, company-at-a-glance, recent quarter highlights, narrative.
   - **Segment Drill-Down** — segment revenue, segment EBITDA, segment margins, brand portfolio breakdown.
   - **Global Footprint** — interactive map of resort locations / regions, table of properties by region, brand presence by geography.
   - **Financial Deep Dive** — revenue trend, EBITDA trend, margin, debt structure (corporate vs. non-recourse / securitized), cash flow, capital allocation (dividends + buybacks), key balance-sheet items.
   - **Growth Catalysts** — disclosed strategic initiatives, integration progress, capital allocation priorities, partnerships.
   - **Risk Matrix** — top risk factors from 10-K Item 1A laid out in a severity × likelihood heat map, with verbatim risk language and analyst commentary.

### KPIs that must be present in the comparative overview

- Total revenue (FY) with YoY %
- Adjusted EBITDA (FY) with margin %
- Net income / loss (FY)
- Diluted EPS (FY)
- Contract sales / Gross VOI sales (FY) with YoY %
- VPG (Volume Per Guest) with YoY %
- Total tours with YoY %
- Owner / member base
- Number of resorts
- Total units / keys (where disclosed)
- Average new-buyer FICO
- Default rate (where disclosed)
- Notes receivable, gross
- Total debt (corporate + non-recourse, separately)
- Operating cash flow
- Share repurchases (FY)
- Dividend per share (annualized)

### Out of scope (initial release)

- A 4th competitor (e.g., Disney Vacation Club, Holiday Inn Club Vacations / Orange Lake) — none are public/pure-play comparable.
- Real-time stock quotes or intraday data — point-in-time SEC-filing snapshot only.
- Forecasts / DCF / valuation modeling — descriptive comparison, not predictive.
- Drill-down into individual resorts (e.g., per-property occupancy or RevPAR) — filings don't disclose at that grain.
- User accounts, login, persistence — anonymous static dashboard.
- Mobile-first responsive design — must render on a 13"+ laptop screen for executive use; tablet acceptable, phone is best-effort.
- Internationalization — English / USD only.

### Quality bar

- **Data integrity:** every number traceable to a disclosed source. No silent estimates.
- **Performance:** dashboard fully loaded < 2 seconds on a fresh visit (CDN-cached libraries, all data inline).
- **Usability:** no instruction manual needed. An exec should land on the page and within 30 seconds know who's bigger, who's growing, and where MVW lags or leads.

### Data refresh cadence

Manual. Refresh after each company's annual 10-K filing (typically Feb–Mar) or quarterly 10-Q (~5–8 weeks after quarter close). Update all three companies in the same refresh whenever possible so KPIs are comparable.

### Open questions / parking lot

- Should we add a "1-pager" PDF export of the comparative overview? (Not built; flag for v2 if the user asks.)
- Should risk severity × likelihood scores be moved to a separate analyst-input file rather than mixed into the SEC-sourced data block? (Currently inline with a clear "analyst-coded" label.)
