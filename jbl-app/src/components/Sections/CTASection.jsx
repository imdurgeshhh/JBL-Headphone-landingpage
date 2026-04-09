import ScrollSection, { AnimatedElement } from '../ScrollSection/ScrollSection';

export default function CTASection() {
  return (
    <ScrollSection id="cta" align="center">
      {(isVisible) => (
        <>
          <AnimatedElement animation="fade-up" delay={0} isVisible={isVisible}>
            <h2 className="section__headline section__headline--cta">
              Hear everything.<br /><span className="text-gradient">Feel the bass.</span>
            </h2>
          </AnimatedElement>

          <AnimatedElement animation="fade-up" delay={100} isVisible={isVisible}>
            <p className="section__subheadline">
              JBL Tune 720BT. Lightweight. Powerful. Yours.
            </p>
          </AnimatedElement>

          <AnimatedElement animation="fade-up" delay={200} isVisible={isVisible}>
            <div className="section__cta-group">
              <a href="#" className="btn btn--primary" id="cta-shop">
                Shop JBL Tune 720BT
              </a>
              <a href="#" className="btn btn--ghost" id="cta-specs">
                See full specs
              </a>
            </div>
          </AnimatedElement>

          <AnimatedElement animation="fade-up" delay={350} isVisible={isVisible}>
            <p className="section__micro">
              Bluetooth 5.3 · 76Hr Battery · Pure Bass · SpeedCharge
            </p>
          </AnimatedElement>
        </>
      )}
    </ScrollSection>
  );
}
