'use client'

import { useState, useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { GovSpendingRow } from '@/lib/types'

const TICKER_COLORS: Record<string, string> = {
  LMT: '#0f1d2e',
  BA: '#9a7728',
  GD: '#166534',
  RTX: '#991b1b',
  NOC: '#1e40af',
  BAH: '#7c3aed',
  LDOS: '#9f580a',
  SAIC: '#0f766e',
}

const ALL_TICKERS = Object.keys(TICKER_COLORS)
const DEFAULT_TICKERS = ['LMT', 'BA', 'GD', 'RTX']

interface SignalTimeSeriesChartProps {
  data: GovSpendingRow[]
  defaultTickers?: string[]
}

interface ChartPoint {
  quarter: string
  [ticker: string]: number | string
}

export function SignalTimeSeriesChart({ data, defaultTickers = DEFAULT_TICKERS }: SignalTimeSeriesChartProps) {
  const [selectedTickers, setSelectedTickers] = useState<string[]>(
    defaultTickers.filter((t) => ALL_TICKERS.includes(t)),
  )

  const quarters = useMemo(() => {
    const qs = Array.from(new Set(data.map((r) => r.quarter)))
    qs.sort()
    return qs
  }, [data])

  const chartData = useMemo<ChartPoint[]>(() => {
    const byQuarter: Record<string, ChartPoint> = {}
    for (const q of quarters) byQuarter[q] = { quarter: q }
    for (const row of data) {
      if (byQuarter[row.quarter]) byQuarter[row.quarter][row.ticker] = row.composite_rank
    }
    return quarters.map((q) => byQuarter[q])
  }, [data, quarters])

  const availableTickers = useMemo(() => {
    const inData = new Set(data.map((r) => r.ticker))
    return ALL_TICKERS.filter((t) => inData.has(t))
  }, [data])

  function toggleTicker(ticker: string) {
    setSelectedTickers((prev) =>
      prev.includes(ticker) ? prev.filter((t) => t !== ticker) : [...prev, ticker],
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#c4b99a" strokeOpacity={0.5} vertical={false} />
            <XAxis
              dataKey="quarter"
              tick={{ fill: '#5c6b7a', fontSize: 10, fontFamily: 'var(--font-mono)' }}
              axisLine={{ stroke: '#c4b99a' }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[0, 1]}
              tick={{ fill: '#5c6b7a', fontSize: 10, fontFamily: 'var(--font-mono)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => v.toFixed(1)}
              label={{
                value: 'Composite Rank',
                angle: -90,
                position: 'insideLeft',
                offset: 10,
                style: { fill: '#5c6b7a', fontSize: 10, fontFamily: 'var(--font-mono)' },
              }}
              width={62}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--white)',
                border: '1px solid var(--border)',
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                color: 'var(--navy)',
                borderRadius: 0,
              }}
              labelStyle={{ color: 'var(--navy)', fontWeight: 700, marginBottom: 4 }}
              formatter={(value: unknown, name: unknown) => [
                typeof value === 'number' ? value.toFixed(2) : String(value),
                String(name),
              ]}
            />
            {selectedTickers.map((ticker) => (
              <Line
                key={ticker}
                type="monotone"
                dataKey={ticker}
                stroke={TICKER_COLORS[ticker] ?? '#5c6b7a'}
                strokeWidth={1.5}
                dot={false}
                activeDot={{ r: 3, strokeWidth: 0 }}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Ticker toggles */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px' }}>
        <span style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '1px', textTransform: 'uppercase', marginRight: '4px' }}>
          Tickers
        </span>
        {availableTickers.map((ticker) => {
          const active = selectedTickers.includes(ticker)
          const color = TICKER_COLORS[ticker]
          return (
            <button
              key={ticker}
              onClick={() => toggleTicker(ticker)}
              aria-pressed={active}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 10px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                border: `1px solid ${active ? color : 'var(--border)'}`,
                background: active ? `${color}12` : 'var(--bg)',
                color: active ? color : 'var(--muted)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                letterSpacing: '0.3px',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: active ? color : '#c4b99a',
                  flexShrink: 0,
                }}
              />
              {ticker}
            </button>
          )
        })}
      </div>
    </div>
  )
}
