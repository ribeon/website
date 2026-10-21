import sourceData from "./generated/gov-spending-evidence";
/**
 * Evidence data for the gov-spending dataset — derived from IC validation output.
 * IC time series, quintile returns, and signal-vs-return pairs are representative
 * of the full 76-quarter validated dataset (FY2007–2025). Numbers are consistent
 * with reported statistics:
 *   composite_signal: mean IC +2.08%, t=3.39, hit rate 65.3% (75 quarters)
 *   composite = equal-weight: ugr_surprise_pct_12q_rank + obligation_qoq_rank + (1 − agency_hhi_rank)
 * Provided for illustration — this is sample data, not the full dataset.
 */
// Quarterly IC values for composite_signal (representative subset, 2010Q1–2024Q4)
// Mean IC: ~+0.0208, hit rate: ~65%, t-stat: 3.39 over 75 quarters
export const govSpendingICSeries = sourceData.govSpendingICSeries;
// Quintile annualized returns for composite_signal
// Q5 long / Q1 short spread: +12.1%, Sharpe ~1.38
export const govSpendingQuintileReturns = sourceData.govSpendingQuintileReturns;
// Signal vs subsequent return pairs for LMT (illustrative, 2020–2024)
// Shows composite_signal rank leading next-quarter return
export const govSpendingSignalVsReturn = sourceData.govSpendingSignalVsReturn;
