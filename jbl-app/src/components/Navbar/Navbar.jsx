import { useCallback } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { id: 'hero', label: 'Overview' },
  { id: 'engineering', label: 'Pure Bass' },
  { id: 'battery', label: 'Battery' },
  { id: 'customization', label: 'Specs' },
  { id: 'cta', label: 'Buy' },
];

const SECTION_OFFSETS = {
  hero: 0.0,
  engineering: 0.18,
  battery: 0.43,
  customization: 0.68,
  cta: 0.88,
};

export default function Navbar({ visible, activeSection, containerRef }) {
  const scrollTo = useCallback((sectionId) => {
    const container = containerRef?.current;
    if (!container) return;
    const maxScroll = container.scrollHeight - window.innerHeight;
    const target = (SECTION_OFFSETS[sectionId] || 0) * maxScroll;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }, [containerRef]);

  return (
    <nav
      id="main-nav"
      className={`nav ${visible ? 'nav--visible' : ''}`}
      aria-label="Primary navigation"
    >
      <div className="nav__inner">
        {/* Brand */}
        <a href="#" className="nav__brand" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
          <svg className="nav__logo" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="url(#logo-grad)" strokeWidth="2" />
            <text x="16" y="21" textAnchor="middle" fill="url(#logo-grad)" fontSize="12" fontWeight="800" fontFamily="Inter, sans-serif">JBL</text>
            <defs>
              <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32">
                <stop offset="0%" stopColor="#FF6B00" />
                <stop offset="100%" stopColor="#FFB700" />
              </linearGradient>
            </defs>
          </svg>
          <span className="nav__title">JBL Tune 720BT</span>
        </a>

        {/* Links */}
        <ul className="nav__links">
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`nav__link ${activeSection === id ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); scrollTo(id); }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#cta"
          className="nav__cta"
          onClick={(e) => { e.preventDefault(); scrollTo('cta'); }}
        >
          Experience JBL Tune 720BT
        </a>
      </div>
    </nav>
  );
}
