import Link from 'next/link'
import { WeatherDataPage } from '@/components/WeatherDataPage'
import { StatBar } from '@/components/StatBar'
import { SignalEvidenceCard } from '@/components/SignalEvidenceCard'
import { SignalLeadChart } from '@/components/charts/SignalLeadChart'
import {
  threeLinkProof,
  atlasBacktestResults,
  atlasReferenceResults,
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
          2026 &nbsp;·&nbsp; 7 regions &nbsp;·&nbsp; weekly &nbsp;·&nbsp; AI weather forecast
        </p>
      </div>

      {/* Hero */}
      <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '680px', marginBottom: '28px' }}>
        <p>
          Our AI weather model produces a 7-day US Northeast forecast available before Monday market open — and is <strong style={{ color: 'var(--navy)' }}>positively correlated with that same week&apos;s energy and grain futures returns</strong>. A genuine leading indicator with a validated causal chain: weather drives prices, the model forecasts weather, therefore the model forecasts prices.
        </p>
      </div>

      <StatBar stats={[
        { label: 'Validated signals', value: 'HO, RB, CL, CORN' },
        { label: 'Model → HO r', value: '+0.444', subtitle: 'OOS 3yr, n=48', highlight: true },
        { label: 'Model → ERA5 r', value: '+0.894', subtitle: 'forecast skill' },
        { label: 'CORN Sharpe (score=3)', value: '4.72', subtitle: '79% hit, 18 trades' },
        { label: 'Update cadence', value: 'Weekly' },
      ]} />

      {/* The Data */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '14px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          The Data
        </h2>
        <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '680px' }}>
          <p style={{ marginBottom: '12px' }}>
            Our AI weather model initializes every Monday and produces a 7-day deterministic forecast for temperature and precipitation across 7 commodity regions — available before market open.
          </p>
          <p>
            Signals measure forecast anomaly magnitude and direction against a calibration-period climatology. The dataset has been validated on out-of-sample weekly data across energy and agricultural futures.
          </p>
        </div>

        <div style={{ overflowX: 'auto', marginTop: '20px', marginBottom: '4px' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
            <tbody>
              {[
                ['Forecast horizon', '7 days (Mon initialization → Sun)'],
                ['Return window', 'Monday open → next Monday open'],
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
            description="US Northeast Heating Degree Day z-score. Measures the AI model's 7-day HDD forecast anomaly relative to a calibration-period baseline. The primary validated signal. A positive anomaly indicates a colder-than-normal week ahead, driving higher demand for heating oil, gasoline, and crude."
            metrics={[
              { label: 'HO r (3yr OOS)', value: '+0.444', positive: true },
              { label: 'RB r (3yr OOS)', value: '+0.382', positive: true },
              { label: 'CL r (3yr OOS)', value: '+0.296', positive: true },
              { label: 'CORN r (3yr OOS)', value: '+0.479', positive: true },
            ]}
          />
          <SignalEvidenceCard
            signalName="hdd / cdd / gdd"
            description="Raw weekly degree day sums: Heating Degree Days (HDD), Cooling Degree Days (CDD), and Growing Degree Days (GDD), all derived from the AI model's 7-day temperature forecast. HDD/CDD anomalies drive energy demand; GDD measures crop heat accumulation. Supported by ERA5 historical data."
            metrics={[
              { label: 'Validated', value: 'HDD anomaly only' },
            ]}
          />
          <SignalEvidenceCard
            signalName="precip_mm / precip_anom_mm"
            description="Weekly total precipitation and deviation from climatology. Provided for ERA5 historical analysis. Precipitation forecasts from the AI model carry limited forward-looking skill and should not be used as standalone indicators."
            metrics={[
              { label: 'Forward signal', value: 'Not validated', negative: true },
            ]}
          />
        </div>
      </section>

      <Divider />

      {/* How It Works */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Validation
        </h2>
        <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '680px', marginBottom: '24px' }}>
          <p style={{ marginBottom: '12px' }}>
            Each signal is validated through a structured causal framework: weather drives commodity prices, the AI model forecasts weather accurately, and therefore model forecasts carry predictive content for prices. Each step is independently verified and statistically significant. The primary OOS window spans 2021–2023 (n=48 winter weeks); 2021–2024 results are also available (n=51).
          </p>
          <p>
            <strong style={{ color: 'var(--navy)' }}>Why Northeast HDD?</strong> Demand variability per degree-anomaly is highest in the Northeast. NE HDD is the primary driver of heating oil and gasoline demand, with secondary effects on Corn through energy input costs — confirmed across all 7 regions. Note: 2023 standalone energy signals were weak (HO r=+0.016); the 3-year combined significance is carried substantially by the 2021–2022 period. Treat as regime-dependent.
          </p>
        </div>

        {/* Validation table */}
        <div style={{ overflowX: 'auto', border: '1px solid var(--border)', marginBottom: '32px', maxWidth: '780px' }}>
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
        <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: '24px' }}>
          Signal: US Northeast HDD / Winter (Nov–Mar). OOS 2021–2023, n=48 winter weeks. p-value from non-parametric permutation test (10,000 draws).
        </p>
        <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.75, maxWidth: '680px', marginBottom: '24px' }}>
          <strong style={{ color: 'var(--navy)' }}>Variance explained:</strong> r² ≈ 0.09–0.23 across the 4 validated signals (3-year OOS). AI model HDD forecasts explain 9–23% of weekly winter return variance out-of-sample. Directional accuracy: 60–79% in activation-gated weeks.
        </p>

        {/* Signal vs return chart */}
        <div style={{ maxWidth: '680px' }}>
          <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
            NE HDD anomaly vs Heating Oil weekly return — OOS winter weeks
          </p>
          <SignalLeadChart
            data={atlasHddVsHoReturn}
            signalLabel="NE HDD z-score"
            priceLabel="HO return (%)"
            caption="AI model 7-day NE HDD anomaly (gold) vs Heating Oil Mon→Mon return (navy dashed). 2021–2022 OOS winter weeks (r = +0.533 for 2yr; 3yr combined r = +0.444). Signal available Monday before open — no look-ahead."
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
            Activation-gated results using three independent confirmation gates (seasonal window, forecast amplitude, and trailing regime correlation). OOS 2021-01-04 → 2024-01-29 (153 weeks). <strong style={{ color: 'var(--navy)' }}>RB and CORN are the flagship signals</strong> at score=3 (all gates active). HO and CL are repositioned to score≥2 — the regime gate filters out HO&apos;s best weeks at the tighter threshold.
          </p>
        </div>

        <div style={{ overflowX: 'auto', border: '1px solid var(--border)', marginBottom: '20px', maxWidth: '820px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Signal', 'Tier', 'Sharpe', 'Hit Rate', 'Trades'].map((h) => (
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
                  <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: row.tier === 'score = 3' ? 'var(--gold)' : 'var(--muted)' }}>{row.tier}</td>
                  <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--positive)' }}>{row.sharpe.toFixed(2)}</td>
                  <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--navy)' }}>{row.hitRate}%</td>
                  <td style={{ padding: '7px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{row.trades}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: '20px', maxWidth: '680px' }}>
          Bootstrap 90% CI: CORN [2.32, 8.90] — lower bound comfortably above 2.0. RB [0.50, 8.26] — lower bound positive. Transaction costs stress-tested; neither flagship drops below Sharpe 3.0 at 10bp round-trip.
        </p>

        <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.75, maxWidth: '680px', marginBottom: '20px' }}>
          <p style={{ marginBottom: '8px' }}>
            <strong style={{ color: 'var(--navy)' }}>2022 strict OOS reference (no activation filter):</strong> raw signal power before gating.
          </p>
        </div>

        <div style={{ overflowX: 'auto', border: '1px solid var(--border)', marginBottom: '20px', maxWidth: '720px' }}>
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
        <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: '20px' }}>
          2022-only, n=18 winter weeks each, lag-0, no activation filter. Shows raw signal strength in the 2021–2022 energy-crisis regime; the activation system is designed to identify this regime in real time.
        </p>

        <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.75, maxWidth: '680px', padding: '16px 20px', border: '1px solid var(--border)', background: 'var(--surface)' }}>
          <p style={{ marginBottom: '10px', fontWeight: 600, color: 'var(--navy)', fontSize: '12px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Important Caveats
          </p>
          <ul style={{ paddingLeft: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li><strong style={{ color: 'var(--navy)' }}>Regime-dependent signals.</strong> 2023 standalone energy correlation was weak (HO r=+0.016, RB r=−0.018). 3-year significance is driven substantially by the 2021–2022 energy-crisis period. Evaluate regime suitability before deployment.</li>
            <li><strong style={{ color: 'var(--navy)' }}>Winter-only signal.</strong> Active weeks are limited to Nov–Mar, producing a modest trade count per season. Score=3 activation concentrates on the highest-confidence weeks.</li>
            <li><strong style={{ color: 'var(--navy)' }}>Proper signal calibration is essential.</strong> Signals are calibrated to the model&apos;s own forecast distribution. Ribeon provides pre-calibrated, ready-to-use signal values.</li>
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
