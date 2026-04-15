interface AtAGlanceItem {
  label: string
  value: string
}

interface AtAGlanceProps {
  items: AtAGlanceItem[]
}

export function AtAGlance({ items }: AtAGlanceProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1px',
      background: 'var(--border)',
      border: '1px solid var(--border)',
      marginBottom: '56px',
    }}>
      {items.map((item, i) => (
        <div key={i} style={{ background: 'var(--surface)', padding: '18px 20px' }}>
          <div style={{
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            color: 'var(--muted)',
            fontFamily: 'var(--font-mono)',
            marginBottom: '7px',
          }}>
            {item.label}
          </div>
          <div style={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--navy)',
            fontFamily: 'var(--font-mono)',
            lineHeight: 1.4,
          }}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  )
}
