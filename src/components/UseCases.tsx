interface UseCase {
  title: string
  description: string
}

interface UseCasesProps {
  cases: UseCase[]
}

export function UseCases({ cases }: UseCasesProps) {
  return (
    <section>
      <h2 style={{
        fontSize: '11px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '3px',
        marginBottom: '20px',
        color: 'var(--muted)',
        fontFamily: 'var(--font-mono)',
      }}>
        How clients use it
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
      }}>
        {cases.map((c, i) => (
          <div key={i} style={{
            padding: '20px 22px',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
          }}>
            <div style={{
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--navy)',
              marginBottom: '8px',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.3px',
            }}>
              {c.title}
            </div>
            <div style={{
              fontSize: '13px',
              color: 'var(--muted)',
              lineHeight: 1.65,
            }}>
              {c.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
