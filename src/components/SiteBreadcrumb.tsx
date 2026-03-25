'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const ROUTE_LABELS: Record<string, string> = {
  '/datasets/gov-spending': 'gov-spending',
  '/datasets/weather': 'weather',
}

export function SiteBreadcrumb() {
  const pathname = usePathname()
  const sub = ROUTE_LABELS[pathname]

  return (
    <div
      style={{
        padding: '36px 40px 0',
        display: 'flex',
        alignItems: 'baseline',
        gap: '0',
        userSelect: 'none',
      }}
    >
      {/* ~/  prefix */}
      <span
        style={{
          fontSize: '16px',
          color: 'var(--muted)',
          fontFamily: 'var(--font-mono)',
          marginRight: '1px',
        }}
      >
        ~/
      </span>

      {/* ribeon — always a link home */}
      <Link
        href="/"
        className="breadcrumb-link"
        style={{
          fontSize: '24px',
          fontFamily: 'var(--font-serif)',
          fontWeight: 800,
          color: 'var(--navy)',
          textDecoration: 'none',
          lineHeight: 1,
        }}
      >
        ribeon
      </Link>

      {/* / dataset-segment — only on sub-pages */}
      {sub && (
        <>
          <span
            style={{
              fontSize: '16px',
              color: 'var(--muted)',
              margin: '0 6px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            /
          </span>
          <span
            style={{
              fontSize: '16px',
              color: 'var(--muted)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.3px',
            }}
          >
            {sub}
          </span>
        </>
      )}
    </div>
  )
}
