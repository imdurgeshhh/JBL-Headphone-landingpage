import { useState, useEffect, useCallback } from 'react';
import { useImagePreloader, useScrollProgress } from './hooks/useScrollAnimation';
import Navbar from './components/Navbar/Navbar';
import ScrollCanvas from './components/ScrollCanvas/ScrollCanvas';
import HeroSection from './components/Sections/HeroSection';
import EngineeringSection from './components/Sections/EngineeringSection';
import BatterySection from './components/Sections/BatterySection';
import CustomizationSection from './components/Sections/CustomizationSection';
import CTASection from './components/Sections/CTASection';
import Footer from './components/Footer/Footer';
import './App.css';

const NAV_THRESHOLD = 100;

// Section ranges for active nav detection
const SECTION_RANGES = [
  { id: 'hero',          start: 0.00, end: 0.15 },
  { id: 'engineering',   start: 0.15, end: 0.40 },
  { id: 'battery',       start: 0.40, end: 0.65 },
  { id: 'customization', start: 0.65, end: 0.85 },
  { id: 'cta',           start: 0.85, end: 1.00 },
];

function App() {
  const { images, ready } = useImagePreloader();
  const { progress, scrollTop, containerRef } = useScrollProgress();
  const [navVisible, setNavVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Nav visibility
  useEffect(() => {
    setNavVisible(scrollTop > NAV_THRESHOLD);
  }, [scrollTop]);

  // Active section tracking by scroll progress
  useEffect(() => {
    for (const section of SECTION_RANGES) {
      if (progress >= section.start && progress < section.end) {
        setActiveSection(section.id);
        break;
      }
    }
    // Handle 100% scroll
    if (progress >= 0.98) {
      setActiveSection('cta');
    }
  }, [progress]);

  return (
    <>
      <Navbar
        visible={navVisible}
        activeSection={activeSection}
        containerRef={containerRef}
      />

      <ScrollCanvas
        images={images}
        ready={ready}
        progress={progress}
      />

      <div className="scroll-container" id="scroll-container" ref={containerRef}>
        <HeroSection />
        <EngineeringSection />
        <BatterySection />
        <CustomizationSection />
        <CTASection />
      </div>

      <Footer />
    </>
  );
}

export default App;
