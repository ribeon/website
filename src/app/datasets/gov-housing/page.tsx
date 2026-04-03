import Link from 'next/link'
import { GovHousingExplorer } from '@/components/data/GovHousingExplorer'
import { StatBar } from '@/components/StatBar'
import { SignalEvidenceCard } from '@/components/SignalEvidenceCard'
import { QuintileBarChart } from '@/components/charts/QuintileBarChart'
import { ICTimeSeriesChart } from '@/components/charts/ICTimeSeriesChart'
import {
  housingPermitICSeries,
  housingPermitQuintileReturns,
  homebuilderContrICSeries,
} from '@/lib/data/gov-housing-evidence'

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '36px 0' }} />
)

export default function GovHousingPage() {
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
          Federal Housing & Construction
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.5px' }}>
          2026 &nbsp;·&nbsp; 4,160 counties &nbsp;·&nbsp; 57 states &amp; territories &nbsp;·&nbsp; FY2010–2025
        </p>
      </div>

      {/* Hero */}
      <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '680px', marginBottom: '28px' }}>
        <p>
          Building permit acceleration and federal construction spending precede home price appreciation by one to four quarters. This dataset fuses $933B in federal housing spending with Census permits, LIHTC allocations, and SAM.gov pipeline into a signal panel across 4,160 counties — including a <strong style={{ color: 'var(--navy)' }}>countercyclical homebuilder signal</strong> derived from federal subsidy flows.
        </p>
      </div>

      <StatBar stats={[
        { label: 'Counties', value: '4,160' },
        { label: 'Metro areas', value: '917 MSAs' },
        { label: 'Permit IC (1Q)', value: '+0.097', subtitle: 't = 5.98', highlight: true },
        { label: 'Data sources', value: '7 fused' },
        { label: 'Homebuilder OOS hit', value: '68%', subtitle: 'contrarian signal' },
      ]} />

      {/* The Data */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '14px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          The Data
        </h2>
        <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '680px' }}>
          <p style={{ marginBottom: '12px' }}>
            Seven data sources fused into a single quarterly panel: USAspending.gov contracts (NAICS 236xxx new construction) and assistance (27 HUD/USDA programs including Section 8, CDBG, HOME, and USDA Rural Housing), SAM.gov forward procurement opportunities, Census BPS building permits, HUD LIHTC project allocations, Census CBSA metro crosswalk, and FEMA disaster declarations.
          </p>
          <p>
            CDBG-DR disaster grants surge 10–100× after major events, inflating spending metrics. 679 county-quarters are flagged and cleaned to trailing 4-quarter averages, ensuring signals reflect underlying housing market activity rather than disaster recovery.
          </p>
        </div>
      </section>

      <Divider />

      {/* Signals */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '10px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Signals — Geographic
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '20px', fontFamily: 'var(--font-mono)' }}>
          county × quarter &nbsp;·&nbsp; validated against Zillow ZHVI
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '840px', marginBottom: '32px' }}>
          <SignalEvidenceCard
            signalName="permit_sf_yoy"
            description="Single-family permit year-over-year momentum. Captures market acceleration — a county with 200 units vs. 150 last year reveals strengthening demand. Momentum predicts home prices; raw permit level captures county size."
            metrics={[
              { label: '1Q IC vs HPI', value: '+0.097', positive: true },
              { label: '1Q t-stat', value: '5.98', positive: true },
              { label: '4Q IC', value: '+0.112', positive: true },
              { label: '4Q t-stat', value: '6.89', positive: true },
            ]}
          />
          <SignalEvidenceCard
            signalName="construction_score"
            description="Composite new supply signal. Blends construction spending momentum, BPS permits, LIHTC new units, new construction intensity, and SAM.gov forward pipeline. Designed for RE private equity and REIT investors tracking physical supply pipeline."
            metrics={[
              { label: '1Q IC vs HPI', value: '+0.042', positive: true },
              { label: '1Q t-stat', value: '2.21', positive: true },
            ]}
          />
          <SignalEvidenceCard
            signalName="subsidy_flow_score"
            description="Federal grant and loan intensity. Captures HUD/USDA assistance flow by county — Section 8, CDBG, HOME programs. Important: federal subsidies are countercyclical — they concentrate in distressed markets, not booming ones. High subsidy flow indicates a stressed local market."
            metrics={[
              { label: '1Q IC vs HPI', value: '−0.011', negative: true },
              { label: 'Interpretation', value: 'Distress proxy', negative: true },
            ]}
          />
        </div>

        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '10px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Signals — Homebuilder Equity
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '20px', fontFamily: 'var(--font-mono)' }}>
          8 tickers × 64 quarters &nbsp;·&nbsp; footprint-weighted from 10-K segment disclosures
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '840px' }}>
          <SignalEvidenceCard
            signalName="hb_contrarian_index"
            description="Countercyclical homebuilder signal. Federal subsidy intensity reveals the absence of healthy private demand. Flipping the sign — low subsidy exposure — identifies builders positioned in the strongest private-demand markets (Sun Belt vs. distressed Northeast/DC markets). The only statistically significant OOS equity signal."
            metrics={[
              { label: 'OOS IC', value: '+0.130', positive: true },
              { label: 'OOS t-stat', value: '2.05', positive: true },
              { label: 'OOS Hit Rate', value: '68%', positive: true },
            ]}
          />
          <SignalEvidenceCard
            signalName="hb_alpha_index"
            description="Blend of 50% hb_contrarian_index + 50% hb_permit_value_index. Best OOS IC across the signal zoo. Combines the distress-avoidance signal with permit dollar value momentum as an ASP proxy."
            metrics={[
              { label: 'OOS IC', value: '+0.134', positive: true },
              { label: 'OOS Hit Rate', value: '59%', positive: true },
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
          <p style={{ marginBottom: '12px' }}>
            <strong style={{ color: 'var(--navy)' }}>Geographic channel:</strong> Permit acceleration is observable shortly after quarter end — before official home price indices update. Counties in the top permit momentum quintile appreciate ~3.5% over the following quarter vs. ~0.8% for the bottom quintile.
          </p>
          <p>
            <strong style={{ color: 'var(--navy)' }}>Homebuilder channel:</strong> Federal housing subsidies reveal distressed local markets. Builders with heavy footprint exposure to high-subsidy states (NVR in DC/MD, TOL in the Northeast) underperformed Sun Belt-focused builders (DHI in TX/FL, MTH in AZ) by a wide margin during 2020–2025. The contrarian index captures this dynamic with 68% OOS hit rate.
          </p>
        </div>
      </section>

      <Divider />

      {/* Statistical Evidence */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '22px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Statistical Evidence
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '32px', marginBottom: '32px' }}>
          <div>
            <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              permit_sf_yoy IC over time (vs. Zillow HPI)
            </p>
            <ICTimeSeriesChart
              data={housingPermitICSeries}
              meanIC={0.097}
              tStat={5.98}
            />
          </div>
          <div>
            <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              Quarterly HPI appreciation by permit quintile
            </p>
            <QuintileBarChart
              data={housingPermitQuintileReturns}
              yAxisLabel="Quarterly HPI (%)"
              formatMode="hpi"
            />
          </div>
        </div>

        <div>
          <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
            Homebuilder contrarian IC — OOS period begins 2020
          </p>
          <ICTimeSeriesChart
            data={homebuilderContrICSeries}
            meanIC={0.130}
            tStat={2.05}
          />
          <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>
            IS = pre-2020 (41 quarters) &nbsp;·&nbsp; OOS = 2020+ (22 quarters). OOS IC strengthens as Sun Belt vs. distressed-market divergence intensifies.
          </p>
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
            Top quintile counties on <code style={{ fontSize: '11px', color: 'var(--gold)' }}>permit_sf_yoy</code> appreciate <strong style={{ color: 'var(--navy)' }}>~3.5% per quarter</strong> vs. ~0.8% for the bottom quintile — a 2.7pp spread that persists across market regimes. The homebuilder contrarian signal identified the correct relative winner <strong style={{ color: 'var(--navy)' }}>68% of OOS quarters</strong>.
          </p>
          <p style={{ fontSize: '11px', color: 'var(--border)', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>
            Ribeon provides data, not financial advice. Strategy construction is the buyer&apos;s domain.
          </p>
        </div>
      </section>

      <Divider />

      {/* Interactive Demo */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '18px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Sample Data
        </h2>
        <GovHousingExplorer />
      </section>

    </div>
  )
}
