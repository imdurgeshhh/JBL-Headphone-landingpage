import ScrollSection, { AnimatedElement } from '../ScrollSection/ScrollSection';

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="#FF6B00" strokeWidth="1.5" />
    <path d="M6 8l1.5 1.5L10 6.5" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FEATURES = ['Custom EQ', 'Dual Pairing', 'HD Mic', 'JBL App'];

export default function CustomizationSection() {
  return (
    <ScrollSection id="customization" align="left">
      {(isVisible) => (
        <>
          <AnimatedElement animation="fade-right" delay={0} isVisible={isVisible}>
            <span className="badge">Your Sound</span>
          </AnimatedElement>

          <AnimatedElement animation="fade-right" delay={100} isVisible={isVisible}>
            <h2 className="section__headline">
              Your sound.<br /><span className="text-gradient">Your rules.</span>
            </h2>
          </AnimatedElement>

          <AnimatedElement animation="fade-right" delay={200} isVisible={isVisible}>
            <p className="section__body">
              The JBL Headphones App lets you customize bass levels,
              EQ settings, and ambient sound to match your mood.
            </p>
          </AnimatedElement>

          <AnimatedElement animation="fade-right" delay={300} isVisible={isVisible}>
            <p className="section__body">
              Built-in mic ensures crystal-clear calls — whether you're
              at your desk or on the move.
            </p>
          </AnimatedElement>

          <AnimatedElement animation="fade-right" delay={400} isVisible={isVisible}>
            <p className="section__body">
              Dual Pairing lets you stay connected to two devices at once —
              laptop and phone, always ready.
            </p>
          </AnimatedElement>

          <AnimatedElement animation="fade-right" delay={500} isVisible={isVisible}>
            <div className="section__features">
              {FEATURES.map((feature) => (
                <div className="feature-pill" key={feature}>
                  <CheckIcon />
                  {feature}
                </div>
              ))}
            </div>
          </AnimatedElement>
        </>
      )}
    </ScrollSection>
  );
}
