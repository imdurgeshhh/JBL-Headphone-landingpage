import ScrollSection, { AnimatedElement } from '../ScrollSection/ScrollSection';

export default function EngineeringSection() {
  return (
    <ScrollSection id="engineering" align="left">
      {(isVisible) => (
        <>
          <AnimatedElement animation="fade-right" delay={0} isVisible={isVisible}>
            <span className="badge">Pure Bass Sound</span>
          </AnimatedElement>

          <AnimatedElement animation="fade-right" delay={100} isVisible={isVisible}>
            <h2 className="section__headline">
              Engineered for<br /><span className="text-gradient">Pure Bass.</span>
            </h2>
          </AnimatedElement>

          <AnimatedElement animation="fade-right" delay={200} isVisible={isVisible}>
            <p className="section__body">
              Custom-tuned 40mm drivers deliver deep, powerful bass
              with crystal-clear mids and highs.
            </p>
          </AnimatedElement>

          <AnimatedElement animation="fade-right" delay={300} isVisible={isVisible}>
            <p className="section__body">
              Lightweight folding architecture built for all-day comfort
              without compromising on sound.
            </p>
          </AnimatedElement>

          <AnimatedElement animation="fade-right" delay={400} isVisible={isVisible}>
            <div className="section__stats">
              <div className="stat">
                <span className="stat__value">40<span className="stat__unit">mm</span></span>
                <span className="stat__label">Driver Size</span>
              </div>
              <div className="stat">
                <span className="stat__value">JBL</span>
                <span className="stat__label">Pure Bass</span>
              </div>
              <div className="stat">
                <span className="stat__value">20Hz</span>
                <span className="stat__label">Deep Response</span>
              </div>
            </div>
          </AnimatedElement>
        </>
      )}
    </ScrollSection>
  );
}
