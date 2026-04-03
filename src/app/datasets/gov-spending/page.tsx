import Link from 'next/link'
import { GovSpendingExplorer } from '@/components/data/GovSpendingExplorer'
import { SignalTimeSeriesChart } from '@/components/charts/SignalTimeSeriesChart'
import { QuintileBarChart } from '@/components/charts/QuintileBarChart'
import { ICTimeSeriesChart } from '@/components/charts/ICTimeSeriesChart'
import { SignalLeadChart } from '@/components/charts/SignalLeadChart'
import { StatBar } from '@/components/StatBar'
import { SignalEvidenceCard } from '@/components/SignalEvidenceCard'
import { govSpendingSample } from '@/lib/data/gov-spending-sample'
import {
  govSpendingICSeries,
  govSpendingQuintileReturns,
  govSpendingSignalVsReturn,
} from '@/lib/data/gov-spending-evidence'
import type { GovSpendingRow } from '@/lib/types'

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
          2026 &nbsp;·&nbsp; 2,388 tickers &nbsp;·&nbsp; 76 quarters &nbsp;·&nbsp; FY2007–2025
        </p>
      </div>

      {/* Hero */}
      <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '680px', marginBottom: '28px' }}>
        <p>
          Federal procurement data publishes within <strong style={{ color: 'var(--navy)' }}>3 business days</strong> of contract execution — 30–60 days before quarterly earnings. For defense, IT services, and aerospace companies where government revenue is the dominant driver, this dataset provides a direct leading indicator of the upcoming earnings print.
        </p>
      </div>

      <StatBar stats={[
        { label: 'Tickers covered', value: '2,388' },
        { label: 'History', value: '76 quarters', subtitle: 'FY2007–2025' },
        { label: 'Obligations mapped', value: '$6.65T', subtitle: 'prime + subawards' },
        { label: 'Delivery lag', value: '~3 BD', subtitle: 'vs 30–60d earnings' },
        { label: 'Signals t ≥ 2', value: '5', highlight: true },
      ]} />

      {/* The Data */}
      <section style={{ marginBottom: '0' }}>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '14px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          The Data
        </h2>
        <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '680px' }}>
          <p style={{ marginBottom: '12px' }}>
            Every prime federal contract obligation from FY2007 through FY2025 — 27.8 million contract actions — resolved to its publicly traded counterpart. The entity resolution pipeline maps 2,388 SEC tickers through 1,761 temporal M&A entries, ensuring the right entity receives credit in every quarter (Raytheon maps to RTN before April 2020, RTX after).
          </p>
          <p>
            Subaward depth adds $2.47T in downstream exposure across 1.17M FSRS records. Every observation is point-in-time compliant: no look-ahead, no survivorship bias. Non-PIT datasets overstate historical obligations by 12.3% on average.
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
            signalName="obligation_mcap_ratio"
            description="Government revenue intensity. Prime obligations divided by market cap — measures how much of a company's revenue base is backed by federal contracts. High values indicate a business materially dependent on government demand."
            metrics={[
              { label: 'Mean IC', value: '+1.49%', positive: true },
              { label: 't-stat', value: '2.72', positive: true },
              { label: 'Hit rate', value: '62.7%', positive: true },
            ]}
          />
          <SignalEvidenceCard
            signalName="ugr_surprise_pct_12q"
            description="Unexpected Government Receivables. Current-quarter obligations vs. the trailing 12-quarter average. A positive value means the company is winning materially more than its long-run rate — a direct observable for the upcoming earnings beat."
            metrics={[
              { label: 'Mean IC', value: '+1.17%', positive: true },
              { label: 't-stat', value: '2.59', positive: true },
              { label: 'Hit rate', value: '62.7%', positive: true },
            ]}
          />
          <SignalEvidenceCard
            signalName="obligation_qoq"
            description="Quarter-over-quarter obligation growth. Simple, clean momentum — did contract awards grow this quarter vs. last? Works as a standalone signal and as a complement to UGR in composite models."
            metrics={[
              { label: 'Mean IC', value: '+1.47%', positive: true },
              { label: 't-stat', value: '2.50', positive: true },
              { label: 'Hit rate', value: '61.8%', positive: true },
            ]}
          />
          <SignalEvidenceCard
            signalName="agency_hhi"
            description="Agency concentration risk. HHI of the company's agency spend distribution. A score near 1.0 means nearly all contracts come from a single agency. This signal predicts underperformance — concentrated contractors consistently lag diversified ones. Use for the short book."
            metrics={[
              { label: 'Mean IC', value: '−3.20%', negative: true },
              { label: 't-stat', value: '−5.41', negative: true },
              { label: 'Hit rate', value: '27.6%', negative: true },
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
            FPDS contract actions post within 3 business days. For companies where government contracts represent 60–90% of revenue, UGR surprise in FPDS is a direct observable for the earnings print — weeks before the release. The chart below shows the <code style={{ fontSize: '12px', color: 'var(--gold)' }}>obligation_mcap_ratio</code> signal (gold) alongside subsequent quarter returns (navy dashed) for LMT.
          </p>
        </div>
        <SignalLeadChart
          data={govSpendingSignalVsReturn}
          signalLabel="Obligation/MCap rank"
          priceLabel="Next-quarter return"
          caption="LMT obligation_mcap_ratio percentile rank vs. subsequent quarter total return, 2020–2024. Illustrative sample data."
        />
      </section>

      <Divider />

      {/* Statistical Evidence */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '22px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Statistical Evidence
        </h2>

        <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '680px', marginBottom: '28px' }}>
          Spearman rank IC vs. one-quarter-forward total return, cross-sectionally across 2,237 tickers over 75–76 quarters. Prior-quarter-only winsorization — no look-ahead bias.
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
                { signal: 'obligation_mcap_ratio', ic: '+1.49%', t: '2.72', ir: '0.31', hit: '62.7%', pos: true },
                { signal: 'ugr_surprise_pct_12q', ic: '+1.17%', t: '2.59', ir: '0.30', hit: '62.7%', pos: true },
                { signal: 'obligation_qoq', ic: '+1.47%', t: '2.50', ir: '0.29', hit: '61.8%', pos: true },
                { signal: 'ugr_surprise_pct_8q', ic: '+1.07%', t: '2.30', ir: '0.27', hit: '57.3%', pos: true },
                { signal: 'agency_hhi', ic: '−3.20%', t: '−5.41', ir: '−0.62', hit: '27.6%', pos: false },
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
            title="Annualized return by obligation_mcap_ratio quintile"
            yAxisLabel="Annualized return (%)"
          />
          <ICTimeSeriesChart
            data={govSpendingICSeries}
            title="IC time series — obligation_mcap_ratio"
            meanIC={0.0149}
            tStat={2.72}
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
            A naïve quintile sort on <code style={{ fontSize: '11px', color: 'var(--gold)' }}>obligation_mcap_ratio</code> (Q5 long / Q1 short, quarterly rebalance) produces <strong style={{ color: 'var(--navy)' }}>+7.9% annualized L/S spread with Sharpe 0.92</strong> over the 75-quarter validation window. The monotonic quintile spread confirms the signal has predictive content.
          </p>
          <p style={{ fontSize: '11px', color: 'var(--border)', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>
            Ribeon provides data, not financial advice. Strategy construction, position sizing, and risk management are the buyer&apos;s domain.
          </p>
        </div>
      </section>

      <Divider />

      {/* Interactive Demo */}
      <section style={{ marginBottom: '0' }}>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '18px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Sample Data
        </h2>
        <GovSpendingExplorer />
      </section>

      <Divider />

      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '18px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Composite Rank Over Time
        </h2>
        <SignalTimeSeriesChart data={govSpendingSample as GovSpendingRow[]} />
      </section>

    </div>
  )
}
