import Link from 'next/link'
import { StatBar } from '@/components/StatBar'
import { AtAGlance } from '@/components/AtAGlance'
import { DetailsAccordion } from '@/components/DetailsAccordion'
import { FlagshipSignalCard } from '@/components/FlagshipSignalCard'
import { DatasetCTA } from '@/components/DatasetCTA'
import { SignalLeadChart } from '@/components/charts/SignalLeadChart'
import { WeatherDataPage } from '@/components/WeatherDataPage'
import {
  threeLinkProof,
  atlasBacktestResults,
  atlasScore2Sharpes,
  atlasReferenceResults,
  atlasHddVsHoReturn,
} from '@/lib/data/weather-evidence'

const D = () => <div style={{ borderTop: '1px solid var(--border)', margin: '64px 0' }} />

export default function WeatherPage() {
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
        Weather Commodity Signals
      </h1>
      <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--muted)', maxWidth: '560px', marginBottom: '12px' }}>
        A 7-day AI weather forecast for US commodity regions,
        delivered <strong style={{ color: 'var(--navy)' }}>every Monday before market open</strong>.
      </p>
      <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--muted)', maxWidth: '560px', marginBottom: '36px' }}>
        Cold forecasts predict higher energy demand. The signal is statistically linked
        to that same week&apos;s commodity futures returns — no look-ahead.
      </p>

      <StatBar stats={[
        { label: 'CORN Sharpe (OOS)', value: '4.66', highlight: true },
        { label: 'NE HDD → HO (3yr OOS)', value: '+0.444' },
        { label: 'Cadence', value: 'Weekly' },
      ]} />

      <AtAGlance items={[
        { label: 'Signal', value: '7-day NE HDD forecast anomaly, z-scored' },
        { label: 'Validated commodities', value: 'HO, RB, CL, CORN (winter, Nov–Mar)' },
        { label: 'Regions covered', value: '7 commodity-producing regions' },
        { label: 'OOS period tested', value: '2021–2024 (154 weeks)' },
      ]} />

      <D />

      {/* Flagship signal */}
      <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '20px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
        Primary Signal
      </h2>

      <FlagshipSignalCard
        badge="Flagship"
        name="NE HDD anomaly → Corn"
        description="When the AI model forecasts a colder-than-normal week in the US Northeast, Corn futures tend to rise. Cold winters elevate energy costs, which transmit into agricultural production — connecting a Monday weather forecast to a grain price signal before the market opens."
        metrics={[
          { label: 'Sharpe (score=3, OOS)', value: '4.66', positive: true },
          { label: 'Directional accuracy', value: '79%', positive: true },
          { label: 'Trades (OOS 154wk)', value: '19' },
        ]}
      />

      <div style={{ maxWidth: '560px', marginTop: '32px' }}>
        <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
          NE HDD anomaly vs Heating Oil weekly return — OOS winter weeks
        </p>
        <SignalLeadChart
          data={atlasHddVsHoReturn}
          signalLabel="NE HDD z-score"
          priceLabel="HO return (%)"
          caption="AI model 7-day NE HDD anomaly (gold) vs Heating Oil Mon→Mon return (navy). 2021–2022 OOS winter weeks. Signal available before market open — no look-ahead."
        />
      </div>

      <D />

      {/* Why it works */}
      <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
        Why It Works
      </h2>
      <p style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '600px' }}>
        Cold weather → higher heating fuel demand → elevated energy prices → higher grain production costs.
        Each step is physically causal and statistically verified.
        The AI model&apos;s 7-day temperature forecast has r&nbsp;=&nbsp;+0.894 correlation with ERA5
        reanalysis — translating high forecast accuracy into a commodity signal that arrives
        before Monday open.
      </p>

      <D />

      {/* Accordion: all validation details */}
      <DetailsAccordion title="Full backtest results, all signals, causal proof, and technical details">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Three-link proof */}
          <div>
            <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
              Three-link causal proof — OOS 2021–2023, n=48 winter weeks
            </p>
            <div style={{ overflowX: 'auto', border: '1px solid var(--border)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Commodity', 'ERA5→Price (r)', 'Model→ERA5 (r)', 'Model→Price (r)', 'Perm p'].map((h) => (
                      <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', background: 'var(--surface)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {threeLinkProof.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--surface)', background: i % 2 ? 'var(--bg)' : 'var(--white)' }}>
                      <td style={{ padding: '7px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--navy)' }}>{row.commodity}</td>
                      <td style={{ padding: '7px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--positive)' }}>+{row.link1.toFixed(3)}</td>
                      <td style={{ padding: '7px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--positive)' }}>+{row.link2.toFixed(3)}</td>
                      <td style={{ padding: '7px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--positive)' }}>+{row.link3.toFixed(3)}</td>
                      <td style={{ padding: '7px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{row.permP.toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>
              Permutation p: non-parametric label-shuffle test (10,000 draws).
            </p>
          </div>

          {/* Score=3 backtest */}
          <div>
            <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
              Activation-gated backtest — score=3 (all gates active), OOS 2021-01-04 → 2024-02-02, 154 weeks
            </p>
            <div style={{ overflowX: 'auto', border: '1px solid var(--border)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Signal', 'Sharpe', 'Hit Rate', 'Trades'].map((h) => (
                      <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', background: 'var(--surface)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {atlasBacktestResults.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--surface)', background: i % 2 ? 'var(--bg)' : 'var(--white)' }}>
                      <td style={{ padding: '7px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{row.signal}</td>
                      <td style={{ padding: '7px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--positive)' }}>{row.sharpe.toFixed(2)}</td>
                      <td style={{ padding: '7px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--navy)' }}>{row.hitRate}%</td>
                      <td style={{ padding: '7px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{row.trades}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>
              Bootstrap 5th percentile: CORN 2.33 (lower bound comfortably above 2.0) · RB 0.76 (positive)
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
                    {['Signal', 'Sharpe (score=3)', 'Sharpe (score≥2)', 'Note'].map((h) => (
                      <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', background: 'var(--surface)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {atlasScore2Sharpes.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--surface)', background: i % 2 ? 'var(--bg)' : 'var(--white)' }}>
                      <td style={{ padding: '7px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{row.signal}</td>
                      <td style={{ padding: '7px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--positive)' }}>{row.sharpeScore3.toFixed(2)}</td>
                      <td style={{ padding: '7px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--positive)' }}>{row.sharpeScore2.toFixed(2)}</td>
                      <td style={{ padding: '7px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{row.read}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2022 reference */}
          <div>
            <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
              2022 strict OOS reference — no activation filter, lag-0
            </p>
            <div style={{ overflowX: 'auto', border: '1px solid var(--border)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Signal', 'Sharpe', 'Hit Rate', 'Trades'].map((h) => (
                      <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', background: 'var(--surface)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {atlasReferenceResults.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--surface)', background: i % 2 ? 'var(--bg)' : 'var(--white)' }}>
                      <td style={{ padding: '7px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{row.signal}</td>
                      <td style={{ padding: '7px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--positive)' }}>{row.sharpe.toFixed(2)}</td>
                      <td style={{ padding: '7px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--navy)' }}>{row.hitRate}%</td>
                      <td style={{ padding: '7px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{row.trades}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>
                n=18 winter weeks per signal, no activation filter. Raw signal strength in the 2021–2022 energy-crisis regime.
              </p>
            </div>
          </div>

          {/* Regime caveats */}
          <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '600px' }}>
            <p style={{ fontWeight: 600, color: 'var(--navy)', marginBottom: '10px', fontSize: '12px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px' }}>Important caveats</p>
            <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong style={{ color: 'var(--navy)' }}>Regime-dependent.</strong> 2023 standalone energy correlation was weak (HO r=+0.016). 3-year significance is driven substantially by the 2021–2022 energy-crisis period. Evaluate regime suitability before deployment.</li>
              <li><strong style={{ color: 'var(--navy)' }}>Winter-only.</strong> Active weeks limited to Nov–Mar. Score=3 concentrates on the highest-confidence weeks — which reduces trade count per season.</li>
              <li><strong style={{ color: 'var(--navy)' }}>Calibration required.</strong> Signals are z-scored to the model&apos;s forecast distribution. Ribeon delivers pre-calibrated values — no buyer-side normalization needed.</li>
            </ul>
          </div>

          {/* Interactive map */}
          <div>
            <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
              Data preview — illustrative sample signals
            </p>
            <WeatherDataPage />
          </div>

        </div>
      </DetailsAccordion>

      <DatasetCTA
        heading="Interested in Weather Commodity Signals?"
        subtext="Get in touch to discuss use cases, sample data, or coverage for your commodity book."
      />

    </div>
  )
}
