import sourceData from "./generated/gov-spending-sample";
import type { GovSpendingRow } from "@/lib/types";
/**
 * Sample signal data for 9 defense/government IT tickers across 9 quarters
 * (2023Q1 – 2025Q1). The 2023Q1 rows are sourced directly from the
 * quarterly_signals_sample.csv produced by the gov-spending pipeline.
 * Subsequent quarters use plausible approximations preserving realistic
 * seasonal and trend patterns for the same tickers.
 *
 * Tickers: BA, BAH, GD, LDOS, LMT, NOC, RTX, SAIC, HII
 * Quarters: 2023Q1 – 2025Q1 (9 quarters × 9 tickers = 81 rows)
 */
export const govSpendingSample: GovSpendingRow[] = sourceData.govSpendingSample;
