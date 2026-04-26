/**
 * MVW Competitive Intelligence Dashboard — Data Module
 * ====================================================
 * Single source of truth. All figures sourced from SEC EDGAR filings.
 * Edit this file to refresh the dashboard for a new fiscal period.
 *
 * SHAPE (per company):
 *   slug, name, ticker, exchange, brand{Color,Soft}, hq, ceo, cfo, employees
 *   fiscal: { year, period, filingType, filedDate, sourceUrl }
 *   narrative: { history, oneLiner, currentChapter }
 *   headlineKpis: { revenue, ebitda, contractSales, vpg, tours, owners, resorts, ... }
 *     each leaf is { value, prior, unit, source, calc? }
 *   segments: [{ name, revenue, ebitda, margin, color, source }]
 *   brands: [{ name, resorts, keys?, type, source }]
 *   geography: { summary, regions: [{ name, lat, lng, resorts, keys?, note?, source }] }
 *   financials: { revenueTrend, ebitdaTrend, debtStack, capitalReturn, ... }
 *   growth: [{ headline, detail, source }]
 *   risks: [{ title, severity, likelihood, verbatim, source }]   // severity/likelihood analyst-coded
 *   sources: [{ label, url }]
 *   lastUpdated: ISO date string
 *
 * ALL fiscal data below is FY2025 (period ended 2025-12-31) unless noted.
 * Last refreshed: 2026-04-26
 */

window.MVW_DATA = {
  meta: {
    lastUpdated: "2026-04-26",
    fiscalPeriod: "FY2025 (period ended 2025-12-31)",
    note: "Latest annual disclosures available on SEC EDGAR as of refresh date. KPIs presented with FY2024 comparatives where disclosed.",
    disclaimer: "This dashboard summarizes publicly disclosed information. Severity and likelihood scores in the Risk Matrix are analyst-coded overlays — they are not company disclosures. No projections or estimates are presented as facts."
  },

  // -------------------------------------------------------------------------
  // MVW — Marriott Vacations Worldwide Corporation (NYSE: VAC)
  // -------------------------------------------------------------------------
  companies: {
    mvw: {
      slug: "mvw",
      name: "Marriott Vacations Worldwide",
      shortName: "MVW",
      ticker: "VAC",
      exchange: "NYSE",
      brandColor: "#0862A7",
      brandSoft: "#04345C",
      hq: "Orlando, Florida",
      foundedSpinOff: "Spun off from Marriott International on November 21, 2011",
      ceo: { name: "Matthew E. Avril", title: "President & CEO", note: "Effective February 16, 2026; interim from November 10, 2025" },
      cfo: { name: "Jason P. Marino", title: "EVP & CFO", note: "Since September 30, 2023" },
      coo: { name: "Michael A. Flaskey", title: "President & COO", note: "Effective February 16, 2026" },
      chairman: "William J. Shaw",
      employees: { value: 21100, source: "10-K FY2025, Item 1 Human Capital" },
      fiscal: {
        year: 2025,
        period: "FY ended 2025-12-31",
        filingType: "10-K",
        filedDate: "2026-02",
        sourceUrl: "https://www.sec.gov/Archives/edgar/data/1524358/000152435826000010/vac-20251231.htm"
      },
      narrative: {
        oneLiner: "The largest pure-play vacation-ownership operator under the Marriott umbrella, with 120 resorts across 13 countries and ~700,000 owner families.",
        history: "Spun off from Marriott International in 2011, MVW expanded materially via the 2018 Interval Leisure Group merger (adding Interval International, Hyatt Vacation Club, Aqua-Aston) and the 2021 Welk Resorts acquisition (folded into the Hyatt vacation-ownership business). The company licenses the Marriott, Sheraton, Westin, Ritz-Carlton, St. Regis, Luxury Collection, and Hyatt timeshare brands.",
        currentChapter: "FY2025 was a reset year: $577M of non-cash impairment charges (primarily Welk-legacy Hyatt-branded inventory and Asia-Pacific assets) drove a GAAP net loss of $(308)M, despite Adjusted EBITDA of $751M (margin 22.5%) on revenue of $5.0B. Management launched a multi-year Strategic Business Operations modernization program ($122M of 2025 charges) targeting cost savings and tighter capital discipline. Corporate-debt-net-of-cash to Adjusted EBITDA leverage stood at 4.2x at year end."
      },
      headlineKpis: {
        revenue: { value: 5032, prior: 4967, unit: "USD millions", source: "10-K FY2025, Consolidated Statements of Income" },
        revenueExclReimb: { value: 3334, unit: "USD millions", source: "10-K FY2025, MD&A" },
        adjEbitda: { value: 751, prior: 736, unit: "USD millions", source: "10-K FY2025, MD&A non-GAAP reconciliation" },
        adjEbitdaMargin: { value: 22.5, unit: "percent", calc: "Adj EBITDA / revenue excl. cost reimbursements", source: "10-K FY2025, MD&A" },
        netIncome: { value: -308, prior: 218, unit: "USD millions", source: "10-K FY2025, Consolidated Statements of Income", note: "Net loss attributable to common stockholders; driven by $577M non-cash impairment, $122M modernization charges, $15M restructuring" },
        dilutedEps: { value: -8.84, prior: 5.61, unit: "USD per share", source: "10-K FY2025, EPS reconciliation" },
        operatingCashFlow: { value: 28, prior: 205, unit: "USD millions", source: "10-K FY2025, Cash Flow Statement" },
        totalAssets: { value: 9757, prior: 9808, unit: "USD millions", source: "10-K FY2025, Balance Sheet" },
        equity: { value: 1993, unit: "USD millions", source: "10-K FY2025, Balance Sheet" },
        corporateDebt: { value: 3534, unit: "USD millions", source: "10-K FY2025, Footnote 15", note: "Net of issuance costs" },
        securitizedDebt: { value: 2146, unit: "USD millions", source: "10-K FY2025, Footnote 14", note: "Non-recourse VOI receivable securitizations" },
        leverage: { value: 4.2, unit: "x", source: "10-K FY2025, MD&A", note: "Corporate debt net of cash to Adjusted EBITDA" },
        dividend: { value: 3.20, unit: "USD per share annualized", source: "10-K FY2025, Item 5", note: "Q4'25 declaration $0.80/share" },
        dividendsPaid: { value: 110, unit: "USD millions", source: "10-K FY2025, Cash Flow Statement" },
        buybacks: { value: 61, unit: "USD millions", source: "10-K FY2025, Item 5", note: "1,004,613 shares at $61.26 avg; $322M remaining authorization" },
        contractSales: { value: 1762, prior: 1813, unit: "USD millions", source: "10-K FY2025, MD&A", note: "Down 3% YoY" },
        vpg: { value: 3794, prior: 3911, unit: "USD per guest", source: "10-K FY2025, MD&A", note: "Down 3% YoY" },
        tours: { value: 431974, prior: 432716, unit: "tours", source: "10-K FY2025, MD&A", note: "Approximately flat YoY" },
        owners: { value: 700000, unit: "owner families", source: "10-K FY2025, Item 1 Business", note: "Approximate; from ~420,000 at 2011 spin-off" },
        existingOwnerMix: { value: 70, unit: "percent of contract sales", source: "10-K FY2025, Item 1", note: "Implies ~30% new buyer mix" },
        avgFico: { value: 740, prior: 737, unit: "FICO", source: "10-K FY2025, MD&A", note: "76% over 700, 91% over 650, 98% over 600" },
        portfolioFico: { value: 729, unit: "FICO", source: "10-K FY2025, Footnote 5", note: "Weighted average across portfolio" },
        notesReceivableNet: { value: 2565, prior: 2440, unit: "USD millions", source: "10-K FY2025, Balance Sheet" },
        nonAccrualNotes: { value: 185, unit: "USD millions", source: "10-K FY2025, Footnote 5", note: "$165M non-securitized + $20M securitized; >=90 days past due" },
        financingPropensity: { value: 57, prior: 56, unit: "percent", source: "10-K FY2025, MD&A" },
        avgLoanAmount: { value: 30900, unit: "USD", source: "10-K FY2025, MD&A" },
        avgLoanRate: { value: 12.8, unit: "percent", source: "10-K FY2025, MD&A" },
        inventory: { value: 692, prior: 735, unit: "USD millions", source: "10-K FY2025, Footnote", note: "Real estate inventory $684M + other $8M; plus $224M property & equipment held for future inventory transfer" },
        resorts: { value: 120, unit: "vacation-ownership resorts", source: "10-K FY2025, Item 1" },
        units: { value: 22000, unit: "vacation-ownership units (>22,000)", source: "10-K FY2025, Item 1" },
        keys: { value: 31640, unit: "keys", source: "10-K FY2025, Item 2" },
        countries: { value: 13, unit: "countries / territories", source: "10-K FY2025, Item 2" },
        intervalMembers: { value: 1.507, unit: "millions of active members", source: "10-K FY2025, Segment disclosure", note: "Interval International; FY2024: 1.546M" },
        intervalArpm: { value: 150.51, unit: "USD avg revenue per member", source: "10-K FY2025, Segment disclosure" }
      },
      segments: [
        {
          name: "Vacation Ownership",
          revenue: 4805,
          revenuePrior: 4730,
          adjEbitda: 868,
          adjEbitdaPrior: 848,
          gaapResult: 345,
          margin: null,
          share: 95,
          color: "#0862A7",
          source: "10-K FY2025, Segment Note",
          description: "Sales of vacation ownership interests, financing income, resort management, rental, and ancillary services across the Marriott, Sheraton, Westin, Ritz-Carlton, St. Regis, Luxury Collection, and Hyatt timeshare brands."
        },
        {
          name: "Exchange & Third-Party Management",
          revenue: 213,
          revenuePrior: 231,
          adjEbitda: 91,
          adjEbitdaPrior: 102,
          margin: 44.6,
          share: 4,
          color: "#D4AF37",
          source: "10-K FY2025, Segment Note",
          description: "Interval International exchange business and Aqua-Aston Hospitality third-party hotel and resort management."
        }
      ],
      brands: [
        { name: "Marriott Vacation Club", resorts: 65, keys: 19076, licensor: "Marriott International", source: "10-K FY2025, Item 1" },
        { name: "Sheraton Vacation Club", resorts: 9, keys: 4377, licensor: "Marriott International", source: "10-K FY2025, Item 1" },
        { name: "Westin Vacation Club", resorts: 12, keys: 4334, licensor: "Marriott International", source: "10-K FY2025, Item 1" },
        { name: "Hyatt Vacation Club", resorts: 22, keys: 2672, licensor: "Hyatt", source: "10-K FY2025, Item 1", note: "Hyatt Residence Club brand retired; properties transitioned to Hyatt Vacation Club" },
        { name: "Grand Residences by Marriott", resorts: 2, keys: 381, licensor: "Marriott International", source: "10-K FY2025, Item 1" },
        { name: "The Ritz-Carlton Club", resorts: 5, keys: 259, licensor: "Marriott International", source: "10-K FY2025, Item 1" },
        { name: "St. Regis / Luxury Collection Residence Club", resorts: 3, keys: 83, licensor: "Marriott International", source: "10-K FY2025, Item 1" },
        { name: "Other (incl. unbranded)", resorts: 2, keys: 458, source: "10-K FY2025, Item 1" }
      ],
      geography: {
        summary: "120 vacation-ownership resorts across 13 countries; 90% of FY2025 contract sales originated in North America; 90% sold at on-site sales centers co-located with resorts.",
        regions: [
          { name: "Florida (US)", lat: 27.99, lng: -81.76, resorts: 23, keys: 8005, source: "10-K FY2025, Item 2" },
          { name: "California (US)", lat: 36.78, lng: -119.42, resorts: 17, keys: 6248, source: "10-K FY2025, Item 2" },
          { name: "Hawaii (US)", lat: 21.31, lng: -157.86, resorts: 13, keys: 4894, source: "10-K FY2025, Item 2" },
          { name: "Colorado (US)", lat: 39.55, lng: -105.78, resorts: 13, keys: 971, source: "10-K FY2025, Item 2" },
          { name: "South Carolina (US)", lat: 33.84, lng: -81.16, resorts: 10, keys: 1865, source: "10-K FY2025, Item 2" },
          { name: "Arizona (US)", lat: 34.05, lng: -111.09, resorts: 5, source: "10-K FY2025, Item 2" },
          { name: "Nevada (US)", lat: 36.17, lng: -115.14, resorts: 2, source: "10-K FY2025, Item 2" },
          { name: "Utah (US)", lat: 39.32, lng: -111.09, resorts: 2, source: "10-K FY2025, Item 2" },
          { name: "Missouri (US)", lat: 38.48, lng: -92.30, resorts: 2, source: "10-K FY2025, Item 2" },
          { name: "New York (US)", lat: 40.71, lng: -74.00, resorts: 2, source: "10-K FY2025, Item 2" },
          { name: "Massachusetts / NM / NJ / TX / VA / DC (US)", lat: 39.50, lng: -98.35, resorts: 6, source: "10-K FY2025, Item 2", note: "Aggregated; one resort each in MA, NM, NJ, TX, VA, DC" },
          { name: "Aruba", lat: 12.52, lng: -69.97, resorts: 2, keys: 1211, source: "10-K FY2025, Item 2" },
          { name: "Mexico", lat: 21.16, lng: -86.85, resorts: 4, keys: 1295, source: "10-K FY2025, Item 2" },
          { name: "U.S. Virgin Islands", lat: 18.34, lng: -64.93, resorts: 3, keys: 513, source: "10-K FY2025, Item 2" },
          { name: "Bahamas", lat: 25.04, lng: -77.35, resorts: 1, keys: 382, source: "10-K FY2025, Item 2" },
          { name: "Puerto Rico", lat: 18.22, lng: -66.59, resorts: 1, source: "10-K FY2025, Item 2" },
          { name: "Costa Rica", lat: 9.93, lng: -84.09, resorts: 1, source: "10-K FY2025, Item 2" },
          { name: "France", lat: 48.86, lng: 2.78, resorts: 1, keys: 202, source: "10-K FY2025, Item 2" },
          { name: "Spain", lat: 36.51, lng: -4.88, resorts: 3, keys: 715, source: "10-K FY2025, Item 2" },
          { name: "United Kingdom", lat: 51.51, lng: -0.13, resorts: 1, keys: 49, source: "10-K FY2025, Item 2" },
          { name: "Indonesia", lat: -8.34, lng: 115.09, resorts: 2, keys: 161, source: "10-K FY2025, Item 2" },
          { name: "Thailand", lat: 7.88, lng: 98.39, resorts: 4, keys: 384, source: "10-K FY2025, Item 2" },
          { name: "Australia", lat: -28.00, lng: 153.43, resorts: 1, keys: 77, source: "10-K FY2025, Item 2" }
        ]
      },
      financials: {
        revenueTrend: [
          { year: 2023, value: null, source: null },
          { year: 2024, value: 4967, source: "10-K FY2025, comparative" },
          { year: 2025, value: 5032, source: "10-K FY2025" }
        ],
        ebitdaTrend: [
          { year: 2024, value: 736, source: "10-K FY2025, comparative" },
          { year: 2025, value: 751, source: "10-K FY2025" }
        ],
        debtStack: [
          { label: "Term Loan", value: 780, source: "10-K FY2025, Footnote 15" },
          { label: "2026 Convertible Notes", value: 575, source: "10-K FY2025, Footnote 15" },
          { label: "2027 Convertible Notes", value: 569, source: "10-K FY2025, Footnote 15" },
          { label: "2028 Notes", value: 348, source: "10-K FY2025, Footnote 15" },
          { label: "2029 Notes", value: 497, source: "10-K FY2025, Footnote 15" },
          { label: "2033 Notes (6.50%)", value: 567, source: "10-K FY2025, Footnote 15", note: "Issued 2025 to refinance 2026 Convertible Notes" },
          { label: "Finance leases", value: 198, source: "10-K FY2025, Footnote 15" },
          { label: "Securitized (non-recourse)", value: 2146, source: "10-K FY2025, Footnote 14" }
        ],
        capitalReturn: {
          dividends: 110,
          buybacks: 61,
          remainingAuthorization: 322,
          source: "10-K FY2025, Item 5"
        }
      },
      growth: [
        {
          headline: "Strategic Business Operations (SBO) modernization",
          detail: "Multi-year program announced November 2024 to drive automation across technology, sales, and inventory. FY2025 modernization charges of $122M ($87M advisory; $18M finance/HR outsourcing). Targeting ~$20M annual cost savings from finance/accounting + HR outsourcing. Company expects ~$100M of additional non-recurring modernization expense in 2026.",
          source: "10-K FY2025, MD&A"
        },
        {
          headline: "Abound by Marriott Vacations",
          detail: "Owner-benefit and exchange program launched in 2022. Affiliates Marriott Vacation Club, Sheraton Vacation Club, and Westin Vacation Club brands into a unified points-based exchange experience.",
          source: "10-K FY2025, Item 1"
        },
        {
          headline: "Asia-Pacific scale-back",
          detail: "Strategic refinement reducing exposure in select Asia-Pacific markets. FY2025 $15M restructuring charge including a $10M cancellation of a 26-villa purchase commitment; impairments include $27M for Khao Lak Thailand inventory.",
          source: "10-K FY2025, MD&A"
        },
        {
          headline: "Capital allocation priorities for 2026",
          detail: "Drive higher-quality tours and stronger cash conversion; restrict new inventory spending to capital-efficient arrangements; tighten cost structure; reduce corporate-debt-net-of-cash leverage from 4.2x. Continued share repurchase program with $322M remaining authorization through 2026.",
          source: "10-K FY2025, MD&A Management Priorities"
        },
        {
          headline: "Refinancing of 2026 Convertible Notes",
          detail: "Issued $575M of 6.500% Senior Notes due 2033 in 2025 to address 2026 maturity. Extends weighted-average debt maturity profile.",
          source: "10-K FY2025, Footnote 15"
        }
      ],
      risks: [
        { title: "Travel disruption / discretionary demand", severity: 5, likelihood: 4, verbatim: "Our business may be adversely affected by factors that disrupt or deter travel.", source: "10-K FY2025, Item 1A" },
        { title: "Macroeconomic & policy uncertainty", severity: 4, likelihood: 4, verbatim: "Uncertainty in the current global macroeconomic environment created by rapid governmental policy and regulatory changes could negatively impact our business.", source: "10-K FY2025, Item 1A" },
        { title: "Inflation / interest-rate sensitivity", severity: 4, likelihood: 4, verbatim: "Significant inflation, higher interest rates or deflation could adversely affect our business and financial results.", source: "10-K FY2025, Item 1A", note: "Financing rates do not reset in lockstep with cost of funds; spread compression observed 2023–2024." },
        { title: "Default rates above projections", severity: 4, likelihood: 3, verbatim: "If default rates increase beyond current projections and result in higher than expected foreclosure activity, our results of operations would be adversely affected.", source: "10-K FY2025, Item 1A" },
        { title: "Inventory mismatch", severity: 3, likelihood: 3, verbatim: "We may not have inventory available for sale when needed or we may have excess inventory.", source: "10-K FY2025, Item 1A" },
        { title: "Brand-license termination", severity: 5, likelihood: 1, verbatim: "The termination of our license agreements with Marriott International or Hyatt, or our rights to use their trademarks at our existing or future properties, could materially harm our business.", source: "10-K FY2025, Item 1A", note: "License agreements with Marriott / Hyatt extend to 2090–2095." },
        { title: "Spanish timeshare litigation", severity: 3, likelihood: 4, verbatim: "Spanish court rulings voiding certain timeshare contracts have increased our exposure to litigation that may materially adversely affect our business and financial condition.", source: "10-K FY2025, Item 1A", note: "1999 Spanish law limiting contract duration; 2015 rulings continue to drive claim volume." },
        { title: "Regulatory compliance burden", severity: 3, likelihood: 3, verbatim: "Our business is extensively regulated, and any failure to comply with applicable laws could materially adversely affect our business.", source: "10-K FY2025, Item 1A" }
      ],
      sources: [
        { label: "FY2025 10-K (filed Feb 2026)", url: "https://www.sec.gov/Archives/edgar/data/1524358/000152435826000010/vac-20251231.htm" },
        { label: "Q3 2025 10-Q (filed Nov 2025)", url: "https://www.sec.gov/Archives/edgar/data/1524358/000152435825000166/0001524358-25-000166-index.htm" },
        { label: "EDGAR filings index (CIK 0001524358)", url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001524358&type=10-K" },
        { label: "Investor Relations", url: "https://ir.mvwc.com" }
      ]
    },

    // -----------------------------------------------------------------------
    // HGV — Hilton Grand Vacations Inc. (NYSE: HGV)
    // -----------------------------------------------------------------------
    hgv: {
      slug: "hgv",
      name: "Hilton Grand Vacations",
      shortName: "HGV",
      ticker: "HGV",
      exchange: "NYSE",
      brandColor: "#002C51",
      brandSoft: "#001628",
      hq: "Orlando, Florida",
      foundedSpinOff: "Became an independent public company on January 3, 2017 (spun off from Hilton Worldwide Holdings)",
      ceo: { name: "Mark D. Wang", title: "President & CEO", note: "CEO since 2017 spin-off" },
      cfo: { name: "Daniel J. Mathewes", title: "President & CFO" },
      employees: { value: 22300, source: "10-K FY2025, Human Capital", note: "More than 22,300 Team Members at resorts, call centers, sales centers, and corporate locations as of December 31, 2025" },
      fiscal: {
        year: 2025,
        period: "FY ended 2025-12-31",
        filingType: "10-K",
        filedDate: "2026-02-26",
        sourceUrl: "https://www.sec.gov/Archives/edgar/data/1674168/000167416826000017/hgv-20251231.htm"
      },
      narrative: {
        oneLiner: "Largest timeshare operator under the Hilton brand, with over 200 properties and 720,000+ Club members following the 2024 Bluegreen acquisition.",
        history: "Spun off from Hilton in 2017. Acquired Diamond Resorts (August 2021) and Bluegreen Vacations (closed January 17, 2024 for $1.6B inclusive of net debt). The combination roughly doubled HGV's footprint and added the Hilton Vacation Club, Hilton Club, and Bluegreen brands plus exclusive marketing alliances with Bass Pro Shops and Choice Hotels.",
        currentChapter: "FY2025 was the first full year post-Bluegreen integration. Revenue stable at $5.0B and contract sales grew 10% to $3.3B with VPG up 8% to $3,851. Adjusted EBITDA stepped down to $969M (from $1.094B in FY2024) reflecting a higher mix of acquired/lower-margin business and continued integration costs ($98M in FY2025). HGV continued aggressive capital return — $600M of share repurchases — while carrying ~$4.5B of corporate debt plus $2.7B of non-recourse securitized debt. Default rates at 9.86% (improved from 10.77% in FY2024)."
      },
      headlineKpis: {
        revenue: { value: 5047, prior: 4981, unit: "USD millions", source: "10-K FY2025, Consolidated Statements of Operations" },
        adjEbitda: { value: 969, prior: 1094, unit: "USD millions", source: "10-K FY2025, MD&A" },
        adjEbitdaAttributable: { value: 950, prior: 1078, unit: "USD millions", source: "10-K FY2025, MD&A", note: "Adj EBITDA attributable to stockholders" },
        adjEbitdaMargin: { value: 19.2, unit: "percent", calc: "Adj EBITDA / total revenue", source: "calculated" },
        netIncome: { value: 99, prior: 60, unit: "USD millions", source: "10-K FY2025, Consolidated Statements of Operations" },
        netIncomeAttributable: { value: 81, prior: 47, unit: "USD millions", source: "10-K FY2025" },
        dilutedEps: { value: 0.89, prior: 0.45, unit: "USD per share", source: "10-K FY2025" },
        operatingCashFlow: { value: 300, prior: 309, unit: "USD millions", source: "10-K FY2025, Cash Flow Statement" },
        totalAssets: { value: 11537, prior: 11442, unit: "USD millions", source: "10-K FY2025, Balance Sheet" },
        equity: { value: 1289, unit: "USD millions", source: "10-K FY2025, Balance Sheet", note: "Total equity incl. NCI: $1,440M" },
        corporateDebt: { value: 4545, unit: "USD millions", source: "10-K FY2025, Footnote 15", note: "Net of issuance costs; gross $4,603M" },
        securitizedDebt: { value: 2716, unit: "USD millions", source: "10-K FY2025, Footnote 15", note: "Non-recourse; gross $2,751M" },
        buybacks: { value: 600, prior: 432, unit: "USD millions", source: "10-K FY2025, Cash Flow Statement", note: "FY2023: $368M. 15M shares retired for $605M" },
        contractSales: { value: 3314, prior: 3002, unit: "USD millions", source: "10-K FY2025, Key Metrics", note: "Up 10% YoY" },
        vpg: { value: 3851, prior: 3572, unit: "USD per guest", source: "10-K FY2025, Key Metrics", note: "Up 7.8% YoY" },
        tours: { value: 856676, prior: 835181, unit: "tours", source: "10-K FY2025, Key Metrics" },
        owners: { value: 720000, unit: "Club members (>720,000)", source: "10-K FY2025, Item 1", note: "Across HGV Club offerings, including Hilton Grand Vacations Club, Hilton Vacation Club, Hilton Club, HGV Max" },
        avgFico: { value: 734, prior: 741, unit: "FICO", source: "10-K FY2025, TFR Note", note: "Weighted-average for new originations; FY2023: 737" },
        notesReceivableGross: { value: 4314, unit: "USD millions", source: "10-K FY2025, Note 8", note: "Originated $3,665M + acquired $649M; reserves $1,233M" },
        defaultRate: { value: 9.86, prior: 10.77, unit: "percent", source: "10-K FY2025, Item 1A", note: "FY2023: 8.56%; on ~$4.3B consumer loan portfolio" },
        inventory: { value: 2522, unit: "USD millions", source: "10-K FY2025, Note 9", note: "Completed unsold VOIs $2,026M + WIP $495M + land/infra $1M" },
        feeForServiceMix: { value: 17, unit: "percent of contract sales", source: "10-K FY2025, MD&A" },
        justInTimeMix: { value: 9, unit: "percent of contract sales", source: "10-K FY2025, MD&A" },
        resorts: { value: 200, unit: "properties (>200)", source: "10-K FY2025, Item 2" },
        salesCenters: { value: 100, unit: "sales distribution centers (>100)", source: "10-K FY2025, Item 1" },
        bluegreenAcquisitionPrice: { value: 1.6, unit: "USD billions", source: "10-K FY2025, Acquisitions Note", note: "Closed January 17, 2024 (incl. net debt)" }
      },
      segments: [
        {
          name: "Real Estate Sales & Financing",
          revenue: 2989,
          revenuePrior: 3010,
          adjEbitda: 707,
          adjEbitdaPrior: 802,
          margin: 23.7,
          share: 65,
          color: "#002C51",
          source: "10-K FY2025, Segment Note",
          description: "Sales of vacation ownership intervals (net), sales/marketing/brand fees, and consumer financing. VOI sales (net) of $2,193M plus $356M of financing income."
        },
        {
          name: "Resort Operations & Club Management",
          revenue: 1625,
          revenuePrior: 1528,
          adjEbitda: 620,
          adjEbitdaPrior: 604,
          margin: 38.2,
          share: 35,
          color: "#D4AF37",
          source: "10-K FY2025, Segment Note",
          description: "Club management ($321M), Resort management ($457M), Rental ($692M), Ancillary services ($54M). Higher-margin recurring fee streams."
        }
      ],
      brands: [
        { name: "Hilton Grand Vacations Club", type: "Core club", source: "10-K FY2025, Item 1" },
        { name: "Hilton Club", type: "Premium urban product (NYC, etc.)", source: "10-K FY2025, Item 1" },
        { name: "HGV Max", type: "Top-tier owner program", source: "10-K FY2025, Item 1" },
        { name: "Hilton Vacation Club", type: "Mid-tier (legacy Diamond properties)", source: "10-K FY2025, Item 1" },
        { name: "Bluegreen Vacations", type: "Legacy Bluegreen (rebranding to Hilton Vacation Club)", source: "10-K FY2025, Item 1" },
        { name: "Big Cedar Lodge", type: "JV with Big Cedar Vacations LLC (HGV 51% / 49%); 4 wilderness resorts via Bass Pro/Bluegreen alliance", source: "10-K FY2025, Item 1" },
        { name: "Diamond Resorts (legacy)", type: "Legacy properties being converted to Hilton brand standards", source: "10-K FY2025, Item 1" }
      ],
      geography: {
        summary: ">200 properties in the United States, Europe, Canada, the Caribbean, Mexico, and Asia. Concentration in Florida, Europe, Hawaii, South Carolina, California, Arizona, Nevada, and Virginia. Resort-level country breakdown not disclosed in 10-K — markers below represent disclosed geographic concentrations as approximate regional clusters.",
        regions: [
          { name: "Florida (US) — concentration market", lat: 27.99, lng: -81.76, note: "Disclosed as concentration market", source: "10-K FY2025, Item 1A geographic concentration" },
          { name: "Hawaii (US) — concentration market", lat: 21.31, lng: -157.86, note: "Disclosed as concentration market", source: "10-K FY2025, Item 1A" },
          { name: "Nevada / Las Vegas — major sales hub", lat: 36.17, lng: -115.14, note: "Las Vegas is one of three call-center locations and a sales-distribution hub", source: "10-K FY2025, Item 1" },
          { name: "South Carolina (US) — concentration market", lat: 33.84, lng: -81.16, note: "Disclosed as concentration market", source: "10-K FY2025, Item 1A" },
          { name: "California (US) — concentration market", lat: 36.78, lng: -119.42, note: "Disclosed as concentration market", source: "10-K FY2025, Item 1A" },
          { name: "Arizona (US) — concentration market", lat: 34.05, lng: -111.09, note: "Disclosed as concentration market", source: "10-K FY2025, Item 1A" },
          { name: "Virginia (US) — concentration market", lat: 37.43, lng: -78.66, note: "Disclosed as concentration market", source: "10-K FY2025, Item 1A" },
          { name: "Orlando — corporate HQ + call center", lat: 28.54, lng: -81.46, note: "HQ at 6355 MetroWest Blvd; primary call center", source: "10-K FY2025, Item 2" },
          { name: "New York City — Hilton Club urban product", lat: 40.71, lng: -74.00, note: "Hilton Club premium urban portfolio", source: "10-K FY2025, Item 1" },
          { name: "United Kingdom — Europe operations + call center", lat: 51.51, lng: -0.13, note: "UK call-center operations; European resort presence", source: "10-K FY2025, Item 1" },
          { name: "Europe (Mediterranean)", lat: 41.90, lng: 12.50, note: "European resort presence — exact countries not disclosed in 10-K", source: "10-K FY2025, Item 1" },
          { name: "Mexico", lat: 21.16, lng: -86.85, note: "Resort presence — exact locations not enumerated in 10-K", source: "10-K FY2025, Item 1" },
          { name: "Caribbean", lat: 18.34, lng: -64.93, note: "Resort presence — exact countries not enumerated in 10-K", source: "10-K FY2025, Item 1" },
          { name: "Canada", lat: 56.13, lng: -106.35, note: "Resort presence — exact provinces not enumerated in 10-K", source: "10-K FY2025, Item 1" },
          { name: "Asia (Japan)", lat: 35.69, lng: 139.69, note: "Asian resort presence; specific markets not disclosed in 10-K", source: "10-K FY2025, Item 1" }
        ]
      },
      financials: {
        revenueTrend: [
          { year: 2023, value: 3978, source: "10-K FY2025, comparative" },
          { year: 2024, value: 4981, source: "10-K FY2025, comparative" },
          { year: 2025, value: 5047, source: "10-K FY2025" }
        ],
        ebitdaTrend: [
          { year: 2023, value: 1005, source: "10-K FY2025, comparative" },
          { year: 2024, value: 1094, source: "10-K FY2025, comparative" },
          { year: 2025, value: 969, source: "10-K FY2025" }
        ],
        debtStack: [
          { label: "Corporate debt (net)", value: 4545, source: "10-K FY2025, Footnote 15", note: "Term loans, senior notes, and revolver" },
          { label: "Non-recourse securitized", value: 2716, source: "10-K FY2025, Footnote 15", note: "VOI receivable securitizations and warehouse" }
        ],
        capitalReturn: {
          dividends: 0,
          buybacks: 600,
          source: "10-K FY2025, Item 5",
          note: "FY2024: $432M; FY2023: $368M. No common dividend currently paid."
        }
      },
      growth: [
        {
          headline: "Bluegreen integration",
          detail: "Acquisition closed January 17, 2024 for $1.6B (incl. net debt). Plan: rebrand the majority of Bluegreen properties to meet Hilton brand standards. FY2025 acquisition/integration expense $98M (down from $237M FY2024) as integration progresses. Specific dollar synergy target not disclosed in the 10-K.",
          source: "10-K FY2025, Item 1 / Acquisitions Note"
        },
        {
          headline: "Bass Pro Shops marketing alliance",
          detail: "Acquired through Bluegreen. 10-year contract entered November 2023 grants HGV the right to market and sell vacation packages at kiosks in Bass Pro Shops and Cabela's stores. Big Cedar Lodge JV (HGV 51%) operates 4 wilderness resorts under the alliance.",
          source: "10-K FY2025, Item 1"
        },
        {
          headline: "Choice Hotels alliance",
          detail: "Sales/marketing alliance leveraging Choice's brands, customer relationships, and marketing channels to sell HGV vacation packages. Adds another high-volume top-of-funnel channel post-Bluegreen.",
          source: "10-K FY2025, Item 1"
        },
        {
          headline: "Capital-efficient inventory mix",
          detail: "FY2025 fee-for-service inventory was 17% of contract sales; just-in-time inventory was 9%. Combined ~26% of sales are not capex-funded by HGV — a deliberate shift to reduce inventory cash burden vs. peers.",
          source: "10-K FY2025, MD&A"
        },
        {
          headline: "Aggressive capital return",
          detail: "$600M of share repurchases in FY2025 (15M shares retired for $605M); $432M in FY2024; $368M in FY2023. No common dividend; capital return is 100% via buybacks.",
          source: "10-K FY2025, Cash Flow Statement"
        }
      ],
      risks: [
        { title: "Discretionary travel demand", severity: 5, likelihood: 4, verbatim: "Macroeconomic and other factors beyond our control can adversely affect and reduce demand for our products and services.", source: "10-K FY2025, Item 1A" },
        { title: "Hilton brand-license dependency", severity: 5, likelihood: 1, verbatim: "We do not own the Hilton brands and our business will be materially harmed if we breach our license agreement with Hilton or it is terminated.", source: "10-K FY2025, Item 1A" },
        { title: "Brand-conversion execution risk", severity: 3, likelihood: 3, verbatim: "Our ability to use the Hilton brands and trademarks and rebrand the Diamond and Bluegreen businesses and properties, and any potential consequences under the license agreement if we fail to do so.", source: "10-K FY2025, Item 1A" },
        { title: "Diamond + Bluegreen integration", severity: 4, likelihood: 3, verbatim: "Our ability to integrate the Diamond and the Bluegreen businesses successfully and effectively manage our expanded operations resulting from both the Diamond Acquisition and the Bluegreen Acquisition.", source: "10-K FY2025, Item 1A" },
        { title: "Receivable defaults", severity: 4, likelihood: 4, verbatim: "Our limited underwriting standards and a possible decline in the default rates or other credit metrics underlying our timeshare financing receivables.", source: "10-K FY2025, Item 1A", note: "FY2025 portfolio default rate 9.86% — highest among the three peers." },
        { title: "Substantial indebtedness / variable-rate exposure", severity: 4, likelihood: 3, verbatim: "Our substantial indebtedness and other contractual obligations, restrictions imposed on us by certain of our debt agreements and instruments and our variable rate indebtedness which subjects us to interest rate risk.", source: "10-K FY2025, Item 1A", note: "~$2.9B notional variable-rate debt = ~40% of total indebtedness." },
        { title: "Industry competition", severity: 3, likelihood: 5, verbatim: "We operate in a highly competitive industry.", source: "10-K FY2025, Item 1A" }
      ],
      sources: [
        { label: "FY2025 10-K (filed Feb 26, 2026)", url: "https://www.sec.gov/Archives/edgar/data/1674168/000167416826000017/hgv-20251231.htm" },
        { label: "Q3 2025 10-Q (filed Oct 30, 2025)", url: "https://www.sec.gov/Archives/edgar/data/1674168/000167416825000019/hgv-20250930.htm" },
        { label: "EDGAR filings index (CIK 0001674168)", url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001674168" },
        { label: "Investor Relations", url: "https://investors.hgv.com" }
      ]
    },

    // -----------------------------------------------------------------------
    // TNL — Travel + Leisure Co. (NYSE: TNL)
    // -----------------------------------------------------------------------
    tnl: {
      slug: "tnl",
      name: "Travel + Leisure Co.",
      shortName: "TNL",
      ticker: "TNL",
      exchange: "NYSE",
      brandColor: "#1D6B44",
      brandSoft: "#0E3D26",
      hq: "Orlando, Florida",
      foundedSpinOff: "Wyndham Worldwide spun off from Cendant on July 31, 2006; renamed Wyndham Destinations on May 31, 2018; renamed Travel + Leisure Co. on February 17, 2021",
      ceo: { name: "Michael D. Brown", title: "President & CEO", note: "Amended/Restated employment agreement dated June 1, 2024" },
      cfo: { name: "Erik Hoag", title: "EVP & CFO" },
      employees: { value: 19300, source: "10-K FY2025, Item 1 Human Capital", note: "4,800 work outside the U.S." },
      fiscal: {
        year: 2025,
        period: "FY ended 2025-12-31",
        filingType: "10-K",
        filedDate: "2026-02-18",
        sourceUrl: "https://www.sec.gov/Archives/edgar/data/1361658/000136165826000009/tnl-20251231.htm"
      },
      narrative: {
        oneLiner: "The largest timeshare operator by resort count (280+ resorts, 797,000 owners) and operator of RCI — the world's largest vacation-exchange network with 3.3M paid members across 3,600 affiliated resorts in 101 countries.",
        history: "Corporate roots in Cendant (1990s); Wyndham Worldwide spun off in 2006. The hotel franchising business was further spun off in 2018 (Wyndham Hotels & Resorts), leaving the vacation-ownership and exchange business as Wyndham Destinations. In 2021 the company acquired the Travel + Leisure media brand from Meredith and rebranded as Travel + Leisure Co. Owns the licensed brand portfolio Club Wyndham, WorldMark, Margaritaville Vacation Club, Sports Illustrated Resorts, Eddie Bauer Adventure Club, Accor Vacation Club, plus RCI exchange, Travel + Leisure GO, and Travel + Leisure For Business.",
        currentChapter: "FY2025 was a record year on the operating side: revenue $4.0B (+4%), Adjusted EBITDA $990M (+7%), Gross VOI sales $2.49B (+8%), VPG $3,284 (+6%), tours +2.5%. Operating cash flow was particularly strong at $640M. Net income compressed to $230M (vs. $411M FY2024) reflecting $216M of inventory write-downs from a resort-optimization initiative expected to drive 2026+ EBITDA accretion. RCI segment continues to face member-base headwinds (3.3M members down from prior year), partially offset by the higher-growth Travel Club business. Q1 2026: revenue $961M, Adj EBITDA $225M, NI $79M. Post-year Board increased buyback authorization by $750M."
      },
      headlineKpis: {
        revenue: { value: 4021, prior: 3864, unit: "USD millions", source: "10-K FY2025, Consolidated Statements of Income" },
        adjEbitda: { value: 990, prior: 929, unit: "USD millions", source: "10-K FY2025, MD&A non-GAAP reconciliation" },
        adjEbitdaMargin: { value: 24.6, unit: "percent", calc: "Adj EBITDA / total revenue", source: "calculated" },
        netIncome: { value: 230, prior: 411, unit: "USD millions", source: "10-K FY2025", note: "Net income attributable to TNL shareholders; FY2025 includes $216M inventory write-downs (resort-optimization initiative)" },
        dilutedEps: { value: 3.44, prior: 5.35, unit: "USD per share", source: "10-K FY2025", note: "Continuing operations" },
        operatingCashFlow: { value: 640, prior: 464, unit: "USD millions", source: "10-K FY2025, Cash Flow Statement" },
        totalAssets: { value: 6760, prior: 6735, unit: "USD millions", source: "10-K FY2025, Balance Sheet" },
        equity: { value: -982, unit: "USD millions", source: "10-K FY2025, Balance Sheet", note: "Stockholders' deficit; reflects history of buybacks and dividends. Prior year: $(881)M." },
        corporateDebt: { value: 3474, unit: "USD millions", source: "10-K FY2025, Note 15" },
        securitizedDebt: { value: 2124, unit: "USD millions", source: "10-K FY2025, Note 15", note: "Non-recourse VOI securitized debt" },
        dividend: { value: 2.24, unit: "USD per share annualized", source: "10-K FY2025, Item 7", note: "$0.56 per quarter, all four quarters of 2025" },
        dividendsPaid: { value: 149, prior: 142, unit: "USD millions", source: "10-K FY2025, Cash Flow Statement" },
        buybacks: { value: 300, unit: "USD millions", source: "10-K FY2025, Item 7", note: "$301M cash paid; post-year Board increased authorization by $750M" },
        contractSales: { value: 2486, prior: 2293, unit: "USD millions", source: "10-K FY2025, Key Metrics", note: "Gross VOI sales; up 8.4% YoY" },
        vpg: { value: 3284, prior: 3094, unit: "USD per guest", source: "10-K FY2025, Key Metrics", note: "Up 6.1% YoY" },
        tours: { value: 734000, prior: 716000, unit: "tours", source: "10-K FY2025, Key Metrics", note: "Up 2.5% YoY" },
        owners: { value: 797000, unit: "owner families", source: "10-K FY2025, Item 1" },
        upgradeMix: { value: 67, prior: 64, unit: "percent of transactions to existing owners", source: "10-K FY2025", note: "Implies ~33% new-owner mix" },
        avgFico: { value: 746, prior: 744, unit: "FICO", source: "10-K FY2025, TFR Note", note: "Weighted-average for new originations — highest among the three peers" },
        notesReceivableNet: { value: 2638, prior: 2619, unit: "USD millions", source: "10-K FY2025, Balance Sheet", note: "Gross securitized $2,281M + non-securitized $1,020M; allowance $663M" },
        loanLossProvision: { value: 484, prior: 432, unit: "USD millions", source: "10-K FY2025", note: "~19.5% of Gross VOI sales (calculated)" },
        downPayment: { value: 22, prior: 20, unit: "percent average", source: "10-K FY2025" },
        financingPropensity: { value: 68, prior: 71, unit: "percent of VOI sales financed", source: "10-K FY2025" },
        inventory: { value: 1128, prior: 1227, unit: "USD millions", source: "10-K FY2025, Balance Sheet" },
        resorts: { value: 280, unit: "vacation-ownership resorts (>280)", source: "10-K FY2025, Item 1", note: "U.S., Canada, Mexico, Caribbean, Asia Pacific" },
        units: { value: 29000, unit: "individual vacation-ownership units", source: "10-K FY2025, Item 1" },
        rciMembers: { value: 3.3, unit: "millions of paid member families", source: "10-K FY2025, Item 1", note: "Average exchange members FY2025: 3,328k vs. 3,427k FY2024" },
        rciAffiliatedResorts: { value: 3600, unit: "affiliated VO resorts", source: "10-K FY2025, Item 1", note: "Across 101 countries and territories" },
        rciCountries: { value: 101, unit: "countries / territories", source: "10-K FY2025, Item 1" },
        exchangeTransactions: { value: 810, unit: "thousands of transactions", source: "10-K FY2025", note: "Down 9.0% YoY" },
        exchangeRevPerTxn: { value: 360, unit: "USD per exchange transaction", source: "10-K FY2025" },
        travelClubTransactions: { value: 765, unit: "thousands of transactions", source: "10-K FY2025", note: "Up 13.8% YoY" },
        travelClubRevPerTxn: { value: 225, unit: "USD per Travel Club transaction", source: "10-K FY2025" },
        floridaConcentration: { value: 21, unit: "percent of VOI sales", source: "10-K FY2025, Note 23" },
        californiaConcentration: { value: 12, unit: "percent of VOI sales", source: "10-K FY2025, Note 23" },
        nevadaConcentration: { value: 9, unit: "percent of VOI sales", source: "10-K FY2025, Note 23" }
      },
      segments: [
        {
          name: "Vacation Ownership",
          revenue: 3361,
          revenuePrior: 3171,
          adjEbitda: 861,
          adjEbitdaPrior: 764,
          margin: 25.6,
          share: 84,
          color: "#1D6B44",
          source: "10-K FY2025, Note 23",
          description: "Sale of VOIs, consumer financing, club dues, resort management, and rentals across Club Wyndham, WorldMark, Margaritaville Vacation Club, Sports Illustrated Resorts, Eddie Bauer Adventure Club, and Accor Vacation Club brands."
        },
        {
          name: "Travel & Membership",
          revenue: 662,
          revenuePrior: 695,
          adjEbitda: 228,
          adjEbitdaPrior: 251,
          margin: 34.4,
          share: 16,
          color: "#D4AF37",
          source: "10-K FY2025, Note 23",
          description: "RCI exchange (3.3M paid members across 3,600 resorts in 101 countries), Travel + Leisure GO direct-to-consumer club, Travel + Leisure For Business B2B private-label clubs."
        }
      ],
      brands: [
        { name: "Club Wyndham", type: "Core points-based timeshare", source: "10-K FY2025, Item 1" },
        { name: "WorldMark by Wyndham", type: "Northwest US / California-focused points club", source: "10-K FY2025, Item 1" },
        { name: "Margaritaville Vacation Club", type: "Licensed lifestyle brand (Margaritaville Holdings)", source: "10-K FY2025, Item 1" },
        { name: "Sports Illustrated Resorts", type: "Licensed lifestyle brand (Authentic Brands Group)", source: "10-K FY2025, Item 1" },
        { name: "Eddie Bauer Adventure Club", type: "Licensed outdoor lifestyle brand", source: "10-K FY2025, Item 1" },
        { name: "Accor Vacation Club", type: "Licensed brand (Accor) — Asia-Pacific focus", source: "10-K FY2025, Item 1" },
        { name: "RCI", type: "Largest VO exchange network — 3.3M paid members, 3,600 resorts, 101 countries", source: "10-K FY2025, Item 1" },
        { name: "Travel + Leisure GO", type: "Direct-to-consumer travel club", source: "10-K FY2025, Item 1" },
        { name: "Travel + Leisure For Business", type: "B2B private-label clubs", source: "10-K FY2025, Item 1" }
      ],
      geography: {
        summary: "280+ vacation-ownership resorts in U.S., Canada, Mexico, Caribbean, and Asia Pacific. Plus RCI exchange network of 3,600 affiliated resorts across 101 countries — the broadest geographic footprint of the three peers via affiliation, though directly-owned/managed inventory is concentrated in the US (FL 21%, CA 12%, NV 9% of VOI sales). Resort-level country breakdown not disclosed at granular level in 10-K.",
        regions: [
          { name: "Florida (US) — 21% of VOI sales", lat: 27.99, lng: -81.76, share: 21, source: "10-K FY2025, Note 23" },
          { name: "California (US) — 12% of VOI sales", lat: 36.78, lng: -119.42, share: 12, source: "10-K FY2025, Note 23" },
          { name: "Nevada (US) — 9% of VOI sales", lat: 36.17, lng: -115.14, share: 9, source: "10-K FY2025, Note 23" },
          { name: "Orlando — corporate HQ", lat: 28.54, lng: -81.46, note: "501 W. Church St.; lease through Oct 2040", source: "10-K FY2025, Item 2" },
          { name: "Other US (Hawaii, Carolinas, NW, etc.)", lat: 39.50, lng: -98.35, note: "Resorts disclosed in aggregate; specific state counts not in 10-K", source: "10-K FY2025, Item 1" },
          { name: "Canada", lat: 56.13, lng: -106.35, source: "10-K FY2025, Item 1" },
          { name: "Mexico", lat: 21.16, lng: -86.85, source: "10-K FY2025, Item 1" },
          { name: "Caribbean", lat: 18.34, lng: -64.93, source: "10-K FY2025, Item 1" },
          { name: "Asia-Pacific (Accor Vacation Club)", lat: -25.27, lng: 133.78, note: "Australia / Asia-Pacific via Accor brand license", source: "10-K FY2025, Item 1" },
          { name: "RCI affiliated network — 101 countries", lat: 0, lng: 0, note: "Indicative only; RCI's 3,600 affiliated resorts span 101 countries — not all are TNL-owned/managed", source: "10-K FY2025, Item 1" }
        ]
      },
      financials: {
        revenueTrend: [
          { year: 2024, value: 3864, source: "10-K FY2025, comparative" },
          { year: 2025, value: 4021, source: "10-K FY2025" }
        ],
        ebitdaTrend: [
          { year: 2024, value: 929, source: "10-K FY2025, comparative" },
          { year: 2025, value: 990, source: "10-K FY2025" }
        ],
        debtStack: [
          { label: "Corporate debt", value: 3474, source: "10-K FY2025, Note 15" },
          { label: "Non-recourse securitized", value: 2124, source: "10-K FY2025, Note 15" }
        ],
        capitalReturn: {
          dividends: 149,
          buybacks: 300,
          newAuthorization: 750,
          source: "10-K FY2025, Item 7",
          note: "Quarterly dividend $0.56/share. Post-year increase in repurchase authorization of $750M."
        },
        q12026: {
          revenue: 961,
          adjEbitda: 225,
          netIncome: 79,
          source: "Q1 2026 10-Q (filed Apr 22, 2026)"
        }
      },
      growth: [
        {
          headline: "Multi-brand expansion strategy",
          detail: "Stable of long-term, exclusive licensing relationships — Margaritaville, Sports Illustrated, Eddie Bauer, Accor — diversifies the brand portfolio beyond legacy Wyndham Club product. Each brand targets a distinct lifestyle segment with separate marketing channels.",
          source: "10-K FY2025, Item 1"
        },
        {
          headline: "Resort-optimization initiative",
          detail: "FY2025 inventory write-downs of $216M expected to drive EBITDA accretion in 2026 and beyond by removing underperforming inventory from the active sales mix and refocusing capital on higher-velocity properties.",
          source: "10-K FY2025, MD&A"
        },
        {
          headline: "Travel Club growth offsetting RCI exchange decline",
          detail: "Travel + Leisure GO transactions grew 13.8% to 765k while RCI exchange transactions declined 9.0% to 810k. T&L GO carries lower revenue per transaction ($225 vs. $360) but is structurally growing as direct-to-consumer travel-club demand expands.",
          source: "10-K FY2025, Key Metrics"
        },
        {
          headline: "Capital return acceleration",
          detail: "FY2025 share repurchases of $300M plus $149M dividends ($0.56/share quarterly). Post-year Board increased repurchase authorization by $750M. TNL has the most consistent capital-return cadence among the three peers.",
          source: "10-K FY2025, Item 7"
        },
        {
          headline: "Wyndham Hotels relationship",
          detail: "Long-term exclusive license + marketing agreement with Wyndham Hotels (~121M Wyndham Rewards members as of Sep 30, 2025) provides high-volume top-of-funnel for tour generation.",
          source: "10-K FY2025, Item 1A"
        }
      ],
      risks: [
        { title: "Industry competition", severity: 4, likelihood: 5, verbatim: "The timeshare industry is highly competitive and we are subject to risks related to competition that may adversely affect our performance.", source: "10-K FY2025, Item 1A" },
        { title: "Travel-industry health", severity: 5, likelihood: 4, verbatim: "Our revenues are highly dependent on the health of the travel industry and declines in or disruptions to the travel industry such as those caused by economic conditions, terrorism or acts of violence, political strife, severe weather events and other natural disasters, war, and pandemics may adversely affect us.", source: "10-K FY2025, Item 1A" },
        { title: "VO receivables portfolio", severity: 4, likelihood: 4, verbatim: "We are subject to risks related to our vacation ownership receivables portfolio.", source: "10-K FY2025, Item 1A", note: "Loan loss provision $484M in FY2025; ~19.5% of Gross VOI sales." },
        { title: "Cyber & data integrity", severity: 4, likelihood: 3, verbatim: "Failure to maintain the integrity of internal or customer data or to protect our systems from cyber-attacks could disrupt our business, damage our reputation, and subject us to significant costs, fines or lawsuits.", source: "10-K FY2025, Item 1A" },
        { title: "Indebtedness & cost of capital", severity: 3, likelihood: 3, verbatim: "We are subject to certain risks related to our indebtedness, hedging transactions, securitization of certain of our assets, surety bond requirements, the cost and availability of capital and the extension of credit by us.", source: "10-K FY2025, Item 1A" },
        { title: "Regulatory compliance burden", severity: 3, likelihood: 4, verbatim: "Our business is subject to extensive regulation and the cost of compliance or failure to comply with such regulations may adversely affect us.", source: "10-K FY2025, Item 1A" },
        { title: "Wyndham Hotels relationship", severity: 4, likelihood: 1, verbatim: "Our success depends in part on our ongoing relationship with Wyndham Hotels.", source: "10-K FY2025, Item 1A" }
      ],
      sources: [
        { label: "FY2025 10-K (filed Feb 18, 2026)", url: "https://www.sec.gov/Archives/edgar/data/1361658/000136165826000009/tnl-20251231.htm" },
        { label: "Q1 2026 10-Q (filed Apr 22, 2026)", url: "https://www.sec.gov/Archives/edgar/data/1361658/000136165826000027/wyn-20260331.htm" },
        { label: "EDGAR filings index (CIK 0001361658)", url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001361658" },
        { label: "Investor Relations", url: "https://investor.travelandleisureco.com" }
      ]
    }
  }
};
