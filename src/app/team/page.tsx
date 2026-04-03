import Link from 'next/link'
import { AnimateIn } from '@/components/AnimateIn'

export default function Team() {
  return (
    <>
      <div className="page-header">
        <h1>Our <span>Team</span></h1>
        <p>Ribeon was founded by two domain experts who combine quantitative finance and engineering to build next-generation alternative data products.</p>
      </div>

      <div className="team-grid">
        <AnimateIn>
          <div className="team-card">
            <div className="team-avatar">KD</div>
            <h3>Kimon Dafnas</h3>
            <div className="team-role">Co-Founder &amp; CEO</div>
            <div className="team-education">MSc Quantitative Finance</div>
            <p className="team-bio">Kimon leads Ribeon&apos;s vision and strategy, bringing deep expertise in quantitative finance to the design of institutional-grade alternative datasets. His background in financial modeling and data-driven research underpins the rigorous methodology behind every Ribeon product.</p>
            <a href="https://www.linkedin.com/in/kimon-dafnas-0b8656202/" target="_blank" rel="noopener" className="linkedin-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              View Profile
            </a>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.07}>
          <div className="team-card">
            <div className="team-avatar">TR</div>
            <h3>Thomas Ribeiro</h3>
            <div className="team-role">Co-Founder &amp; CTO</div>
            <div className="team-education">MSc Biomedical Engineering</div>
            <p className="team-bio">Thomas brings a unique engineering perspective to Ribeon, applying the precision and analytical rigor of biomedical engineering to complex data pipelines. His expertise in systems design and signal processing drives the technical infrastructure powering Ribeon&apos;s datasets.</p>
            <a href="https://thomasrribeiro.com/" target="_blank" rel="noopener" className="linkedin-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              View Profile
            </a>
          </div>
        </AnimateIn>
      </div>

      <section className="cta-band">
        <AnimateIn>
          <h2><em>Join the team</em></h2>
        </AnimateIn>
        <AnimateIn delay={0.07}>
          <p>We&apos;re building the future of alternative data. Reach out if you&apos;re interested in what we&apos;re creating.</p>
        </AnimateIn>
        <AnimateIn delay={0.14}>
          <Link className="btn-primary" href="/contact" style={{ position: 'relative', zIndex: 1 }}>Get in Touch &rarr;</Link>
        </AnimateIn>
      </section>
    </>
  )
}
