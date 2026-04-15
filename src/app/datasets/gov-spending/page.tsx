import Link from 'next/link'
import { QuintileBarChart } from '@/components/charts/QuintileBarChart'
import { ICTimeSeriesChart } from '@/components/charts/ICTimeSeriesChart'
import { StatBar } from '@/components/StatBar'
import { SignalEvidenceCard } from '@/components/SignalEvidenceCard'
import { AtAGlance } from '@/components/AtAGlance'
import { UseCases } from '@/components/UseCases'
import { DetailsAccordion } from '@/components/DetailsAccordion'
import { FlagshipSignalCard } from '@/components/FlagshipSignalCard'
import { DatasetCTA } from '@/components/DatasetCTA'
import { GOV_SPENDING_META } from '@/lib/data/dataset-meta'
import {
  govSpendingICSeries,
  govSpendingQuintileReturns,
} from '@/lib/data/gov-spending-evidence'

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '56px 0' }} />
)

export default function GovSpendingPage() {
  return (
    <div className="dataset-detail" style={{ padding: '112px clamp(24px, 5vw, 80px) 80px', maxWidth: '1200px' }}>

      <Link href="/research" className="btn-outline" style={{ marginBottom: '48px', fontSize: '12px', padding: '10px 20px' }}>
        ← Back to Research
      </Link>

      {/* Hero */}
      <div style={{ marginBottom: '10px' }}>
        <p style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '10px' }}>
          Alternative Data
        </p>
        <h1 style={{ fontSize: '38px', fontWeight: 700, color: 'var(--navy)', marginBottom: '10px', fontFamily: 'var(--font-serif)', lineHeight: 1.1 }}>
          {GOV_SPENDING_META.name}
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.5px', marginBottom: '28px' }}>
          {GOV_SPENDING_META.tickers} tickers &nbsp;·&nbsp; {GOV_SPENDING_META.quarters} quarters &nbsp;·&nbsp; {GOV_SPENDING_META.history}
        </p>
        <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--muted)', maxWidth: '660px', marginBottom: '32px' }}>
          Federal procurement data publishes within <strong style={{ color: 'var(--navy)' }}>3 business days</strong> of contract
          execution — 30 to 60 days before quarterly earnings. For defense, IT, and aerospace companies
          where government revenue is the primary driver, this dataset provides a direct,
          observable leading indicator of the upcoming earnings print.
        </p>
      </div>

      <StatBar stats={[
        { label: 'Tickers covered', value: GOV_SPENDING_META.tickers },
        { label: 'History', value: GOV_SPENDING_META.quarters + ' quarters' },
        { label: 'Obligations mapped', value: GOV_SPENDING_META.obligations },
        { label: 'Composite hit rate', value: GOV_SPENDING_META.compositeHitRate, highlight: true },
      ]} />

      <AtAGlance items={[
        { label: 'Tracks', value: 'Federal prime contracts & subawards' },
        { label: 'Who uses it', value: 'Defense & aerospace quant funds, earnings analysts' },
        { label: 'Update cadence', value: 'Within ~3 business days of execution' },
        { label: 'History', value: GOV_SPENDING_META.history },
        { label: 'Ticker mapping', value: 'Point-in-time, accounts for M&A and ticker changes' },
        { label: 'Output', value: 'Quarterly cross-sectional signal ranks per ticker' },
      ]} />

      <Divider />

      {/* Signals */}
      <section style={{ marginBottom: '0' }}>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '8px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Signals
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '24px', lineHeight: 1.6, maxWidth: '600px' }}>
          Seven signals with |t| ≥ 2 across the full validation window. The pre-built composite is the recommended starting point — it blends the three strongest independent predictors into a single, ready-to-use rank.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '840px', marginBottom: '16px' }}>
          <FlagshipSignalCard
            badge="Flagship"
            name="composite_signal"
            description="Pre-built composite: equal-weighted blend of UGR surprise (12Q), obligation quarter-over-quarter momentum, and inverse agency concentration (1 − HHI rank). Delivered as a cross-sectional rank across the full universe — ready to use without buyer-side construction."
            metrics={[
              { label: 'Mean IC', value: GOV_SPENDING_META.compositeIC, positive: true },
              { label: 't-stat', value: GOV_SPENDING_META.compositeTStat, positive: true },
              { label: 'IC IR', value: '0.39', positive: true },
              { label: 'Hit rate', value: GOV_SPENDING_META.compositeHitRate, positive: true },
            ]}
          />

          <SignalEvidenceCard
            signalName="ugr_surprise_pct_12q"
            description="Unexpected Government Receivables — current-quarter obligations vs. the trailing 12-quarter average. A positive reading means the company is winning materially more than its long-run rate: a direct observable for an upcoming earnings beat."
            metrics={[
              { label: 'Mean IC', value: '+1.32%', positive: true },
              { label: 't-stat', value: '2.29', positive: true },
              { label: 'Hit rate', value: '61.6%', positive: true },
            ]}
          />

          <SignalEvidenceCard
            signalName="agency_hhi"
            description="Agency concentration risk (Herfindahl index). A score near 1.0 means nearly all contracts come from a single agency — concentrated contractors consistently underperform diversified ones. Use as the short-book signal or as a composite input (1 − rank). Negative IC by design."
            metrics={[
              { label: 'Mean IC', value: '−2.18%', negative: true },
              { label: 't-stat', value: '−3.16', negative: true },
              { label: 'Directional', value: 'Short signal', negative: true },
            ]}
          />
        </div>

        <DetailsAccordion title="Additional signals — obligation_yoy, ugr_8q, mod_count, mod_net_value">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <SignalEvidenceCard
              signalName="obligation_yoy"
              description="Year-over-year obligation growth. Captures annual momentum in contract awards — did this company win more in the past four quarters than the prior four? Complements the UGR signal in the composite."
              metrics={[
                { label: 'Mean IC', value: '+1.24%', positive: true },
                { label: 't-stat', value: '2.18', positive: true },
                { label: 'Hit rate', value: '56.3%', positive: true },
              ]}
            />
            <SignalEvidenceCard
              signalName="ugr_surprise_pct_8q"
              description="UGR on an 8-quarter trailing baseline. Shorter memory than the 12Q variant — more responsive to recent regime shifts, slightly noisier. Component of the composite."
              metrics={[
                { label: 'Mean IC', value: '+1.21%', positive: true },
                { label: 't-stat', value: '2.03', positive: true },
                { label: 'Hit rate', value: '54.8%', positive: true },
              ]}
            />
            <SignalEvidenceCard
              signalName="mod_count"
              description="Number of contract modifications in the quarter. High modification activity is associated with scope increases and budget supplementals — a leading indicator of upward revenue revisions."
              metrics={[
                { label: 'Mean IC', value: '+2.62%', positive: true },
                { label: 't-stat', value: '2.67', positive: true },
              ]}
            />
            <SignalEvidenceCard
              signalName="mod_net_value"
              description="Net dollar value of contract modifications. Captures magnitude alongside count — large positive modifications signal material revenue acceleration."
              metrics={[
                { label: 'Mean IC', value: '+1.99%', positive: true },
                { label: 't-stat', value: '2.52', positive: true },
              ]}
            />
          </div>
        </DetailsAccordion>
      </section>

      <Divider />

      <UseCases cases={[
        {
          title: 'Earnings preview',
          description: 'Rank government-exposed names by composite_signal heading into earnings to identify potential beats before the print.',
        },
        {
          title: 'Cross-sectional L/S',
          description: 'Sort the full 1,270-ticker universe by signal for a Q5 long / Q1 short quarterly-rebalanced book. Historically +12.1% annualized spread.',
        },
        {
          title: 'Sector screening',
          description: 'Defense and aerospace shows the strongest sub-sector IC (+2.50%, t=3.68 across 515 tickers) — use as a sector-aware earnings preview filter.',
        },
      ]} />

      <Divider />

      {/* Evidence */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '22px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Statistical Evidence
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', marginBottom: '32px' }}>
          <div>
            <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              IC over time — composite_signal
            </p>
            <ICTimeSeriesChart
              data={govSpendingICSeries}
              meanIC={0.0208}
              tStat={3.39}
            />
          </div>
          <div>
            <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              Annualized return by composite_signal quintile
            </p>
            <QuintileBarChart
              data={govSpendingQuintileReturns}
              yAxisLabel="Annualized return (%)"
            />
          </div>
        </div>

        <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.75, maxWidth: '680px', padding: '20px 24px', border: '1px solid var(--border)', background: 'var(--surface)', marginBottom: '16px' }}>
          <p>
            A naïve quintile sort on <code style={{ fontSize: '11px', color: 'var(--gold)' }}>composite_signal</code> (Q5 long / Q1 short, quarterly rebalance) produces a{' '}
            <strong style={{ color: 'var(--navy)' }}>{GOV_SPENDING_META.lsSpread} annualized L/S spread</strong> over the {GOV_SPENDING_META.quarters}-quarter validation window.
            The monotonic quintile structure — each quintile strictly higher than the last — confirms genuine predictive content.
            Defense/Aerospace is the strongest sub-sector: IC +2.50%, t=3.68 across 515 tickers.
          </p>
        </div>

        <DetailsAccordion title="Full signal validation table">
          <div style={{ overflowX: 'auto' }}>
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
                  { signal: 'composite_signal',     ic: '+2.08%', t: '3.39',  ir: '0.39',  hit: '65.3%', pos: true },
                  { signal: 'mod_count',             ic: '+2.62%', t: '2.67',  ir: '—',     hit: '—',     pos: true },
                  { signal: 'mod_net_value',         ic: '+1.99%', t: '2.52',  ir: '—',     hit: '—',     pos: true },
                  { signal: 'ugr_surprise_pct_12q',  ic: '+1.32%', t: '2.29',  ir: '0.27',  hit: '61.6%', pos: true },
                  { signal: 'obligation_yoy',        ic: '+1.24%', t: '2.18',  ir: '0.26',  hit: '56.3%', pos: true },
                  { signal: 'ugr_surprise_pct_8q',   ic: '+1.21%', t: '2.03',  ir: '0.24',  hit: '54.8%', pos: true },
                  { signal: 'agency_hhi',            ic: '−2.18%', t: '−3.16', ir: '−0.36', hit: '34.7%', pos: false },
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
          <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginTop: '12px' }}>
            Spearman rank IC vs. 1Q-forward total return, cross-sectionally across the covered universe. {GOV_SPENDING_META.quarters} quarters, {GOV_SPENDING_META.history}. Point-in-time — no look-ahead bias.
          </p>
        </DetailsAccordion>
      </section>

      <Divider />

      <DetailsAccordion title="Methodology & data construction">
        <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p>
            Every prime federal contract obligation from {GOV_SPENDING_META.history} is resolved to its publicly traded counterpart through a proprietary entity resolution pipeline.
            The pipeline maps 1,325 tickers (1,270 in the merged quarterly signals panel) with point-in-time effective date ranges,
            accounting for corporate actions, mergers, and ticker changes across the full historical record.
          </p>
          <p>
            Subaward data adds significant downstream exposure coverage — capturing revenue exposure for companies that primarily receive work through primes.
            Every observation is point-in-time compliant: no look-ahead, no survivorship bias.
          </p>
          <p>
            The composite signal is constructed ex-ante using equal-weighted combination of three independently significant signals.
            All signal ranks are computed cross-sectionally within each quarter so the output is immediately usable in factor models and portfolio construction.
          </p>
        </div>
      </DetailsAccordion>

      <DatasetCTA
        heading="Ready to integrate Federal Contract Spending?"
        subtext="Request a sample file, discuss sector-specific coverage, or talk through how the composite signal fits into your earnings workflow."
      />

    </div>
  )
}
