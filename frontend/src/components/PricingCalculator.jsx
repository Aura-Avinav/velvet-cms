import React, { useState } from 'react';
import { Check, Sparkles, Zap, Shield, ArrowRight, Sliders } from 'lucide-react';

export default function PricingCalculator({ onOpenDemo }) {
  const [isAnnual, setIsAnnual] = useState(true);
  const [trafficMillions, setTrafficMillions] = useState(2); // in Millions of API queries

  // Dynamic pricing calculation based on slider
  const studioBaseMonthly = 49;
  const studioBaseAnnual = 39;
  const enterpriseBaseMonthly = 199;
  const enterpriseBaseAnnual = 159;

  const studioPrice = isAnnual ? studioBaseAnnual : studioBaseMonthly;
  const enterprisePrice = isAnnual ? enterpriseBaseAnnual : enterpriseBaseMonthly;

  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="badge badge-bordeaux" style={{ marginBottom: '1rem' }}>
            <Zap size={14} color="#7A9B76" />
            <span>TRANSPARENT VALUE ENGINE</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', marginBottom: '0.75rem' }}>
            Predictable Pricing. Limitless Scale.
          </h2>
          <p style={{ maxWidth: '640px', margin: '0 auto', color: '#8A7E72' }}>
            No surprise bandwidth overages. Choose the tier that matches your editorial ambitions, 
            or simulate your monthly API query volume below.
          </p>
        </div>

        {/* Monthly / Annual Toggle */}
        <div className="billing-toggle-wrapper">
          <span style={{ fontSize: '0.925rem', fontWeight: 600, color: !isAnnual ? '#C8BFC7' : '#8A7E72' }}>
            Monthly Billing
          </span>

          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            style={{
              width: '56px',
              height: '30px',
              borderRadius: '999px',
              background: '#090302',
              border: '2px solid #7A9B76',
              position: 'relative',
              padding: '2px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            aria-label="Toggle Annual or Monthly"
          >
            <div style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              background: '#7A9B76',
              transform: isAnnual ? 'translateX(26px)' : 'translateX(0px)',
              transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}></div>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.925rem', fontWeight: 600, color: isAnnual ? '#C8BFC7' : '#8A7E72' }}>
              Annual Billing
            </span>
            <span className="badge badge-sage" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>
              SAVE 20%
            </span>
          </div>
        </div>

        {/* Interactive Query Volume Slider Widget */}
        <div style={{
          maxWidth: '700px',
          margin: '0 auto 3.5rem',
          padding: '1.5rem 2rem',
          background: 'rgba(9, 3, 2, 0.8)',
          border: '1px solid rgba(138, 126, 114, 0.25)',
          borderRadius: '14px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sliders size={16} color="#7A9B76" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#C8BFC7' }}>
                Simulate Monthly API Content Queries:
              </span>
            </div>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#7A9B76', fontFamily: 'var(--font-display)' }}>
              {trafficMillions >= 10 ? '10M+ Queries/mo' : `${trafficMillions}M Queries/mo`}
            </span>
          </div>

          <input 
            type="range" 
            min="1" 
            max="10" 
            step="1"
            value={trafficMillions} 
            onChange={(e) => setTrafficMillions(Number(e.target.value))}
            style={{
              width: '100%',
              accentColor: '#7A9B76',
              cursor: 'pointer',
              height: '6px'
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: '#8A7E72' }}>
            <span>1M Queries (Startup)</span>
            <span>5M Queries (High Growth)</span>
            <span>10M+ Queries (Enterprise)</span>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="pricing-cards-grid">
          {/* Plan 1: Pioneer */}
          <div className="glass-card pricing-card">
            <div>
              <div className="badge badge-olive" style={{ marginBottom: '1rem' }}>
                COMMUNITY
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#C8BFC7' }}>Pioneer</h3>
              <p style={{ fontSize: '0.875rem', color: '#8A7E72', margin: '0.4rem 0 1rem' }}>
                Ideal for solo builders, open source documentation, and personal portfolios.
              </p>
              
              <div className="pricing-amount">$0</div>
              <div className="pricing-period">Forever free for open web projects</div>

              <hr style={{ border: 'none', borderTop: '1px solid rgba(138, 126, 114, 0.2)', margin: '1.75rem 0' }} />

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.875rem', color: '#C8BFC7' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="#7A9B76" />
                  <span>Up to 250,000 API queries / mo</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="#7A9B76" />
                  <span>Interactive Visual Studio Access</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="#7A9B76" />
                  <span>GraphQL & REST API endpoints</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="#7A9B76" />
                  <span>1 Production Workspace</span>
                </li>
              </ul>
            </div>

            <button onClick={onOpenDemo} className="btn btn-secondary" style={{ marginTop: '2rem', width: '100%' }}>
              Deploy Free Sandbox
            </button>
          </div>

          {/* Plan 2: Studio Scale (Featured) */}
          <div className="glass-card pricing-card featured">
            <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)' }}>
              <span className="badge badge-sage" style={{ boxShadow: '0 4px 15px rgba(122, 155, 118, 0.4)' }}>
                MOST POPULAR
              </span>
            </div>

            <div>
              <div className="badge badge-bordeaux" style={{ marginBottom: '1rem' }}>
                PROFESSIONAL
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#C8BFC7' }}>Studio Scale</h3>
              <p style={{ fontSize: '0.875rem', color: '#8A7E72', margin: '0.4rem 0 1rem' }}>
                Designed for scaling agencies, digital magazines, and high-velocity SaaS teams.
              </p>
              
              <div className="pricing-amount">
                ${studioPrice}
                <span className="pricing-period"> / month</span>
              </div>
              <div className="pricing-period">
                {isAnnual ? 'Billed annually ($468/yr)' : 'Billed month-to-month'}
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid rgba(138, 126, 114, 0.2)', margin: '1.75rem 0' }} />

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.875rem', color: '#C8BFC7' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="#7A9B76" />
                  <span><strong>5,000,000</strong> API queries / mo included</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="#7A9B76" />
                  <span>Full Live Visual Studio with History</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="#7A9B76" />
                  <span>Unlimited Schemas & Content Blocks</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="#7A9B76" />
                  <span>10 Team Seats & Role Permissions</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="#7A9B76" />
                  <span>Sub-40ms Edge Cache Invalidation</span>
                </li>
              </ul>
            </div>

            <button onClick={onOpenDemo} className="btn btn-primary" style={{ marginTop: '2rem', width: '100%' }}>
              <span>Start 14-Day Free Trial</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Plan 3: Enterprise Galaxy */}
          <div className="glass-card pricing-card">
            <div>
              <div className="badge badge-olive" style={{ marginBottom: '1rem' }}>
                ENTERPRISE
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#C8BFC7' }}>Enterprise DXP</h3>
              <p style={{ fontSize: '0.875rem', color: '#8A7E72', margin: '0.4rem 0 1rem' }}>
                For global publishers requiring dedicated SLA, custom MongoDB clusters, and compliance.
              </p>
              
              <div className="pricing-amount">
                ${enterprisePrice}
                <span className="pricing-period"> / month</span>
              </div>
              <div className="pricing-period">
                {isAnnual ? 'Billed annually with dedicated account manager' : 'Billed monthly'}
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid rgba(138, 126, 114, 0.2)', margin: '1.75rem 0' }} />

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.875rem', color: '#C8BFC7' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="#7A9B76" />
                  <span><strong>Unlimited</strong> Content Queries & Workspaces</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="#7A9B76" />
                  <span>Dedicated MongoDB Atlas VPC Peering</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="#7A9B76" />
                  <span>99.99% Edge Availability SLA</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="#7A9B76" />
                  <span>Single Sign-On (SAML / Okta)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="#7A9B76" />
                  <span>24/7 Priority Engineering Hotline</span>
                </li>
              </ul>
            </div>

            <button onClick={onOpenDemo} className="btn btn-bordeaux" style={{ marginTop: '2rem', width: '100%' }}>
              Talk to Solutions Architect
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
