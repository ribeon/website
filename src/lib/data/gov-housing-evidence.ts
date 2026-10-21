import sourceData from "./generated/gov-housing-evidence";
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
export const housingPermitICSeries = sourceData.housingPermitICSeries;
// Quintile HPI appreciation for permit_sf_yoy (1Q forward)
// Top quintile counties appreciate faster than bottom quintile
export const housingPermitQuintileReturns = sourceData.housingPermitQuintileReturns;
// Homebuilder sector-adaptive index: IC time series (OOS = 2020Q1+)
// hb_sector_adaptive_index — 16 tradable housing-sensitive names
// OOS IC +0.204, t=4.25, 65% hit rate (23 quarters, 2020Q1–2025Q3)
// Sector-aware: 40% monthly permit YoY + 40% permit value + 20% price tier (builders);
//               70% monthly permit YoY + 30% permit value (building materials)
export const homebuilderSectorAdaptiveICSeries = sourceData.homebuilderSectorAdaptiveICSeries;
// Keep legacy export name for backwards compatibility with any other references
// @deprecated — use homebuilderSectorAdaptiveICSeries
export const homebuilderContrICSeries = homebuilderSectorAdaptiveICSeries;
