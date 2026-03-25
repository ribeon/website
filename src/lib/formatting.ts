/**
 * Format a dollar value with optional compact notation.
 * Compact examples: $1.2B, $450M, $12K
 * Full example: $1,234,567
 * Sign is prepended for negative values.
 */
export function formatCurrency(val: number, compact = false): string {
  if (isNaN(val) || val == null) return "—";
  const abs = Math.abs(val);
  const sign = val < 0 ? "-" : "";
  if (compact) {
    if (abs >= 1_000_000_000) {
      return `${sign}$${(abs / 1_000_000_000).toFixed(2)}B`;
    }
    if (abs >= 1_000_000) {
      return `${sign}$${(abs / 1_000_000).toFixed(1)}M`;
    }
    if (abs >= 1_000) {
      return `${sign}$${(abs / 1_000).toFixed(0)}K`;
    }
    return `${sign}$${abs.toFixed(2)}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
}

/**
 * Format a decimal ratio as a percentage string with explicit sign.
 * e.g. 0.123 → "+12.3%", -0.045 → "-4.5%"
 */
export function formatPercent(val: number): string {
  if (isNaN(val) || val == null) return "—";
  const pct = val * 100;
  const sign = pct > 0 ? "+" : "";
  return `${sign}${pct.toFixed(1)}%`;
}

/**
 * Format a rank value (0–1 float) as a two-decimal string.
 * e.g. 0.7667 → "0.77"
 */
export function formatRank(val: number): string {
  if (isNaN(val) || val == null) return "—";
  return val.toFixed(2);
}

/**
 * Return the CSS helper class name for a rank value (0–1).
 * >0.65 → "rank-high" (green), <0.35 → "rank-low" (red), else "rank-mid"
 */
export function getRankClass(val: number): string {
  if (isNaN(val) || val == null) return "rank-mid";
  if (val > 0.65) return "rank-high";
  if (val < 0.35) return "rank-low";
  return "rank-mid";
}

/**
 * Return the CSS helper class name based on the sign of a value.
 * >0 → "value-positive" (green), <0 → "value-negative" (red), else "value-neutral"
 */
export function getValueClass(val: number): string {
  if (isNaN(val) || val == null) return "value-neutral";
  if (val > 0) return "value-positive";
  if (val < 0) return "value-negative";
  return "value-neutral";
}

/**
 * Format an integer with comma separators.
 * e.g. 89243 → "89,243"
 */
export function formatNumber(val: number): string {
  if (isNaN(val) || val == null) return "—";
  return new Intl.NumberFormat("en-US").format(Math.round(val));
}
