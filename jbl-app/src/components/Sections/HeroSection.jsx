import ScrollSection, { AnimatedElement } from '../ScrollSection/ScrollSection';

export default function HeroSection() {
  return (
    <ScrollSection id="hero" align="center">
      {(isVisible) => (
        <>
          <AnimatedElement animation="fade-up" delay={0} isVisible={isVisible}>
            <p className="section__eyebrow">Introducing</p>
          </AnimatedElement>

          <AnimatedElement animation="fade-up" delay={100} isVisible={isVisible}>
            <h1 className="section__headline section__headline--hero">
              JBL Tune 720BT
            </h1>
          </AnimatedElement>

          <AnimatedElement animation="fade-up" delay={200} isVisible={isVisible}>
            <p className="section__subheadline">
              Feel the bass. Own the moment.
            </p>
          </AnimatedElement>

          <AnimatedElement animation="fade-up" delay={300} isVisible={isVisible}>
            <p className="section__body">
              Wireless freedom meets Pure Bass Sound —<br />
              engineered for 76 hours of uninterrupted music.
            </p>
          </AnimatedElement>

          <AnimatedElement animation="fade-up" delay={500} isVisible={isVisible}>
            <div className="scroll-indicator">
              <div className="scroll-indicator__track">
                <div className="scroll-indicator__thumb" />
              </div>
              <span className="scroll-indicator__label">Scroll to explore</span>
            </div>
          </AnimatedElement>
        </>
      )}
    </ScrollSection>
  );
}
