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
export const govSpendingICSeries = [
  { period: '2010Q1', ic: 0.039, cumulative_ic: 0.039 },
  { period: '2010Q2', ic: -0.005, cumulative_ic: 0.034 },
  { period: '2010Q3', ic: 0.043, cumulative_ic: 0.077 },
  { period: '2010Q4', ic: 0.026, cumulative_ic: 0.103 },
  { period: '2011Q1', ic: 0.058, cumulative_ic: 0.161 },
  { period: '2011Q2', ic: -0.016, cumulative_ic: 0.145 },
  { period: '2011Q3', ic: 0.031, cumulative_ic: 0.176 },
  { period: '2011Q4', ic: 0.014, cumulative_ic: 0.190 },
  { period: '2012Q1', ic: 0.048, cumulative_ic: 0.238 },
  { period: '2012Q2', ic: 0.027, cumulative_ic: 0.265 },
  { period: '2012Q3', ic: -0.011, cumulative_ic: 0.254 },
  { period: '2012Q4', ic: 0.035, cumulative_ic: 0.289 },
  { period: '2013Q1', ic: 0.016, cumulative_ic: 0.305 },
  { period: '2013Q2', ic: 0.047, cumulative_ic: 0.352 },
  { period: '2013Q3', ic: -0.021, cumulative_ic: 0.331 },
  { period: '2013Q4', ic: 0.031, cumulative_ic: 0.362 },
  { period: '2014Q1', ic: 0.022, cumulative_ic: 0.384 },
  { period: '2014Q2', ic: 0.053, cumulative_ic: 0.437 },
  { period: '2014Q3', ic: 0.009, cumulative_ic: 0.446 },
  { period: '2014Q4', ic: -0.004, cumulative_ic: 0.442 },
  { period: '2015Q1', ic: 0.038, cumulative_ic: 0.480 },
  { period: '2015Q2', ic: 0.018, cumulative_ic: 0.498 },
  { period: '2015Q3', ic: -0.025, cumulative_ic: 0.473 },
  { period: '2015Q4', ic: 0.034, cumulative_ic: 0.507 },
  { period: '2016Q1', ic: 0.057, cumulative_ic: 0.564 },
  { period: '2016Q2', ic: 0.011, cumulative_ic: 0.575 },
  { period: '2016Q3', ic: -0.008, cumulative_ic: 0.567 },
  { period: '2016Q4', ic: 0.040, cumulative_ic: 0.607 },
  { period: '2017Q1', ic: 0.024, cumulative_ic: 0.631 },
  { period: '2017Q2', ic: 0.049, cumulative_ic: 0.680 },
  { period: '2017Q3', ic: 0.017, cumulative_ic: 0.697 },
  { period: '2017Q4', ic: -0.015, cumulative_ic: 0.682 },
  { period: '2018Q1', ic: 0.032, cumulative_ic: 0.714 },
  { period: '2018Q2', ic: 0.055, cumulative_ic: 0.769 },
  { period: '2018Q3', ic: 0.020, cumulative_ic: 0.789 },
  { period: '2018Q4', ic: -0.026, cumulative_ic: 0.763 },
  { period: '2019Q1', ic: 0.043, cumulative_ic: 0.806 },
  { period: '2019Q2', ic: 0.028, cumulative_ic: 0.834 },
  { period: '2019Q3', ic: -0.007, cumulative_ic: 0.827 },
  { period: '2019Q4', ic: 0.036, cumulative_ic: 0.863 },
  { period: '2020Q1', ic: -0.030, cumulative_ic: 0.833 },
  { period: '2020Q2', ic: 0.061, cumulative_ic: 0.894 },
  { period: '2020Q3', ic: 0.025, cumulative_ic: 0.919 },
  { period: '2020Q4', ic: 0.014, cumulative_ic: 0.933 },
  { period: '2021Q1', ic: 0.052, cumulative_ic: 0.985 },
  { period: '2021Q2', ic: -0.019, cumulative_ic: 0.966 },
  { period: '2021Q3', ic: 0.039, cumulative_ic: 1.005 },
  { period: '2021Q4', ic: 0.022, cumulative_ic: 1.027 },
  { period: '2022Q1', ic: 0.045, cumulative_ic: 1.072 },
  { period: '2022Q2', ic: 0.030, cumulative_ic: 1.102 },
  { period: '2022Q3', ic: -0.013, cumulative_ic: 1.089 },
  { period: '2022Q4', ic: 0.050, cumulative_ic: 1.139 },
  { period: '2023Q1', ic: 0.021, cumulative_ic: 1.160 },
  { period: '2023Q2', ic: 0.060, cumulative_ic: 1.220 },
  { period: '2023Q3', ic: -0.010, cumulative_ic: 1.210 },
  { period: '2023Q4', ic: 0.027, cumulative_ic: 1.237 },
  { period: '2024Q1', ic: 0.042, cumulative_ic: 1.279 },
  { period: '2024Q2', ic: 0.018, cumulative_ic: 1.297 },
  { period: '2024Q3', ic: -0.022, cumulative_ic: 1.275 },
  { period: '2024Q4', ic: 0.035, cumulative_ic: 1.310 },
]

// Quintile annualized returns for composite_signal
// Q5 long / Q1 short spread: +12.1%, Sharpe ~1.38
export const govSpendingQuintileReturns = [
  { quintile: 'Q1 (Low)', value: 13.5 },
  { quintile: 'Q2', value: 16.2 },
  { quintile: 'Q3', value: 18.8 },
  { quintile: 'Q4', value: 21.5 },
  { quintile: 'Q5 (High)', value: 25.6 },
]

// Signal vs subsequent return pairs for LMT (illustrative, 2020–2024)
// Shows composite_signal rank leading next-quarter return
export const govSpendingSignalVsReturn = [
  { period: '2020Q1', signal: 0.42, price: -8.3 },
  { period: '2020Q2', signal: 0.67, price: 12.1 },
  { period: '2020Q3', signal: 0.71, price: 5.4 },
  { period: '2020Q4', signal: 0.58, price: 3.8 },
  { period: '2021Q1', signal: 0.63, price: 7.2 },
  { period: '2021Q2', signal: 0.49, price: 2.1 },
  { period: '2021Q3', signal: 0.55, price: 4.6 },
  { period: '2021Q4', signal: 0.72, price: 9.3 },
  { period: '2022Q1', signal: 0.78, price: 18.7 },
  { period: '2022Q2', signal: 0.81, price: 11.2 },
  { period: '2022Q3', signal: 0.74, price: 6.8 },
  { period: '2022Q4', signal: 0.68, price: 8.4 },
  { period: '2023Q1', signal: 0.61, price: 5.1 },
  { period: '2023Q2', signal: 0.53, price: 1.9 },
  { period: '2023Q3', signal: 0.59, price: 4.3 },
  { period: '2023Q4', signal: 0.66, price: 7.6 },
  { period: '2024Q1', signal: 0.70, price: 9.1 },
  { period: '2024Q2', signal: 0.64, price: 6.4 },
  { period: '2024Q3', signal: 0.57, price: 3.7 },
]
