import Link from 'next/link'
import { StatBar } from '@/components/StatBar'
import { SignalEvidenceCard } from '@/components/SignalEvidenceCard'
import { QuintileBarChart } from '@/components/charts/QuintileBarChart'
import { ICTimeSeriesChart } from '@/components/charts/ICTimeSeriesChart'
import { AtAGlance } from '@/components/AtAGlance'
import { DetailsAccordion } from '@/components/DetailsAccordion'
import { FlagshipSignalCard } from '@/components/FlagshipSignalCard'
import { DatasetCTA } from '@/components/DatasetCTA'
import {
  housingPermitICSeries,
  housingPermitQuintileReturns,
  homebuilderSectorAdaptiveICSeries,
} from '@/lib/data/gov-housing-evidence'

const D = () => <div style={{ borderTop: '1px solid var(--border)', margin: '64px 0' }} />

export default function GovHousingPage() {
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
        Federal Housing &amp; Construction
      </h1>
      <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--muted)', maxWidth: '560px', marginBottom: '12px' }}>
        Building permit momentum mapped across <strong style={{ color: 'var(--navy)' }}>3,135 US counties</strong> — and into 16 tradable homebuilder equities.
      </p>
      <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--muted)', maxWidth: '560px', marginBottom: '36px' }}>
        Permit acceleration precedes home price appreciation by one to four quarters,
        and is observable before official price indices update.
      </p>

      <StatBar stats={[
        { label: 'Counties covered', value: '3,135' },
        { label: 'Permit IC (1Q)', value: '+0.099', subtitle: 't = 5.91', highlight: true },
        { label: 'Homebuilder OOS hit', value: '65%' },
      ]} />

      <AtAGlance items={[
        { label: 'Geographic panel', value: '3,135 counties, 911 MSAs (FY2010–2025)' },
        { label: 'Data sources', value: '7 fused: Census, USAspending, LIHTC, SAM.gov, FEMA' },
        { label: 'Equity coverage', value: '16 homebuilder and building materials names' },
        { label: 'Validation', value: 'Geographic vs. Zillow ZHVI · Equity OOS 2020Q1–2025Q3' },
      ]} />

      <D />

      {/* Flagship signal */}
      <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '20px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
        Primary Signal
      </h2>

      <FlagshipSignalCard
        badge="Flagship"
        name="permit_sf_yoy"
        description="Year-over-year change in single-family building permits. Counties with rising permit counts reveal strengthening demand before it appears in home prices — typically one to four quarters ahead. The signal has been validated against Zillow ZHVI across all 3,135 US counties."
        metrics={[
          { label: '1Q IC vs HPI', value: '+0.099', positive: true },
          { label: '1Q t-stat', value: '5.91', positive: true },
          { label: '4Q IC', value: '+0.129', positive: true },
        ]}
      />

      <div style={{ maxWidth: '560px', marginTop: '32px' }}>
        <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
          Quarterly HPI appreciation by permit_sf_yoy quintile
        </p>
        <QuintileBarChart
          data={housingPermitQuintileReturns}
          yAxisLabel="Quarterly HPI (%)"
          formatMode="hpi"
        />
        <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.7, marginTop: '16px' }}>
          Top quintile counties appreciate <strong style={{ color: 'var(--navy)' }}>~3.5% per quarter</strong> versus
          ~0.8% for the bottom quintile — a 2.7pp spread that persists across market regimes.
          The 4-quarter IC of +0.129 is stronger than the 1-quarter IC, confirming the signal
          strengthens as prices catch up to the permit supply.
        </p>
      </div>

      <D />

      {/* Why it works */}
      <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
        Why It Works
      </h2>
      <p style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '600px' }}>
        Permits are filed before construction begins. They reveal builder confidence and pipeline
        supply well before home prices adjust to the new supply outlook.
        Permit data is published quarterly — before the Zillow ZHVI and Case-Shiller indices
        that most market participants rely on for real-time housing signals.
      </p>

      <D />

      {/* Homebuilder equity — compact secondary */}
      <div style={{ padding: '24px 28px', border: '1px solid var(--border)', background: 'var(--surface)', maxWidth: '680px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
          <code style={{ fontSize: '11px', color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
            hb_sector_adaptive_index
          </code>
          <span style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
            Homebuilder Equity Signal
          </span>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px' }}>
          The same permit flow data, mapped into each homebuilder&apos;s geographic footprint and
          weighted by sector-specific transmission factors. The lead OOS equity signal across
          16 tradable housing-sensitive names.
        </p>
        <div style={{ display: 'flex', gap: '28px', paddingTop: '14px', borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
          {[
            { v: '+0.204', l: 'OOS IC (16 names)' },
            { v: '4.25',   l: 'OOS t-stat' },
            { v: '65%',    l: 'Hit rate (23 OOS quarters)' },
          ].map((m, i) => (
            <div key={i}>
              <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--positive)', letterSpacing: '-0.3px' }}>{m.v}</div>
              <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-mono)', marginTop: '3px' }}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>

      <D />

      {/* Accordion: everything else */}
      <DetailsAccordion title="Full methodology, IC time series, and additional signals">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

          <div>
            <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
              permit_sf_yoy IC over time (vs. Zillow ZHVI)
            </p>
            <ICTimeSeriesChart data={housingPermitICSeries} meanIC={0.099} tStat={5.91} />
          </div>

          <div>
            <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
              hb_sector_adaptive_index IC — OOS begins 2020Q1
            </p>
            <ICTimeSeriesChart data={homebuilderSectorAdaptiveICSeries} meanIC={0.204} tStat={4.25} />
            <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>
              IS period (pre-2020): lower IC, more volatile. OOS (2020Q1–2025Q3): IC +0.204, t=4.25 across 16 names.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
              Additional signals
            </p>
            <SignalEvidenceCard
              signalName="construction_score"
              description="Composite supply signal: permit momentum (25%), construction spending YoY (25%), LIHTC new units (20%), new construction intensity (15%), SAM.gov forward pipeline (15%)."
              metrics={[
                { label: '1Q IC', value: '+0.052', positive: true },
                { label: '1Q t-stat', value: '6.53', positive: true },
                { label: '4Q IC', value: '+0.067', positive: true },
              ]}
            />
            <SignalEvidenceCard
              signalName="subsidy_flow_score"
              description="Federal grant and loan intensity (HUD/USDA: Section 8, CDBG, HOME). Countercyclical — concentrates in distressed markets. Use as a market distress indicator, not a price predictor."
              metrics={[
                { label: '1Q IC vs HPI', value: '+0.006' },
                { label: 'Interpretation', value: 'Distress proxy' },
              ]}
            />
          </div>

          <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '600px' }}>
            <p style={{ fontWeight: 600, color: 'var(--navy)', marginBottom: '8px', fontSize: '12px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px' }}>Methodology</p>
            <p>
              Seven data sources fused into a single quarterly panel: USAspending.gov, SAM.gov,
              Census BPS permit data, LIHTC allocations, Census CBSA crosswalk, and FEMA
              disaster declarations. Disaster-related grants are identified and adjusted to
              prevent event-driven distortions from inflating housing metrics.
            </p>
            <p style={{ marginTop: '10px' }}>
              The homebuilder equity signal uses point-in-time 10-K disclosures to determine
              each company&apos;s state-level footprint — then applies sector-specific transmission
              weights (homebuilders vs. building materials) to monthly BPS permit data.
              No look-ahead into future filings.
            </p>
          </div>

        </div>
      </DetailsAccordion>

      <DatasetCTA
        heading="Interested in Federal Housing & Construction?"
        subtext="Get in touch to discuss geographic coverage, the homebuilder equity signal, or how it fits your housing research."
      />

    </div>
  )
}
