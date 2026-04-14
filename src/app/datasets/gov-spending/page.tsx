import Link from 'next/link'
import { QuintileBarChart } from '@/components/charts/QuintileBarChart'
import { ICTimeSeriesChart } from '@/components/charts/ICTimeSeriesChart'
import { SignalLeadChart } from '@/components/charts/SignalLeadChart'
import { StatBar } from '@/components/StatBar'
import { SignalEvidenceCard } from '@/components/SignalEvidenceCard'
import {
  govSpendingICSeries,
  govSpendingQuintileReturns,
  govSpendingSignalVsReturn,
} from '@/lib/data/gov-spending-evidence'

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '36px 0' }} />
)

export default function GovSpendingPage() {
  return (
    <div className="dataset-detail" style={{ padding: '112px clamp(24px, 5vw, 80px) 80px', maxWidth: '1200px' }}>

      <Link href="/research" className="btn-outline" style={{ marginBottom: '40px', fontSize: '12px', padding: '10px 20px' }}>
        ← Back to Research
      </Link>

      {/* Title block */}
      <div style={{ marginBottom: '24px' }}>
        <p style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
          Alternative Data
        </p>
        <h1 style={{ fontSize: '38px', fontWeight: 700, color: 'var(--navy)', marginBottom: '10px', fontFamily: 'var(--font-serif)', lineHeight: 1.1 }}>
          Federal Contract Spending
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.5px' }}>
          2026 &nbsp;·&nbsp; 1,270 tickers &nbsp;·&nbsp; 76 quarters &nbsp;·&nbsp; FY2007–2025
        </p>
      </div>

      {/* Hero */}
      <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '680px', marginBottom: '28px' }}>
        <p>
          Federal procurement data publishes within <strong style={{ color: 'var(--navy)' }}>3 business days</strong> of contract execution — 30–60 days before quarterly earnings. For defense, IT services, and aerospace companies where government revenue is the dominant driver, this dataset provides a direct leading indicator of the upcoming earnings print.
        </p>
      </div>

      <StatBar stats={[
        { label: 'Tickers covered', value: '1,270', subtitle: 'merged signal universe' },
        { label: 'History', value: '76 quarters', subtitle: 'FY2007–2025' },
        { label: 'Obligations mapped', value: '$6.58T', subtitle: 'prime + subawards' },
        { label: 'Delivery lag', value: '~3 BD', subtitle: 'vs 30–60d earnings' },
        { label: 'Signals |t| ≥ 2', value: '7', highlight: true },
      ]} />

      {/* The Data */}
      <section style={{ marginBottom: '0' }}>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '14px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          The Data
        </h2>
        <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '680px' }}>
          <p style={{ marginBottom: '12px' }}>
            Every prime federal contract obligation from FY2007 through FY2025, resolved to its publicly traded counterpart. Our entity resolution pipeline maps 1,325 tickers (1,270 in the merged quarterly signals panel) across the full historical record, accounting for corporate actions, mergers, and ticker changes with point-in-time effective date ranges.
          </p>
          <p>
            Subaward data adds significant downstream exposure coverage. Every observation is point-in-time compliant — no look-ahead, no survivorship bias — making the dataset suitable for rigorous quantitative research and backtesting.
          </p>
        </div>
      </section>

      <Divider />

      {/* Signals */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '22px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Signals
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '840px' }}>
          <SignalEvidenceCard
            signalName="composite_signal"
            description="Pre-built ex-ante composite: equal-weighted average of ugr_surprise_pct_12q_rank, obligation_qoq_rank, and (1 − agency_hhi_rank). The primary headline predictor. Delivered as a ready-to-use cross-sectional rank — no buyer-side construction required."
            metrics={[
              { label: 'Mean IC', value: '+2.08%', positive: true },
              { label: 't-stat', value: '3.39', positive: true },
              { label: 'IC IR', value: '0.39', positive: true },
              { label: 'Hit rate', value: '65.3%', positive: true },
            ]}
          />
          <SignalEvidenceCard
            signalName="ugr_surprise_pct_12q"
            description="Unexpected Government Receivables. Current-quarter obligations vs. the trailing 12-quarter average. A positive value means the company is winning materially more than its long-run rate — a direct observable for the upcoming earnings beat."
            metrics={[
              { label: 'Mean IC', value: '+1.32%', positive: true },
              { label: 't-stat', value: '2.29', positive: true },
              { label: 'Hit rate', value: '61.6%', positive: true },
            ]}
          />
          <SignalEvidenceCard
            signalName="obligation_yoy"
            description="Year-over-year obligation growth. Captures the annual momentum trend in contract awards — did the company win more in the past four quarters vs. the prior four? Complementary to UGR in the composite."
            metrics={[
              { label: 'Mean IC', value: '+1.24%', positive: true },
              { label: 't-stat', value: '2.18', positive: true },
              { label: 'Hit rate', value: '56.3%', positive: true },
            ]}
          />
          <SignalEvidenceCard
            signalName="ugr_surprise_pct_8q"
            description="Unexpected Government Receivables on an 8-quarter trailing baseline. Shorter memory than the 12-quarter variant — more responsive to recent regime shifts, slightly noisier. Component of the composite."
            metrics={[
              { label: 'Mean IC', value: '+1.21%', positive: true },
              { label: 't-stat', value: '2.03', positive: true },
              { label: 'Hit rate', value: '54.8%', positive: true },
            ]}
          />
          <SignalEvidenceCard
            signalName="agency_hhi"
            description="Agency concentration risk. Herfindahl-Hirschman Index of the company's agency spend distribution. A score near 1.0 means nearly all contracts come from a single agency — concentrated contractors consistently underperform diversified ones. Negative IC by design: use as the short-book signal or as a composite input (1 − rank)."
            metrics={[
              { label: 'Mean IC', value: '−2.18%', negative: true },
              { label: 't-stat', value: '−3.16', negative: true },
              { label: 'Hit rate', value: '34.7%', negative: true },
            ]}
          />
        </div>
      </section>

      <Divider />

      {/* How It Works */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          How It Works
        </h2>
        <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '680px', marginBottom: '24px' }}>
          <p>
            Federal procurement data posts within days of contract execution — well ahead of quarterly earnings. For companies where government awards represent a significant share of revenue, this dataset provides a direct, observable leading indicator of the upcoming earnings print. The chart below illustrates the <code style={{ fontSize: '12px', color: 'var(--gold)' }}>composite_signal</code> rank (gold) alongside subsequent quarter returns (navy dashed).
          </p>
        </div>
        <SignalLeadChart
          data={govSpendingSignalVsReturn}
          signalLabel="composite_signal rank"
          priceLabel="Next-quarter return"
          caption="composite_signal percentile rank vs. subsequent quarter total return. Illustrative sample (LMT, 2020–2024)."
        />
      </section>

      <Divider />

      {/* Statistical Evidence */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '22px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Statistical Evidence
        </h2>

        <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '680px', marginBottom: '28px' }}>
          Spearman rank IC vs. one-quarter-forward total return, cross-sectionally across the covered universe over the full historical period. Point-in-time construction — no look-ahead bias.
        </div>

        {/* IC Summary table */}
        <div style={{ overflowX: 'auto', border: '1px solid var(--border)', marginBottom: '32px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Signal', 'Mean IC', 't-stat', 'IC IR', 'Hit Rate'].map((h) => (
                  <th key={h} style={{ padding: '9px 14px', textAlign: 'left', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', background: 'var(--surface)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { signal: 'composite_signal', ic: '+2.08%', t: '3.39', ir: '0.39', hit: '65.3%', pos: true },
                { signal: 'mod_count', ic: '+2.62%', t: '2.67', ir: '—', hit: '—', pos: true },
                { signal: 'mod_net_value', ic: '+1.99%', t: '2.52', ir: '—', hit: '—', pos: true },
                { signal: 'ugr_surprise_pct_12q', ic: '+1.32%', t: '2.29', ir: '0.27', hit: '61.6%', pos: true },
                { signal: 'obligation_yoy', ic: '+1.24%', t: '2.18', ir: '0.26', hit: '56.3%', pos: true },
                { signal: 'ugr_surprise_pct_8q', ic: '+1.21%', t: '2.03', ir: '0.24', hit: '54.8%', pos: true },
                { signal: 'agency_hhi', ic: '−2.18%', t: '−3.16', ir: '−0.36', hit: '34.7%', pos: false },
              ].map((row, i) => (
                <tr key={row.signal} style={{ borderBottom: '1px solid var(--surface)', background: i % 2 === 1 ? 'var(--bg)' : 'var(--white)' }}>
                  <td style={{ padding: '8px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--gold)' }}>{row.signal}</td>
                  <td style={{ padding: '8px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: row.pos ? 'var(--positive)' : 'var(--negative)', fontWeight: 600 }}>{row.ic}</td>
                  <td style={{ padding: '8px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: row.pos ? 'var(--positive)' : 'var(--negative)', fontWeight: 600 }}>{row.t}</td>
                  <td style={{ padding: '8px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--navy)' }}>{row.ir}</td>
                  <td style={{ padding: '8px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--navy)' }}>{row.hit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '32px' }}>
          <QuintileBarChart
            data={govSpendingQuintileReturns}
            title="Annualized return by composite_signal quintile"
            yAxisLabel="Annualized return (%)"
          />
          <ICTimeSeriesChart
            data={govSpendingICSeries}
            title="IC time series — composite_signal"
            meanIC={0.0208}
            tStat={3.39}
          />
        </div>
      </section>

      <Divider />

      {/* Backtest Validation */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '14px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Backtest Validation
        </h2>
        <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.75, maxWidth: '680px', padding: '16px 20px', border: '1px solid var(--border)', background: 'var(--surface)' }}>
          <p style={{ marginBottom: '8px' }}>
            A naïve quintile sort on <code style={{ fontSize: '11px', color: 'var(--gold)' }}>composite_signal</code> (Q5 long / Q1 short, quarterly rebalance) produces a <strong style={{ color: 'var(--navy)' }}>+12.1% annualized L/S spread</strong> over the 75-quarter validation window. The monotonic quintile spread confirms the signal has predictive content. Defense/Aerospace is the strongest sector (IC +2.50%, t=3.68, 515 tickers); the composite is most credible as a sector-aware earnings preview input.
          </p>
          <p style={{ fontSize: '11px', color: 'var(--border)', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>
            Ribeon provides data, not financial advice. Strategy construction, position sizing, and risk management are the buyer&apos;s domain.
          </p>
        </div>
      </section>

    </div>
  )
}
