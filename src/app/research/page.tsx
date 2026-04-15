import Link from 'next/link'
import { AnimateIn } from '@/components/AnimateIn'
import { GOV_SPENDING_META, WEATHER_META, GOV_HOUSING_META } from '@/lib/data/dataset-meta'

function ProofBullet({ children }: { children: React.ReactNode }) {
  return (
    <li style={{
      fontSize: '14px',
      color: 'var(--gray-light)',
      paddingLeft: '22px',
      position: 'relative',
      lineHeight: 1.6,
    }}>
      <span style={{ position: 'absolute', left: 0, color: 'var(--teal)', fontWeight: 600 }}>→</span>
      {children}
    </li>
  )
}

export default function Research() {
  return (
    <>
      <div className="page-header">
        <h1>Our <span>Research</span></h1>
        <p>
          Three alternative datasets — each with rigorous out-of-sample validation.
          We map fragmented public data to SEC tickers, commodity futures, and geographic signals
          so your research team can act, not clean.
        </p>
      </div>

      <div className="datasets">

        {/* Federal Contract Spending */}
        <AnimateIn>
          <div className="dataset-card">
            <div className="dataset-info">
              <div className="dataset-tag">Alternative Dataset</div>
              <h2>{GOV_SPENDING_META.name}</h2>
              <p>
                Federal procurement data publishes within 3 business days of contract
                execution — 30 to 60 days before quarterly earnings. For government-exposed
                companies, this is a direct observable for the upcoming earnings print.
              </p>
              <ul style={{ listStyle: 'none', marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <ProofBullet>
                  {GOV_SPENDING_META.obligations} in obligations mapped to {GOV_SPENDING_META.tickers} SEC tickers
                </ProofBullet>
                <ProofBullet>
                  composite_signal: mean IC {GOV_SPENDING_META.compositeIC}, t-stat {GOV_SPENDING_META.compositeTStat}, {GOV_SPENDING_META.compositeHitRate} directional accuracy
                </ProofBullet>
                <ProofBullet>
                  {GOV_SPENDING_META.lsSpread} annualized L/S spread over {GOV_SPENDING_META.quarters} quarters
                </ProofBullet>
              </ul>
              <div className="dataset-stats" style={{ marginTop: '28px' }}>
                <div className="stat-item">
                  <div className="stat-value">{GOV_SPENDING_META.compositeHitRate}</div>
                  <div className="stat-label">Composite Hit Rate</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{GOV_SPENDING_META.obligations}</div>
                  <div className="stat-label">Obligations Mapped</div>
                </div>
              </div>
              <Link className="btn-outline" href="/datasets/gov-spending" style={{ marginTop: '28px' }}>
                Explore Dataset →
              </Link>
            </div>
            <div className="dataset-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={GOV_SPENDING_META.image} alt={GOV_SPENDING_META.imageAlt} />
            </div>
          </div>
        </AnimateIn>

        {/* Weather Commodity Signals */}
        <AnimateIn>
          <div className="dataset-card">
            <div className="dataset-info">
              <div className="dataset-tag">Alternative Dataset</div>
              <h2>{WEATHER_META.name}</h2>
              <p>
                Our AI model produces a 7-day US Northeast temperature forecast every Monday
                before market open. Cold forecasts predict higher demand for heating oil and
                gasoline. The signal is correlated with that same week's futures returns.
              </p>
              <ul style={{ listStyle: 'none', marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <ProofBullet>
                  Validated causal chain: AI forecast → weather → commodity price return
                </ProofBullet>
                <ProofBullet>
                  CORN: Sharpe {WEATHER_META.cornSharpe}, {WEATHER_META.cornHitRate} hit rate (score=3, OOS {WEATHER_META.oosPeriod})
                </ProofBullet>
                <ProofBullet>
                  NE HDD → Heating Oil: r = {WEATHER_META.hoL3r} (3yr OOS, n=48 winter weeks)
                </ProofBullet>
              </ul>
              <div className="dataset-stats" style={{ marginTop: '28px' }}>
                <div className="stat-item">
                  <div className="stat-value">{WEATHER_META.cornSharpe}</div>
                  <div className="stat-label">CORN Sharpe (OOS)</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{WEATHER_META.validatedSignals}</div>
                  <div className="stat-label">Validated Signals</div>
                </div>
              </div>
              <Link className="btn-outline" href="/datasets/weather" style={{ marginTop: '28px' }}>
                Explore Dataset →
              </Link>
            </div>
            <div className="dataset-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={WEATHER_META.image} alt={WEATHER_META.imageAlt} />
            </div>
          </div>
        </AnimateIn>

        {/* Federal Housing & Construction */}
        <AnimateIn>
          <div className="dataset-card">
            <div className="dataset-info">
              <div className="dataset-tag">Alternative Dataset</div>
              <h2>{GOV_HOUSING_META.name}</h2>
              <p>
                Building permit acceleration is observable before official home price indices
                update — and it predicts them. We extend the same permit flow data into an
                equity signal for 16 tradable homebuilder names.
              </p>
              <ul style={{ listStyle: 'none', marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <ProofBullet>
                  permit_sf_yoy: IC {GOV_HOUSING_META.permitIC1Q} (t={GOV_HOUSING_META.permitTStat1Q}) vs. Zillow ZHVI, {GOV_HOUSING_META.counties} counties
                </ProofBullet>
                <ProofBullet>
                  Homebuilder equity signal: OOS IC {GOV_HOUSING_META.hbOOSIC}, {GOV_HOUSING_META.hbOOSHitRate} hit rate, {GOV_HOUSING_META.hbOOSQuarters} OOS quarters
                </ProofBullet>
                <ProofBullet>
                  Geographic and equity coverage in one dataset — {GOV_HOUSING_META.dataSources} fused data sources
                </ProofBullet>
              </ul>
              <div className="dataset-stats" style={{ marginTop: '28px' }}>
                <div className="stat-item">
                  <div className="stat-value">{GOV_HOUSING_META.permitIC1Q}</div>
                  <div className="stat-label">Permit IC (1Q)</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{GOV_HOUSING_META.hbOOSHitRate}</div>
                  <div className="stat-label">Homebuilder Hit Rate</div>
                </div>
              </div>
              <Link className="btn-outline" href="/datasets/gov-housing" style={{ marginTop: '28px' }}>
                Explore Dataset →
              </Link>
            </div>
            <div className="dataset-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={GOV_HOUSING_META.image} alt={GOV_HOUSING_META.imageAlt} />
            </div>
          </div>
        </AnimateIn>

      </div>

      <section className="cta-band">
        <AnimateIn>
          <h2><em>Interested in our datasets?</em></h2>
        </AnimateIn>
        <AnimateIn delay={0.07}>
          <p>Schedule a call to discuss how our alternative data products can enhance your research.</p>
        </AnimateIn>
        <AnimateIn delay={0.14}>
          <Link className="btn-primary" href="/contact" style={{ position: 'relative', zIndex: 1 }}>
            Get in Touch →
          </Link>
        </AnimateIn>
      </section>
    </>
  )
}
