'use client'

import { useState } from 'react'

interface DetailsAccordionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function DetailsAccordion({ title, children, defaultOpen = false }: DetailsAccordionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div style={{ border: '1px solid var(--border)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 20px',
          background: 'var(--surface)',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--muted)',
          fontSize: '10px',
          fontFamily: 'var(--font-mono)',
          textTransform: 'uppercase',
          letterSpacing: '2.5px',
          fontWeight: 600,
          textAlign: 'left',
          gap: '12px',
        }}
      >
        <span>{title}</span>
        <span style={{
          fontSize: '14px',
          color: 'var(--gold)',
          flexShrink: 0,
          fontWeight: 400,
          fontFamily: 'monospace',
          lineHeight: 1,
        }}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div style={{
          padding: '24px 20px',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg)',
        }}>
          {children}
        </div>
      )}
    </div>
  )
}
