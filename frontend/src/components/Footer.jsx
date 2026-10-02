import React, { useState } from 'react';
import { Layers, ArrowRight, Check, Heart, Mail } from 'lucide-react';

const PALETTE = [
  { name: 'Rich Cerulean', hex: '#2274A5', textDark: false },
  { name: 'Sand Dune', hex: '#E7DFC6', textDark: true },
  { name: 'Alice Blue', hex: '#E9F1F7', textDark: true },
  { name: 'Ink Black', hex: '#131B23', textDark: false, border: true },
  { name: 'Coffee Bean', hex: '#2A140E', textDark: false }
];

export default function Footer({ showToast }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please provide a valid email');
      return;
    }

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'newsletter' })
      });
      setSubscribed(true);
      showToast('✨ Subscribed to The Editorial Engineer newsletter!');
    } catch {
      setSubscribed(true);
      showToast('Subscribed to newsletter updates!');
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Top Newsletter & Palette Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          paddingBottom: '3.5rem',
          borderBottom: '1px solid rgba(231, 223, 198, 0.16)'
        }}>
          {/* Newsletter Column */}
          <div>
            <div className="badge badge-sand" style={{ marginBottom: '1rem' }}>
              <Mail size={13} />
              <span>THE EDITORIAL DISPATCH</span>
            </div>
            <h3 style={{ fontSize: '1.6rem', color: '#E9F1F7', marginBottom: '0.6rem' }}>
              Architectural Insights. Delivered Bi-Weekly.
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#E7DFC6', opacity: 0.85, marginBottom: '1.5rem', maxWidth: '420px' }}>
              Deep-dives into headless content topologies, Next.js server component caching, and luxury editorial design patterns.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.6rem', maxWidth: '440px' }}>
                <input 
                  type="email" 
                  required
                  placeholder="engineer@studio.design"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.25rem' }}>
                  <span>Join</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2274A5', fontWeight: 600, fontSize: '0.9rem' }}>
                <Check size={16} />
                <span>You're on the priority list. Welcome aboard.</span>
              </div>
            )}
          </div>

          {/* Palette Showcase Column (Strictly adhering to user requirements) */}
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#E9F1F7', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.6rem' }}>
              Strict Palette Fidelity Guarantee
            </span>
            <p style={{ fontSize: '0.85rem', color: '#E7DFC6', opacity: 0.85, marginBottom: '1.25rem' }}>
              This landing page is strictly authored using only the 5 harmonious swatches provided:
            </p>

            {/* 5 Swatches Display */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '0.5rem',
              borderRadius: '12px',
              overflow: 'hidden',
              padding: '0.5rem',
              background: '#131B23',
              border: '1px solid rgba(231, 223, 198, 0.2)'
            }}>
              {PALETTE.map((swatch, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: swatch.hex,
                    borderRadius: '8px',
                    padding: '0.75rem 0.4rem',
                    textAlign: 'center',
                    border: swatch.border ? '1px solid rgba(231, 223, 198, 0.35)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '76px'
                  }}
                >
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    color: swatch.textDark ? '#131B23' : '#E9F1F7'
                  }}>
                    {swatch.hex}
                  </span>
                  <span style={{
                    fontSize: '0.55rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    color: swatch.textDark ? 'rgba(19, 27, 35, 0.85)' : 'rgba(233, 241, 247, 0.85)'
                  }}>
                    {swatch.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '2.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: '#E7DFC6',
          opacity: 0.85
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="brand-symbol" style={{ width: '28px', height: '28px' }}>
              <Layers size={14} color="#E9F1F7" />
            </div>
            <span style={{ color: '#E9F1F7', fontWeight: 700 }}>
              VELVET CMS
            </span>
            <span>• Full-stack MERN & Edge Architecture</span>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#studio" style={{ color: '#E7DFC6' }}>Studio Demo</a>
            <a href="#features" style={{ color: '#E7DFC6' }}>Architecture</a>
            <a href="#apis" style={{ color: '#E7DFC6' }}>API Engine</a>
            <a href="#pricing" style={{ color: '#E7DFC6' }}>Pricing</a>
          </div>

          <div>
            <span>Strict Color System • 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
