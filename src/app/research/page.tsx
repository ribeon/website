import Link from 'next/link'
import { AnimateIn } from '@/components/AnimateIn'

export default function Research() {
  return (
    <>
      <div className="page-header">
        <h1>Our <span>Research</span></h1>
        <p>We build alternative datasets that deliver unique, actionable signals to institutional investors and researchers. Each product maps fragmented public data to tradeable securities and economic indicators.</p>
      </div>

      <div className="datasets">
        <AnimateIn>
          <div className="dataset-card">
            <div className="dataset-info">
              <div className="dataset-tag">Alternative Dataset</div>
              <h2>Federal Contract Spending</h2>
              <p>We map $6.65 trillion in federal obligations to 2,388 SEC tickers across 76 quarters, generating signals that surface government spending momentum before it hits consensus estimates.</p>
              <div className="signal-tags">
                <span className="signal-tag">UGR Surprise</span>
                <span className="signal-tag">Obligation Momentum</span>
                <span className="signal-tag">Agency Concentration</span>
                <span className="signal-tag">SEC Ticker Mapping</span>
              </div>
              <div className="dataset-stats">
                <div className="stat-item">
                  <div className="stat-value">$6.65T</div>
                  <div className="stat-label">Obligations Tracked</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">2,388</div>
                  <div className="stat-label">SEC Tickers</div>
                </div>
              </div>
              <Link className="btn-outline" href="/datasets/gov-spending" style={{ marginTop: '28px' }}>Learn More &rarr;</Link>
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
              <p>Leveraging an AI weather model (pre-trained on ERA5 reanalysis) across 7 commodity-producing regions, we generate climate-derived demand signals mapped to 12 commodity futures contracts.</p>
              <div className="signal-tags">
                <span className="signal-tag">GDD Anomalies</span>
                <span className="signal-tag">Drought Probability</span>
                <span className="signal-tag">HDD/CDD Demand</span>
                <span className="signal-tag">Futures Mapping</span>
              </div>
              <div className="dataset-stats">
                <div className="stat-item">
                  <div className="stat-value">7</div>
                  <div className="stat-label">Commodity Regions</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">12</div>
                  <div className="stat-label">Commodities Covered</div>
                </div>
              </div>
              <Link className="btn-outline" href="/datasets/weather" style={{ marginTop: '28px' }}>Learn More &rarr;</Link>
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
              <p>Tracking $933 billion in federal housing spending across 4,160 counties and 917 metro areas, we produce construction pipeline scores, affordability signals, and subsidy flow data mapped to geographies.</p>
              <div className="signal-tags">
                <span className="signal-tag">Pipeline Scores</span>
                <span className="signal-tag">Affordability Signals</span>
                <span className="signal-tag">Subsidy Flow</span>
                <span className="signal-tag">County-Level Mapping</span>
              </div>
              <div className="dataset-stats">
                <div className="stat-item">
                  <div className="stat-value">$933B</div>
                  <div className="stat-label">Housing Spend</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">4,160</div>
                  <div className="stat-label">Counties Tracked</div>
                </div>
              </div>
              <Link className="btn-outline" href="/datasets/gov-housing" style={{ marginTop: '28px' }}>Learn More &rarr;</Link>
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
          <p>Schedule a call to discuss how our alternative data products can enhance your research.</p>
        </AnimateIn>
        <AnimateIn delay={0.14}>
          <Link className="btn-primary" href="/contact" style={{ position: 'relative', zIndex: 1 }}>Get in Touch &rarr;</Link>
        </AnimateIn>
      </section>
    </>
  )
}
