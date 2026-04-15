import Link from 'next/link'

interface DatasetCTAProps {
  heading?: string
  subtext?: string
}

export function DatasetCTA({
  heading = 'Ready to get started?',
  subtext = 'Get in touch to discuss how this dataset fits into your research workflow.',
}: DatasetCTAProps) {
  return (
    <section style={{
      marginTop: '72px',
      padding: '52px 40px',
      border: '1px solid rgba(0,212,170,0.12)',
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
        maxWidth: '380px',
        marginInline: 'auto',
      }}>
        {subtext}
      </p>
      <Link
        href="/contact"
        className="btn-primary"
        style={{ fontSize: '12px', padding: '14px 36px', color: '#080c24' }}
      >
        Get in Touch →
      </Link>
    </section>
  )
}
