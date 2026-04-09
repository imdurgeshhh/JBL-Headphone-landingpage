import ScrollSection, { AnimatedElement } from '../ScrollSection/ScrollSection';

export default function BatterySection() {
  return (
    <ScrollSection id="battery" align="right">
      {(isVisible) => (
        <>
          <AnimatedElement animation="fade-left" delay={0} isVisible={isVisible}>
            <span className="badge">All-Day Power</span>
          </AnimatedElement>

          <AnimatedElement animation="fade-left" delay={100} isVisible={isVisible}>
            <h2 className="section__headline">
              76 hours.<br /><span className="text-gradient">Never stop listening.</span>
            </h2>
          </AnimatedElement>

          <AnimatedElement animation="fade-left" delay={200} isVisible={isVisible}>
            <p className="section__body">
              Up to 76 hours playtime on a single charge —
              your music, your marathon.
            </p>
          </AnimatedElement>

          <AnimatedElement animation="fade-left" delay={300} isVisible={isVisible}>
            <p className="section__body">
              SpeedCharge technology: 5 minutes charge = 2 hours playback.
            </p>
          </AnimatedElement>

          <AnimatedElement animation="fade-left" delay={400} isVisible={isVisible}>
            <p className="section__body">
              Bluetooth 5.3 with Dual Pairing — switch between two devices
              seamlessly, instantly.
            </p>
          </AnimatedElement>

          <AnimatedElement animation="fade-left" delay={500} isVisible={isVisible}>
            <div className="section__stats">
              <div className="stat">
                <span className="stat__value">76<span className="stat__unit">hr</span></span>
                <span className="stat__label">Battery Life</span>
              </div>
              <div className="stat">
                <span className="stat__value">5<span className="stat__unit">min</span></span>
                <span className="stat__label">SpeedCharge</span>
              </div>
              <div className="stat">
                <span className="stat__value">5.3</span>
                <span className="stat__label">Bluetooth</span>
              </div>
            </div>
          </AnimatedElement>
        </>
      )}
    </ScrollSection>
  );
}
