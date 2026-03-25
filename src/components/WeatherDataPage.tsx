'use client'

import { useState, useMemo } from 'react'
import { WeatherMap } from '@/components/WeatherMap'
import { weatherSignalsSample } from '@/lib/data/weather-signals-sample'
import { REGIONS } from '@/lib/data/regions'

type SignalKey = 'composite_rank' | 'gdd_anomaly_pct' | 'precip_deficit_prob' | 'hdd_anomaly' | 'drought_probability' | 'frost_risk_prob'

const SIGNAL_OPTIONS: { value: SignalKey; label: string }[] = [
  { value: 'composite_rank', label: 'Composite Rank' },
  { value: 'gdd_anomaly_pct', label: 'GDD Anomaly %' },
  { value: 'precip_deficit_prob', label: 'Precip Deficit' },
  { value: 'hdd_anomaly', label: 'HDD Anomaly' },
  { value: 'drought_probability', label: 'Drought Prob' },
  { value: 'frost_risk_prob', label: 'Frost Risk' },
]

const COMMODITY_MAP = [
  { region: 'US Corn Belt', commodities: 'ZC, ZS', driver: 'Corn and soybean growing conditions' },
  { region: 'Brazil Soy', commodities: 'ZS', driver: 'Southern hemisphere soy production' },
  { region: 'US Northeast', commodities: 'NG', driver: 'Winter heating demand' },
  { region: 'US Southern Plains', commodities: 'ZW, NG', driver: 'Winter wheat and nat gas demand' },
  { region: 'EU Wheat Belt', commodities: 'ZW', driver: 'EU soft wheat production' },
  { region: 'Black Sea', commodities: 'ZW', driver: 'Ukraine / Russia export corridor' },
  { region: 'Argentine Pampas', commodities: 'ZS, ZC', driver: 'Southern hemisphere soy / corn' },
  { region: 'Australia Wheat', commodities: 'ZW', driver: 'Southern hemisphere wheat export' },
]

const selectStyle: React.CSSProperties = {
  height: '30px',
  border: '1px solid var(--border)',
  background: 'var(--bg)',
  padding: '0 10px',
  fontSize: '12px',
  color: 'var(--navy)',
  fontFamily: 'var(--font-mono)',
  cursor: 'pointer',
}

const thStyle: React.CSSProperties = {
  padding: '9px 12px',
  textAlign: 'left',
  fontSize: '10px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: 'var(--muted)',
  borderBottom: '1px solid var(--border)',
  whiteSpace: 'nowrap',
  background: 'var(--surface)',
  fontFamily: 'var(--font-mono)',
}

const tdStyle: React.CSSProperties = {
  padding: '7px 12px',
  whiteSpace: 'nowrap',
  color: 'var(--navy)',
  fontSize: '12px',
  fontFamily: 'var(--font-mono)',
}

function rankStyle(v: number): React.CSSProperties {
  if (v > 0.65) return { color: 'var(--positive)', fontWeight: 600 }
  if (v < 0.35) return { color: 'var(--negative)' }
  return { color: 'var(--muted)' }
}

function signalStyle(v: number): React.CSSProperties {
  if (v > 0) return { color: 'var(--positive)' }
  if (v < 0) return { color: 'var(--negative)' }
  return { color: 'var(--muted)' }
}

export function WeatherDataPage() {
  const dates = useMemo(() => {
    const ds = Array.from(new Set(weatherSignalsSample.map((r) => r.date))).sort()
    return ds
  }, [])

  const [selectedSignal, setSelectedSignal] = useState<SignalKey>('composite_rank')
  const [selectedDate, setSelectedDate] = useState(dates[dates.length - 1] ?? '')

  const tableRows = useMemo(() => {
    const byRegion: Record<string, typeof weatherSignalsSample[0]> = {}
    for (const row of weatherSignalsSample) {
      if (row.date === selectedDate) byRegion[row.region] = row
    }
    return REGIONS.map((r) => ({ region: r, row: byRegion[r.id] }))
  }, [selectedDate])

  return (
    <>
      {/* Controls */}
      <section style={{ marginBottom: '0' }}>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Interactive Map
        </h2>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '14px' }}>
          <div>
            <label htmlFor="signal-select" style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-mono)' }}>
              Signal
            </label>
            <select id="signal-select" value={selectedSignal} onChange={(e) => setSelectedSignal(e.target.value as SignalKey)} style={selectStyle}>
              {SIGNAL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="date-select" style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-mono)' }}>
              Date
            </label>
            <select id="date-select" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={selectStyle}>
              {dates.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <WeatherMap
          data={weatherSignalsSample}
          selectedSignal={selectedSignal}
          selectedDate={selectedDate}
        />

        {/* Legend */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '10px', fontSize: '11px', color: 'var(--muted)', flexWrap: 'wrap', fontFamily: 'var(--font-mono)' }}>
          {[
            { color: 'rgba(22,101,52,0.5)', label: 'Bullish' },
            { color: 'rgba(154,119,40,0.4)', label: 'Neutral' },
            { color: 'rgba(153,27,27,0.5)', label: 'Bearish' },
            { color: 'rgba(196,185,154,0.4)', label: 'No sample data' },
          ].map(({ color, label }) => (
            <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '11px', height: '11px', background: color, border: '1px solid var(--border)', display: 'inline-block', flexShrink: 0 }} />
              {label}
            </span>
          ))}
        </div>
      </section>

      <div style={{ borderTop: '1px solid var(--border)', margin: '36px 0' }} />

      {/* Signal Table */}
      <section style={{ marginBottom: '0' }}>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Signal Values — {selectedDate}
        </h2>
        <div style={{ overflowX: 'auto', border: '1px solid var(--border)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Region', 'Commodities', 'GDD Anom %', 'Precip Deficit', 'HDD Anom', 'Drought Prob', 'Frost Risk', 'Composite Rank'].map((h) => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map(({ region, row }, idx) => (
                <tr key={region.id} style={{ borderBottom: '1px solid var(--surface)', background: idx % 2 === 1 ? 'var(--bg)' : 'var(--white)' }}>
                  <td style={tdStyle}>{region.name}</td>
                  <td style={{ ...tdStyle, color: 'var(--muted)' }}>{region.commodities.join(', ')}</td>
                  {row ? (
                    <>
                      <td style={{ ...tdStyle, ...signalStyle(row.gdd_anomaly_pct) }}>{row.gdd_anomaly_pct > 0 ? '+' : ''}{row.gdd_anomaly_pct.toFixed(2)}</td>
                      <td style={{ ...tdStyle, ...signalStyle(row.precip_deficit_prob) }}>{row.precip_deficit_prob.toFixed(2)}</td>
                      <td style={{ ...tdStyle, ...signalStyle(row.hdd_anomaly) }}>{row.hdd_anomaly > 0 ? '+' : ''}{row.hdd_anomaly.toFixed(2)}</td>
                      <td style={{ ...tdStyle, ...signalStyle(row.drought_probability) }}>{row.drought_probability.toFixed(2)}</td>
                      <td style={{ ...tdStyle, ...signalStyle(row.frost_risk_prob) }}>{row.frost_risk_prob.toFixed(2)}</td>
                      <td style={{ ...tdStyle, ...rankStyle(row.composite_rank) }}>{row.composite_rank.toFixed(2)}</td>
                    </>
                  ) : (
                    <td colSpan={6} style={{ ...tdStyle, color: 'var(--border)' }}>— no sample data —</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>
          Sample data for US Southern Plains only. Full dataset covers all 8 regions.
        </p>
      </section>

      <div style={{ borderTop: '1px solid var(--border)', margin: '36px 0' }} />

      {/* Commodity mapping */}
      <section>
        <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          Region — Commodity Mapping
        </h2>
        <div style={{ overflowX: 'auto', border: '1px solid var(--border)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Region', 'Futures', 'Signal Driver'].map((h) => <th key={h} style={thStyle}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {COMMODITY_MAP.map((row, idx) => (
                <tr key={row.region} style={{ borderBottom: '1px solid var(--surface)', background: idx % 2 === 1 ? 'var(--bg)' : 'var(--white)' }}>
                  <td style={tdStyle}>{row.region}</td>
                  <td style={{ ...tdStyle, fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.5px' }}>{row.commodities}</td>
                  <td style={{ ...tdStyle, color: 'var(--muted)' }}>{row.driver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
