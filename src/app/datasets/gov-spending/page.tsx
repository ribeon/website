import { GovSpendingExplorer } from '@/components/data/GovSpendingExplorer'
import { SignalTimeSeriesChart } from '@/components/charts/SignalTimeSeriesChart'
import { govSpendingSample } from '@/lib/data/gov-spending-sample'
import type { GovSpendingRow } from '@/lib/types'

const signalDefinitions = [
  {
    name: 'UGR Surprise',
    formula: 'ugr_surprise_pct',
    description: 'Unexpected Growth Rate: obligation growth minus the trailing 4-quarter average. Positive values signal acceleration above trend.',
  },
  {
    name: 'QoQ Growth',
    formula: 'obligation_qoq',
    description: 'Quarter-over-quarter change in total obligations. Identifies near-term inflections in federal spending.',
  },
  {
    name: 'YoY Growth',
    formula: 'obligation_yoy',
    description: 'Year-over-year momentum removing seasonal effects. Primary signal for annual contract cycle changes.',
  },
  {
    name: 'Composite Rank',
    formula: 'composite_rank',
    description: 'Cross-sectional percentile combining UGR surprise, QoQ and YoY momentum, and agency concentration. Ranges 0–1; higher is stronger.',
  },
]

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '36px 0' }} />
)

export default function GovSpendingPage() {
  return (
    <div style={{ padding: '36px 40px', maxWidth: '1100px' }}>
      {/* Title block */}
      <div style={{ marginBottom: '28px' }}>
        <p style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
          Alternative Data
        </p>
        <h1
          style={{
            fontSize: '38px',
            fontWeight: 700,
            color: 'var(--navy)',
            marginBottom: '10px',
            fontFamily: 'var(--font-serif)',
            lineHeight: 1.1,
          }}
        >
          Federal Contract Spending
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.5px' }}>
          2026 &nbsp;·&nbsp; 142 tickers &nbsp;·&nbsp; 76 quarters &nbsp;·&nbsp; FY2007–2025
        </p>
      </div>

      {/* Description */}
      <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '640px', marginBottom: '0' }}>
        <p style={{ marginBottom: '14px' }}>
          Every federal prime contract obligation from FY2007 through FY2025, resolved to its publicly traded counterpart. Our entity resolution pipeline maps 142 SEC tickers through 45 M&A events using temporal CUSIP lookups — ensuring the right entity receives credit in every quarter.
        </p>
        <p style={{ marginBottom: '14px' }}>
          Subaward depth adds $2.47T in downstream exposure across 1.17M FSRS records, covering both direct (subcontractor is public) and prime-through allocations. Every observation is point-in-time compliant: no look-ahead, no survivorship bias.
        </p>
        <p>
          Four quarterly signals per ticker — UGR surprise, obligation momentum (QoQ and YoY), and agency concentration — synthesized into a single cross-sectional composite rank.
        </p>
      </div>

      <Divider />

      {/* Data Explorer */}
      <section style={{ marginBottom: '0' }}>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '18px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Sample Data
        </h2>
        <GovSpendingExplorer />
      </section>

      <Divider />

      {/* Chart */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '18px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Composite Rank Over Time
        </h2>
        <SignalTimeSeriesChart data={govSpendingSample as GovSpendingRow[]} />
      </section>

      <Divider />

      {/* Signal Definitions */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '22px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Signal Definitions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {signalDefinitions.map((sig) => (
            <div key={sig.name} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '16px', alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy)', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
                  {sig.name}
                </div>
                <code style={{ fontSize: '11px', color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                  {sig.formula}
                </code>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7 }}>
                {sig.description}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
