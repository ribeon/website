import sourceData from "./generated/dataset-meta";
/**
 * Centralized metadata for all Ribeon datasets.
 * This is the single source of truth for all figures that appear across pages.
 * Import from here rather than hard-coding values on individual pages.
 * When repos publish new results, update this file and evidence files together.
 */
export const GOV_SPENDING_META = sourceData.GOV_SPENDING_META;
export const WEATHER_META = sourceData.WEATHER_META;
export const GOV_HOUSING_META = sourceData.GOV_HOUSING_META;
/** Stats used on the home page stats strip */
export const SITE_STATS = sourceData.SITE_STATS;
