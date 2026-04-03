import Link from 'next/link'
import { WeatherDataPage } from '@/components/WeatherDataPage'
import { StatBar } from '@/components/StatBar'
import { SignalEvidenceCard } from '@/components/SignalEvidenceCard'
import { SignalLeadChart } from '@/components/charts/SignalLeadChart'
import {
  threeLinkProof,
  atlasBacktestResults,
  atlasHddVsHoReturn,
} from '@/lib/data/weather-evidence'

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '36px 0' }} />
)

export default function WeatherPage() {
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
          Weather Commodity Signals
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.5px' }}>
          2026 &nbsp;·&nbsp; 7 regions &nbsp;·&nbsp; weekly &nbsp;·&nbsp; NVIDIA Atlas AI forecast
        </p>
      </div>

      {/* Hero */}
      <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '680px', marginBottom: '28px' }}>
        <p>
          NVIDIA Atlas initializes every Monday morning. The 7-day US Northeast HDD forecast is available before market open — and is <strong style={{ color: 'var(--navy)' }}>positively correlated with that same week&apos;s energy and grain futures returns</strong>. A genuine leading indicator with a validated causal chain: weather drives prices, Atlas forecasts weather, therefore Atlas forecasts prices.
        </p>
      </div>

      <StatBar stats={[
        { label: 'Validated signals', value: 'HO, RB, CL, CORN' },
        { label: 'Atlas → HO r', value: '+0.533', subtitle: 'perm p = 0.001', highlight: true },
        { label: 'Atlas → ERA5 r', value: '+0.894', subtitle: 'forecast skill' },
        { label: 'OOS Sharpe', value: '4.1 – 5.2', subtitle: '2022 backtest' },
        { label: 'Update cadence', value: 'Weekly' },
      ]} />

      {/* The Data */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '14px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          The Data
        </h2>
        <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '680px' }}>
          <p style={{ marginBottom: '12px' }}>
            NVIDIA Atlas is a transformer-based AI weather model pre-trained on ERA5 reanalysis (1979–2019). It initializes every Monday from ERA5 initial conditions and produces a 7-day deterministic forecast for temperature and precipitation across 7 commodity regions — available before market open.
          </p>
          <p>
            Signals compare the Atlas forecast against a calibration-period climatology (2020–2021) to measure anomaly magnitude and direction. The validated period covers 2021–2022 (104 weekly hindcasts) — fully out-of-training-distribution for Atlas.
          </p>
        </div>

        <div style={{ overflowX: 'auto', marginTop: '20px', marginBottom: '4px' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
            <tbody>
              {[
                ['AI model', 'NVIDIA Atlas (pre-trained ERA5 1979–2019)'],
                ['Forecast horizon', '7 days (Mon initialization → Sun)'],
                ['Return window', 'Monday open → next Monday open'],
                ['Validated period', 'OOS 2021–2022 (104 weekly hindcasts)'],
                ['Regions', '7 (US Northeast, Midwest, South, Southeast, Cornbelt, Pop-weighted, Brazil Minas)'],
                ['Commodities', '12 (NG, HO, RB, CL, CORN, ZS, ZW, CT, COFFEE, CC, SB, OJ)'],
                ['Validated signals', 'NE HDD → HO, RB, CL, CORN (winter)'],
              ].map(([k, v]) => (
                <tr key={k} style={{ borderBottom: '1px solid var(--surface)' }}>
                  <td style={{ padding: '5px 16px 5px 0', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{k}</td>
                  <td style={{ padding: '5px 0', color: 'var(--navy)' }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
            signalName="hdd_anomaly_z"
            description="US Northeast Heating Degree Day z-score. Atlas 7-day HDD forecast anomaly, z-scored against Atlas's own 2021 distribution (not ERA5 — Atlas systematically under-forecasts NE HDD by ~7%, making Atlas-native calibration essential). The only validated Atlas signal. Positive anomaly = colder-than-normal week ahead → higher demand for heating oil, gasoline, crude."
            metrics={[
              { label: 'HO r (OOS)', value: '+0.533', positive: true },
              { label: 'RB r (OOS)', value: '+0.502', positive: true },
              { label: 'CL r (OOS)', value: '+0.426', positive: true },
              { label: 'CORN r (OOS)', value: '+0.486', positive: true },
            ]}
          />
          <SignalEvidenceCard
            signalName="hdd / cdd / gdd"
            description="Raw weekly sums: Heating Degree Days max(0, 18°C − T_mean), Cooling Degree Days max(0, T_mean − 18°C), Growing Degree Days max(0, min(T_mean, 30°C) − 10°C). All derived from Atlas 7-day temperature forecast. HDD/CDD anomalies drive energy demand; GDD measures crop heat accumulation. Not independently validated via the transitive proof framework — evidence from ERA5 historical only."
            metrics={[
              { label: 'Validated', value: 'HDD anomaly only' },
            ]}
          />
          <SignalEvidenceCard
            signalName="precip_mm / precip_anom_mm"
            description="Weekly total precipitation and deviation from climatology. Present in the dataset for ERA5 historical use. Atlas does not have 7-day precipitation forecast skill — precipitation signals should not be used as Atlas-forward indicators."
            metrics={[
              { label: 'Atlas skill', value: 'None (ERA5 only)', negative: true },
            ]}
          />
        </div>
      </section>

      <Divider />

      {/* How It Works */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          How It Works: The Three-Link Proof
        </h2>
        <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '680px', marginBottom: '24px' }}>
          <p style={{ marginBottom: '12px' }}>
            The validation uses a transitive causal chain. If weather drives prices (Link 1) and Atlas accurately forecasts weather (Link 2), then Atlas forecasts should predict prices (Link 3). Each link is independently significant at p &lt; 0.01 — the transitive inference is testable, not assumed.
          </p>
          <p>
            <strong style={{ color: 'var(--navy)' }}>Why Northeast HDD?</strong> Demand swings more per degree-anomaly in the Northeast than Southern regions. NE HDD drives heating oil and gasoline demand directly, and Corn via energy input and transport costs — confirmed by a regional scan across all 7 regions.
          </p>
        </div>

        {/* Three-link table */}
        <div style={{ overflowX: 'auto', border: '1px solid var(--border)', marginBottom: '32px', maxWidth: '780px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Commodity', 'Link 1: ERA5 → Price', 'Link 2: Atlas → ERA5', 'Link 3: Atlas → Price', 'Perm p'].map((h) => (
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
                  <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--positive)' }}>+{row.link1.toFixed(3)}**</td>
                  <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--positive)' }}>+{row.link2.toFixed(3)}**</td>
                  <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--positive)' }}>+{row.link3.toFixed(3)}**</td>
                  <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{row.permP.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: '24px' }}>
          Signal: US Northeast HDD / Winter (Nov–Mar). OOS 2021+2022, n=36 per commodity. Permutation p = non-parametric label-shuffle test (10,000 draws).
        </p>
        <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.75, maxWidth: '680px', marginBottom: '24px' }}>
          <strong style={{ color: 'var(--navy)' }}>Variance explained:</strong> r² ≈ 0.15–0.28 across the 4 validated signals. Atlas HDD forecasts explain 15–28% of weekly winter return variance OOS. Directional accuracy: P(signal and return move in same direction) ≈ 63–66%.
        </p>

        {/* Signal vs return chart */}
        <div style={{ maxWidth: '680px' }}>
          <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
            Atlas NE HDD z-score vs Heating Oil weekly return — OOS winter weeks 2021+2022
          </p>
          <SignalLeadChart
            data={atlasHddVsHoReturn}
            signalLabel="NE HDD z-score"
            priceLabel="HO return (%)"
            caption="Atlas 7-day NE HDD anomaly (gold) vs Heating Oil Mon→Mon return (navy dashed). 36 OOS winter weeks, r = +0.533. Signal available Monday before open — no look-ahead."
          />
        </div>
      </section>

      <Divider />

      {/* Backtest Validation */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '14px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Backtest Validation
        </h2>
        <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.75, maxWidth: '680px', marginBottom: '20px' }}>
          <p>
            Six strategy types evaluated on strict 2022 OOS data. Best result: atlas-native z-score, lag-0. Atlas captures 100–122% of the ERA5 oracle Sharpe — the limiting factor is the weather-price relationship, not forecast quality.
          </p>
        </div>

        <div style={{ overflowX: 'auto', border: '1px solid var(--border)', marginBottom: '20px', maxWidth: '820px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Signal', 'Sharpe (lag-0)', '95% CI', 'Hit Rate', 'Trades', 'Oracle Sharpe'].map((h) => (
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
                  <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>[{row.ciLow.toFixed(2)}, {row.ciHigh.toFixed(2)}]</td>
                  <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--navy)' }}>{row.hitRate}%</td>
                  <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{row.trades}</td>
                  <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{row.oracleSharpe.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.75, maxWidth: '680px', padding: '16px 20px', border: '1px solid var(--border)', background: 'var(--surface)' }}>
          <p style={{ marginBottom: '10px', fontWeight: 600, color: 'var(--navy)', fontSize: '12px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Important Caveats
          </p>
          <ul style={{ paddingLeft: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li><strong style={{ color: 'var(--navy)' }}>2022 was an extraordinary energy year.</strong> The Russia-Ukraine war caused a major HO/RB/CL price shock. Energy Sharpe ratios should be re-validated on 2023–2024 data before live deployment. Corn is less affected by the geopolitical shock.</li>
            <li><strong style={{ color: 'var(--navy)' }}>N = 18 trades per signal</strong> (winter weeks in 2022 only). CI lower bounds confirm robustness under the pessimistic bootstrap, but the sample is small.</li>
            <li><strong style={{ color: 'var(--navy)' }}>Atlas-native z-scoring is required.</strong> ERA5-calibrated thresholds misfire because Atlas systematically under-forecasts NE HDD by ~7%. Using ERA5 climatology turns a positive-Sharpe strategy negative (HO lag-0 ERA5 z-score: Sharpe −0.09).</li>
          </ul>
          <p style={{ fontSize: '11px', color: 'var(--border)', fontFamily: 'var(--font-mono)', marginTop: '12px' }}>
            Ribeon provides data, not financial advice. Strategy construction is the buyer&apos;s domain.
          </p>
        </div>
      </section>

      <Divider />

      {/* Interactive Demo */}
      <WeatherDataPage />

    </div>
  )
}
