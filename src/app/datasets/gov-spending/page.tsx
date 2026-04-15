import Link from 'next/link'
import { QuintileBarChart } from '@/components/charts/QuintileBarChart'
import { ICTimeSeriesChart } from '@/components/charts/ICTimeSeriesChart'
import { StatBar } from '@/components/StatBar'
import { SignalEvidenceCard } from '@/components/SignalEvidenceCard'
import { AtAGlance } from '@/components/AtAGlance'
import { DetailsAccordion } from '@/components/DetailsAccordion'
import { FlagshipSignalCard } from '@/components/FlagshipSignalCard'
import { DatasetCTA } from '@/components/DatasetCTA'
import {
  govSpendingICSeries,
  govSpendingQuintileReturns,
} from '@/lib/data/gov-spending-evidence'

const D = () => <div style={{ borderTop: '1px solid var(--border)', margin: '64px 0' }} />

export default function GovSpendingPage() {
  return (
    <div className="dataset-detail" style={{ padding: '112px clamp(24px, 5vw, 80px) 80px', maxWidth: '1100px' }}>

      <Link href="/research" className="btn-outline" style={{ marginBottom: '52px', fontSize: '12px', padding: '10px 20px' }}>
        ← Back to Research
      </Link>

      {/* Hero */}
      <p style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
        Alternative Data
      </p>
      <h1 style={{ fontSize: '40px', fontWeight: 700, color: 'var(--navy)', fontFamily: 'var(--font-serif)', lineHeight: 1.1, marginBottom: '18px' }}>
        Federal Contract Spending
      </h1>
      <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--muted)', maxWidth: '580px', marginBottom: '12px' }}>
        Federal procurement data mapped to 1,270 public companies —
        available <strong style={{ color: 'var(--navy)' }}>30 to 60 days before quarterly earnings</strong>.
      </p>
      <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--muted)', maxWidth: '580px', marginBottom: '36px' }}>
        For government-exposed companies, every contract award is a direct,
        observable preview of the next earnings print.
      </p>

      <StatBar stats={[
        { label: 'Obligations mapped', value: '$6.58T' },
        { label: 'Composite hit rate', value: '65.3%', highlight: true },
        { label: 'Validation window', value: '76 quarters' },
      ]} />

      <AtAGlance items={[
        { label: 'Universe', value: '1,270 SEC-mapped tickers (FY2007–2025)' },
        { label: 'Delivery', value: 'Within ~3 business days of award' },
        { label: 'Best for', value: 'Defense, IT services, aerospace equities' },
        { label: 'Output', value: 'Quarterly cross-sectional signal ranks' },
      ]} />

      <D />

      {/* Flagship signal */}
      <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '20px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
        Primary Signal
      </h2>

      <FlagshipSignalCard
        badge="Flagship"
        name="composite_signal"
        description="Ranks government-exposed companies by how much their recent contract activity deviates from their long-run baseline. Companies winning materially more than usual score high — a reliable, directly observable precursor to an earnings beat. Delivered as a ready-to-use quarterly cross-sectional rank."
        metrics={[
          { label: 'Mean IC', value: '+2.08%', positive: true },
          { label: 'Directional accuracy', value: '65.3%', positive: true },
          { label: 'IC IR', value: '0.39', positive: true },
        ]}
      />

      <div style={{ maxWidth: '560px', marginTop: '32px' }}>
        <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
          Annualized return by composite_signal quintile
        </p>
        <QuintileBarChart
          data={govSpendingQuintileReturns}
          yAxisLabel="Annualized return (%)"
        />
        <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.7, marginTop: '16px' }}>
          A naïve Q5 long / Q1 short sort produces a <strong style={{ color: 'var(--navy)' }}>+12.1% annualized spread</strong> over
          75 quarters. The monotonic quintile structure confirms genuine predictive content —
          not a noise artifact. Defense and aerospace shows the strongest sector-level signal.
        </p>
      </div>

      <D />

      {/* Why it works */}
      <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
        Why It Works
      </h2>
      <p style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '600px' }}>
        Federal contract data posts within days of execution — not quarters.
        For defense, IT, and aerospace companies where government revenue drives the top line,
        this creates a persistent, measurable edge over sell-side estimates that rely on
        management guidance and channel checks.
      </p>

      <D />

      {/* Accordion: everything else */}
      <DetailsAccordion title="Additional signals, full validation, and methodology">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
              Component signals
            </p>
            <SignalEvidenceCard
              signalName="ugr_surprise_pct_12q"
              description="Current-quarter obligations vs. the trailing 12-quarter average. A positive reading means the company is winning materially more than its long-run rate — a direct observable for an upcoming earnings beat."
              metrics={[
                { label: 'Mean IC', value: '+1.32%', positive: true },
                { label: 't-stat', value: '2.29', positive: true },
                { label: 'Hit rate', value: '61.6%', positive: true },
              ]}
            />
            <SignalEvidenceCard
              signalName="agency_hhi"
              description="Agency concentration risk. Concentrated contractors (most revenue from one agency) consistently underperform diversified ones. Negative IC by design — use as the short-book signal or inverse composite input."
              metrics={[
                { label: 'Mean IC', value: '−2.18%', negative: true },
                { label: 't-stat', value: '−3.16', negative: true },
              ]}
            />
            <SignalEvidenceCard
              signalName="obligation_yoy"
              description="Year-over-year obligation growth. Did the company win more over the past four quarters than the prior four? Complements UGR in the composite."
              metrics={[
                { label: 'Mean IC', value: '+1.24%', positive: true },
                { label: 't-stat', value: '2.18', positive: true },
              ]}
            />
          </div>

          <div>
            <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
              IC over time — composite_signal (76 quarters)
            </p>
            <ICTimeSeriesChart data={govSpendingICSeries} meanIC={0.0208} tStat={3.39} />
          </div>

          <div style={{ overflowX: 'auto' }}>
            <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
              Full signal table (signals with |t| ≥ 2)
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Signal', 'Mean IC', 't-stat', 'Hit Rate'].map((h) => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', background: 'var(--surface)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { s: 'composite_signal',    ic: '+2.08%', t: '3.39',  hit: '65.3%', pos: true },
                  { s: 'mod_count',           ic: '+2.62%', t: '2.67',  hit: '—',     pos: true },
                  { s: 'mod_net_value',       ic: '+1.99%', t: '2.52',  hit: '—',     pos: true },
                  { s: 'ugr_surprise_pct_12q',ic: '+1.32%', t: '2.29',  hit: '61.6%', pos: true },
                  { s: 'obligation_yoy',      ic: '+1.24%', t: '2.18',  hit: '56.3%', pos: true },
                  { s: 'ugr_surprise_pct_8q', ic: '+1.21%', t: '2.03',  hit: '54.8%', pos: true },
                  { s: 'agency_hhi',          ic: '−2.18%', t: '−3.16', hit: '34.7%', pos: false },
                ].map((row, i) => (
                  <tr key={row.s} style={{ borderBottom: '1px solid var(--surface)', background: i % 2 ? 'var(--bg)' : 'var(--white)' }}>
                    <td style={{ padding: '7px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--gold)' }}>{row.s}</td>
                    <td style={{ padding: '7px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: row.pos ? 'var(--positive)' : 'var(--negative)', fontWeight: 600 }}>{row.ic}</td>
                    <td style={{ padding: '7px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: row.pos ? 'var(--positive)' : 'var(--negative)' }}>{row.t}</td>
                    <td style={{ padding: '7px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--navy)' }}>{row.hit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginTop: '10px' }}>
              Spearman rank IC vs. 1Q-forward total return. FY2007–2025. Point-in-time — no look-ahead.
            </p>
          </div>

          <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '600px' }}>
            <p style={{ fontWeight: 600, color: 'var(--navy)', marginBottom: '8px', fontSize: '12px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px' }}>Methodology</p>
            <p>
              Every prime federal contract obligation is resolved to its publicly traded counterpart
              through a proprietary entity resolution pipeline — 1,325 tickers, point-in-time effective
              date ranges, accounting for corporate actions, mergers, and ticker changes.
              Subaward data captures downstream exposure. All signals are constructed cross-sectionally
              per quarter: no look-ahead, no survivorship bias.
            </p>
          </div>

        </div>
      </DetailsAccordion>

      <DatasetCTA
        heading="Interested in Federal Contract Spending?"
        subtext="Get in touch to discuss coverage, sample data, or how the signal fits your earnings workflow."
      />

    </div>
  )
}
