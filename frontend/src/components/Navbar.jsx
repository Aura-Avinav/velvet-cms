import React, { useState, useEffect } from 'react';
import { Layers, Sparkles, Terminal, Activity, ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenDemo }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="site-nav" style={{
      borderColor: scrolled ? 'rgba(34, 116, 165, 0.5)' : 'rgba(231, 223, 198, 0.15)',
      boxShadow: scrolled ? '0 10px 30px rgba(19, 27, 35, 0.95)' : 'none'
    }}>
      <div className="container nav-inner">
        {/* Brand Logo */}
        <a href="#" className="brand-logo">
          <div className="brand-symbol">
            <Layers size={20} color="#E9F1F7" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#E9F1F7', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              VELVET<span style={{ color: '#2274A5' }}>.CMS</span>
            </span>
            <span style={{ fontSize: '0.65rem', color: '#E7DFC6', opacity: 0.85, fontWeight: 500, letterSpacing: '0.08em' }}>
              HEADLESS & STUDIO
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <ul className="nav-links">
          <li><a href="#studio" className="nav-link-item">Studio Demo</a></li>
          <li><a href="#features" className="nav-link-item">Architecture</a></li>
          <li><a href="#apis" className="nav-link-item">API Engine</a></li>
          <li><a href="#pricing" className="nav-link-item">Pricing</a></li>
          <li><a href="#testimonials" className="nav-link-item">Case Studies</a></li>
        </ul>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="status-pill" title="MERN Edge Backend connected">
            <span className="pulse-dot"></span>
            <span>Edge v3.4 Active</span>
          </div>

          <button 
            className="btn btn-primary btn-sm"
            onClick={onOpenDemo}
            style={{ fontWeight: 600 }}
          >
            <span>Book Live Demo</span>
            <ArrowRight size={14} />
          </button>

          {/* Mobile hamburger button */}
          <button 
            className="btn btn-secondary btn-sm" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'inline-flex', padding: '0.45rem' }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={18} color="#E9F1F7" /> : <Menu size={18} color="#E9F1F7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: '#131B23',
          borderBottom: '1px solid rgba(34, 116, 165, 0.5)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}>
          <a href="#studio" onClick={() => setMobileMenuOpen(false)} style={{ color: '#E9F1F7', fontWeight: 600 }}>Studio Demo</a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)} style={{ color: '#E9F1F7', fontWeight: 600 }}>Architecture</a>
          <a href="#apis" onClick={() => setMobileMenuOpen(false)} style={{ color: '#E9F1F7', fontWeight: 600 }}>API Engine</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)} style={{ color: '#E9F1F7', fontWeight: 600 }}>Pricing</a>
          <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} style={{ color: '#E9F1F7', fontWeight: 600 }}>Case Studies</a>
          <button 
            className="btn btn-primary btn-sm" 
            onClick={() => { setMobileMenuOpen(false); onOpenDemo(); }}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            Reserve VIP Access
          </button>
        </div>
      )}
    </header>
  );
}
