'use client'

import { useState } from 'react'

type Tab = 'about' | 'contact'

export function SidebarTabs() {
  const [active, setActive] = useState<Tab>('about')
  const [form, setForm] = useState({ name: '', org: '', message: '' })
  const [sent, setSent] = useState(false)

  const tabStyle = (id: Tab): React.CSSProperties => ({
    color: 'var(--navy)',
    textDecoration: 'none',
    fontSize: '12px',
    cursor: 'pointer',
    opacity: active === id ? 1 : 0.3,
    transition: 'opacity 0.25s ease',
    fontFamily: 'var(--font-mono)',
    letterSpacing: '0.5px',
    textTransform: 'uppercase' as const,
    display: 'flex',
    alignItems: 'center',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(
      `Data Inquiry${form.name ? ` — ${form.name}` : ''}${form.org ? ` (${form.org})` : ''}`
    )
    const body = encodeURIComponent(form.message)
    window.open(`mailto:data@ribeon.com?subject=${subject}&body=${body}`)
    setSent(true)
    setForm({ name: '', org: '', message: '' })
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 10px',
    fontSize: '12px',
    fontFamily: 'var(--font-mono)',
    color: 'var(--navy)',
    background: 'transparent',
    border: '1px solid var(--border)',
    outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <>
      {/* Nav tabs */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '22px' }}>
        {(['about', 'contact'] as Tab[]).map((id) => (
          <a
            key={id}
            href="#"
            onClick={(e) => { e.preventDefault(); setActive(id) }}
            style={tabStyle(id)}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', width: '14px', flexShrink: 0, lineHeight: 1 }}>
              {active === id && (
                <span style={{ color: 'var(--gold)', fontSize: '9px', display: 'block', transform: 'translateY(-1px)' }}>◆</span>
              )}
            </span>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </div>

      {/* About */}
      {active === 'about' && (
        <div style={{ lineHeight: 1.85, color: 'var(--muted)' }}>
          <p style={{ marginBottom: '28px', fontSize: '17px', fontFamily: 'var(--font-serif)', color: 'var(--navy)', lineHeight: 1.75 }}>
            Ribeon is bringing alternative data to investors. We are a team of researchers and engineers building unique datasets — transformed into clean, point-in-time signals mapped directly to tradeable instruments.
          </p>

          {/* Team section */}
          <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '16px', opacity: 0.45 }}>
            Team
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            {[{ name: 'Kimon Dafnas' }, { name: 'Thomas Ribeiro' }].map(({ name }) => (
              <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  border: '1px solid var(--border)', background: 'var(--surface)',
                }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--navy)' }}>{name}</span>
              </div>
            ))}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', fontStyle: 'italic', gridColumn: '1 / -1' }}>
              ...and growing!
            </span>
          </div>
        </div>
      )}

      {/* Contact */}
      {active === 'contact' && (
        <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
          {sent ? (
            <p style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
              Message sent — we&apos;ll be in touch shortly.
            </p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Organisation"
                value={form.org}
                onChange={(e) => setForm({ ...form, org: e.target.value })}
                style={inputStyle}
              />
              <textarea
                placeholder="Message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                style={{ ...inputStyle, resize: 'vertical' }}
              />
              <button
                type="submit"
                style={{
                  padding: '9px 0',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--bg)',
                  background: 'var(--navy)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      )}
    </>
  )
}
