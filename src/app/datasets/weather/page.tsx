import { WeatherDataPage } from '@/components/WeatherDataPage'

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '36px 0' }} />
)

export default function WeatherPage() {
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
          Weather Commodity Signals
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.5px' }}>
          2026 &nbsp;·&nbsp; 8 regions &nbsp;·&nbsp; 10 signals &nbsp;·&nbsp; ERA5 reanalysis
        </p>
      </div>

      {/* Description */}
      <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '640px' }}>
        <p style={{ marginBottom: '14px' }}>
          Daily weather signals derived from ERA5 reanalysis data across 8 commodity-relevant regions. We translate gridded atmospheric data into actionable signals for agricultural and energy commodity traders: growing degree day anomalies, precipitation deficits, drought probability, frost risk, and heating/cooling demand deviations.
        </p>
        <p style={{ marginBottom: '14px' }}>
          Each region maps directly to the futures markets it drives — US Corn Belt to ZC/ZS, Black Sea to ZW, US Southern Plains to ZW/NG. Signals are computed at 7-day and 14-day forecast horizons using ECMWF ensemble runs, ranked percentile-relative to a 30-year climatological baseline.
        </p>
        <p>
          Updated daily. Historical backfill to 1994. Delivered via API or flat file under institutional licensing.
        </p>
      </div>

      <Divider />

      {/* Interactive map + tables */}
      <WeatherDataPage />

    </div>
  )
}
