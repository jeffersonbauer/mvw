/**
 * View renderers — return HTML strings and (where needed) export an `after()`
 * hook that runs once the markup is mounted (charts, maps, etc.).
 *
 * No DOM manipulation outside of the after() hooks. All views consume
 * window.MVW_DATA directly.
 */

window.MVW_VIEWS = (() => {

  // ---------------------------------------------------------------- formatters
  function fmtNumber(v, unit) {
    if (v === null || v === undefined) return "—";
    if (typeof v !== "number") return v;
    if (unit === "USD millions" || unit === "USD billions") {
      const sign = v < 0 ? "-" : "";
      const abs = Math.abs(v);
      if (unit === "USD billions") return `${sign}$${abs.toFixed(1)}B`;
      if (abs >= 1000) return `${sign}$${(abs / 1000).toFixed(2)}B`;
      return `${sign}$${abs.toLocaleString()}M`;
    }
    if (unit === "USD per share" || unit === "USD per share annualized") {
      return (v < 0 ? "-" : "") + "$" + Math.abs(v).toFixed(2);
    }
    if (unit === "USD per guest" || unit === "USD avg revenue per member" || unit === "USD per exchange transaction" || unit === "USD per Travel Club transaction") {
      return "$" + v.toLocaleString();
    }
    if (unit === "USD") return "$" + v.toLocaleString();
    if (unit === "percent" || (unit && unit.startsWith("percent"))) return v.toFixed(1) + "%";
    if (unit === "FICO") return v.toString();
    if (unit === "x") return v.toFixed(1) + "x";
    if (unit === "tours" || unit === "owner families" || unit === "thousands of transactions") {
      if (unit === "thousands of transactions") return (v / 1).toLocaleString() + "k";
      return v.toLocaleString();
    }
    if (typeof unit === "string" && unit.includes("millions of")) {
      return v.toFixed(2) + "M";
    }
    if (typeof unit === "string" && unit.includes("affiliated")) return v.toLocaleString();
    return v.toLocaleString();
  }

  function fmtDelta(current, prior) {
    if (current === null || prior === null || current === undefined || prior === undefined) return null;
    if (prior === 0) return null;
    return ((current - prior) / Math.abs(prior)) * 100;
  }

  function deltaClass(pct, opts = {}) {
    if (pct === null || pct === undefined) return "is-neutral";
    if (opts.invert) return pct > 0 ? "is-negative" : (pct < 0 ? "is-positive" : "is-neutral");
    return pct > 0 ? "is-positive" : (pct < 0 ? "is-negative" : "is-neutral");
  }

  function fmtDeltaPct(pct) {
    if (pct === null || pct === undefined) return "";
    const sign = pct > 0 ? "+" : "";
    return `${sign}${pct.toFixed(1)}% YoY`;
  }

  function escapeHtml(s) {
    if (s === null || s === undefined) return "";
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  // ---------------------------------------------------------------- KPI card
  function kpiCard({ label, value, unit, prior, source, note, valueOverride, invertDelta }) {
    let pct = null;
    let deltaTxt = "";
    if (typeof value === "number" && typeof prior === "number") {
      pct = fmtDelta(value, prior);
    }
    const cls = deltaClass(pct, { invert: invertDelta });
    if (pct !== null) deltaTxt = fmtDeltaPct(pct);

    const display = valueOverride !== undefined ? valueOverride : fmtNumber(value, unit);

    return `
      <div class="kpi" ${source ? `data-source="${escapeHtml(source)}"` : ""}>
        <div class="kpi__label">${escapeHtml(label)}</div>
        <div class="kpi__value">${escapeHtml(display)}${unit && /USD per (share|guest|exchange|Travel)/.test(unit || "") === false && /^percent/.test(unit || "") === false && unit !== "USD" && unit !== "x" && unit !== "FICO" && unit !== "USD millions" && unit !== "USD billions" ? `<span class="kpi__unit">${escapeHtml(unit.replace(/^[a-z ]+ /, ""))}</span>` : ""}</div>
        ${pct !== null ? `<div class="kpi__delta ${cls}">${escapeHtml(deltaTxt)}</div>` : ""}
        ${note ? `<div class="kpi__source">${escapeHtml(note)}</div>` : ""}
      </div>
    `;
  }

  // ---------------------------------------------------------------- Overview (comparative)
  function renderOverview() {
    const D = window.MVW_DATA.companies;
    const mvw = D.mvw, hgv = D.hgv, tnl = D.tnl;

    const rows = [
      { label: "Headline financials", isSection: true },
      { label: "Total revenue", path: "revenue", unit: "USD millions", direction: "high" },
      { label: "Adjusted EBITDA", path: "adjEbitda", unit: "USD millions", direction: "high" },
      { label: "Adj EBITDA margin", path: "adjEbitdaMargin", unit: "percent", direction: "high" },
      { label: "Net income", path: "netIncome", unit: "USD millions", direction: "high" },
      { label: "Diluted EPS", path: "dilutedEps", unit: "USD per share", direction: "high" },
      { label: "Operating cash flow", path: "operatingCashFlow", unit: "USD millions", direction: "high" },
      { label: "Total assets", path: "totalAssets", unit: "USD millions", direction: "high" },
      { label: "Corporate debt", path: "corporateDebt", unit: "USD millions", direction: "low" },
      { label: "Securitized debt (non-recourse)", path: "securitizedDebt", unit: "USD millions", direction: "low" },

      { label: "Timeshare KPIs", isSection: true },
      { label: "Contract / Gross VOI sales", path: "contractSales", unit: "USD millions", direction: "high" },
      { label: "VPG (Volume per Guest)", path: "vpg", unit: "USD per guest", direction: "high" },
      { label: "Total tours", path: "tours", unit: "tours", direction: "high" },
      { label: "Owner / member families", path: "owners", unit: "owner families", direction: "high" },
      { label: "Number of resorts", path: "resorts", unit: "vacation-ownership resorts", direction: "high" },
      { label: "New-buyer FICO (avg)", path: "avgFico", unit: "FICO", direction: "high" },
      { label: "Notes receivable (gross / net)", path: { mvw: "notesReceivableNet", hgv: "notesReceivableGross", tnl: "notesReceivableNet" }, unit: "USD millions", note: "MVW & TNL net; HGV gross", direction: "high" },
      { label: "Inventory", path: "inventory", unit: "USD millions", direction: "neutral", caption: "Real-estate inventory of unsold vacation-ownership interests — completed VOIs, WIP, and land/infrastructure carried at cost." },

      { label: "Capital return", isSection: true },
      { label: "Share repurchases (FY)", path: "buybacks", unit: "USD millions", direction: "high" },
      { label: "Dividends per share (annualized)", path: "dividend", unit: "USD per share annualized", direction: "high", optional: true },
      { label: "Total employees", path: "employees", unit: "associates", direction: "neutral" }
    ];

    function getKpi(co, path) {
      const key = typeof path === "string" ? path : path[co.slug];
      if (!key) return null;
      if (key === "employees") return co.employees;
      return co.headlineKpis[key] || null;
    }

    function getValue(co, path) {
      const k = getKpi(co, path);
      return k ? k.value : null;
    }

    function findLeader(values, direction) {
      const valid = values.filter(v => typeof v === "number");
      if (valid.length === 0 || direction === "neutral") return -1;
      const target = direction === "high" ? Math.max(...valid) : Math.min(...valid);
      return values.indexOf(target);
    }

    const scorecardRows = rows.map(row => {
      if (row.isSection) {
        return `<div class="sc-section">${row.label}</div>`;
      }
      const m = getKpi(mvw, row.path);
      const h = getKpi(hgv, row.path);
      const t = getKpi(tnl, row.path);
      const vals = [m?.value, h?.value, t?.value];
      const leaderIdx = findLeader(vals, row.direction);

      const cell = (idx, kpi, slug) => {
        if (!kpi || kpi.value === null || kpi.value === undefined) {
          return `<div class="sc-cell sc-cell--num muted">—</div>`;
        }
        const isLeader = idx === leaderIdx;
        const pct = (typeof kpi.value === "number" && typeof kpi.prior === "number") ? fmtDelta(kpi.value, kpi.prior) : null;
        return `
          <div class="sc-cell sc-cell--num ${isLeader ? "sc-cell--leader" : ""}" data-source="${escapeHtml(kpi.source || "")}">
            ${escapeHtml(fmtNumber(kpi.value, kpi.unit || row.unit))}
            ${pct !== null ? `<span class="delta ${deltaClass(pct)}">${fmtDeltaPct(pct)}</span>` : ""}
          </div>
        `;
      };

      return `
        <div class="sc-cell sc-cell--label">
          ${escapeHtml(row.label)}${row.note ? ` <span class="muted">(${row.note})</span>` : ""}
          ${row.caption ? `<div class="sc-cell__caption">${escapeHtml(row.caption)}</div>` : ""}
        </div>
        ${cell(0, m, "mvw")}
        ${cell(1, h, "hgv")}
        ${cell(2, t, "tnl")}
      `;
    }).join("");

    const headerCell = (slug, name, ticker, color) => `
      <div class="sc-cell sc-cell--head" data-route="#/company/${slug}/exec">
        <span class="swatch" style="background:${color}"></span>${escapeHtml(name)}
        <span class="ticker">${escapeHtml(ticker)}</span>
        <span class="arrow">→</span>
      </div>
    `;

    return `
      <div class="page-header">
        <div>
          <h1>Vacation Ownership Competitive Position</h1>
          <p>Side-by-side view of the three pure-play public timeshare operators. Click any company column to drill into Executive Overview, Segment Drill-Down, Global Footprint, Financial Deep Dive, Growth Catalysts, and Risk Matrix. Leader cell in each row is highlighted in gold.</p>
        </div>
        <span class="tag">FY2025 10-Ks</span>
      </div>

      <div class="grid grid--3" style="margin-bottom:32px;">
        ${heroCard("MVW", "Marriott Vacations", "VAC", mvw, "mvw")}
        ${heroCard("HGV", "Hilton Grand Vacations", "HGV", hgv, "hgv")}
        ${heroCard("TNL", "Travel + Leisure Co.", "TNL", tnl, "tnl")}
      </div>

      <h2>Comparative Scorecard</h2>
      <div class="scorecard">
        <div class="sc-cell sc-cell--label" style="background:var(--bg-elevated);font-weight:700;">Metric</div>
        ${headerCell("mvw", "Marriott Vacations", "NYSE: VAC", "#0862A7")}
        ${headerCell("hgv", "Hilton Grand Vacations", "NYSE: HGV", "#002C51")}
        ${headerCell("tnl", "Travel + Leisure Co.", "NYSE: TNL", "#1D6B44")}
        ${scorecardRows}
      </div>

      <div class="grid grid--2" style="margin-top:32px;">
        <div class="panel">
          <h2>Contract Sales — FY2023 / FY2024 / FY2025</h2>
          <div class="chart-wrap"><canvas id="ov-chart-contract"></canvas></div>
          <p class="muted" style="margin-top:12px;font-size:11px;">HGV's step-up in FY2024 reflects the Bluegreen acquisition (closed January 2024). MVW contract sales declined 3% in FY2025 on softer VPG. TNL FY2023 not disclosed in FY2025 10-K operating-statistics table.</p>
        </div>
        <div class="panel">
          <h2>VPG (Volume per Guest) — 3-year</h2>
          <div class="chart-wrap"><canvas id="ov-chart-vpg"></canvas></div>
          <p class="muted" style="margin-top:12px;font-size:11px;">VPG measures contract-sales productivity per tour. HGV leads on FY2025 growth (+8%); MVW has retreated for two years from $4,088 in FY2023. TNL FY2023 not disclosed.</p>
        </div>
        <div class="panel">
          <h2>Tour Flow — 3-year</h2>
          <div class="chart-wrap"><canvas id="ov-chart-tours"></canvas></div>
          <p class="muted" style="margin-top:12px;font-size:11px;">HGV's tour base steps up sharply across FY2024/FY2025 post-Bluegreen, reflecting the larger combined sales-distribution network. TNL FY2023 not disclosed in FY2025 10-K.</p>
        </div>
        <div class="panel">
          <h2>Adjusted EBITDA Margin</h2>
          <div class="chart-wrap"><canvas id="ov-chart-margin"></canvas></div>
          <p class="muted" style="margin-top:12px;font-size:11px;">TNL leads on margin (24.6%). MVW (22.5%) sits between TNL and HGV (19.2%); HGV margin is depressed by integration mix and acquisition costs.</p>
        </div>
      </div>

      <div class="panel" style="margin-top:32px;">
        <h2>What's the executive read?</h2>
        <div class="grid grid--3" style="margin-top:8px;">
          <div>
            <h3>Where MVW leads</h3>
            <ul style="font-size:13px;color:var(--text-secondary);line-height:1.7;">
              <li><strong>Brand prestige & FICO portfolio quality</strong> — MVW's existing-owner mix is 70% (premium loyalty cohort).</li>
              <li><strong>Exchange business via Interval International</strong> — 1.5M paying members at 44.6% segment EBITDA margin.</li>
              <li><strong>Lowest absolute corporate-debt</strong> of the three peers ($3.5B), though leverage at 4.2x is elevated.</li>
              <li><strong>Highest dividend yield support</strong> — $3.20/share annualized ($110M FY2025 paid).</li>
            </ul>
          </div>
          <div>
            <h3>Where MVW lags</h3>
            <ul style="font-size:13px;color:var(--text-secondary);line-height:1.7;">
              <li><strong>Tour volume</strong> — 432k vs. HGV 857k. MVW's sales footprint is roughly half HGV's post-Bluegreen.</li>
              <li><strong>Contract-sales growth</strong> — −3% YoY vs. HGV +10% and TNL +8%.</li>
              <li><strong>FY2025 GAAP profitability</strong> — $577M of impairments drove a $(308)M net loss.</li>
              <li><strong>Owner base</strong> — 700k vs. TNL 797k and HGV 720k.</li>
            </ul>
          </div>
          <div>
            <h3>Strategic vectors</h3>
            <ul style="font-size:13px;color:var(--text-secondary);line-height:1.7;">
              <li><strong>SBO modernization</strong> — multi-year cost / automation reset; ~$20M annual run-rate savings targeted.</li>
              <li><strong>Hyatt-branded portfolio rationalization</strong> — Welk-legacy inventory continues to underperform.</li>
              <li><strong>Asia-Pacific scale-back</strong> — refining the international footprint.</li>
              <li><strong>Capital discipline</strong> — restrict new inventory spend to capital-efficient arrangements; bring leverage below 4.2x.</li>
            </ul>
          </div>
        </div>
      </div>

      ${sourcesBlock([...mvw.sources, ...hgv.sources, ...tnl.sources])}
    `;

    function heroCard(short, full, ticker, co, slug) {
      const mark = co.brandColor;
      const accent = co.brandAccent || co.brandColor;
      return `
        <div class="panel panel--accent hero-card" style="--brand-primary:${mark};--brand-primary-on-dark:${accent};border-top-color:${accent};" data-route="#/company/${slug}/exec">
          <div class="hero-card__head">
            <div class="hero-card__mark" style="background:${mark};">${short}</div>
            <div class="hero-card__title">
              <div class="hero-card__name">${full}</div>
              <div class="hero-card__ticker">${ticker}</div>
            </div>
            <div class="hero-card__arrow">→</div>
          </div>
          <div class="hero-card__revenue num">${fmtNumber(co.headlineKpis.revenue.value, "USD millions")}<span class="kpi__unit"> revenue</span></div>
          <div class="hero-card__desc">${co.narrative.oneLiner}</div>
          <div class="hero-card__stats">
            <div><span class="num">${fmtNumber(co.headlineKpis.adjEbitda.value, "USD millions")}</span> Adj EBITDA</div>
            <div><span class="num">${co.headlineKpis.resorts.value}+</span> resorts</div>
            <div><span class="num">${(co.headlineKpis.owners.value / 1000).toFixed(0)}k</span> owners</div>
          </div>
        </div>
      `;
    }
  }

  function afterOverview() {
    const D = window.MVW_DATA.companies;
    const labels3 = ["FY2023", "FY2024", "FY2025"];
    const series = (k) => [k.prior2 ?? null, k.prior, k.value];
    MVW_CHARTS.comparativeBars("ov-chart-contract", {
      labels: labels3,
      mvw: series(D.mvw.headlineKpis.contractSales),
      hgv: series(D.hgv.headlineKpis.contractSales),
      tnl: series(D.tnl.headlineKpis.contractSales),
      currency: true, unit: "M"
    });
    MVW_CHARTS.comparativeBars("ov-chart-vpg", {
      labels: labels3,
      mvw: series(D.mvw.headlineKpis.vpg),
      hgv: series(D.hgv.headlineKpis.vpg),
      tnl: series(D.tnl.headlineKpis.vpg),
      currency: true
    });
    MVW_CHARTS.comparativeBars("ov-chart-tours", {
      labels: labels3,
      mvw: series(D.mvw.headlineKpis.tours),
      hgv: series(D.hgv.headlineKpis.tours),
      tnl: series(D.tnl.headlineKpis.tours),
      currency: false
    });
    MVW_CHARTS.comparativeBars("ov-chart-margin", {
      labels: ["Adj EBITDA margin %"],
      mvw: [D.mvw.headlineKpis.adjEbitdaMargin.value],
      hgv: [D.hgv.headlineKpis.adjEbitdaMargin.value],
      tnl: [D.tnl.headlineKpis.adjEbitdaMargin.value],
      currency: false, unit: "%"
    });
  }

  // ---------------------------------------------------------------- Company hero
  function companyHero(co) {
    return `
      <div class="company-hero">
        <div class="company-hero__mark" style="background:${co.brandColor};">${co.shortName}</div>
        <div class="company-hero__body">
          <div class="company-hero__name">${escapeHtml(co.name)}</div>
          <div class="company-hero__meta">
            <span>${escapeHtml(co.exchange)}: ${escapeHtml(co.ticker)}</span>
            <span>HQ ${escapeHtml(co.hq)}</span>
            <span>CEO ${escapeHtml(co.ceo.name)}</span>
            <span>${co.employees.value.toLocaleString()} associates</span>
            <span>${co.fiscal.period}</span>
          </div>
        </div>
        <button class="company-hero__back" data-route="#/">← Back to overview</button>
      </div>
    `;
  }

  function companyTabs(co, activeTab) {
    const tabs = [
      ["exec", "Executive Overview"],
      ["segments", "Segment Drill-Down"],
      ["footprint", "Global Footprint"],
      ["financials", "Financial Deep Dive"],
      ["growth", "Growth Catalysts"],
      ["risks", "Risk Matrix"]
    ];
    return `
      <div class="tabs">
        ${tabs.map(([slug, label]) => `
          <button class="tab ${activeTab === slug ? "is-active" : ""}" data-route="#/company/${co.slug}/${slug}">
            ${label}
          </button>
        `).join("")}
      </div>
    `;
  }

  function sourcesBlock(sources) {
    const unique = [...new Map(sources.map(s => [s.url, s])).values()];
    return `
      <div class="sources">
        <h3>Sources</h3>
        <ul>
          ${unique.map(s => `<li><a href="${escapeHtml(s.url)}" target="_blank" rel="noopener">${escapeHtml(s.label)}</a></li>`).join("")}
        </ul>
      </div>
    `;
  }

  // ---------------------------------------------------------------- Tab: Executive Overview
  function renderExec(co) {
    const k = co.headlineKpis;
    return `
      ${companyHero(co)}
      ${companyTabs(co, "exec")}

      <div class="callout">
        <strong>${escapeHtml(co.name)}.</strong> ${escapeHtml(co.narrative.oneLiner)}
      </div>

      <div class="grid grid--4" style="margin-bottom:24px;">
        ${kpiCard({ label: "Revenue (FY)", value: k.revenue.value, unit: k.revenue.unit, prior: k.revenue.prior, source: k.revenue.source })}
        ${kpiCard({ label: "Adjusted EBITDA", value: k.adjEbitda.value, unit: k.adjEbitda.unit, prior: k.adjEbitda.prior, source: k.adjEbitda.source })}
        ${kpiCard({ label: "Adj EBITDA margin", value: k.adjEbitdaMargin.value, unit: k.adjEbitdaMargin.unit, source: k.adjEbitdaMargin.source })}
        ${kpiCard({ label: "Net income", value: k.netIncome.value, unit: k.netIncome.unit, prior: k.netIncome.prior, source: k.netIncome.source, note: k.netIncome.note })}
        ${kpiCard({ label: "Contract sales / VOI sales", value: k.contractSales.value, unit: k.contractSales.unit, prior: k.contractSales.prior, source: k.contractSales.source })}
        ${kpiCard({ label: "VPG (Volume per Guest)", value: k.vpg.value, unit: k.vpg.unit, prior: k.vpg.prior, source: k.vpg.source })}
        ${kpiCard({ label: "Total tours", value: k.tours.value, unit: k.tours.unit, prior: k.tours.prior, source: k.tours.source })}
        ${kpiCard({ label: "Owner / member families", value: k.owners.value, unit: k.owners.unit, source: k.owners.source, note: k.owners.note })}
      </div>

      <div class="grid grid--2">
        <div class="panel">
          <h2>Company at a glance</h2>
          <table class="data">
            <tbody>
              <tr><td>Headquarters</td><td class="num">${escapeHtml(co.hq)}</td></tr>
              <tr><td>History</td><td>${escapeHtml(co.foundedSpinOff)}</td></tr>
              <tr><td>CEO</td><td>${escapeHtml(co.ceo.name)} — ${escapeHtml(co.ceo.title)}<div class="muted">${escapeHtml(co.ceo.note || "")}</div></td></tr>
              <tr><td>CFO</td><td>${escapeHtml(co.cfo.name)} — ${escapeHtml(co.cfo.title)}<div class="muted">${escapeHtml(co.cfo.note || "")}</div></td></tr>
              ${co.coo ? `<tr><td>COO</td><td>${escapeHtml(co.coo.name)} — ${escapeHtml(co.coo.title)}<div class="muted">${escapeHtml(co.coo.note || "")}</div></td></tr>` : ""}
              ${co.chairman ? `<tr><td>Chair</td><td>${escapeHtml(co.chairman)}</td></tr>` : ""}
              <tr><td>Associates</td><td class="num">${co.employees.value.toLocaleString()}</td></tr>
              <tr><td>Resorts</td><td class="num">${co.headlineKpis.resorts.value}+</td></tr>
              ${co.headlineKpis.units ? `<tr><td>Units</td><td class="num">${co.headlineKpis.units.value.toLocaleString()}+</td></tr>` : ""}
              ${co.headlineKpis.countries ? `<tr><td>Countries</td><td class="num">${co.headlineKpis.countries.value}</td></tr>` : ""}
              <tr><td>Fiscal period</td><td>${escapeHtml(co.fiscal.period)} — ${escapeHtml(co.fiscal.filingType)}</td></tr>
            </tbody>
          </table>
        </div>

        <div class="panel">
          <h2>Current chapter</h2>
          <p style="font-size:13px;line-height:1.7;color:var(--text-secondary);">${escapeHtml(co.narrative.history)}</p>
          <div class="divider"></div>
          <p style="font-size:13px;line-height:1.7;color:var(--text-primary);">${escapeHtml(co.narrative.currentChapter)}</p>
        </div>
      </div>

      ${co.financials.q12026 ? `
        <div class="panel" style="margin-top:24px;">
          <h2>Most recent quarter (Q1 2026)</h2>
          <div class="grid grid--3">
            ${kpiCard({ label: "Q1 Revenue", value: co.financials.q12026.revenue, unit: "USD millions", source: co.financials.q12026.source })}
            ${kpiCard({ label: "Q1 Adj EBITDA", value: co.financials.q12026.adjEbitda, unit: "USD millions", source: co.financials.q12026.source })}
            ${kpiCard({ label: "Q1 Net income", value: co.financials.q12026.netIncome, unit: "USD millions", source: co.financials.q12026.source })}
          </div>
        </div>
      ` : ""}

      ${co.recentCall ? `
        <div class="panel" style="margin-top:24px;">
          <h2>Most recent earnings call — key items</h2>
          <div class="callout" style="margin-bottom:16px;">
            <strong>${escapeHtml(co.recentCall.period)} call</strong> · released ${escapeHtml(co.recentCall.date)} · paraphrased from primary-source press release.
          </div>
          <ul class="call-list">
            ${co.recentCall.items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
          <div class="call-source">
            Source: <a href="${escapeHtml(co.recentCall.sourceUrl)}" target="_blank" rel="noopener">${escapeHtml(co.recentCall.sourceLabel)}</a>
          </div>
        </div>
      ` : ""}

      ${sourcesBlock(co.sources)}
    `;
  }

  // ---------------------------------------------------------------- Tab: Segment Drill-Down
  function renderSegments(co) {
    const segs = co.segments;
    return `
      ${companyHero(co)}
      ${companyTabs(co, "segments")}

      <div class="grid grid--2">
        <div class="panel">
          <h2>Revenue mix by segment</h2>
          <div class="chart-wrap chart-wrap--tall"><canvas id="seg-doughnut"></canvas></div>
        </div>
        <div class="panel">
          <h2>Revenue & Adj EBITDA — by segment</h2>
          <div class="chart-wrap chart-wrap--tall"><canvas id="seg-bars"></canvas></div>
        </div>
      </div>

      <div class="panel" style="margin-top:24px;">
        <h2>Segment detail</h2>
        <table class="data">
          <thead>
            <tr>
              <th>Segment</th>
              <th class="num">Revenue (FY)</th>
              <th class="num">YoY %</th>
              <th class="num">Adj EBITDA</th>
              <th class="num">Margin</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${segs.map(s => {
              const yoy = (s.revenuePrior && s.revenue) ? fmtDelta(s.revenue, s.revenuePrior) : null;
              const ebitdaMargin = (s.margin || (s.revenue && s.adjEbitda ? (s.adjEbitda / s.revenue) * 100 : null));
              return `
                <tr>
                  <td><span class="tag" style="background:${s.color}22;border-color:${s.color};color:${s.color};">${escapeHtml(s.name)}</span></td>
                  <td class="num">${fmtNumber(s.revenue, "USD millions")}</td>
                  <td class="num"><span class="${deltaClass(yoy)}">${yoy !== null ? fmtDeltaPct(yoy) : "—"}</span></td>
                  <td class="num">${fmtNumber(s.adjEbitda, "USD millions")}</td>
                  <td class="num">${ebitdaMargin !== null ? ebitdaMargin.toFixed(1) + "%" : "—"}</td>
                  <td class="muted" style="max-width:380px;font-size:12px;">${escapeHtml(s.description)}</td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>

      <div class="panel" style="margin-top:24px;">
        <h2>Brand portfolio</h2>
        <table class="data">
          <thead>
            <tr>
              <th>Brand</th>
              ${co.brands[0].resorts !== undefined ? `<th class="num">Resorts</th>` : ""}
              ${co.brands[0].keys !== undefined ? `<th class="num">Keys</th>` : ""}
              <th class="num">Tours</th>
              <th class="num">Contract sales</th>
              <th class="num">VPG</th>
              <th>${co.brands[0].licensor ? "Licensor / Type" : "Type"}</th>
            </tr>
          </thead>
          <tbody>
            ${co.brands.map(b => `
              <tr>
                <td><strong>${escapeHtml(b.name)}</strong>${b.note ? `<div class="muted" style="font-size:11px;">${escapeHtml(b.note)}</div>` : ""}</td>
                ${co.brands[0].resorts !== undefined ? `<td class="num">${b.resorts !== undefined ? b.resorts : "—"}</td>` : ""}
                ${co.brands[0].keys !== undefined ? `<td class="num">${b.keys !== undefined ? b.keys.toLocaleString() : "—"}</td>` : ""}
                <td class="num">${b.tours !== undefined ? b.tours.toLocaleString() : "—"}</td>
                <td class="num">${b.contractSales !== undefined ? fmtNumber(b.contractSales, "USD millions") : "—"}</td>
                <td class="num">${b.vpg !== undefined ? "$" + b.vpg.toLocaleString() : "—"}</td>
                <td>${escapeHtml(b.licensor || b.type || "")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
        <p class="muted" style="font-size:11px;margin-top:12px;">
          Tours, contract sales, and VPG are <strong>not disclosed at the individual-brand level</strong> in any of the three peers' 10-K filings — these operating metrics are reported only at the consolidated company or operating-segment level. See the <em>Executive Overview</em> tab (consolidated KPIs) and the <em>Segment detail</em> table above (segment-level revenue and Adj EBITDA).
        </p>
      </div>

      ${sourcesBlock(co.sources)}
    `;
  }

  function afterSegments(co) {
    MVW_CHARTS.segmentDoughnut("seg-doughnut", { segments: co.segments });
    MVW_CHARTS.segmentBars("seg-bars", { segments: co.segments });
  }

  // ---------------------------------------------------------------- Tab: Global Footprint
  function renderFootprint(co) {
    const regions = co.geography.regions;
    const totalResorts = regions.reduce((s, r) => s + (r.resorts || 0), 0);

    return `
      ${companyHero(co)}
      ${companyTabs(co, "footprint")}

      <div class="callout">
        ${escapeHtml(co.geography.summary)}
      </div>

      <div class="panel">
        <h2>Resort footprint — interactive map</h2>
        <div id="footprint-map"></div>
        <p class="muted" style="font-size:11px;margin-top:12px;">
          Markers represent disclosed regions or country clusters from the company's 10-K.
          ${co.slug !== "mvw" ? "Resort-level coordinates are not disclosed in the 10-K; markers are positioned at approximate regional centroids and sized by available data." : "MVW provides state/country-level resort and key counts in Item 2 of the 10-K."}
        </p>
      </div>

      <div class="panel" style="margin-top:24px;">
        <h2>Regional table</h2>
        <table class="data">
          <thead>
            <tr>
              <th>Region</th>
              <th class="num">Resorts</th>
              <th class="num">Keys / units</th>
              <th>Notes</th>
              <th class="num">Source</th>
            </tr>
          </thead>
          <tbody>
            ${regions.map(r => `
              <tr>
                <td>${escapeHtml(r.name)}</td>
                <td class="num">${r.resorts !== undefined ? r.resorts : (r.share !== undefined ? r.share + "%" : "—")}</td>
                <td class="num">${r.keys ? r.keys.toLocaleString() : "—"}</td>
                <td class="muted" style="font-size:11px;">${escapeHtml(r.note || "")}</td>
                <td class="num muted" style="font-size:10px;">${escapeHtml(r.source || "")}</td>
              </tr>
            `).join("")}
            <tr style="font-weight:600;background:rgba(255,255,255,0.025);">
              <td>Total disclosed resorts (regions with counts)</td>
              <td class="num">${totalResorts}</td>
              <td class="num">—</td>
              <td class="muted" style="font-size:11px;">${co.slug === "mvw" ? "Sums to 120 (10-K Item 1)" : "Disclosed concentrations only"}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      ${sourcesBlock(co.sources)}
    `;
  }

  function afterFootprint(co) {
    if (!window.L) return;
    const map = L.map("footprint-map", {
      center: [25, -40],
      zoom: 2,
      minZoom: 2,
      worldCopyJump: true,
      scrollWheelZoom: false
    });
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19
    }).addTo(map);

    const color = co.brandAccent || co.brandColor;
    co.geography.regions.forEach(r => {
      if (r.lat === 0 && r.lng === 0) return; // skip placeholder rows
      const radius = r.resorts ? Math.min(28, 8 + Math.sqrt(r.resorts) * 4) : (r.share ? Math.min(28, 8 + Math.sqrt(r.share) * 3) : 8);
      const marker = L.circleMarker([r.lat, r.lng], {
        radius,
        color: color,
        weight: 2,
        fillColor: color,
        fillOpacity: 0.45
      }).addTo(map);
      const popup = `
        <strong>${escapeHtml(r.name)}</strong>
        ${r.resorts ? `<div>${r.resorts} resorts</div>` : ""}
        ${r.keys ? `<div>${r.keys.toLocaleString()} keys</div>` : ""}
        ${r.share ? `<div>${r.share}% of VOI sales</div>` : ""}
        ${r.note ? `<div style="color:var(--text-tertiary);font-size:11px;margin-top:4px;">${escapeHtml(r.note)}</div>` : ""}
      `;
      marker.bindPopup(popup);
    });

    // ensure leaflet recalculates size after the panel mounts
    setTimeout(() => map.invalidateSize(), 100);
  }

  // ---------------------------------------------------------------- Tab: Financial Deep Dive
  function renderFinancials(co) {
    const k = co.headlineKpis;
    const totalDebt = (k.corporateDebt?.value || 0) + (k.securitizedDebt?.value || 0);

    return `
      ${companyHero(co)}
      ${companyTabs(co, "financials")}

      <div class="grid grid--4" style="margin-bottom:24px;">
        ${kpiCard({ label: "Operating cash flow", value: k.operatingCashFlow.value, unit: k.operatingCashFlow.unit, prior: k.operatingCashFlow.prior, source: k.operatingCashFlow.source })}
        ${kpiCard({ label: "Total assets", value: k.totalAssets.value, unit: k.totalAssets.unit, prior: k.totalAssets.prior, source: k.totalAssets.source })}
        ${kpiCard({ label: "Total debt (corp + non-recourse)", value: totalDebt, unit: "USD millions", source: "Corporate + securitized; per company filings", note: `Corporate ${fmtNumber(k.corporateDebt.value, "USD millions")} + Non-recourse ${fmtNumber(k.securitizedDebt.value, "USD millions")}` })}
        ${kpiCard({ label: "Stockholders' equity", value: k.equity.value, unit: k.equity.unit, source: k.equity.source, note: k.equity.note })}
        ${k.dilutedEps ? kpiCard({ label: "Diluted EPS", value: k.dilutedEps.value, unit: k.dilutedEps.unit, prior: k.dilutedEps.prior, source: k.dilutedEps.source }) : ""}
        ${k.leverage ? kpiCard({ label: "Leverage (corp debt-net-of-cash / Adj EBITDA)", value: k.leverage.value, unit: k.leverage.unit, source: k.leverage.source, invertDelta: true }) : ""}
        ${k.dividend ? kpiCard({ label: "Dividend (annualized)", value: k.dividend.value, unit: k.dividend.unit, source: k.dividend.source }) : ""}
        ${kpiCard({ label: "Buybacks (FY)", value: k.buybacks.value, unit: k.buybacks.unit, prior: k.buybacks.prior, source: k.buybacks.source, note: k.buybacks.note })}
      </div>

      <div class="grid grid--2">
        <div class="panel">
          <h2>Revenue trend</h2>
          <div class="chart-wrap chart-wrap--tall"><canvas id="fin-revenue"></canvas></div>
        </div>
        <div class="panel">
          <h2>Adjusted EBITDA trend</h2>
          <div class="chart-wrap chart-wrap--tall"><canvas id="fin-ebitda"></canvas></div>
        </div>
        <div class="panel">
          <h2>Debt structure</h2>
          <div class="chart-wrap"><canvas id="fin-debt"></canvas></div>
          <p class="muted" style="font-size:11px;margin-top:8px;">Stacked by tranche (corporate) plus non-recourse securitized debt collateralized by VOI receivables.</p>
        </div>
        <div class="panel">
          <h2>Capital allocation (FY)</h2>
          <div class="chart-wrap"><canvas id="fin-capreturn"></canvas></div>
          ${co.financials.capitalReturn.note ? `<p class="muted" style="font-size:11px;margin-top:8px;">${escapeHtml(co.financials.capitalReturn.note)}</p>` : ""}
          ${co.financials.capitalReturn.newAuthorization ? `<p style="font-size:12px;margin-top:8px;color:var(--text-primary);"><strong>${fmtNumber(co.financials.capitalReturn.newAuthorization, "USD millions")}</strong> additional repurchase authorization announced post-year-end.</p>` : ""}
          ${co.financials.capitalReturn.remainingAuthorization ? `<p style="font-size:12px;margin-top:8px;color:var(--text-primary);"><strong>${fmtNumber(co.financials.capitalReturn.remainingAuthorization, "USD millions")}</strong> remaining repurchase authorization.</p>` : ""}
        </div>
      </div>

      <div class="panel" style="margin-top:24px;">
        <h2>Receivables & credit</h2>
        <div class="grid grid--3">
          ${k.notesReceivableNet ? kpiCard({ label: "Notes receivable, net", value: k.notesReceivableNet.value, unit: k.notesReceivableNet.unit, prior: k.notesReceivableNet.prior, source: k.notesReceivableNet.source }) : ""}
          ${k.notesReceivableGross ? kpiCard({ label: "Notes receivable, gross", value: k.notesReceivableGross.value, unit: k.notesReceivableGross.unit, source: k.notesReceivableGross.source, note: k.notesReceivableGross.note }) : ""}
          ${k.avgFico ? kpiCard({ label: "New-buyer FICO (avg)", value: k.avgFico.value, unit: k.avgFico.unit, prior: k.avgFico.prior, source: k.avgFico.source }) : ""}
          ${k.defaultRate ? kpiCard({ label: "Default rate (FY)", value: k.defaultRate.value, unit: k.defaultRate.unit, prior: k.defaultRate.prior, source: k.defaultRate.source, invertDelta: true, note: k.defaultRate.note }) : ""}
          ${k.nonAccrualNotes ? kpiCard({ label: "Non-accrual notes (>=90d past due)", value: k.nonAccrualNotes.value, unit: k.nonAccrualNotes.unit, source: k.nonAccrualNotes.source, note: k.nonAccrualNotes.note }) : ""}
          ${k.loanLossProvision ? kpiCard({ label: "Loan loss provision (FY)", value: k.loanLossProvision.value, unit: k.loanLossProvision.unit, prior: k.loanLossProvision.prior, source: k.loanLossProvision.source, note: k.loanLossProvision.note }) : ""}
          ${k.financingPropensity ? kpiCard({ label: "Financing propensity", value: k.financingPropensity.value, unit: k.financingPropensity.unit, prior: k.financingPropensity.prior, source: k.financingPropensity.source }) : ""}
          ${k.avgLoanAmount ? kpiCard({ label: "Avg loan amount", value: k.avgLoanAmount.value, unit: k.avgLoanAmount.unit, source: k.avgLoanAmount.source }) : ""}
          ${k.avgLoanRate ? kpiCard({ label: "Avg loan rate", value: k.avgLoanRate.value, unit: k.avgLoanRate.unit, source: k.avgLoanRate.source }) : ""}
        </div>
      </div>

      ${sourcesBlock(co.sources)}
    `;
  }

  function afterFinancials(co) {
    const accent = co.brandAccent || co.brandColor;
    const rev = co.financials.revenueTrend.filter(r => r.value !== null);
    const ebitda = co.financials.ebitdaTrend.filter(r => r.value !== null);
    MVW_CHARTS.trendLine("fin-revenue", {
      labels: rev.map(r => "FY" + r.year),
      data: rev.map(r => r.value),
      color: accent,
      currency: true, unit: "M"
    });
    MVW_CHARTS.trendLine("fin-ebitda", {
      labels: ebitda.map(r => "FY" + r.year),
      data: ebitda.map(r => r.value),
      color: accent,
      currency: true, unit: "M"
    });
    MVW_CHARTS.stackedDebt("fin-debt", {
      tranches: co.financials.debtStack,
      color: accent
    });
    MVW_CHARTS.capitalAllocation("fin-capreturn", {
      dividends: co.financials.capitalReturn.dividends || 0,
      buybacks: co.financials.capitalReturn.buybacks || 0,
      color: accent
    });
  }

  // ---------------------------------------------------------------- Tab: Growth Catalysts
  function renderGrowth(co) {
    return `
      ${companyHero(co)}
      ${companyTabs(co, "growth")}

      <div class="callout">
        Strategic initiatives, capital-allocation priorities, and partnerships explicitly disclosed in
        ${escapeHtml(co.fiscal.filingType)} ${escapeHtml(co.fiscal.period)}. No analyst projections.
      </div>

      <div class="panel">
        <h2>Disclosed growth catalysts</h2>
        ${co.growth.map((g, i) => `
          <div class="catalyst">
            <div class="catalyst__num">${i + 1}</div>
            <div>
              <div class="catalyst__head">${escapeHtml(g.headline)}</div>
              <div class="catalyst__detail">${escapeHtml(g.detail)}</div>
              <div class="catalyst__source">Source: ${escapeHtml(g.source)}</div>
            </div>
          </div>
        `).join("")}
      </div>

      ${sourcesBlock(co.sources)}
    `;
  }

  // ---------------------------------------------------------------- Tab: Risk Matrix
  function renderRisks(co) {
    // Standard ISO-style risk-matrix vocabulary. Pairs each analyst-coded score
    // with a descriptive word so the axes read clearly without a separate legend.
    const SEV_WORDS = { 1: "Minor", 2: "Low", 3: "Moderate", 4: "Major", 5: "Severe" };
    const LIK_WORDS = { 1: "Rare", 2: "Unlikely", 3: "Possible", 4: "Likely", 5: "Almost Certain" };

    // Build cell index keyed by "likelihood_severity"
    const cells = {};
    co.risks.forEach((r, i) => {
      const key = `${r.likelihood}_${r.severity}`;
      if (!cells[key]) cells[key] = [];
      cells[key].push({ ...r, idx: i + 1 });
    });

    const heatScore = (likelihood, severity) => Math.min(5, Math.round((likelihood + severity) / 2));
    const dotColor = co.brandAccent || co.brandColor;

    // Grid layout (cols left → right):
    //   col 1: Y-axis title (rotated, spans rows 2-6)
    //   col 2: severity label (number + word)
    //   cols 3-7: heat cells, likelihood 1 → 5
    // Rows top → bottom:
    //   row 1: corner (col 1 blank for the title), corner (col 2 blank), likelihood headers (cols 3-7)
    //   rows 2-6: severity 5 (top) → severity 1 (bottom)

    let matrixHTML = "";

    // Row 1, col 1-2: empty (the y-title is placed below with grid-row 2/7 to span the data rows)
    matrixHTML += `<div></div><div></div>`;

    // Row 1, cols 3-7: likelihood headers
    for (let lik = 1; lik <= 5; lik++) {
      matrixHTML += `
        <div class="risk-x-label">
          <span class="risk-axis-num">${lik}</span>
          <span class="risk-axis-word">${LIK_WORDS[lik]}</span>
        </div>
      `;
    }

    // Y-axis title placed in col 1, spanning rows 2-6
    matrixHTML += `<div class="risk-y-title" style="grid-column:1; grid-row:2 / 7;">Severity →</div>`;

    // Rows 2-6: severity label + 5 cells per row
    for (let sev = 5; sev >= 1; sev--) {
      matrixHTML += `
        <div class="risk-y-label">
          <span class="risk-axis-num">${sev}</span>
          <span class="risk-axis-word">${SEV_WORDS[sev]}</span>
        </div>
      `;
      for (let lik = 1; lik <= 5; lik++) {
        const cellRisks = cells[`${lik}_${sev}`] || [];
        const heat = heatScore(lik, sev);
        matrixHTML += `
          <div class="risk-cell" data-heat="${heat}">
            ${cellRisks.map(r => `
              <div class="risk-dot" style="background:${dotColor}" title="${escapeHtml(r.title)} — Sev ${r.severity}/5, Lik ${r.likelihood}/5" data-risk="${r.idx - 1}">${r.idx}</div>
            `).join("")}
          </div>
        `;
      }
    }

    return `
      ${companyHero(co)}
      ${companyTabs(co, "risks")}

      <div class="callout">
        Risk titles and verbatim language come from <strong>${escapeHtml(co.fiscal.filingType)} ${escapeHtml(co.fiscal.period)} Item 1A</strong>.
        Severity and likelihood scores are <strong>analyst-coded overlays</strong> — they are not company disclosures.
        Hover or click any dot to jump to the verbatim risk language on the right.
      </div>

      <div class="grid grid--2" style="align-items:start;">
        <div class="panel">
          <h2>Risk heat map</h2>
          <div class="risk-matrix-wrap">
            <div class="risk-matrix">${matrixHTML}</div>
            <div class="risk-x-title">Likelihood →</div>
          </div>
        </div>

        <div class="panel">
          <h2>All disclosed risk factors (verbatim)</h2>
          <div class="risk-list">
            ${co.risks.map((r, i) => `
              <div class="risk-list-item" id="risk-${i}">
                <div class="risk-list-item__num">${i + 1}</div>
                <div>
                  <div class="risk-list-item__title">${escapeHtml(r.title)}</div>
                  <div class="risk-list-item__verbatim">"${escapeHtml(r.verbatim)}"</div>
                  <div class="risk-list-item__meta">
                    <span><strong>Severity:</strong> ${r.severity}/5 — ${SEV_WORDS[r.severity]}</span>
                    <span><strong>Likelihood:</strong> ${r.likelihood}/5 — ${LIK_WORDS[r.likelihood]}</span>
                    <span><strong>Source:</strong> ${escapeHtml(r.source)}</span>
                  </div>
                  ${r.note ? `<div class="muted" style="font-size:11px;margin-top:6px;">Note: ${escapeHtml(r.note)}</div>` : ""}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      ${sourcesBlock(co.sources)}
    `;
  }

  function afterRisks() {
    document.querySelectorAll(".risk-dot").forEach(dot => {
      dot.addEventListener("click", () => {
        const idx = dot.getAttribute("data-risk");
        const target = document.getElementById(`risk-${idx}`);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  }

  // ---------------------------------------------------------------- exports
  return {
    renderOverview, afterOverview,
    renderExec,
    renderSegments, afterSegments,
    renderFootprint, afterFootprint,
    renderFinancials, afterFinancials,
    renderGrowth,
    renderRisks, afterRisks
  };
})();
