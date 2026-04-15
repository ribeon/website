import Link from 'next/link'
import { AnimateIn } from '@/components/AnimateIn'

export default function Research() {
  return (
    <>
      <div className="page-header">
        <h1>Our <span>Research</span></h1>
        <p>
          Three alternative datasets with out-of-sample validation.
          Each one maps a fragmented public data source to a clean, actionable signal
          for institutional investors and quantitative researchers.
        </p>
      </div>

      <div className="datasets">

        <AnimateIn>
          <div className="dataset-card">
            <div className="dataset-info">
              <div className="dataset-tag">Alternative Dataset</div>
              <h2>Federal Contract Spending</h2>
              <p>
                Federal awards post within days of signing — 30 to 60 days before quarterly earnings.
                We map $6.58T in obligations to 1,270 SEC tickers to surface contract momentum before
                it reaches consensus estimates.
              </p>
              <div className="dataset-stats" style={{ marginTop: '24px' }}>
                <div className="stat-item">
                  <div className="stat-value">65.3%</div>
                  <div className="stat-label">Composite Hit Rate</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">76</div>
                  <div className="stat-label">Quarters Validated</div>
                </div>
              </div>
              <Link className="btn-outline" href="/datasets/gov-spending" style={{ marginTop: '28px' }}>
                Explore Dataset →
              </Link>
            </div>
            <div className="dataset-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/pentagon-aerial.jpg" alt="Pentagon federal contract spending" />
            </div>
          </div>
        </AnimateIn>

        <AnimateIn>
          <div className="dataset-card">
            <div className="dataset-info">
              <div className="dataset-tag">Alternative Dataset</div>
              <h2>Weather Commodity Signals</h2>
              <p>
                Our AI model produces a 7-day US Northeast weather forecast every Monday before
                market open. Cold forecasts predict higher energy demand. The signal is statistically
                linked to that same week&apos;s commodity returns.
              </p>
              <div className="dataset-stats" style={{ marginTop: '24px' }}>
                <div className="stat-item">
                  <div className="stat-value">4.66</div>
                  <div className="stat-label">CORN Sharpe Ratio (Out-of-Sample)</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">4</div>
                  <div className="stat-label">Validated Signals</div>
                </div>
              </div>
              <Link className="btn-outline" href="/datasets/weather" style={{ marginTop: '28px' }}>
                Explore Dataset →
              </Link>
            </div>
            <div className="dataset-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&q=80" alt="Wheat field commodity weather signals" />
            </div>
          </div>
        </AnimateIn>

        <AnimateIn>
          <div className="dataset-card">
            <div className="dataset-info">
              <div className="dataset-tag">Alternative Dataset</div>
              <h2>Federal Housing &amp; Construction</h2>
              <p>
                Building permit acceleration precedes home price appreciation by one to four quarters.
                We map permit momentum across 3,135 counties — and into 16 tradable homebuilder equities.
              </p>
              <div className="dataset-stats" style={{ marginTop: '24px' }}>
                <div className="stat-item">
                  <div className="stat-value">+0.099</div>
                  <div className="stat-label">Permit Information Coefficient (1-Quarter)</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">65%</div>
                  <div className="stat-label">Homebuilder Hit Rate</div>
                </div>
              </div>
              <Link className="btn-outline" href="/datasets/gov-housing" style={{ marginTop: '28px' }}>
                Explore Dataset →
              </Link>
            </div>
            <div className="dataset-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80" alt="Construction and housing development" />
            </div>
          </div>
        </AnimateIn>

      </div>

      <section className="cta-band">
        <AnimateIn>
          <h2><em>Interested in our datasets?</em></h2>
        </AnimateIn>
        <AnimateIn delay={0.07}>
          <p>Schedule a call to discuss how our alternative data can enhance your research.</p>
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
