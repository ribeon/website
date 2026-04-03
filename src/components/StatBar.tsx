interface StatItem {
  label: string
  value: string
  subtitle?: string
  highlight?: boolean
}

interface StatBarProps {
  stats: StatItem[]
}

export function StatBar({ stats }: StatBarProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0',
        border: '1px solid var(--border)',
        marginBottom: '32px',
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            flex: '1 1 140px',
            padding: '14px 20px',
            borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
            background: s.highlight ? 'var(--stat-highlight-bg, var(--navy))' : 'var(--white)',
          }}
        >
          <div
            style={{
              fontSize: '18px',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              color: s.highlight ? 'var(--gold)' : 'var(--navy)',
              letterSpacing: '-0.5px',
              lineHeight: 1.2,
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              fontSize: '10px',
              color: s.highlight ? 'rgba(255,255,255,0.6)' : 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginTop: '4px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {s.label}
          </div>
          {s.subtitle && (
            <div
              style={{
                fontSize: '10px',
                color: s.highlight ? 'rgba(255,255,255,0.4)' : 'var(--border)',
                marginTop: '2px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {s.subtitle}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
