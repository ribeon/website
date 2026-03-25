'use client'

import { useState, useCallback } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table'

interface DataExplorerProps {
  data: Record<string, unknown>[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<Record<string, unknown>, any>[]
  filterKey?: string
  filterLabel?: string
  filterOptions?: string[]
  title?: string
  downloadFilename?: string
}

export function DataExplorer({
  data,
  columns,
  filterKey,
  filterLabel,
  filterOptions,
  title,
  downloadFilename = 'data-export.csv',
}: DataExplorerProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const rows = table.getRowModel().rows
  const totalRows = table.getCoreRowModel().rows.length

  const handleFilterChange = useCallback(
    (value: string) => {
      if (!filterKey) return
      setColumnFilters(value ? [{ id: filterKey, value }] : [])
    },
    [filterKey],
  )

  const handleDownload = useCallback(() => {
    const visibleColumns = table.getAllColumns().filter((col) => col.getIsVisible())
    const headers = visibleColumns.map((col) => col.id)
    const csvRows = [
      headers.join(','),
      ...rows.map((row) =>
        headers.map((h) => {
          const val = row.getValue(h)
          const str = val == null ? '' : String(val)
          return str.includes(',') ? `"${str}"` : str
        }).join(','),
      ),
    ]
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = downloadFilename
    a.click()
    URL.revokeObjectURL(url)
  }, [rows, table, downloadFilename])

  const currentFilterValue =
    filterKey ? (columnFilters.find((f) => f.id === filterKey)?.value as string) ?? '' : ''

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Controls row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        {title && (
          <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--navy)', fontFamily: 'var(--font-mono)', letterSpacing: '1px', textTransform: 'uppercase' }}>
            {title}
          </h3>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto', flexWrap: 'wrap' }}>
          {/* Filter */}
          {filterKey && filterOptions && filterOptions.length > 0 && (
            <select
              value={currentFilterValue}
              onChange={(e) => handleFilterChange(e.target.value)}
              aria-label={filterLabel ?? 'Filter'}
              style={{
                height: '30px',
                border: '1px solid var(--border)',
                background: 'var(--bg)',
                padding: '0 8px',
                fontSize: '12px',
                color: 'var(--navy)',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
              }}
            >
              <option value="">All tickers</option>
              {filterOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          )}

          {/* Row count */}
          <span style={{ fontSize: '11px', color: 'var(--muted)', whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)' }}>
            {rows.length} / {totalRows} rows
          </span>

          {/* Download */}
          <button
            onClick={handleDownload}
            className="download-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              height: '30px',
              border: '1px solid var(--border)',
              background: 'var(--bg)',
              padding: '0 12px',
              fontSize: '11px',
              color: 'var(--navy)',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              letterSpacing: '0.5px',
              transition: 'background 0.2s, color 0.2s, border-color 0.2s',
            }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 1v7M3.5 5.5L6 8l2.5-2.5M2 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', border: '1px solid var(--border)', maxHeight: '480px', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSorted = header.column.getIsSorted()
                  const canSort = header.column.getCanSort()
                  return (
                    <th
                      key={header.id}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      style={{
                        whiteSpace: 'nowrap',
                        borderBottom: '1px solid var(--border)',
                        padding: '9px 12px',
                        textAlign: 'left',
                        fontSize: '10px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: 'var(--muted)',
                        cursor: canSort ? 'pointer' : 'default',
                        userSelect: 'none',
                        background: 'var(--surface)',
                        width: header.getSize() !== 150 ? header.getSize() : undefined,
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort && (
                          <span style={{ color: 'var(--border)', fontSize: '10px' }}>
                            {isSorted === 'asc' ? '↑' : isSorted === 'desc' ? '↓' : '⇅'}
                          </span>
                        )}
                      </span>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                style={{
                  borderBottom: '1px solid var(--surface)',
                  background: rowIndex % 2 === 1 ? 'var(--bg)' : 'var(--white)',
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={{ whiteSpace: 'nowrap', padding: '7px 12px', fontSize: '12px', color: 'var(--navy)' }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} style={{ padding: '36px', textAlign: 'center', fontSize: '12px', color: 'var(--muted)' }}>
                  No rows match the current filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
        Sample data only. Full dataset available upon request.
      </p>
    </div>
  )
}
