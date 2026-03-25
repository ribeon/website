# Data Dictionary

**Federal Contract Spending by Public Company Dataset**

Version 2.0 | March 2026

---

## Overview

This document describes the schema, field definitions, and data types for all tables in the Federal Contract Spending dataset. The dataset maps US federal contract obligations from the Federal Procurement Data System (FPDS) to SEC-registered stock tickers.

**Universe**: 142 SEC-registered tickers
**Temporal Coverage**: FY2007 Q1 (2006-10-01) through FY2025 Q3 (2025-09-30)
**Update Frequency**: Quarterly, with ~3-5 business day delivery lag from FPDS publication

---

## Table 1: `daily_awards_by_ticker.parquet`

Daily aggregation of federal contract obligations by ticker symbol.

**Row count**: ~500,831
**Grain**: One row per (date, ticker) combination
**Update frequency**: Quarterly refresh

| # | Column | Type | Nullable | Description |
|---|--------|------|----------|-------------|
| 1 | `date` | date | No | Contract action date (YYYY-MM-DD). The date the contracting officer signed the contract action. |
| 2 | `ticker` | string | No | SEC-registered stock ticker symbol (e.g., "LMT", "RTX", "BA"). Mapped from FPDS parent contractor name via entity resolution. |
| 3 | `total_obligation` | float64 | No | Sum of federal obligations in US dollars for this ticker on this date. Positive values represent new obligations; negative values represent deobligations (contract closeouts, cancellations). |
| 4 | `num_awards` | int64 | No | Count of distinct contract actions (awards, modifications, etc.) for this ticker on this date. |
| 5 | `avg_award_size` | float64 | No | Mean of federal obligations in US dollars across all contract actions for this ticker on this date. |
| 6 | `max_award` | float64 | No | Maximum single federal obligation in US dollars for this ticker on this date. |
| 7 | `agencies` | string | No | Pipe-delimited list of unique awarding agency names for this ticker on this date (up to 5). |
| 8 | `naics_codes` | string | No | Pipe-delimited list of unique NAICS industry codes for this ticker on this date (up to 5). |

**Notes**:
- `total_obligation` can be negative when deobligations exceed new obligations on a given day. This is expected and represents contract closeouts or funding rescissions.
- Dates are calendar dates, not fiscal year dates. The US federal fiscal year runs October 1 through September 30.
- A single ticker may appear on most business days if the underlying company receives high-frequency contract actions.
- `agencies` and `naics_codes` are capped at 5 unique values per row to keep string fields compact.

---

## Table 2: `quarterly_awards_by_ticker.parquet`

Quarterly aggregation of federal contract obligations by ticker symbol.

**Row count**: ~9,469
**Grain**: One row per (quarter, ticker) combination
**Update frequency**: Quarterly refresh

| # | Column | Type | Nullable | Description |
|---|--------|------|----------|-------------|
| 1 | `quarter` | string | No | Calendar quarter identifier (e.g., "2024Q1", "2023Q4"). Format: YYYYQ[1-4]. |
| 2 | `ticker` | string | No | SEC-registered stock ticker symbol. |
| 3 | `total_obligation` | float64 | No | Sum of federal obligations in US dollars for this ticker in this quarter. |
| 4 | `num_awards` | int64 | No | Count of distinct contract actions for this ticker in this quarter. |
| 5 | `avg_award_size` | float64 | No | Mean of federal obligations in US dollars across all contract actions for this ticker in this quarter. |
| 6 | `max_award` | float64 | No | Maximum single federal obligation in US dollars for this ticker in this quarter. |
| 7 | `unique_agencies` | int64 | No | Count of distinct federal awarding agencies for this ticker in this quarter. |
| 8 | `unique_naics` | int64 | No | Count of distinct NAICS industry codes for this ticker in this quarter. |

**Notes**:
- Quarters use calendar quarters (Q1 = Jan-Mar), not federal fiscal quarters.
- Panel fill rate is 87.7% (9,469 of 10,792 possible ticker-quarter observations).
- 86 of 142 tickers have complete history across all 76 quarters.

---

## Table 3: `quarterly_signals.parquet`

Pre-computed quantitative signals derived from the quarterly awards data. All signals are cross-sectionally ranked within each quarter.

**Row count**: ~9,469
**Grain**: One row per (quarter, ticker) combination
**Update frequency**: Quarterly refresh

### Base Columns (from quarterly awards)

| # | Column | Type | Nullable | Description |
|---|--------|------|----------|-------------|
| 1 | `quarter` | string | No | Calendar quarter identifier (e.g., "2024Q1"). |
| 2 | `ticker` | string | No | SEC-registered stock ticker symbol. |
| 3 | `total_obligation` | float64 | No | Sum of federal obligations in US dollars for this ticker in this quarter. **Includes both prime and subaward obligations** (see `prime_obligation` and `subaward_obligation` columns in the merged dataset). When both the prime contractor and a subcontractor are publicly traded, the same dollar flow appears under both tickers — buyers requiring non-double-counted figures should use `prime_obligation` alone. |
| 4 | `num_awards` | int64 | No | Count of distinct contract actions for this ticker in this quarter. |
| 5 | `avg_award_size` | float64 | No | Mean of federal obligations per contract action. |
| 6 | `max_award` | float64 | No | Maximum single federal obligation in this quarter. Individual FPDS actions with obligations exceeding $50B are excluded as implausible data errors; the practical per-quarter maximum for a single ticker is approximately $35.5B. |
| 7 | `unique_agencies` | int64 | No | Count of distinct awarding agencies. |
| 8 | `unique_naics` | int64 | No | Count of distinct NAICS codes. |

### Raw Signals

| # | Column | Type | Nullable | Description |
|---|--------|------|----------|-------------|
| 9 | `expected_obligation` | float64 | Yes | Trailing 4-quarter rolling average of total obligations (shifted by 1 quarter). Used as the baseline expectation for the UGR surprise signal. NaN for first quarters of a ticker's history. |
| 10 | `ugr_surprise` | float64 | Yes | **Unexpected Government Receivables (UGR) Surprise**. Raw dollar difference: `total_obligation - expected_obligation`. |
| 11 | `ugr_surprise_pct` | float64 | Yes | **UGR Surprise (percentage)**. Deviation of current quarter obligations from the trailing 4-quarter average: `ugr_surprise / abs(expected_obligation)`. NaN when expected obligation is below $10K (to avoid division by near-zero). Winsorized at 1st/99th percentiles within each quarter. |
| 12 | `obligation_qoq` | float64 | Yes | **Quarter-over-Quarter Obligation Growth**. Percentage change in total obligations vs. prior quarter: `(Q_t - Q_{t-1}) / abs(Q_{t-1})`. NaN for first quarter of a ticker's history. Winsorized at 1st/99th percentiles. |
| 13 | `obligation_yoy` | float64 | Yes | **Year-over-Year Obligation Growth**. Percentage change in total obligations vs. same quarter one year ago: `(Q_t - Q_{t-4}) / abs(Q_{t-4})`. NaN for first 4 quarters of a ticker's history. Winsorized at 1st/99th percentiles. |
| 14 | `awards_qoq` | float64 | Yes | **Quarter-over-Quarter Award Count Growth**. Percentage change in number of contract actions vs. prior quarter. |
| 15 | `awards_yoy` | float64 | Yes | **Year-over-Year Award Count Growth**. Percentage change in number of contract actions vs. same quarter one year ago. |
| 16 | `agency_concentration` | float64 | No | **Agency Concentration**. Inverse diversity measure of a ticker's obligations across federal agencies. Range [0, 1]. Values near 1 indicate dependence on a single agency; values near 0 indicate diversified government revenue. Computed as: `1 / unique_agencies` (inverse of unique agency count). Note: this is not a true Herfindahl-Hirschman Index (HHI), which requires per-agency dollar-share weights. This metric measures breadth of agency relationships, not dollar-weighted concentration. |

### Cross-Sectional Ranks

| # | Column | Type | Nullable | Description |
|---|--------|------|----------|-------------|
| 17 | `ugr_surprise_pct_rank` | float64 | Yes | Percentile rank of UGR surprise within the quarter. Range [0, 1]. Computed using `pandas.Series.rank(pct=True)`. |
| 18 | `obligation_qoq_rank` | float64 | Yes | Percentile rank of QoQ obligation growth within the quarter. |
| 19 | `obligation_yoy_rank` | float64 | Yes | Percentile rank of YoY obligation growth within the quarter. |
| 20 | `awards_qoq_rank` | float64 | Yes | Percentile rank of QoQ award count growth within the quarter. |
| 21 | `awards_yoy_rank` | float64 | Yes | Percentile rank of YoY award count growth within the quarter. |
| 22 | `agency_concentration_rank` | float64 | No | Percentile rank of agency concentration within the quarter. |
| 23 | `composite_signal` | float64 | Yes | **Composite Signal**. Equal-weight average of all individual signal ranks. Requires at least 4 of 6 signal ranks to be non-NaN; otherwise NaN. Range [0, 1]. |
| 24 | `composite_rank` | float64 | Yes | Percentile rank of composite signal within the quarter. Higher values indicate stronger government spending momentum across all dimensions. |

**Notes on Ranking**:
- Ranks are computed cross-sectionally within each quarter (not across time).
- Rank 0.0 = lowest value in the quarter; rank 1.0 = highest value.
- NaN signals produce NaN ranks; the composite signal uses the average of available (non-NaN) signal ranks, requiring at least 4 of 6.

---

## Table 4: `enriched_quarterly_signals.parquet`

All columns from `quarterly_signals.parquet` plus lobbying enrichment data. Lobbying data is available for 38 tickers with matched OpenSecrets LDA filings (2015-2024).

**Row count**: ~9,469
**Grain**: One row per (quarter, ticker) combination

### Additional Columns (beyond quarterly_signals)

| # | Column | Type | Nullable | Description |
|---|--------|------|----------|-------------|
| 25 | `lobbying_spend` | float64 | Yes | Total lobbying expenditure in US dollars for this ticker in this quarter, sourced from OpenSecrets LDA filings. NaN for tickers without matched lobbying data. |
| 26 | `lobbying_intensity` | float64 | Yes | Ratio of lobbying spend to government obligations: `lobbying_spend / total_obligation`. Measures lobbying effort per dollar of government revenue. |
| 27 | `lobbying_roi` | float64 | Yes | Ratio of government obligations to lobbying spend: `total_obligation / lobbying_spend`. Measures government revenue generated per dollar of lobbying. |

---

## Table 5: `pit_daily_awards_by_ticker.parquet` (Point-in-Time)

Identical schema to `daily_awards_by_ticker.parquet`, reconstructed with a 3 business day FPDS publication lag to prevent look-ahead bias. Each row's `date` field reflects when the data would have been available to a market participant, not when the contract action occurred.

**Purpose**: Enables daily-frequency backtesting without look-ahead bias. The 3 business day shift produces a materially different daily time series — daily row counts differ from the standard table on approximately 80% of dates. See the research whitepaper Section 1.3 for details on PIT methodology and limitations.

---

## Table 6: `modification_signals.parquet`

Quarterly signals derived from contract modification activity. Modifications are changes to existing contracts (increased funding, scope changes, administrative corrections) and provide a distinct signal from new awards.

**Row count**: ~9,200
**Grain**: One row per (quarter, ticker) combination
**Update frequency**: Quarterly refresh

| # | Column | Type | Nullable | Description |
|---|--------|------|----------|-------------|
| 1 | `quarter` | string | No | Calendar quarter identifier (e.g., "2024Q1"). |
| 2 | `ticker` | string | No | SEC-registered stock ticker symbol. |
| 3 | `mod_net_value` | float64 | No | Net dollar value of all contract modifications in this quarter. Positive = net increase in contract funding. |
| 4 | `mod_count` | int64 | No | Count of distinct contract modifications in this quarter. |
| 5 | `avg_mod_size` | float64 | No | Average dollar value per modification (`mod_net_value / mod_count`). |
| 6 | `large_mod_count` | int64 | No | Count of modifications exceeding $10M in absolute value. Captures material contract changes. |
| 7 | `mod_increase_ratio` | float64 | No | Fraction of modifications that increased contract value. Range [0, 1]. Values near 1 indicate predominantly positive modifications. |
| 8 | `mod_surprise` | float64 | Yes | Deviation of current quarter modification value from trailing 4-quarter average, analogous to UGR surprise. NaN for first 4 quarters of a ticker's history. |

---

## Table 7: `material_modifications.parquet`

Individual contract modifications exceeding $10M in absolute value. Provides event-level detail on significant contract changes.

**Row count**: ~47,531
**Grain**: One row per material modification event
**Update frequency**: Quarterly refresh

| # | Column | Type | Nullable | Description |
|---|--------|------|----------|-------------|
| 1 | `date` | datetime64 | No | Date of the contract modification action. |
| 2 | `ticker` | string | No | SEC-registered stock ticker symbol. |
| 3 | `contract_key` | string | No | Unique contract identifier (PIID or referenced PIID). |
| 4 | `modification_value` | float64 | No | Dollar value of this modification. Positive = funding increase; negative = deobligation. |
| 5 | `agency` | string | No | Awarding federal agency name. |
| 6 | `naics` | string | Yes | NAICS industry code for the contract. |
| 7 | `cumulative_contract_value` | float64 | Yes | Running total of all modifications to this contract. NaN where not computable. |

---

## Table 8: `full_quarterly_signals.parquet`

All columns from `quarterly_signals.parquet` plus the 6 modification signal columns from `modification_signals.parquet`. This is the most comprehensive single-table view of all quarterly signals.

**Row count**: ~9,469
**Grain**: One row per (quarter, ticker) combination
**Columns**: 38 (32 from quarterly_signals + 6 modification signals)

---

## Table 9: `contractor_ticker_map_temporal.csv`

The entity resolution mapping table linking FPDS contractor names to SEC ticker symbols, with time-aware validity periods for M&A events.

**Row count**: ~540
**Grain**: One row per (contractor, ticker, time period) combination

| # | Column | Type | Nullable | Description |
|---|--------|------|----------|-------------|
| 1 | `parent_contractor_name` | string | No | Standardized parent company name from FPDS (uppercase). This is the `recipient_parent_name` field from USAspending bulk archives. |
| 2 | `ticker` | string | Yes | Mapped SEC stock ticker symbol. Empty string for private companies or unmatched contractors. |
| 3 | `match_score` | float64 | No | Entity resolution confidence score (0-100). Fuzzy matches use rapidfuzz `token_sort_ratio`; manual overrides are scored 100. |
| 4 | `match_method` | string | No | Resolution method. One of: `fuzzy_auto` (77% of mappings) — automated fuzzy string matching above threshold 85; `manual_override` (23% of mappings) — curated mapping for defense primes, IT integrators, subsidiaries, and M&A edge cases. |
| 5 | `effective_from` | date | No | Start date of this mapping's validity (YYYY-MM-DD). For companies without M&A events, this is 2000-01-01. For acquired companies, this reflects the acquisition closing date. |
| 6 | `effective_to` | date | No | End date of this mapping's validity (YYYY-MM-DD). For currently active mappings, this is 2099-12-31. For pre-acquisition mappings, this is the day before the acquisition closing date. |

**Notes on M&A Handling**:
- 44 M&A events are tracked with SEC 8-K verified closing dates.
- Example: Raytheon Company → RTN (effective_to: 2020-04-02), then Raytheon Technologies → RTX (effective_from: 2020-04-03).
- Subsidiary roll-ups map entities like "Electric Boat Corporation" → GD, "Peraton" → LHX.
- 73 manual override entries ensure correct mapping of defense primes, IT integrators, and edge cases that fuzzy matching alone would miss.

---

## Data Quality Characteristics

| Metric | Value |
|--------|-------|
| Panel fill rate | 87.7% (9,469 of 10,792 possible) |
| Duplicate ticker-quarters | 0 |
| Negative obligation quarters | 107 (1.1%) — expected from deobligations |
| Obligation range | -$1,087.5M to $35.5B per quarter (individual FPDS actions with obligations ≥$50B are excluded as data errors) |
| Median quarterly obligation | $103.7M |
| Mean entity resolution score | 99.4 / 100 |
| Tickers with full 76-quarter history | 86 of 142 |

---

## File Formats

| Format | Description |
|--------|-------------|
| `.parquet` | Apache Parquet columnar format. Readable by pandas, polars, DuckDB, Spark, R (arrow), and all major data platforms. |
| `.csv` | Comma-separated values. Used for mapping tables and sample files. |

**Recommended readers**:
```python
import pandas as pd
df = pd.read_parquet("quarterly_signals.parquet")
```
```sql
-- DuckDB
SELECT * FROM read_parquet('quarterly_signals.parquet');
```
```r
# R
library(arrow)
df <- read_parquet("quarterly_signals.parquet")
```
