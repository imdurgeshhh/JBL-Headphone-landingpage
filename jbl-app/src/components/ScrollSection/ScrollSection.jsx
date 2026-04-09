import { useRef, useEffect, useState } from 'react';
import './ScrollSection.css';

/**
 * AnimatedElement — animates children with fade-up/fade-left/fade-right
 * when the parent section becomes visible.
 */
export function AnimatedElement({ animation = 'fade-up', delay = 0, isVisible, children, className = '' }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShow(true), delay);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isVisible, delay]);

  return (
    <div
      className={`animate animate--${animation} ${show ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * ScrollSection — a viewport-height section that detects when it's
 * in the viewport center and reveals its animated children.
 */
export default function ScrollSection({ id, align = 'center', children, glowPosition }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const active = rect.top < viewportCenter + 150 && rect.bottom > viewportCenter - 150;
      setIsVisible(active);
    };

    window.addEventListener('scroll', check, { passive: true });
    check();
    return () => window.removeEventListener('scroll', check);
  }, []);

  const contentClass = `section__content section__content--${align}`;

  return (
    <section
      ref={sectionRef}
      className={`scroll-section ${glowPosition ? `glow-${glowPosition}` : ''}`}
      id={id}
    >
      <div className={contentClass}>
        {typeof children === 'function' ? children(isVisible) : children}
      </div>
    </section>
  );
}
