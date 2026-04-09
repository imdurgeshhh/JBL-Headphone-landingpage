import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="url(#footer-grad)" strokeWidth="1.5" />
            <text x="16" y="21" textAnchor="middle" fill="url(#footer-grad)" fontSize="12" fontWeight="800" fontFamily="Inter, sans-serif">JBL</text>
            <defs>
              <linearGradient id="footer-grad" x1="0" y1="0" x2="32" y2="32">
                <stop offset="0%" stopColor="#FF6B00" />
                <stop offset="100%" stopColor="#FFB700" />
              </linearGradient>
            </defs>
          </svg>
          <span>JBL by Harman</span>
        </div>
        <div className="footer__links">
          <a href="#">Support</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
        <p className="footer__copy">© 2026 Harman International. All rights reserved.</p>
      </div>
    </footer>
  );
}
