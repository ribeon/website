import { GovHousingExplorer } from '@/components/data/GovHousingExplorer'

const signalDefinitions = [
  {
    name: 'Pipeline Score',
    formula: 'pipeline_score',
    description: 'Composite cross-sectional percentile combining construction intensity, affordable housing share, YoY spending momentum, and SAM.gov forward opportunities. Ranges 0–1; higher indicates stronger housing investment pipeline.',
  },
  {
    name: 'Construction Score',
    formula: 'construction_score',
    description: 'Weighted index of new construction intensity and building permit activity relative to county peers. Designed for RE private equity and REIT investors tracking physical pipeline.',
  },
  {
    name: 'Subsidy Flow Score',
    formula: 'subsidy_flow_score',
    description: 'Captures HUD and USDA assistance grant and loan flows — CDBG, HOME, Section 8, LIHTC allocations. Designed for muni bond analysts and affordable housing investors.',
  },
  {
    name: 'YoY Growth',
    formula: 'spending_yoy',
    description: 'Year-over-year change in total federal housing obligations for the geography. Removes seasonal effects and identifies sustained shifts in federal investment.',
  },
  {
    name: 'New Construction Intensity',
    formula: 'new_construction_intensity',
    description: 'Share of total spending directed to new construction NAICS codes (236xxx) versus rehabilitation and maintenance. Higher values signal expansion-phase markets.',
  },
]

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '36px 0' }} />
)

export default function GovHousingPage() {
  return (
    <div style={{ padding: '36px 40px', maxWidth: '1100px' }}>
      {/* Title block */}
      <div style={{ marginBottom: '28px' }}>
        <p style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
          Alternative Data
        </p>
        <h1
          style={{
            fontSize: '38px',
            fontWeight: 700,
            color: 'var(--navy)',
            marginBottom: '10px',
            fontFamily: 'var(--font-serif)',
            lineHeight: 1.1,
          }}
        >
          Federal Housing & Construction
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.5px' }}>
          2026 &nbsp;·&nbsp; 4,160 counties &nbsp;·&nbsp; 57 states &amp; territories &nbsp;·&nbsp; FY2010–2025
        </p>
      </div>

      {/* Description */}
      <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '640px', marginBottom: '0' }}>
        <p style={{ marginBottom: '14px' }}>
          $933B in federal housing obligations mapped to 4,160 counties across every US state and territory. We combine USAspending contract awards (NAICS 236xxx construction codes), HUD and USDA assistance programs (CDBG, HOME, Section 8, LIHTC), and SAM.gov forward opportunities into a unified geographic panel spanning FY2010–2025.
        </p>
        <p style={{ marginBottom: '14px' }}>
          Building permit data from the Census Bureau, LIHTC allocations, and CBSA crosswalks are integrated to produce dual signal tracks: a construction pipeline score for RE private equity and REIT investors, and a subsidy flow score for muni bond analysts and affordable housing desks.
        </p>
        <p>
          Five quarterly signals per geography — pipeline score, construction intensity, subsidy flows, YoY momentum, and affordable housing share — synthesized into a single cross-sectional composite rank at county, MSA, and state granularity.
        </p>
      </div>

      <Divider />

      {/* Data Explorer */}
      <section style={{ marginBottom: '0' }}>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '18px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Sample Data
        </h2>
        <GovHousingExplorer />
      </section>

      <Divider />

      {/* Signal Definitions */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '22px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Signal Definitions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {signalDefinitions.map((sig) => (
            <div key={sig.name} style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '16px', alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy)', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
                  {sig.name}
                </div>
                <code style={{ fontSize: '11px', color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                  {sig.formula}
                </code>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7 }}>
                {sig.description}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
