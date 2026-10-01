import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StudioMock from './components/StudioMock';
import FeatureGrid from './components/FeatureGrid';
import CodePlayground from './components/CodePlayground';
import PricingCalculator from './components/PricingCalculator';
import TestimonialCarousel from './components/TestimonialCarousel';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import { CheckCircle2, Sparkles, Bell } from 'lucide-react';

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  return (
    <div className="velvet-app-root" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background Atmosphere Elements */}
      <div className="bg-grid-pattern"></div>
      <div className="bg-ambient-orb orb-bordeaux-1"></div>
      <div className="bg-ambient-orb orb-sage-1"></div>
      <div className="bg-ambient-orb orb-bordeaux-2"></div>

      {/* Main Navigation */}
      <Navbar onOpenDemo={() => setIsDemoModalOpen(true)} />

      {/* Hero Section */}
      <Hero onOpenDemo={() => setIsDemoModalOpen(true)} />

      {/* Interactive CMS Studio Mock (Visual + Headless) */}
      <StudioMock showToast={showToast} />

      {/* Platform Architecture & Features */}
      <FeatureGrid />

      {/* Developer API Playground & Code Switcher */}
      <CodePlayground showToast={showToast} />

      {/* Interactive Pricing Calculator */}
      <PricingCalculator onOpenDemo={() => setIsDemoModalOpen(true)} />

      {/* Customer Testimonials & Case Studies Carousel */}
      <TestimonialCarousel />

      {/* Footer with Strict Palette Showcase & Newsletter */}
      <Footer showToast={showToast} />

      {/* Interactive VIP Demo Booking Modal */}
      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
        showToast={showToast} 
      />

      {/* Live Toast Feedback Notice */}
      {toastMessage && (
        <div className="toast-notice">
          <CheckCircle2 size={18} color="#7A9B76" />
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
