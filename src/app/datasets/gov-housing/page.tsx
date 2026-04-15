import Link from 'next/link'
import { StatBar } from '@/components/StatBar'
import { SignalEvidenceCard } from '@/components/SignalEvidenceCard'
import { QuintileBarChart } from '@/components/charts/QuintileBarChart'
import { ICTimeSeriesChart } from '@/components/charts/ICTimeSeriesChart'
import { AtAGlance } from '@/components/AtAGlance'
import { UseCases } from '@/components/UseCases'
import { DetailsAccordion } from '@/components/DetailsAccordion'
import { FlagshipSignalCard } from '@/components/FlagshipSignalCard'
import { DatasetCTA } from '@/components/DatasetCTA'
import { GOV_HOUSING_META } from '@/lib/data/dataset-meta'
import {
  housingPermitICSeries,
  housingPermitQuintileReturns,
  homebuilderSectorAdaptiveICSeries,
} from '@/lib/data/gov-housing-evidence'

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '56px 0' }} />
)

export default function GovHousingPage() {
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
          {GOV_HOUSING_META.name}
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.5px', marginBottom: '28px' }}>
          {GOV_HOUSING_META.counties} counties &nbsp;·&nbsp; {GOV_HOUSING_META.metros} metro areas &nbsp;·&nbsp; {GOV_HOUSING_META.history}
        </p>
        <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--muted)', maxWidth: '660px', marginBottom: '32px' }}>
          Building permit acceleration is observable shortly after quarter end —{' '}
          <strong style={{ color: 'var(--navy)' }}>before official home price indices update</strong>.
          Counties in the top permit quintile appreciate ~{GOV_HOUSING_META.topQuintileHPI} per quarter
          versus ~{GOV_HOUSING_META.bottomQuintileHPI} for the bottom quintile.
          We extend the same permit flow data into a sector-adaptive equity signal for{' '}
          {GOV_HOUSING_META.hbEquityNames} tradable homebuilder names.
        </p>
      </div>

      <StatBar stats={[
        { label: 'Counties covered', value: GOV_HOUSING_META.counties },
        { label: 'Metro areas', value: GOV_HOUSING_META.metros },
        { label: 'Permit IC (1Q)', value: GOV_HOUSING_META.permitIC1Q, subtitle: 't = ' + GOV_HOUSING_META.permitTStat1Q, highlight: true },
        { label: 'Homebuilder OOS hit', value: GOV_HOUSING_META.hbOOSHitRate, subtitle: 'sector-adaptive signal' },
      ]} />

      <AtAGlance items={[
        { label: 'Geographic coverage', value: GOV_HOUSING_META.counties + ' counties, ' + GOV_HOUSING_META.metros + ' MSAs' },
        { label: 'Data sources', value: GOV_HOUSING_META.dataSources + ' fused (USAspending, SAM.gov, Census, LIHTC, CBSA, FEMA)' },
        { label: 'Equity coverage', value: GOV_HOUSING_META.hbEquityNames + ' homebuilder and building materials names' },
        { label: 'Geographic cadence', value: 'Quarterly, vs. Zillow ZHVI' },
        { label: 'Equity cadence', value: 'Monthly state-level permit flow → monthly signal' },
        { label: 'History', value: GOV_HOUSING_META.history },
      ]} />

      <Divider />

      {/* Two channels */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '8px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Signals
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '28px', lineHeight: 1.65, maxWidth: '600px' }}>
          Two delivery channels from the same underlying data: a geographic panel for county- and metro-level
          analysis, and a sector-adaptive equity signal mapped into tradable homebuilder names.
        </p>

        {/* Geographic channel */}
        <p style={{ fontSize: '10px', color: 'var(--gold)', fontFamily: 'var(--font-mono)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
          Channel 1 — Geographic
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '840px', marginBottom: '32px' }}>
          <FlagshipSignalCard
            badge="Primary signal"
            name="permit_sf_yoy"
            description="Single-family permit year-over-year momentum. A county with rising permits reveals strengthening supply and demand simultaneously. Momentum (YoY change) is the strongest predictor of home price appreciation — raw permit level just captures county size. Validated quarterly against Zillow ZHVI across all 3,135 counties."
            metrics={[
              { label: '1Q IC vs HPI', value: GOV_HOUSING_META.permitIC1Q, positive: true },
              { label: '1Q t-stat', value: GOV_HOUSING_META.permitTStat1Q, positive: true },
              { label: '4Q IC vs HPI', value: GOV_HOUSING_META.permitIC4Q, positive: true },
              { label: '4Q t-stat', value: GOV_HOUSING_META.permitTStat4Q, positive: true },
            ]}
          />
        </div>

        {/* Equity channel */}
        <p style={{ fontSize: '10px', color: 'var(--gold)', fontFamily: 'var(--font-mono)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
          Channel 2 — Homebuilder Equity
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '840px', marginBottom: '16px' }}>
          <FlagshipSignalCard
            badge="Lead equity signal"
            name="hb_sector_adaptive_index"
            description="Maps monthly BPS state-level permit flow into each ticker's geographic footprint, applying sector-specific transmission weights — 40% permit YoY / 40% permit value / 20% price tier for homebuilders; 70% permit YoY / 30% permit value for building materials names. The result is a monthly equity signal tailored to where each company actually builds."
            metrics={[
              { label: 'OOS IC (16 names)', value: GOV_HOUSING_META.hbOOSIC, positive: true },
              { label: 'OOS t-stat', value: GOV_HOUSING_META.hbOOSTStat, positive: true },
              { label: 'OOS hit rate', value: GOV_HOUSING_META.hbOOSHitRate, positive: true },
              { label: 'OOS period', value: '2020Q1–2025Q3 (' + GOV_HOUSING_META.hbOOSQuarters + ' quarters)' },
            ]}
          />
        </div>

        <DetailsAccordion title="Supporting signals — construction_score, subsidy_flow_score, hb_permit_yoy_index">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <SignalEvidenceCard
              signalName="construction_score"
              description="Composite supply signal: permit momentum (25%), construction spending YoY (25%), LIHTC new units (20%), new construction intensity (15%), SAM.gov forward pipeline (15%). Improved materially after switching the permit component from raw level to YoY momentum."
              metrics={[
                { label: '1Q IC vs HPI', value: '+0.052', positive: true },
                { label: '1Q t-stat', value: '6.53', positive: true },
                { label: '4Q IC', value: '+0.067', positive: true },
                { label: '4Q t-stat', value: '7.47', positive: true },
              ]}
            />
            <SignalEvidenceCard
              signalName="subsidy_flow_score"
              description="Federal grant and loan intensity (HUD/USDA assistance: Section 8, CDBG, HOME programs). Federal subsidies are countercyclical — they concentrate in distressed markets, not booming suburbs. Use as a market distress indicator, not a price appreciation predictor."
              metrics={[
                { label: '1Q IC vs HPI', value: '+0.006' },
                { label: '1Q t-stat', value: '1.03' },
                { label: 'Interpretation', value: 'Distress proxy' },
              ]}
            />
            <SignalEvidenceCard
              signalName="hb_permit_yoy_index"
              description="Pure permit-flow equity signal: monthly-state BPS permit YoY rank mapped into each ticker's geographic footprint. Sector-agnostic — use as a standalone momentum proxy or complement to hb_sector_adaptive_index."
              metrics={[
                { label: 'OOS IC (16 names)', value: '+0.180', positive: true },
                { label: 'OOS t-stat', value: '3.42', positive: true },
                { label: 'OOS hit rate', value: '48%' },
              ]}
            />
          </div>
        </DetailsAccordion>
      </section>

      <Divider />

      <UseCases cases={[
        {
          title: 'Geographic monitoring',
          description: 'Identify counties in the top permit momentum quintile for real estate investment, credit underwriting, or regional economic research.',
        },
        {
          title: 'Homebuilder equity ranking',
          description: 'Monthly cross-sectional ranking of 16 housing-sensitive names by permit flow in their geographic footprint — for quarterly rebalancing or sector rotation.',
        },
        {
          title: 'Earnings preview',
          description: 'Building permit acceleration in a homebuilder\'s core markets is observable before the company reports. Use as a forward indicator of volume and margin guidance.',
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
              HPI appreciation by permit_sf_yoy quintile (1Q forward)
            </p>
            <QuintileBarChart
              data={housingPermitQuintileReturns}
              yAxisLabel="Quarterly HPI (%)"
              formatMode="hpi"
            />
            <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>
              Top quintile: ~{GOV_HOUSING_META.topQuintileHPI}/quarter vs. ~{GOV_HOUSING_META.bottomQuintileHPI} for bottom — a 2.7pp spread that persists across market regimes.
            </p>
          </div>
          <div>
            <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              permit_sf_yoy IC over time (vs. Zillow ZHVI)
            </p>
            <ICTimeSeriesChart
              data={housingPermitICSeries}
              meanIC={0.099}
              tStat={5.91}
            />
          </div>
        </div>

        <div>
          <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
            hb_sector_adaptive_index IC — OOS period begins 2020Q1 (23 quarters)
          </p>
          <ICTimeSeriesChart
            data={homebuilderSectorAdaptiveICSeries}
            meanIC={0.204}
            tStat={4.25}
          />
          <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>
            In-sample (pre-2020): lower IC, more volatile. Out-of-sample (2020Q1–2025Q3): OOS IC {GOV_HOUSING_META.hbOOSIC}, t={GOV_HOUSING_META.hbOOSTStat} across {GOV_HOUSING_META.hbEquityNames} tradable housing-sensitive names.
          </p>
        </div>
      </section>

      <Divider />

      <DetailsAccordion title="Methodology & data construction">
        <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p>
            Seven authoritative data sources are fused into a single quarterly panel:
            USAspending.gov contracts and assistance programs (HUD and USDA housing initiatives),
            SAM.gov forward procurement opportunities, Census building permit data (BPS), LIHTC
            project allocations, Census CBSA metro crosswalk, and FEMA disaster declarations.
          </p>
          <p>
            Disaster-related grant activity is identified and adjusted to prevent event-driven
            distortions from inflating underlying housing metrics — ensuring signals reflect
            genuine market conditions rather than recovery spending.
          </p>
          <p>
            The homebuilder equity signal uses point-in-time 10-K disclosures to determine each
            company&apos;s state-level geographic footprint. Footprint weights are applied to monthly
            BPS permit data to produce a ticker-level exposure score that updates monthly without
            look-ahead into future disclosures.
          </p>
          <p>
            The 4-quarter IC (+{GOV_HOUSING_META.permitIC4Q.replace('+', '')}) is stronger than the 1-quarter IC (+{GOV_HOUSING_META.permitIC1Q.replace('+', '')}),
            indicating the permit supply signal strengthens with a longer return horizon — consistent with
            the 1–4 quarter lead observed in academic housing literature.
          </p>
        </div>
      </DetailsAccordion>

      <DatasetCTA
        heading="Ready to integrate Federal Housing & Construction?"
        subtext="Request a sample file, discuss geographic or equity coverage, or explore how the permit signal fits into your housing research."
      />

    </div>
  )
}
