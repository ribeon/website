/**
 * Evidence data for the gov-housing dataset — derived from validation against Zillow ZHVI
 * and homebuilder backtest output.
 * permit_sf_yoy: IC +0.099 (t=5.91) at 1Q, IC +0.129 (t=6.89) at 4Q.
 * hb_sector_adaptive_index (16 tradable names): OOS IC +0.204, t=4.25, 65% hit rate.
 * OOS = 2020Q1+, 23 quarters through 2025Q3. Verified April 2026.
 * Provided for illustration — this is sample data, not the full dataset.
 */

// Quarterly IC values for permit_sf_yoy vs Zillow ZHVI (1-quarter forward)
// Mean IC: ~+0.099, t=5.91 across county-quarter observations
export const housingPermitICSeries = [
  { period: '2010Q4', ic: 0.081, cumulative_ic: 0.081 },
  { period: '2011Q2', ic: 0.094, cumulative_ic: 0.175 },
  { period: '2011Q4', ic: 0.068, cumulative_ic: 0.243 },
  { period: '2012Q2', ic: 0.112, cumulative_ic: 0.355 },
  { period: '2012Q4', ic: 0.103, cumulative_ic: 0.458 },
  { period: '2013Q2', ic: 0.087, cumulative_ic: 0.545 },
  { period: '2013Q4', ic: 0.076, cumulative_ic: 0.621 },
  { period: '2014Q2', ic: 0.099, cumulative_ic: 0.720 },
  { period: '2014Q4', ic: 0.115, cumulative_ic: 0.835 },
  { period: '2015Q2', ic: 0.091, cumulative_ic: 0.926 },
  { period: '2015Q4', ic: 0.083, cumulative_ic: 1.009 },
  { period: '2016Q2', ic: 0.107, cumulative_ic: 1.116 },
  { period: '2016Q4', ic: 0.095, cumulative_ic: 1.211 },
  { period: '2017Q2', ic: 0.118, cumulative_ic: 1.329 },
  { period: '2017Q4', ic: 0.088, cumulative_ic: 1.417 },
  { period: '2018Q2', ic: 0.074, cumulative_ic: 1.491 },
  { period: '2018Q4', ic: 0.101, cumulative_ic: 1.592 },
  { period: '2019Q2', ic: 0.092, cumulative_ic: 1.684 },
  { period: '2019Q4', ic: 0.110, cumulative_ic: 1.794 },
  { period: '2020Q2', ic: 0.086, cumulative_ic: 1.880 },
  { period: '2020Q4', ic: 0.129, cumulative_ic: 2.009 },
  { period: '2021Q2', ic: 0.141, cumulative_ic: 2.150 },
  { period: '2021Q4', ic: 0.124, cumulative_ic: 2.274 },
  { period: '2022Q2', ic: 0.108, cumulative_ic: 2.382 },
  { period: '2022Q4', ic: 0.097, cumulative_ic: 2.479 },
  { period: '2023Q2', ic: 0.083, cumulative_ic: 2.562 },
  { period: '2023Q4', ic: 0.091, cumulative_ic: 2.653 },
  { period: '2024Q2', ic: 0.102, cumulative_ic: 2.755 },
  { period: '2024Q4', ic: 0.108, cumulative_ic: 2.863 },
]

// Quintile HPI appreciation for permit_sf_yoy (1Q forward)
// Top quintile counties appreciate faster than bottom quintile
export const housingPermitQuintileReturns = [
  { quintile: 'Q1 (Low)', value: 0.8 },
  { quintile: 'Q2', value: 1.4 },
  { quintile: 'Q3', value: 1.9 },
  { quintile: 'Q4', value: 2.6 },
  { quintile: 'Q5 (High)', value: 3.5 },
]

// Homebuilder sector-adaptive index: IC time series (OOS = 2020Q1+)
// hb_sector_adaptive_index — 16 tradable housing-sensitive names
// OOS IC +0.204, t=4.25, 65% hit rate (23 quarters, 2020Q1–2025Q3)
// Sector-aware: 40% monthly permit YoY + 40% permit value + 20% price tier (builders);
//               70% monthly permit YoY + 30% permit value (building materials)
export const homebuilderSectorAdaptiveICSeries = [
  // IS period (2010–2019) — lower IC, more volatile
  { period: '2010Q4', ic: 0.072, cumulative_ic: 0.072 },
  { period: '2011Q2', ic: -0.018, cumulative_ic: 0.054 },
  { period: '2011Q4', ic: 0.089, cumulative_ic: 0.143 },
  { period: '2012Q2', ic: 0.063, cumulative_ic: 0.206 },
  { period: '2012Q4', ic: 0.048, cumulative_ic: 0.254 },
  { period: '2013Q2', ic: 0.095, cumulative_ic: 0.349 },
  { period: '2013Q4', ic: -0.029, cumulative_ic: 0.320 },
  { period: '2014Q2', ic: 0.071, cumulative_ic: 0.391 },
  { period: '2014Q4', ic: 0.058, cumulative_ic: 0.449 },
  { period: '2015Q2', ic: 0.043, cumulative_ic: 0.492 },
  { period: '2015Q4', ic: -0.012, cumulative_ic: 0.480 },
  { period: '2016Q2', ic: 0.088, cumulative_ic: 0.568 },
  { period: '2016Q4', ic: 0.052, cumulative_ic: 0.620 },
  { period: '2017Q2', ic: 0.075, cumulative_ic: 0.695 },
  { period: '2017Q4', ic: -0.031, cumulative_ic: 0.664 },
  { period: '2018Q2', ic: 0.064, cumulative_ic: 0.728 },
  { period: '2018Q4', ic: 0.038, cumulative_ic: 0.766 },
  { period: '2019Q2', ic: 0.091, cumulative_ic: 0.857 },
  { period: '2019Q4', ic: -0.024, cumulative_ic: 0.833 },
  // OOS period (2020Q1+) — materially stronger IC
  { period: '2020Q2', ic: 0.276, cumulative_ic: 1.109 },
  { period: '2020Q4', ic: 0.188, cumulative_ic: 1.297 },
  { period: '2021Q2', ic: 0.234, cumulative_ic: 1.531 },
  { period: '2021Q4', ic: -0.058, cumulative_ic: 1.473 },
  { period: '2022Q2', ic: 0.251, cumulative_ic: 1.724 },
  { period: '2022Q4', ic: -0.031, cumulative_ic: 1.693 },
  { period: '2023Q2', ic: 0.219, cumulative_ic: 1.912 },
  { period: '2023Q4', ic: 0.196, cumulative_ic: 2.108 },
  { period: '2024Q2', ic: 0.239, cumulative_ic: 2.347 },
  { period: '2024Q4', ic: 0.224, cumulative_ic: 2.571 },
]

// Keep legacy export name for backwards compatibility with any other references
// @deprecated — use homebuilderSectorAdaptiveICSeries
export const homebuilderContrICSeries = homebuilderSectorAdaptiveICSeries
