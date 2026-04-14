import Link from 'next/link'
import { StatBar } from '@/components/StatBar'
import { SignalEvidenceCard } from '@/components/SignalEvidenceCard'
import { QuintileBarChart } from '@/components/charts/QuintileBarChart'
import { ICTimeSeriesChart } from '@/components/charts/ICTimeSeriesChart'
import {
  housingPermitICSeries,
  housingPermitQuintileReturns,
  homebuilderSectorAdaptiveICSeries,
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
          2026 &nbsp;·&nbsp; 3,135 counties &nbsp;·&nbsp; 911 metro areas &nbsp;·&nbsp; FY2010–2025
        </p>
      </div>

      {/* Hero */}
      <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '680px', marginBottom: '28px' }}>
        <p>
          Building permit acceleration precedes home price appreciation by one to four quarters. This dataset fuses $933B in federal housing spending with Census permits, LIHTC allocations, and SAM.gov pipeline into a signal panel across 3,135 counties and 911 metro areas — including a <strong style={{ color: 'var(--navy)' }}>sector-adaptive homebuilder equity signal</strong> mapped to public homebuilder footprints.
        </p>
      </div>

      <StatBar stats={[
        { label: 'Counties', value: '3,135' },
        { label: 'Metro areas', value: '911 MSAs' },
        { label: 'Permit IC (1Q)', value: '+0.099', subtitle: 't = 5.91', highlight: true },
        { label: 'Data sources', value: '7 fused' },
        { label: 'Homebuilder OOS hit', value: '65%', subtitle: 'sector-adaptive signal' },
      ]} />

      {/* The Data */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '14px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          The Data
        </h2>
        <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '680px' }}>
          <p style={{ marginBottom: '12px' }}>
            Seven authoritative data sources fused into a single quarterly panel: USAspending.gov contracts and assistance programs (HUD and USDA housing initiatives), SAM.gov forward procurement opportunities, Census building permit data, LIHTC project allocations, Census CBSA metro crosswalk, and FEMA disaster declarations.
          </p>
          <p>
            Disaster-related grant activity is identified and adjusted to prevent event-driven distortions from inflating underlying housing metrics, ensuring signals reflect genuine market conditions rather than recovery spending.
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
            description="Single-family permit year-over-year momentum. Captures market acceleration — a county with 200 units vs. 150 last year reveals strengthening demand. The strongest standalone predictor of home price appreciation. Momentum predicts prices; raw permit level captures county size."
            metrics={[
              { label: '1Q IC vs HPI', value: '+0.099', positive: true },
              { label: '1Q t-stat', value: '5.91', positive: true },
              { label: '4Q IC', value: '+0.129', positive: true },
              { label: '4Q t-stat', value: '6.89', positive: true },
            ]}
          />
          <SignalEvidenceCard
            signalName="construction_score"
            description="Composite supply signal. Blends permit momentum (25%), construction spending YoY (25%), LIHTC new units (20%), new construction intensity (15%), and SAM.gov forward pipeline (15%). Strengthened materially after switching the permit component from raw level to YoY momentum."
            metrics={[
              { label: '1Q IC vs HPI', value: '+0.052', positive: true },
              { label: '1Q t-stat', value: '6.53', positive: true },
              { label: '4Q IC', value: '+0.067', positive: true },
              { label: '4Q t-stat', value: '7.47', positive: true },
            ]}
          />
          <SignalEvidenceCard
            signalName="subsidy_flow_score"
            description="Federal grant and loan intensity. Captures HUD/USDA assistance flow by county — Section 8, CDBG, HOME programs. Federal subsidies are countercyclical — they concentrate in distressed markets, not booming suburbs. Useful as a market distress indicator; not a price appreciation predictor."
            metrics={[
              { label: '1Q IC vs HPI', value: '+0.004', positive: false },
              { label: 'Interpretation', value: 'Distress proxy' },
            ]}
          />
        </div>

        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '10px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Signals — Homebuilder Equity
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '20px', fontFamily: 'var(--font-mono)' }}>
          16 tradable housing-sensitive names &nbsp;·&nbsp; footprint-weighted from point-in-time 10-K disclosures
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '840px' }}>
          <SignalEvidenceCard
            signalName="hb_sector_adaptive_index"
            description="Sector-aware composite: for homebuilders, 40% monthly permit YoY + 40% permit value + 20% price tier; for building materials names, 70% monthly permit YoY + 30% permit value. Maps monthly BPS state-level permit flow into each ticker's geographic footprint. Current lead OOS return signal."
            metrics={[
              { label: 'OOS IC (16 names)', value: '+0.204', positive: true },
              { label: 'OOS t-stat', value: '4.25', positive: true },
              { label: 'OOS Hit Rate', value: '65%', positive: true },
              { label: 'OOS period', value: '2020Q1–2025Q3' },
            ]}
          />
          <SignalEvidenceCard
            signalName="hb_permit_yoy_index"
            description="Monthly-state BPS permit YoY rank mapped into each ticker's geographic footprint. Strongest pure permit-flow equity signal. Sector-agnostic; use as a complement to hb_sector_adaptive_index or as a standalone permit momentum proxy."
            metrics={[
              { label: 'OOS IC (16 names)', value: '+0.180', positive: true },
              { label: 'OOS t-stat', value: '3.42', positive: true },
              { label: 'OOS Hit Rate', value: '48%', positive: true },
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
            <strong style={{ color: 'var(--navy)' }}>Geographic channel:</strong> Permit acceleration is observable shortly after quarter end — before official home price indices update. Counties in the top permit momentum quintile appreciate ~3.5% over the following quarter vs. ~0.8% for the bottom quintile. The 4-quarter IC (+0.129) is stronger than 1-quarter (+0.099), indicating the permit supply signal strengthens with a longer return horizon.
          </p>
          <p>
            <strong style={{ color: 'var(--navy)' }}>Homebuilder channel:</strong> The sector-adaptive index maps monthly BPS permit flow into each homebuilder&apos;s state-weighted footprint, applying sector-specific transmission weights. It has produced OOS IC +0.204 (t=4.25) across 16 tradable housing-sensitive names from 2020Q1 through 2025Q3 — 23 quarters of clean out-of-sample validation.
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
              meanIC={0.099}
              tStat={5.91}
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
            hb_sector_adaptive_index IC — OOS period begins 2020Q1
          </p>
          <ICTimeSeriesChart
            data={homebuilderSectorAdaptiveICSeries}
            meanIC={0.204}
            tStat={4.25}
          />
          <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>
            In-sample (pre-2020) · Out-of-sample (2020Q1–2025Q3, 23 quarters). OOS IC +0.204, t=4.25 across 16 tradable housing-sensitive names.
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
            Top quintile counties on <code style={{ fontSize: '11px', color: 'var(--gold)' }}>permit_sf_yoy</code> appreciate <strong style={{ color: 'var(--navy)' }}>~3.5% per quarter</strong> vs. ~0.8% for the bottom quintile — a 2.7pp spread that persists across market regimes. The IC strengthens at 4-quarter horizon (4Q IC +0.129 vs. 1Q IC +0.099). The <code style={{ fontSize: '11px', color: 'var(--gold)' }}>hb_sector_adaptive_index</code> identified the correct relative homebuilder winner <strong style={{ color: 'var(--navy)' }}>65% of OOS quarters</strong> across 23 quarters (2020Q1–2025Q3).
          </p>
          <p style={{ fontSize: '11px', color: 'var(--border)', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>
            Ribeon provides data, not financial advice. Strategy construction is the buyer&apos;s domain.
          </p>
        </div>
      </section>

    </div>
  )
}
