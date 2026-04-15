interface FlagshipMetric {
  label: string
  value: string
  positive?: boolean
}

interface FlagshipSignalCardProps {
  badge?: string
  name: string
  description: string
  metrics: FlagshipMetric[]
}

export function FlagshipSignalCard({ badge, name, description, metrics }: FlagshipSignalCardProps) {
  return (
    <div style={{
      border: '1px solid var(--gold)',
      background: 'var(--surface)',
      padding: '24px 28px',
      position: 'relative',
    }}>
      {badge && (
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: '5px 12px',
          background: 'var(--gold)',
          fontSize: '9px',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: '#080c24',
          fontWeight: 700,
        }}>
          {badge}
        </div>
      )}
      <div style={{ marginBottom: '12px' }}>
        <code style={{
          fontSize: '11px',
          color: 'var(--gold)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.3px',
        }}>
          {name}
        </code>
        <p style={{
          fontSize: '13px',
          color: 'var(--muted)',
          lineHeight: 1.7,
          marginTop: '6px',
          maxWidth: '580px',
        }}>
          {description}
        </p>
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        paddingTop: '16px',
        borderTop: '1px solid var(--border)',
      }}>
        {metrics.map((m, i) => (
          <div key={i}>
            <div style={{
              fontSize: '18px',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              color: m.positive ? 'var(--positive)' : 'var(--navy)',
              letterSpacing: '-0.5px',
              lineHeight: 1.2,
            }}>
              {m.value}
            </div>
            <div style={{
              fontSize: '10px',
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontFamily: 'var(--font-mono)',
              marginTop: '3px',
            }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
