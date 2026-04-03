'use client'

import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', org: '', interest: '', message: '' })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSent(true)
        setForm({ name: '', email: '', org: '', interest: '', message: '' })
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="page-header">
        <h1>Get in <span>Touch</span></h1>
        <p>Ready to explore how Ribeon&apos;s alternative datasets can enhance your research and decision-making? We&apos;d love to hear from you.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <h2>Let&apos;s Talk Data</h2>
          <p>Whether you&apos;re looking for custom datasets, exploring our existing research products, or have questions about integration — reach out and we&apos;ll get back to you promptly.</p>

          <div className="contact-detail">
            <div className="contact-detail-icon">{'\u2709'}</div>
            <div className="contact-detail-text">
              <h4>Email</h4>
              <p>info@ribeon.com</p>
            </div>
          </div>

          <div className="contact-detail">
            <div className="contact-detail-icon">{'\uD83D\uDCBC'}</div>
            <div className="contact-detail-text">
              <h4>LinkedIn</h4>
              <p><a href="https://www.linkedin.com/in/kimon-dafnas-0b8656202/" target="_blank" rel="noopener" style={{ color: 'var(--blue-bright)', textDecoration: 'none' }}>Kimon Dafnas</a></p>
              <p><a href="https://thomasrribeiro.com/" target="_blank" rel="noopener" style={{ color: 'var(--blue-bright)', textDecoration: 'none' }}>Thomas Ribeiro</a></p>
            </div>
          </div>
        </div>

        {sent ? (
          <div className="contact-form" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: 'var(--teal)', fontFamily: 'var(--font-display)', fontSize: '16px' }}>
              Thank you for your message! We&apos;ll be in touch shortly.
            </p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Organization</label>
              <input type="text" placeholder="Company or institution" value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Interest</label>
              <select value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })}>
                <option value="">Select a topic</option>
                <option>Federal Contract Spending Dataset</option>
                <option>Weather Commodity Signals</option>
                <option>Federal Housing &amp; Construction</option>
                <option>Custom Dataset Request</option>
                <option>General Inquiry</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Tell us about your data needs..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
            </div>
            <button type="submit" className="form-submit" disabled={submitting}>
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </>
  )
}
