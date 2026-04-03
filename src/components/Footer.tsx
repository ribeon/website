import Image from 'next/image'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Image src="/logo-footer.png" alt="Ribeon" width={120} height={36} className="footer-logo" />
          <p>Redefining data management for institutional decision-making.</p>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <a href="mailto:info@ribeon.com">info@ribeon.com</a>
          <div className="social-links">
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="X / Twitter">{'\uD835\uDD4F'}</a>
          </div>
        </div>
        <div className="footer-legal">
          <h4>Legal</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Accessibility Statement</a>
        </div>
      </div>
      <div className="footer-bottom">&copy; 2026 Ribeon Inc. All rights reserved.</div>
    </footer>
  )
}
