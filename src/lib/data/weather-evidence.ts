import sourceData from "./generated/weather-evidence";
/**
 * Evidence data for the weather commodity signals dataset.
 * All numbers sourced from validated AI model hindcasts.
 * Model: NVIDIA Atlas (pre-trained 1979–2019); hindcast period OOS 2021–2023.
 * Three-link transitive proof: ERA5→Price, Model→ERA5, Model→Price.
 * Primary OOS window: 2021–2023 (n=48 winter weeks). Extended: 2021–2024 (n=51).
 * Activation backtest: corrected causal gate, OOS 2021-01-04 → 2024-01-29 (153 weeks).
 * Provided for illustration — this is sample data, not the full dataset.
 */
// Three-link proof table (OOS 2021–2023, n=48 winter weeks each)
// L3 = Atlas 7-day forecast → commodity price (Mon→Mon return)
// Perm p = non-parametric label-shuffle test (10,000 draws)
export const threeLinkProof = sourceData.threeLinkProof;
// Activation-gated backtest — score = 3 results (corrected causal regime gate)
// OOS 2021-01-04 → 2024-02-02, 154 weeks. Source: README canonical numbers.
// Full stats (trades, hit rate) are available for score=3 only.
// HO and CL are repositioned to score≥2 as their recommended tier (see atlasScore2Sharpes).
export const atlasBacktestResults = sourceData.atlasBacktestResults;
// Score ≥ 2 Sharpe comparison (README only provides Sharpe at this tier, no trades/hit rate)
// HO and CL recommended tier; RB and CORN are stronger at score=3.
export const atlasScore2Sharpes = sourceData.atlasScore2Sharpes;
// 2022 strict OOS reference results (no activation filter, lag-0 strategy)
// Showing raw signal power in the 2022 period — useful as a benchmark.
export const atlasReferenceResults = sourceData.atlasReferenceResults;
// AI model NE HDD z-score vs Heating Oil weekly return (OOS winter weeks, 2021+2022)
// 36 data points consistent with r=+0.533 (p<0.001, perm p=0.001) for the 2-year window.
// Note: 2023 standalone HO L3 r=+0.016 (weak energy year). 3-year combined r=+0.444.
// Signal: AI model 7-day HDD forecast anomaly (z-scored against model 2021 distribution)
// Return: Heating Oil Mon open → next Mon open
export const atlasHddVsHoReturn: {
    period: string;
    signal: number;
    price: number;
}[] = sourceData.atlasHddVsHoReturn;
