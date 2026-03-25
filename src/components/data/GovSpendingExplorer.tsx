'use client'

import { useMemo } from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import { DataExplorer } from '@/components/data/DataExplorer'
import { govSpendingSample } from '@/lib/data/gov-spending-sample'
import {
  formatCurrency,
  formatPercent,
  formatRank,
  getRankClass,
  getValueClass,
} from '@/lib/formatting'
import type { GovSpendingRow } from '@/lib/types'

type Row = Record<string, unknown>

const columns: ColumnDef<Row>[] = [
  {
    accessorKey: 'quarter',
    header: 'Quarter',
    size: 90,
    cell: ({ getValue }) => (
      <span style={{ color: 'var(--muted)' }}>{String(getValue())}</span>
    ),
  },
  {
    accessorKey: 'ticker',
    header: 'Ticker',
    size: 80,
    cell: ({ getValue }) => (
      <span style={{ fontWeight: 700, color: 'var(--navy)' }}>
        {String(getValue())}
      </span>
    ),
  },
  {
    accessorKey: 'total_obligation',
    header: 'Total Obligation',
    size: 140,
    cell: ({ getValue }) => (
      <span className="tabular-nums" style={{ color: 'var(--navy)' }}>
        {formatCurrency(getValue() as number, true)}
      </span>
    ),
  },
  {
    accessorKey: 'ugr_surprise_pct',
    header: 'UGR Surprise %',
    size: 130,
    cell: ({ getValue }) => {
      const val = getValue() as number
      return (
        <span className={`tabular-nums ${getValueClass(val)}`}>
          {formatPercent(val)}
        </span>
      )
    },
  },
  {
    accessorKey: 'obligation_qoq',
    header: 'QoQ Growth',
    size: 110,
    cell: ({ getValue }) => {
      const val = getValue() as number
      return (
        <span className={`tabular-nums ${getValueClass(val)}`}>
          {formatPercent(val)}
        </span>
      )
    },
  },
  {
    accessorKey: 'obligation_yoy',
    header: 'YoY Growth',
    size: 110,
    cell: ({ getValue }) => {
      const val = getValue() as number
      return (
        <span className={`tabular-nums ${getValueClass(val)}`}>
          {formatPercent(val)}
        </span>
      )
    },
  },
  {
    accessorKey: 'composite_rank',
    header: 'Composite Rank',
    size: 130,
    cell: ({ getValue }) => {
      const val = getValue() as number
      return (
        <span className={`tabular-nums ${getRankClass(val)}`}>
          {formatRank(val)}
        </span>
      )
    },
  },
  {
    accessorKey: 'unique_agencies',
    header: 'Agencies',
    size: 90,
    cell: ({ getValue }) => (
      <span className="tabular-nums" style={{ color: 'var(--muted)' }}>{String(getValue())}</span>
    ),
  },
]

interface GovSpendingExplorerProps {
  /** Optional cap on visible rows (default: show all) */
  limitRows?: number
}

export function GovSpendingExplorer({ limitRows }: GovSpendingExplorerProps = {}) {
  const source = useMemo(
    () =>
      limitRows
        ? (govSpendingSample as GovSpendingRow[]).slice(0, limitRows)
        : (govSpendingSample as GovSpendingRow[]),
    [limitRows],
  )

  const data = useMemo<Row[]>(
    () => source as unknown as Row[],
    [source],
  )

  const filterOptions = useMemo(
    () =>
      Array.from(
        new Set((govSpendingSample as GovSpendingRow[]).map((r) => r.ticker)),
      ).sort(),
    [],
  )

  return (
    <DataExplorer
      data={data}
      columns={columns}
      filterKey="ticker"
      filterLabel="Filter by ticker"
      filterOptions={filterOptions}
      downloadFilename="ribeon-gov-spending-sample.csv"
    />
  )
}

export default GovSpendingExplorer
