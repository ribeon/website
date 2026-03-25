'use client'

import { useMemo } from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import { DataExplorer } from '@/components/data/DataExplorer'
import { govHousingSample } from '@/lib/data/gov-housing-sample'
import {
  formatCurrency,
  formatPercent,
  formatRank,
  getRankClass,
  getValueClass,
} from '@/lib/formatting'
import type { GovHousingRow } from '@/lib/types'

type Row = Record<string, unknown>

const columns: ColumnDef<Row>[] = [
  {
    accessorKey: 'quarter',
    header: 'Quarter',
    size: 90,
    cell: ({ getValue }) => (
      <span className="text-[#5c6b7a]">{String(getValue())}</span>
    ),
  },
  {
    accessorKey: 'pop_state',
    header: 'State',
    size: 70,
    cell: ({ getValue }) => (
      <span className="font-bold text-[#0f1d2e]">{String(getValue())}</span>
    ),
  },
  {
    accessorKey: 'pop_county',
    header: 'County',
    size: 140,
    cell: ({ getValue }) => (
      <span className="text-[#0f1d2e]">{String(getValue())}</span>
    ),
  },
  {
    accessorKey: 'total_spending',
    header: 'Total Spending',
    size: 130,
    cell: ({ getValue }) => (
      <span className="tabular-nums text-[#0f1d2e]">
        {formatCurrency(getValue() as number, true)}
      </span>
    ),
  },
  {
    accessorKey: 'spending_yoy',
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
    accessorKey: 'new_construction_intensity',
    header: 'New Construction',
    size: 140,
    cell: ({ getValue }) => {
      const val = getValue() as number
      return (
        <span className="tabular-nums text-[#5c6b7a]">
          {(val * 100).toFixed(1)}%
        </span>
      )
    },
  },
  {
    accessorKey: 'affordable_intensity',
    header: 'Affordable Housing',
    size: 150,
    cell: ({ getValue }) => {
      const val = getValue() as number
      return (
        <span className="tabular-nums text-[#5c6b7a]">
          {(val * 100).toFixed(1)}%
        </span>
      )
    },
  },
  {
    accessorKey: 'pipeline_score',
    header: 'Pipeline Score',
    size: 120,
    cell: ({ getValue }) => {
      const val = getValue() as number
      return (
        <span className={`tabular-nums ${getRankClass(val)}`}>
          {formatRank(val)}
        </span>
      )
    },
  },
]

export function GovHousingExplorer() {
  const data = useMemo<Row[]>(
    () => govHousingSample as unknown as Row[],
    [],
  )

  const filterOptions = useMemo(
    () =>
      Array.from(
        new Set((govHousingSample as GovHousingRow[]).map((r) => r.pop_state)),
      ).sort(),
    [],
  )

  return (
    <DataExplorer
      data={data}
      columns={columns}
      filterKey="pop_state"
      filterLabel="Filter by state"
      filterOptions={filterOptions}
      downloadFilename="ribeon-gov-housing-sample.csv"
    />
  )
}
