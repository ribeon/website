import Link from 'next/link'
import { SidebarTabs } from '@/components/SidebarTabs'

export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '100px',
        alignItems: 'flex-start',
        padding: '0 40px 40px',
        marginTop: '-42px',
        flexWrap: 'wrap',
      }}
    >
      {/* ── Sidebar ── */}
      <aside style={{ width: '300px', flexShrink: 0, paddingTop: '78px' }}>
        <SidebarTabs />
      </aside>

      {/* ── Main content ── */}
      <main style={{ flex: 1, minWidth: 0 }}>
        <h2
          style={{
            fontSize: '13px',
            marginBottom: '24px',
            marginTop: '18px',
            color: 'var(--muted)',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 400,
          }}
        >
          Datasets
        </h2>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, 300px)',
            gap: '28px',
            justifyContent: 'start',
          }}
        >
          {/* Card 1: Federal Contract Spending */}
          <Link href="/datasets/gov-spending" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div
              className="dataset-card"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--navy)',
                overflow: 'hidden',
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
            >
              <div style={{ padding: '20px 22px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', color: 'var(--navy)', fontFamily: 'var(--font-serif)', lineHeight: 1.3 }}>
                  Federal Contract Spending
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.65 }}>
                  $7.3T in obligations mapped to 142 SEC tickers. Quarterly signals: UGR surprise, obligation momentum, agency concentration.
                </p>
              </div>
            </div>
          </Link>

          {/* Card 2: Weather Commodity Signals */}
          <Link href="/datasets/weather" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div
              className="dataset-card"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--navy)',
                overflow: 'hidden',
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
            >
              <div style={{ padding: '20px 22px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', color: 'var(--navy)', fontFamily: 'var(--font-serif)', lineHeight: 1.3 }}>
                  Weather Commodity Signals
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.65 }}>
                  ERA5 reanalysis across 8 commodity regions. GDD anomalies, drought probability, HDD/CDD demand signals mapped to futures.
                </p>
              </div>
            </div>
          </Link>

          {/* Card 3: Federal Housing & Construction */}
          <Link href="/datasets/gov-housing" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div
              className="dataset-card"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--navy)',
                overflow: 'hidden',
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
            >
              <div style={{ padding: '20px 22px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', color: 'var(--navy)', fontFamily: 'var(--font-serif)', lineHeight: 1.3 }}>
                  Federal Housing & Construction
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.65 }}>
                  $933B in federal housing spending across 4,160 counties. Construction pipeline scores, affordability signals, and subsidy flow mapped to geographies.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
