import Link from 'next/link'

interface DatasetCTAProps {
  heading?: string
  subtext?: string
}

export function DatasetCTA({
  heading = 'Ready to integrate this dataset?',
  subtext = 'Request a sample, discuss your use case, or see how it fits your research workflow.',
}: DatasetCTAProps) {
  return (
    <section style={{
      marginTop: '72px',
      padding: '48px 40px',
      background: 'linear-gradient(135deg, rgba(0,212,170,0.04), rgba(59,125,255,0.04))',
      border: '1px solid rgba(0,212,170,0.15)',
      textAlign: 'center',
    }}>
      <h2 style={{
        fontSize: '22px',
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        color: 'var(--navy)',
        marginBottom: '12px',
        fontWeight: 400,
      }}>
        {heading}
      </h2>
      <p style={{
        fontSize: '14px',
        color: 'var(--muted)',
        marginBottom: '28px',
        lineHeight: 1.7,
        maxWidth: '440px',
        marginInline: 'auto',
      }}>
        {subtext}
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link
          href="/contact"
          className="btn-primary"
          style={{ fontSize: '12px', padding: '13px 28px', color: '#080c24' }}
        >
          Request Sample →
        </Link>
        <Link
          href="/contact"
          className="btn-outline"
          style={{ fontSize: '12px', padding: '13px 28px' }}
        >
          Talk to Us →
        </Link>
      </div>
      <p style={{
        fontSize: '11px',
        color: 'var(--border)',
        fontFamily: 'var(--font-mono)',
        marginTop: '24px',
      }}>
        Ribeon provides data, not financial advice. Strategy construction is the buyer&apos;s domain.
      </p>
    </section>
  )
}
