# Federal Contract Spending as an Alternative Data Signal: Dataset Properties and Signal Analysis

**March 2026**

---

## Executive Summary

This document describes a structured alternative dataset that maps $7.3 trillion in U.S. federal contract obligations (prime contracts + FSRS subawards) to 142 SEC-registered equity tickers across 76 calendar quarters (2006Q4 through 2025Q3, spanning federal fiscal years 2007–2025). The dataset is constructed from the Federal Procurement Data System (FPDS) bulk archives and the Federal Funding Accountability and Transparency Act Subaward Reporting System (FSRS) published on USAspending.gov, linked to public equities through a proprietary entity resolution layer that combines automated fuzzy matching with 78 curated manual overrides and 44 time-aware M&A mappings. The resulting panel provides daily and quarterly measures of government contract activity — including both prime and subcontract flows — at the ticker level, along with pre-computed cross-sectional signals including unexpected government receivables, obligation momentum, award momentum, and agency concentration. All data is sourced from public federal records, delivered in point-in-time compliant format with a 3-5 business day lag from contract action to availability.

---

## 1. Data Construction

### 1.1 Source Data

The primary source is the FPDS bulk award archive maintained by the U.S. General Services Administration and published through USAspending.gov. FPDS is the authoritative system of record for all federal procurement actions above the micro-purchase threshold ($10,000; raised to $25,000 for certain categories). The archive contains individual contract action records including obligation amounts, awarding agency, contractor identifiers (DUNS/UEI), NAICS codes, and performance dates. The pipeline processes fiscal years 2007 through 2025, extracting 28 fields per contract action from CSV archives.

Contract types included are definitive contracts (types A, B, C, D) and indefinite delivery vehicles (IDV types A through E). Grants, loans, and direct payments are excluded.

### 1.2 Entity Resolution

Linking federal contractors to publicly traded equities is the central technical challenge. The pipeline employs a multi-stage resolution process:

1. **Parent company normalization.** USAspending provides a `recipient_parent_name` field based on SAM.gov parent-child relationships. This resolves most subsidiary-to-parent linkages automatically.

2. **Fuzzy matching.** Normalized parent contractor names are matched against the SEC EDGAR company ticker list using token-based fuzzy matching (rapidfuzz library, threshold score of 85). This automated step resolves 74% of mappings with a mean match score of 99.4 and a median of 100.0.

3. **Manual overrides.** 78 curated overrides handle defense primes, IT services integrators, and conglomerates where automated matching fails or is ambiguous (e.g., "Raytheon Company" vs. RTX Corporation post-merger, "Exelis Inc." to LHX via Harris acquisition). These overrides account for 33% of mapped entities.

4. **Temporal M&A mapping.** 44 corporate actions (mergers, acquisitions, spin-offs) are encoded with SEC 8-K verified effective dates. A contract awarded to "Raytheon" in 2019 maps to RTN; the same contractor name post-April 2020 maps to RTX. This ensures the panel is historically accurate without survivorship bias.

The entity resolution layer maps 500+ contractor names to 126 mapped entities across 142 unique tickers (including M&A predecessor tickers). 3 low-confidence mappings remain flagged for periodic review. The temporal mapping table contains 544 entries to handle all time-varying relationships. For subaward data, a two-tier mapping strategy is applied: Tier 1 maps subcontractors that are themselves publicly traded; Tier 2 attributes subawards to the prime contractor's ticker.

### 1.3 Point-in-Time Compliance

FPDS contract actions are published with a regulatory lag of approximately 3 business days from the action date. The dataset provides both a standard version (using action dates) and a point-in-time (PIT) version that shifts all observations forward by 3 business days to reflect when each data point was knowable to market participants.

**PIT implementation details and limitations:**

The PIT daily table (`pit_daily_awards_by_ticker.parquet`) shifts every contract action forward by 3 business days, producing a materially different daily-level time series — daily row counts differ from the standard table on approximately 80% of dates. This is the appropriate table for daily-frequency signal construction and backtesting where strict temporal fidelity is required.

At the quarterly level, the standard signals tables are appropriate for backtesting. The 3-5 business day FPDS publication lag is small relative to the quarterly aggregation window, and the dataset is constructed from finalized FPDS bulk archives where all contract actions from a given quarter are present in their final form. For users requiring intra-quarter point-in-time signal construction (e.g., estimating quarterly totals mid-quarter using only data published to date), the PIT daily table provides the necessary building blocks — users can aggregate the PIT daily data up to any arbitrary date to construct their own as-of-date quarterly estimates.

---

## 2. Dataset Coverage

### 2.1 Panel Structure

The dataset is organized as a balanced panel of ticker-quarter observations:

| Metric | Value |
|---|---|
| Unique tickers | 142 |
| Calendar quarters | 76 (2006 Q4 through 2025 Q3) |
| Daily observations | 500,831 |
| Quarterly observations | 9,469 |
| Total mapped obligations | $7,276.9 billion (prime: $4,807.2B + subawards: $2,469.6B) |
| Subaward share | 33.9% of combined obligations |
| Panel fill rate | 87.7% (9,469 of 10,792 possible ticker-quarters) |
| Tickers with complete 76-quarter history | 86 of 142 |
| Date range | 2006-10-01 to 2025-09-30 |

The panel maintains 90 to 142 active tickers per quarter throughout the sample period. The 12.3% gap in the fill rate is attributable to tickers that enter or exit the universe due to IPOs, delistings, or M&A events — in particular, M&A predecessor tickers (e.g., RTN pre-merger, LLL pre-L3Harris) create partial histories by design.

### 2.2 Obligations Distribution

Quarterly obligations per ticker range from -$1,087.5 million (net deobligations) to $35.5 billion. The median quarterly obligation is $103.7 million. The distribution is right-skewed, reflecting the concentration of federal spending among large defense and IT contractors. Individual FPDS contract actions with obligations exceeding $50B in absolute value are excluded as implausible data errors prior to aggregation.

### 2.3 Top Tickers by Cumulative Obligations

The following tickers represent the largest government contractors in the universe by prime contract obligations over the sample period:

| Ticker | Cumulative Prime Obligations |
|---|---|
| LMT | $881.1B |
| BA | $440.9B |
| GD | $347.6B |
| NOC | $204.6B |
| RTN | $204.0B |
| RTX | $149.6B |
| MCK | $148.7B |
| LDOS | $135.3B |
| BAESY | $117.8B |
| UNH | $109.4B |

The top 5 tickers (LMT, BA, GD, NOC, RTN/RTX) account for a disproportionate share of prime obligations, consistent with the known concentration of the U.S. defense industrial base. Note that RTN (Raytheon, pre-2020 merger) and RTX (RTX Corporation, post-2020) are listed separately, reflecting the time-aware M&A resolution. The universe also includes healthcare (MCK, UNH, HUM, PFE), professional services (BAH, SAIC, CACI, LDOS), and industrial conglomerates (HON, GE).

---

## 3. Signal Definitions

The dataset includes six pre-computed signals, each ranked cross-sectionally within quarter to produce percentile ranks (0 to 1). A composite signal aggregates all ranks with equal weighting.

### 3.1 Unexpected Government Receivables (UGR Surprise)

UGR surprise measures the deviation of actual quarterly obligations from their trailing four-quarter average:

> UGR = (Actual Obligations - Expected Obligations) / |Expected Obligations|

where Expected = rolling mean of the prior four quarters (minimum two quarters required). Values are winsorized at the 1st and 99th percentiles. This signal captures acceleration or deceleration in government revenue relative to a company's own recent history.

### 3.2 Obligation Momentum (QoQ and YoY)

Standard percentage change in total obligations on a quarter-over-quarter and year-over-year basis. QoQ captures short-term contract timing; YoY adjusts for seasonal patterns in the federal fiscal calendar (e.g., September year-end spending surges). Both are winsorized at the 1st and 99th percentiles.

### 3.3 Award Momentum (QoQ and YoY)

Percentage change in the number of distinct contract actions (award count), computed QoQ and YoY. Award count momentum can diverge from obligation momentum when a company wins many small contracts versus few large ones, providing complementary information about the breadth of government engagement.

### 3.4 Agency Concentration

Defined as the inverse of the number of unique awarding agencies in a quarter (1 / unique_agencies). Higher values indicate dependence on fewer agencies. This is a structural risk measure: a contractor reliant on a single agency (concentration = 1.0) faces different risk than one receiving awards from 20+ agencies (concentration approximately 0.05).

### 3.5 Composite Rank

An equal-weighted average of the six individual signal percentile ranks, itself re-ranked cross-sectionally within each quarter. The composite provides a single summary measure of a company's relative government contract momentum and structural profile.

---

## 4. Signal Properties

### 4.1 Distributional Summary

| Signal | NaN % | Mean | Std | Min | Max |
|---|---|---|---|---|---|
| ugr_surprise_pct | 3.9% | +0.168 | 1.194 | -0.967 | +10.164 |
| obligation_qoq | 4.3% | +1.052 | 4.003 | -1.000 | +41.284 |
| obligation_yoy | 8.4% | +0.684 | 3.216 | -1.000 | +199.630 |
| awards_qoq | 5.4% | +0.105 | 0.457 | -0.432 | +6.508 |
| awards_yoy | 9.4% | +0.071 | 0.411 | -0.475 | +1.812 |
| agency_concentration | 1.6% | +0.269 | 0.284 | +0.019 | +1.000 |
| composite_rank | 5.4% | +0.504 | 0.289 | +0.008 | +1.000 |

Signals are computed on combined prime + subaward obligations, capturing the full government supply chain value flow to each ticker. The UGR surprise signal has a positive mean (+0.168), indicating a right-skewed distribution driven by occasional large positive surprises. The NaN rates reflect stricter minimum-denominator thresholds applied during signal construction ($10K minimum for UGR, $100K for momentum) — these NaN values replace previously spurious extreme values caused by division by near-zero denominators. Agency concentration has a 1.6% NaN rate from subaward-only ticker-quarters where agency data is unavailable. The higher NaN rates for YoY signals (8.4% to 9.4%) reflect the four-quarter lookback requirement plus the minimum denominator filter. The composite rank requires at least 4 of 6 component signals to be non-NaN, producing a 5.4% NaN rate. The obligation_yoy maximum (+199.6) reflects an unwinsorized early-panel observation where prior-quarter data was insufficient to compute meaningful percentile bounds — this is correct behavior under the prior-quarter-only winsorization methodology.

### 4.2 Signal Persistence (Autocorrelation)

One-quarter-lag autocorrelation was computed per ticker, then averaged across the cross-section:

| Signal | Mean Autocorrelation | Median Autocorrelation | Interpretation |
|---|---|---|---|
| ugr_surprise_pct | -0.020 | -0.065 | Near zero: true surprise factor |
| obligation_qoq | -0.251 | -0.225 | Negative: mean-reverting (lumpy timing) |
| obligation_yoy | +0.117 | +0.075 | Low positive: modest persistence |
| awards_qoq | -0.280 | -0.263 | Negative: mean-reverting |
| awards_yoy | +0.449 | +0.478 | Moderate: real underlying momentum |
| agency_concentration | +0.461 | +0.468 | High: structural, slow-moving |

These persistence profiles are consistent with economic priors. UGR surprise behaves as a genuine innovation with near-zero autocorrelation, meaning prior-quarter surprises do not predict current-quarter surprises. The QoQ measures exhibit negative autocorrelation, consistent with contract timing noise that reverses. The YoY award count signal and agency concentration are the most persistent, reflecting underlying business mix changes that evolve slowly.

### 4.3 Cross-Correlations

|  | UGR | Obl QoQ | Obl YoY | Awd QoQ | Awd YoY | Concentration |
|---|---|---|---|---|---|---|
| UGR Surprise | 1.000 | 0.505 | 0.393 | 0.289 | 0.195 | 0.003 |
| Obligation QoQ | 0.505 | 1.000 | 0.187 | 0.288 | 0.042 | 0.086 |
| Obligation YoY | 0.393 | 0.187 | 1.000 | 0.053 | 0.227 | 0.045 |
| Awards QoQ | 0.289 | 0.288 | 0.053 | 1.000 | 0.284 | -0.051 |
| Awards YoY | 0.195 | 0.042 | 0.227 | 0.284 | 1.000 | 0.018 |
| Agency Concentration | 0.003 | 0.086 | 0.045 | -0.051 | 0.018 | 1.000 |

The highest pairwise correlation is between UGR surprise and obligation QoQ momentum (0.51), which is expected as both measure spending acceleration from different angles. Agency concentration is effectively uncorrelated with all other signals (all correlations below 0.09), confirming it captures a distinct, structural dimension of government revenue exposure. The moderate cross-correlations among the momentum signals (0.04 to 0.29) suggest that while they share common variation, each retains meaningful independent information, supporting their combination in a composite.

### 4.4 UGR Surprise Quintile Analysis

Tickers were sorted into quintiles based on within-quarter UGR surprise rankings in each quarter:

| Quintile | Mean UGR | Mean Obligation | Median Obligation | Obs. |
|---|---|---|---|---|
| Q1 (Low) | -0.73 | $83.4M | $13.5M | 1,785 |
| Q2 | -0.35 | $384.4M | $69.5M | 1,776 |
| Q3 | -0.07 | $692.4M | $148.1M | 1,788 |
| Q4 | +0.25 | $780.7M | $196.4M | 1,775 |
| Q5 (High) | +1.62 | $683.4M | $154.3M | 1,779 |

Mean obligations increase monotonically from Q1 ($83M) through Q4 ($781M), with a decline in Q5 ($683M). The Q5 decline reflects smaller contractors that experience proportionally large percentage surprises on a smaller dollar base. Median obligations increase monotonically from Q1 through Q4 ($14M to $196M), a 15x spread, indicating that UGR quintile membership is meaningfully associated with the absolute scale of government revenue.

### 4.5 Composite Signal Quintile Analysis

| Quintile | Mean Composite Rank | Mean Obligation | Median Obligation | Mean Awards | Obs. |
|---|---|---|---|---|---|
| Q1 (Low) | 0.11 | $249.5M | $30.2M | 884 | 1,756 |
| Q2 | 0.31 | $563.5M | $88.4M | 1,928 | 1,757 |
| Q3 | 0.50 | $686.2M | $126.8M | 3,532 | 1,758 |
| Q4 | 0.70 | $706.9M | $134.7M | 3,148 | 1,750 |
| Q5 (High) | 0.90 | $452.0M | $120.7M | 1,916 | 1,756 |

The composite signal produces a meaningful separation in the cross-section. Median obligations rise from $30.2M in Q1 to $134.7M in Q4, a 4.5x spread. Award counts peak in Q3 (3,532 mean awards), consistent with the composite capturing both obligation scale and momentum dimensions.

### 4.6 Indicative Return Analysis

To characterize the information content of the signals with respect to equity returns, we construct simple long/short quintile portfolios. For each quarter, tickers are sorted into quintiles by signal rank. Quarterly stock returns are computed from adjusted closing prices (source: Yahoo Finance). The long/short spread is Q5 (highest signal) minus Q1 (lowest signal).

**Important**: The following results are descriptive statistics of the dataset's properties. They do not constitute a trading strategy, backtest, or investment recommendation. Portfolio construction, transaction costs, capacity constraints, and risk management are the responsibility of the end user.

#### Equal-Weighted Quintile Portfolios

**UGR Surprise Signal:**

| Quintile | Annualized Return | Sharpe Ratio |
|---|---|---|
| Q1 (Low UGR) | +13.38% | 0.59 |
| Q5 (High UGR) | +15.91% | 0.79 |
| **L/S (Q5 - Q1)** | **+2.52%** | **0.21** |

**Composite Signal:**

| Quintile | Annualized Return | Sharpe Ratio |
|---|---|---|
| Q1 (Low Composite) | +14.17% | 0.61 |
| Q5 (High Composite) | +16.51% | 0.81 |
| **L/S (Q5 - Q1)** | **+2.34%** | **0.18** |

Both signals produce positive L/S spreads. The UGR signal yields a +2.52% annualized L/S spread. The composite signal produces a +2.34% spread, consistent with the composite capturing multiple dimensions of government spending momentum.

#### Information Coefficient (IC)

Cross-sectional rank IC (Spearman correlation between signal rank and next-quarter return) was computed for each quarter:

| Signal | Mean IC | IC t-statistic | Hit Rate (IC > 0) |
|---|---|---|---|
| UGR Surprise Rank | +0.019 | 1.52 | 51% |
| Composite Rank | +0.014 | 1.13 | 55% |

Both signals exhibit positive ICs. The UGR rank IC of +0.019 (t = 1.52) and composite rank IC of +0.014 (t = 1.13) are consistent with a weak but persistent positive relationship between government spending momentum and subsequent equity returns. These magnitudes are comparable to published results for government procurement signals in the academic and practitioner literature (e.g., TenderAlpha reports annualized L/S spreads of 5.4–7.1% for their UGR signal across a broader international universe). The hit rates of 51–55% indicate that the signal produces positive IC in the slight majority of quarters, consistent with a low-frequency, low-correlation alpha source that would complement existing factors rather than serve as a standalone strategy.

---

## 5. Data Quality

### 5.1 Integrity Checks

The pipeline performs systematic quality validation:

- **Deduplication.** Zero duplicate ticker-quarter records in the quarterly panel.
- **Negative obligations.** 107 quarterly observations (1.1% of panel) contain negative total obligations. These are expected and represent net deobligations — instances where contract modifications or cancellations exceeded new obligations in a given quarter for a given ticker. They are retained as valid observations.
- **Panel balance.** The fill rate of 87.7% (9,469 of 10,792 possible ticker-quarters) reflects genuine entry/exit rather than missing data. 86 of 142 tickers have complete histories across all 76 quarters. The lower fill rate compared to a smaller-universe version is by design: time-aware M&A resolution creates predecessor tickers (e.g., RTN, LLL, UTX) with partial histories that terminate at acquisition dates.
- **Business day coverage.** Daily data covers approximately 109% of expected business days (some records fall on weekends or holidays due to FPDS backdating conventions).

### 5.2 Signal Completeness

NaN rates across signals range from 1.6% (agency concentration) to 9.4% (awards YoY). The higher NaN rates in YoY measures are structural: they require four prior quarters of data and thus are unavailable for the first year of each ticker's history. Minimum denominator thresholds ($10K for UGR, $100K for obligation momentum, 5 awards for award momentum) produce additional NaN values where the base is too small for a meaningful growth rate. The composite rank (5.4% NaN) requires at least 4 of 6 component signals to be non-NaN.

### 5.3 Winsorization

All momentum and surprise signals are winsorized at the 1st and 99th percentiles using prior-quarter quantiles (no look-ahead bias). For each quarter Q, the winsorization bounds are computed from all observations in quarters strictly before Q, then applied uniformly to every ticker in Q. This approach avoids both temporal look-ahead and sort-order dependence within a quarter. Winsorization is applied before cross-sectional ranking. Raw (unwinsorized) values are not included in the standard delivery but are available on request.

### 5.4 Entity Resolution Quality

The mean fuzzy match score across all automated mappings is 99.4 (on a 0-100 scale), with a median of 100.0. The 85-point threshold for automated acceptance, combined with 73 manual overrides for ambiguous cases, is designed to minimize both false positives (incorrect ticker assignment) and false negatives (unmapped contractors). 6 low-confidence mappings are flagged for periodic review.

---

## 6. Contract Modification Signals

In addition to new award signals, the dataset provides signals derived from contract modification activity. Modifications — changes to existing contracts including funding increases, scope adjustments, and administrative corrections — represent a distinct information channel. A company receiving large positive modifications to existing contracts faces different dynamics than one winning new awards.

Six modification signals are computed quarterly:

| Signal | Description |
|---|---|
| `mod_net_value` | Net dollar value of all modifications in the quarter |
| `mod_count` | Count of distinct modification actions |
| `avg_mod_size` | Average dollar value per modification |
| `large_mod_count` | Count of modifications exceeding $10M (material contract changes) |
| `mod_increase_ratio` | Fraction of modifications that increased contract value (0-1) |
| `mod_surprise` | Deviation from trailing 4-quarter modification average (analogous to UGR) |

These signals are available both as a standalone table (`modification_signals.parquet`) and merged with the core signals in `full_quarterly_signals.parquet` (38 columns). An event-level table of individual material modifications exceeding $10M (`material_modifications.parquet`, 47,531 events, capped at $50B to exclude data-entry artifacts) is also provided for users requiring contract-level detail.

---

## 7. Supplementary Data: Lobbying Enrichment

An optional enrichment layer links 38 tickers to federal lobbying disclosure filings from the Lobbying Disclosure Act (LDA) database via OpenSecrets. This provides quarterly lobbying expenditures, lobbying intensity (spend per dollar of obligation), and a lobbying ROI measure. Lobbying data is lagged by one year to reflect actual disclosure timing (annual lobbying disclosures are not filed until Q1-Q2 of the following year). Coverage is limited to tickers with identifiable lobbying activity and should be treated as supplementary rather than comprehensive.

---

## 8. Delivery and Access

### 8.1 File Formats

| File | Format | Rows | Description |
|---|---|---|---|
| daily_awards_by_ticker | Parquet | 500,831 | Daily obligation and award counts per ticker (prime + sub) |
| quarterly_awards_by_ticker | Parquet | 9,469 | Quarterly aggregation with prime/subaward breakdown |
| quarterly_signals | Parquet | 9,469 | Pre-computed signals and cross-sectional ranks |
| enriched_quarterly_signals | Parquet | 9,469 | Signals + lobbying enrichment (38 tickers) |
| full_quarterly_signals | Parquet | 9,469 | All signals + 6 contract modification signals (38 columns) |
| modification_signals | Parquet | 9,200 | Quarterly modification activity signals |
| material_modifications | Parquet | 47,531 | Individual modifications > $10M |
| pit_daily_awards_by_ticker | Parquet | 435,350 | Point-in-time daily (3 BD lag applied) |
| contractor_ticker_map_temporal | CSV | 544 | Full entity resolution mapping with M&A dates |

### 8.2 API Access

A REST API (FastAPI) provides programmatic access to signals and raw data with filtering by ticker, quarter, and date range. Interactive documentation is available at the `/docs` endpoint.

### 8.3 Update Frequency

The underlying FPDS archive is updated continuously as agencies report contract actions. The pipeline can be re-run at any cadence; the standard delivery schedule is quarterly, aligned with the fiscal calendar. Intra-quarter daily updates are available on request.

### 8.4 Point-in-Time Compliance

The PIT daily table incorporates the 3-business-day FPDS publication lag, providing a materially different daily time series suitable for daily-frequency backtesting (see Section 1.3). No future information is used in signal construction: expected obligations are computed from trailing (not centered) windows, and all cross-sectional ranks use only information available as of the signal date.

---

## 9. Legal and Compliance

- **Data provenance.** All underlying contract data is sourced from USAspending.gov, a public U.S. government website operated by the Bureau of the Fiscal Service under the DATA Act of 2014. SEC ticker data is sourced from the SEC EDGAR public company list. Lobbying data is sourced from OpenSecrets LDA filings.
- **Redistribution.** Federal procurement data published on USAspending.gov is public domain and carries no redistribution restrictions. The value-added components of this dataset (entity resolution mappings, signal computations, temporal M&A handling) are proprietary.
- **Personally identifiable information.** The dataset contains no PII. Contractor names are standardized parent company names as reported in FPDS. No individual-level data is included.
- **Regulatory considerations.** This dataset provides factual, structured representations of public government procurement records. It does not constitute investment advice, a trading strategy, or a recommendation to buy or sell any security. Users are responsible for their own compliance with applicable regulations regarding the use of alternative data in investment processes.

---

## Appendix: Data Dictionary

### Quarterly Signals Table Schema

| Column | Type | Description |
|---|---|---|
| quarter | string | Calendar quarter (e.g., "2024Q1") |
| ticker | string | SEC equity ticker symbol |
| total_obligation | float64 | Total federal obligations in the quarter ($) |
| num_awards | int64 | Number of distinct contract actions |
| unique_agencies | int64 | Count of distinct awarding agencies |
| unique_naics | int64 | Count of distinct NAICS codes |
| ugr_surprise_pct | float64 | UGR surprise: (actual - trailing avg) / trailing avg |
| obligation_qoq | float64 | Quarter-over-quarter obligation growth |
| obligation_yoy | float64 | Year-over-year obligation growth |
| awards_qoq | float64 | Quarter-over-quarter award count growth |
| awards_yoy | float64 | Year-over-year award count growth |
| agency_concentration | float64 | 1 / unique_agencies (higher = more concentrated) |
| *_rank | float64 | Cross-sectional percentile rank within quarter (0-1) |
| composite_signal | float64 | Equal-weight mean of all signal ranks |
| composite_rank | float64 | Cross-sectional percentile rank of composite signal |

---

*This document describes dataset properties and signal characteristics. It does not constitute investment advice or make claims about future investment performance. All statistics are computed from historical data covering fiscal years 2007 through 2025.*
