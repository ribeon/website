// ─── Government Spending Dataset ───────────────────────────────────────────────

export interface GovSpendingRow {
  /** Quarter label e.g. "2023Q1" */
  quarter: string;
  /** Ticker symbol e.g. "LMT" */
  ticker: string;
  /** Total federal obligations in dollars */
  total_obligation: number;
  /** Number of contract awards */
  num_awards: number;
  /** Average award size (total_obligation / num_awards) */
  avg_award_size: number;
  /** Largest single award in the quarter */
  max_award: number;
  /** Number of unique federal agencies awarding contracts */
  unique_agencies: number;
  /** Number of unique NAICS codes present */
  unique_naics: number;
  /** Expected obligation based on historical trend */
  expected_obligation: number;
  /** Absolute surprise vs. expectation (actual - expected) */
  ugr_surprise: number;
  /** Surprise as fraction of expected (ugr_surprise / expected) */
  ugr_surprise_pct: number;
  /** Quarter-over-quarter change in obligation */
  obligation_qoq: number;
  /** Year-over-year change in obligation */
  obligation_yoy: number;
  /** Quarter-over-quarter change in award count */
  awards_qoq: number;
  /** Year-over-year change in award count */
  awards_yoy: number;
  /** Herfindahl-style agency concentration (0=diversified, 1=concentrated) */
  agency_concentration: number;
  /** Cross-sectional rank of ugr_surprise_pct (0–1, higher = better) */
  ugr_surprise_pct_rank: number;
  /** Cross-sectional rank of obligation_qoq */
  obligation_qoq_rank: number;
  /** Cross-sectional rank of obligation_yoy */
  obligation_yoy_rank: number;
  /** Cross-sectional rank of awards_qoq */
  awards_qoq_rank: number;
  /** Cross-sectional rank of awards_yoy */
  awards_yoy_rank: number;
  /** Cross-sectional rank of agency_concentration (higher = more diversified) */
  agency_concentration_rank: number;
  /** Composite signal — weighted average of component ranks */
  composite_signal: number;
  /** Cross-sectional rank of composite_signal */
  composite_rank: number;
}

// ─── Federal Housing Dataset ────────────────────────────────────────────────────

export interface GovHousingRow {
  /** Quarter label e.g. "2023Q1" */
  quarter: string;
  /** State abbreviation e.g. "CA" */
  pop_state: string;
  /** County name e.g. "Los Angeles County" */
  pop_county: string;
  /** Total federal housing spending in dollars */
  total_spending: number;
  /** Number of funded projects */
  project_count: number;
  /** Average project size */
  avg_project_size: number;
  /** Largest single project in the quarter */
  max_project: number;
  /** Spending via direct contracts (NAICS 236xxx) */
  contract_spending: number;
  /** Spending via grants/loans (HUD/USDA assistance) */
  assistance_spending: number;
  /** Number of new construction projects */
  new_construction_count: number;
  /** Number of multifamily projects */
  multifamily_count: number;
  /** Number of affordable housing projects */
  affordable_count: number;
  /** Number of rehabilitation/renovation projects */
  rehab_count: number;
  /** Number of public housing projects */
  public_housing_count: number;
  /** Number of infrastructure-linked housing projects */
  infra_count: number;
  /** Number of unique funding recipients */
  unique_recipients: number;
  /** Number of unique federal agencies funding projects */
  unique_agencies: number;
  /** Share of spending on new construction */
  new_construction_share: number;
  /** Share of spending on multifamily */
  multifamily_share: number;
  /** Share of spending on affordable housing */
  affordable_share: number;
  /** Share of spending via assistance (vs. contracts) */
  assistance_share: number;
  /** Spending surprise vs. historical trend (%) */
  spending_surprise_pct: number;
  /** Quarter-over-quarter change in spending */
  spending_qoq: number;
  /** Year-over-year change in spending */
  spending_yoy: number;
  /** Quarter-over-quarter change in project count */
  projects_qoq: number;
  /** Year-over-year change in project count */
  projects_yoy: number;
  /** New construction intensity (new units per $1B spending) */
  new_construction_intensity: number;
  /** Multifamily intensity (multifamily projects per $1B spending) */
  multifamily_intensity: number;
  /** Affordable housing intensity (affordable projects per $1B spending) */
  affordable_intensity: number;
  /** Herfindahl-style recipient concentration (0=diversified, 1=concentrated) */
  recipient_concentration: number;
  /** Funding persistence score (fraction of recent quarters with positive spending) */
  funding_persistence: number;
  /** Composite pipeline score (0–1, higher = stronger pipeline) */
  pipeline_score: number;
  /** Cross-sectional rank of pipeline_score */
  pipeline_score_rank: number;
}

// ─── Product Catalog ────────────────────────────────────────────────────────────

export interface ProductMetric {
  label: string;
  value: string;
}

export interface Product {
  /** Unique product identifier slug */
  id: string;
  /** Display name */
  name: string;
  /** One-line value proposition */
  tagline: string;
  /** Extended description (2–3 sentences) */
  description: string;
  /** Availability status */
  status: "available" | "coming-soon";
  /** Target buyer personas */
  buyers: string[];
  /** Key stats shown on the product card */
  metrics: ProductMetric[];
  /** Link to product detail or sample page */
  href: string;
}
