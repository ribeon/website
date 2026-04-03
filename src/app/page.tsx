import Link from 'next/link'
import { AnimateIn } from '@/components/AnimateIn'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-label">Alternative Data Solutions</div>
            <h1>Turning Chaos<br />Into <strong>Order</strong></h1>
            <p className="hero-sub">
              At Ribeon, we redefine data management to empower institutions with high-quality structured datasets for informed decision-making.
            </p>
            <div className="hero-actions">
              <Link className="btn-primary" href="/contact">Get Started &rarr;</Link>
              <Link className="btn-outline" href="/research">Our Research</Link>
            </div>
          </div>
          <div className="hero-mosaic">
            <div className="mosaic-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" alt="Data analytics dashboard" />
            </div>
            <div className="mosaic-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&q=80" alt="Data visualization" />
            </div>
            <div className="mosaic-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&q=80" alt="Financial data analysis" />
            </div>
          </div>
        </div>
      </section>

      <div className="accent-bar" />

      {/* Stats Strip */}
      <AnimateIn>
        <section className="stats-strip">
          <div className="stat">
            <div className="stat-number">$6.65T</div>
            <div className="stat-text">In Obligations Tracked</div>
          </div>
          <div className="stat">
            <div className="stat-number">2,388</div>
            <div className="stat-text">SEC Tickers Mapped</div>
          </div>
          <div className="stat">
            <div className="stat-number">4,160</div>
            <div className="stat-text">Counties Covered</div>
          </div>
          <div className="stat">
            <div className="stat-number">12</div>
            <div className="stat-text">Commodities Tracked</div>
          </div>
        </section>
      </AnimateIn>

      {/* Showcase */}
      <section className="showcase">
        <AnimateIn>
          <div className="showcase-row">
            <div className="showcase-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80" alt="Data-driven decisions" />
              <div className="image-accent" />
            </div>
            <div className="showcase-text">
              <div className="showcase-label">Your Data, Our Expertise</div>
              <h2>Delivering Quality Data Products with Unmatched Speed</h2>
              <p>We convert complex public and third-party data into structured, analysis-ready formats that power smarter investment decisions and institutional research.</p>
              <ul className="feature-list">
                <li>Real-time signal generation from fragmented sources</li>
                <li>SEC ticker mapping for actionable trading insights</li>
                <li>County-level geospatial granularity</li>
              </ul>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn>
          <div className="showcase-row reverse">
            <div className="showcase-text">
              <div className="showcase-label">Institutional Grade</div>
              <h2>Built for Quantitative Researchers &amp; Portfolio Managers</h2>
              <p>Our datasets are designed to integrate seamlessly into quantitative workflows — from backtesting and factor modeling to real-time portfolio signals.</p>
              <ul className="feature-list">
                <li>Clean, structured formats ready for analysis</li>
                <li>Historical depth for robust backtesting</li>
                <li>Proprietary signals unavailable elsewhere</li>
              </ul>
            </div>
            <div className="showcase-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=700&q=80" alt="Quantitative finance" />
              <div className="image-accent" />
            </div>
          </div>
        </AnimateIn>

        <AnimateIn>
          <div className="showcase-row">
            <div className="showcase-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=80" alt="Technology infrastructure" />
              <div className="image-accent" />
            </div>
            <div className="showcase-text">
              <div className="showcase-label">Scalable Infrastructure</div>
              <h2>Engineered for Reliability at Scale</h2>
              <p>Our data pipelines are built on robust engineering principles — processing billions of data points to deliver timely, accurate outputs that institutions depend on.</p>
              <ul className="feature-list">
                <li>Automated ingestion from public data sources</li>
                <li>Rigorous quality assurance at every stage</li>
                <li>Rapid delivery with guaranteed SLAs</li>
              </ul>
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* Expertise */}
      <section className="expertise">
        <AnimateIn>
          <h2 className="section-label"><em>Our Expertise</em></h2>
        </AnimateIn>
        <div className="expertise-grid">
          <AnimateIn><div className="expertise-item">
            <h3>Data Analysis</h3>
            <p>Our data analysis services convert complex public and third-party data into structured formats that facilitate analysis and decision-making processes for organizations.</p>
          </div></AnimateIn>
          <AnimateIn delay={0.07}><div className="expertise-item">
            <h3>Data Monitoring</h3>
            <p>We provide advanced monitoring outputs tailored to your requirements, ensuring you stay informed with the latest trends and insights relevant to your operational workflows.</p>
          </div></AnimateIn>
          <AnimateIn delay={0.14}><div className="expertise-item">
            <h3>Dataset Creation</h3>
            <p>Our proprietary methods allow us to create reliable, ready-to-analyze datasets from fragmented information sources, aligning with your research objectives and needs.</p>
          </div></AnimateIn>
          <AnimateIn delay={0.21}><div className="expertise-item">
            <h3>Quality Assurance</h3>
            <p>We prioritize the quality of our data offerings, ensuring that our structured datasets meet rigorous standards for accuracy and reliability, helping you achieve your goals.</p>
          </div></AnimateIn>
        </div>
      </section>

      {/* Approach */}
      <section className="approach">
        <AnimateIn>
          <h2 className="section-label"><em>Our Approach</em></h2>
        </AnimateIn>
        <div className="approach-grid">
          <AnimateIn><div className="approach-card">
            <div className="approach-number">01</div>
            <h3>Data Integrity</h3>
            <p>We focus on delivering robust and reliable datasets from complex sources.</p>
          </div></AnimateIn>
          <AnimateIn delay={0.07}><div className="approach-card">
            <div className="approach-number">02</div>
            <h3>Streamlined Processing</h3>
            <p>Our processes convert fragmented data into cohesive information rapidly.</p>
          </div></AnimateIn>
          <AnimateIn delay={0.14}><div className="approach-card">
            <div className="approach-number">03</div>
            <h3>Tailored Outputs</h3>
            <p>We customize datasets for specific institutional research and operational needs.</p>
          </div></AnimateIn>
          <AnimateIn delay={0.21}><div className="approach-card">
            <div className="approach-number">04</div>
            <h3>Rapid Delivery</h3>
            <p>Timely access to analysis-ready data is a priority for us.</p>
          </div></AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <AnimateIn>
          <h2><em>Ready to transform your data strategy?</em></h2>
        </AnimateIn>
        <AnimateIn delay={0.07}>
          <p>Get in touch to learn how our alternative datasets can give your research an edge.</p>
        </AnimateIn>
        <AnimateIn delay={0.14}>
          <Link className="btn-primary" href="/contact" style={{ position: 'relative', zIndex: 1 }}>Contact Us &rarr;</Link>
        </AnimateIn>
      </section>
    </>
  )
}
