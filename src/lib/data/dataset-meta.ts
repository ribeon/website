/**
 * Centralized metadata for all Ribeon datasets.
 * This is the single source of truth for all figures that appear across pages.
 * Import from here rather than hard-coding values on individual pages.
 * When repos publish new results, update this file and evidence files together.
 */

export const GOV_SPENDING_META = {
  name: 'Federal Contract Spending',
  slug: 'gov-spending',
  image: '/images/pentagon-aerial.jpg',
  imageAlt: 'Pentagon federal contract spending',
  description:
    'We map $6.58T in federal obligations to 1,270 SEC tickers across 76 quarters — producing signals that surface government spending momentum before it reaches consensus estimates.',
  tickers: '1,270',
  obligations: '$6.58T',
  quarters: '76',
  history: 'FY2007–2025',
  compositeHitRate: '65.3%',
  compositeIC: '+2.08%',
  compositeTStat: '3.39',
  lsSpread: '+12.1%',
  deliveryLag: '~3 BD',
  signalCount: '7',         // signals with |t| ≥ 2
} as const

export const WEATHER_META = {
  name: 'Weather Commodity Signals',
  slug: 'weather',
  image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&q=80',
  imageAlt: 'Wheat field commodity weather signals',
  description:
    'Our AI weather model initializes every Monday and produces a 7-day US Northeast forecast available before market open — validated out-of-sample as a leading signal for Heating Oil, RBOB Gasoline, Crude Oil, and Corn.',
  validatedSignals: '4',
  regions: '7',
  commodities: '12',
  cadence: 'Weekly',
  // Flagship results (score=3, OOS 2021-01-04 → 2024-02-02, 154 weeks)
  cornSharpe: '4.66',
  cornHitRate: '79%',
  cornTrades: '19',
  rbSharpe: '3.56',
  rbHitRate: '77%',
  rbTrades: '30',
  // Three-link proof (HO, 3yr OOS 2021–2023, n=48)
  hoL3r: '+0.444',
  modelEra5r: '+0.894',
  oosPeriod: '2021–2024 (154 weeks)',
} as const

export const GOV_HOUSING_META = {
  name: 'Federal Housing & Construction',
  slug: 'gov-housing',
  image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80',
  imageAlt: 'Construction and housing development',
  description:
    'Building permit acceleration predicts home price appreciation one to four quarters ahead. We fuse $933B in federal housing programs with Census permits across 3,135 counties — and map the same permit flow into 16 tradable homebuilder equities.',
  counties: '3,135',
  metros: '911',
  housingSpend: '$933B',
  dataSources: '7',
  history: 'FY2010–2025',
  // permit_sf_yoy
  permitIC1Q: '+0.099',
  permitTStat1Q: '5.91',
  permitIC4Q: '+0.129',
  permitTStat4Q: '6.89',
  // hb_sector_adaptive_index (OOS 2020Q1–2025Q3, 23 quarters)
  hbOOSIC: '+0.204',
  hbOOSTStat: '4.25',
  hbOOSHitRate: '65%',
  hbOOSQuarters: '23',
  hbEquityNames: '16',
  // Quintile spread
  topQuintileHPI: '3.5%',
  bottomQuintileHPI: '0.8%',
} as const

/** Stats used on the home page stats strip */
export const SITE_STATS = {
  obligations: '$6.58T',
  tickers: '1,270',
  counties: '3,135',
  commodities: '12',
} as const
