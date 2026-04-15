import Link from 'next/link'
import { WeatherDataPage } from '@/components/WeatherDataPage'
import { StatBar } from '@/components/StatBar'
import { AtAGlance } from '@/components/AtAGlance'
import { UseCases } from '@/components/UseCases'
import { DetailsAccordion } from '@/components/DetailsAccordion'
import { FlagshipSignalCard } from '@/components/FlagshipSignalCard'
import { DatasetCTA } from '@/components/DatasetCTA'
import { SignalLeadChart } from '@/components/charts/SignalLeadChart'
import { WEATHER_META } from '@/lib/data/dataset-meta'
import {
  threeLinkProof,
  atlasBacktestResults,
  atlasScore2Sharpes,
  atlasReferenceResults,
  atlasHddVsHoReturn,
} from '@/lib/data/weather-evidence'

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '56px 0' }} />
)

export default function WeatherPage() {
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
          {WEATHER_META.name}
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.5px', marginBottom: '28px' }}>
          AI weather forecast &nbsp;·&nbsp; {WEATHER_META.cadence.toLowerCase()} &nbsp;·&nbsp; {WEATHER_META.regions} regions &nbsp;·&nbsp; {WEATHER_META.validatedSignals} validated commodities
        </p>
        <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--muted)', maxWidth: '660px', marginBottom: '32px' }}>
          Our AI weather model initializes every Monday and produces a 7-day US Northeast temperature forecast{' '}
          <strong style={{ color: 'var(--navy)' }}>available before market open</strong>. Cold forecasts
          predict higher demand for heating oil and gasoline; warm forecasts signal softer demand.
          The signal is statistically correlated with that same week&apos;s commodity futures returns — a
          genuinely leading indicator with a validated causal chain.
        </p>
      </div>

      <StatBar stats={[
        { label: 'Model → HO (3yr OOS)', value: WEATHER_META.hoL3r, subtitle: 'n=48 winter weeks', highlight: true },
        { label: 'CORN Sharpe (score=3)', value: WEATHER_META.cornSharpe, subtitle: WEATHER_META.cornHitRate + ' hit, ' + WEATHER_META.cornTrades + ' trades' },
        { label: 'RB Sharpe (score=3)', value: WEATHER_META.rbSharpe, subtitle: WEATHER_META.rbHitRate + ' hit, ' + WEATHER_META.rbTrades + ' trades' },
        { label: 'Update cadence', value: WEATHER_META.cadence },
      ]} />

      <AtAGlance items={[
        { label: 'Forecast horizon', value: '7 days (Mon init → Sun)' },
        { label: 'Return window', value: 'Mon open → next Mon open' },
        { label: 'Validated signals', value: 'NE HDD → HO, RB, CL, CORN (winter)' },
        { label: 'Regions covered', value: WEATHER_META.regions + ' commodity-producing regions' },
        { label: 'OOS test period', value: WEATHER_META.oosPeriod },
        { label: 'Output', value: 'Z-scored HDD anomaly + activation score (0–3)' },
      ]} />

      <Divider />

      {/* The Causal Chain */}
      <section style={{ marginBottom: '0' }}>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          The Causal Chain
        </h2>
        <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--muted)', maxWidth: '620px', marginBottom: '24px' }}>
          The signal rests on three independently verifiable steps. Each is statistically significant.
          Together they form a transitive proof: if the AI forecast accurately predicts weather,
          and weather drives commodity prices, then the forecast predicts prices — before the week begins.
        </p>

        {/* Three-link visual */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', maxWidth: '680px', marginBottom: '28px' }}>
          {[
            { step: '01', title: 'Weather drives prices', sub: 'ERA5 → commodity return', r: 'r = +0.38 to +0.52', note: 'Physical demand channel confirmed' },
            { step: '02', title: 'Model forecasts weather', sub: 'AI forecast → ERA5 reanalysis', r: 'r = +0.894', note: 'Across all 4 validated signals' },
            { step: '03', title: 'Model forecasts prices', sub: 'AI forecast → return (OOS)', r: 'r = +0.30 to +0.48', note: 'Direct, out-of-sample, n=48' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '20px',
              background: i === 2 ? 'rgba(0,212,170,0.04)' : 'var(--surface)',
              borderLeft: i > 0 ? 'none' : undefined,
            }}>
              <div style={{ fontSize: '10px', color: 'var(--gold)', fontFamily: 'var(--font-mono)', marginBottom: '8px', letterSpacing: '1px' }}>{s.step}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--navy)', marginBottom: '4px', lineHeight: 1.3 }}>{s.title}</div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: '10px', lineHeight: 1.4 }}>{s.sub}</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: i === 2 ? 'var(--positive)' : 'var(--navy)', fontFamily: 'var(--font-mono)', letterSpacing: '-0.3px' }}>{s.r}</div>
              <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '4px', lineHeight: 1.4 }}>{s.note}</div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '620px', marginBottom: '28px' }}>
          <strong style={{ color: 'var(--navy)' }}>Why Northeast HDD?</strong> Demand variability per degree-anomaly is
          highest in the Northeast — it is the primary driver of heating oil and gasoline demand, with secondary
          effects on Corn through energy input costs. This relationship was confirmed across all 7 regions tested.
          Note: 2023 standalone energy signals were weak (HO r=+0.016); treat as regime-dependent.
        </p>

        {/* Signal chart */}
        <div style={{ maxWidth: '680px' }}>
          <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
            NE HDD anomaly vs Heating Oil weekly return — OOS winter weeks
          </p>
          <SignalLeadChart
            data={atlasHddVsHoReturn}
            signalLabel="NE HDD z-score"
            priceLabel="HO return (%)"
            caption="AI model 7-day NE HDD anomaly (gold) vs Heating Oil Mon→Mon return (navy dashed). 2021–2022 OOS winter weeks (r=+0.533 for 2yr; 3yr combined r=+0.444). Signal available Monday before open — no look-ahead."
          />
        </div>
      </section>

      <Divider />

      {/* Flagship signals */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '8px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Flagship Signals
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '24px', lineHeight: 1.65, maxWidth: '600px' }}>
          The activation-gated backtest runs three independent confirmation gates (seasonal window, forecast amplitude,
          trailing regime correlation). Score=3 means all gates active — the highest-confidence weeks.
          CORN and RB peak at score=3; HO and CL perform better at score≥2 (see full results below).
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '840px', marginBottom: '16px' }}>
          <FlagshipSignalCard
            badge="Flagship"
            name="Corn / NE HDD"
            description="Corn is the strongest validated signal. Cold NE winter forecasts correlate with higher energy input costs for grain production, lifting Corn futures. The 3-year direct correlation (r=+0.479) is strong and consistent across 2021 and 2022. Score=3 activation concentrates on the highest-confidence weeks."
            metrics={[
              { label: 'Sharpe (score=3)', value: WEATHER_META.cornSharpe, positive: true },
              { label: 'Hit rate', value: WEATHER_META.cornHitRate, positive: true },
              { label: 'Trades (OOS)', value: WEATHER_META.cornTrades },
              { label: 'Bootstrap 5th %ile', value: '2.33' },
            ]}
          />
          <FlagshipSignalCard
            badge="Flagship"
            name="RBOB Gasoline / NE HDD"
            description="RBOB Gasoline shows the cleanest energy-demand mechanism — cold forecasts map directly to higher blending demand. Second-highest L3 correlation at r=+0.382 (3yr OOS). Score=3 isolates the strongest RB weeks with meaningful trade count."
            metrics={[
              { label: 'Sharpe (score=3)', value: WEATHER_META.rbSharpe, positive: true },
              { label: 'Hit rate', value: WEATHER_META.rbHitRate, positive: true },
              { label: 'Trades (OOS)', value: WEATHER_META.rbTrades },
              { label: 'Bootstrap 5th %ile', value: '0.76' },
            ]}
          />
        </div>

        <DetailsAccordion title="All signal results — score=3 table, score≥2 comparison, 2022 reference">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Score=3 table */}
            <div>
              <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                Activation-gated backtest — score = 3 (all gates active), OOS 2021-01-04 → 2024-02-02, 154 weeks
              </p>
              <div style={{ overflowX: 'auto', border: '1px solid var(--border)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {['Signal (score = 3)', 'Sharpe', 'Hit Rate', 'Trades'].map((h) => (
                        <th key={h} style={{ padding: '9px 14px', textAlign: 'left', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', background: 'var(--surface)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {atlasBacktestResults.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--surface)', background: i % 2 === 1 ? 'var(--bg)' : 'var(--white)' }}>
                        <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{row.signal}</td>
                        <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--positive)' }}>{row.sharpe.toFixed(2)}</td>
                        <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--navy)' }}>{row.hitRate}%</td>
                        <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{row.trades}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>
                Bootstrap 5th percentile: CORN 2.33 — lower bound comfortably above 2.0. RB 0.76 — lower bound positive.
              </p>
            </div>

            {/* Score threshold comparison */}
            <div>
              <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                Score threshold comparison — HO and CL recommended at score≥2
              </p>
              <div style={{ overflowX: 'auto', border: '1px solid var(--border)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {['Signal', 'Sharpe (score = 3)', 'Sharpe (score ≥ 2)', 'Note'].map((h) => (
                        <th key={h} style={{ padding: '9px 14px', textAlign: 'left', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', background: 'var(--surface)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {atlasScore2Sharpes.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--surface)', background: i % 2 === 1 ? 'var(--bg)' : 'var(--white)' }}>
                        <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{row.signal}</td>
                        <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--positive)' }}>{row.sharpeScore3.toFixed(2)}</td>
                        <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--positive)' }}>{row.sharpeScore2.toFixed(2)}</td>
                        <td style={{ padding: '7px 14px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{row.read}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2022 reference */}
            <div>
              <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                2022 strict OOS reference (no activation filter, lag-0) — raw signal strength
              </p>
              <div style={{ overflowX: 'auto', border: '1px solid var(--border)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {['Signal', 'Sharpe (2022)', 'Hit Rate', 'Trades'].map((h) => (
                        <th key={h} style={{ padding: '9px 14px', textAlign: 'left', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', background: 'var(--surface)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {atlasReferenceResults.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--surface)', background: i % 2 === 1 ? 'var(--bg)' : 'var(--white)' }}>
                        <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{row.signal}</td>
                        <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--positive)' }}>{row.sharpe.toFixed(2)}</td>
                        <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--navy)' }}>{row.hitRate}%</td>
                        <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{row.trades}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>
                2022-only, n=18 winter weeks each, no activation filter. Shows raw signal strength in the energy-crisis regime.
              </p>
            </div>

          </div>
        </DetailsAccordion>
      </section>

      <Divider />

      <UseCases cases={[
        {
          title: 'Weekly energy positioning',
          description: 'Use the Monday NE HDD forecast anomaly to size Heating Oil or RBOB positions before the week opens. The signal is available before market open.',
        },
        {
          title: 'Activation-gated rotation',
          description: 'Enter long positions only when the score=3 regime is active. Flat or neutral otherwise. Reduces exposure during low-conviction periods.',
        },
        {
          title: 'Grain demand signal',
          description: 'Cold NE winters raise energy input costs for agricultural production. The Corn signal provides an independent, weather-driven view alongside crop condition data.',
        },
      ]} />

      <Divider />

      {/* Three-link proof table */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Three-Link Validation
        </h2>
        <div style={{ overflowX: 'auto', border: '1px solid var(--border)', marginBottom: '12px', maxWidth: '780px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Commodity', 'ERA5 → Price (r)', 'Model → ERA5 (r)', 'Model → Price (r)', 'p-value'].map((h) => (
                  <th key={h} style={{ padding: '9px 14px', textAlign: 'left', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', background: 'var(--surface)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {threeLinkProof.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--surface)', background: i % 2 === 1 ? 'var(--bg)' : 'var(--white)' }}>
                  <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--navy)' }}>{row.commodity}</td>
                  <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--positive)' }}>+{row.link1.toFixed(3)}</td>
                  <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--positive)' }}>+{row.link2.toFixed(3)}</td>
                  <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--positive)' }}>+{row.link3.toFixed(3)}</td>
                  <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{row.permP.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', maxWidth: '680px' }}>
          US Northeast HDD signal (Nov–Mar). OOS 2021–2023, n=48 winter weeks. p-value from non-parametric permutation test (10,000 draws). r² ≈ 0.09–0.23: the AI model&apos;s HDD forecast explains 9–23% of weekly winter return variance out-of-sample.
        </p>
      </section>

      <Divider />

      <DetailsAccordion title="Regime caveats & important notes">
        <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p>
            <strong style={{ color: 'var(--navy)' }}>Regime-dependent signals.</strong>{' '}
            2023 standalone energy correlation was weak (HO r=+0.016, RB r=−0.018). The 3-year combined
            significance is driven substantially by the 2021–2022 energy-crisis period. Evaluate current
            regime suitability before deployment.
          </p>
          <p>
            <strong style={{ color: 'var(--navy)' }}>Winter-only signal.</strong>{' '}
            Active weeks are limited to November through March, producing a modest trade count per season.
            Score=3 activation concentrates on the highest-confidence weeks — but also reduces the number of positions taken.
          </p>
          <p>
            <strong style={{ color: 'var(--navy)' }}>Signal calibration.</strong>{' '}
            Signals are calibrated to the model&apos;s own forecast distribution. Ribeon provides pre-calibrated,
            ready-to-use signal values — no buyer-side normalization required.
          </p>
        </div>
      </DetailsAccordion>

      <Divider />

      {/* Interactive data preview */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '8px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Data Preview
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '20px', lineHeight: 1.65 }}>
          Illustrative sample data — signals and region-to-commodity mapping for the current model configuration.
        </p>
        <WeatherDataPage />
      </section>

      <DatasetCTA
        heading="Ready to integrate Weather Commodity Signals?"
        subtext="Request sample signal data, discuss use cases for your commodity book, or review the full methodology."
      />

    </div>
  )
}
