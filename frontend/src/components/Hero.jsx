import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Terminal, ShieldCheck, Zap, Globe, Cpu } from 'lucide-react';

export default function Hero({ onOpenDemo }) {
  const [stats, setStats] = useState({
    uptime: '99.99%',
    apiLatency: '38ms',
    monthlyQueries: '14.8M+',
    customerRating: '4.95 / 5.0'
  });

  useEffect(() => {
    // Attempt live fetch from MERN backend
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.uptime) setStats(data);
      })
      .catch(() => {
        // Keeps graceful default stats
      });
  }, []);

  return (
    <section className="hero-section">
      <div className="container">
        {/* Luxury Pill Tag */}
        <div className="hero-pill-tag">
          <div className="badge badge-bordeaux" style={{ padding: '0.45rem 1.1rem', fontSize: '0.78rem' }}>
            <Sparkles size={14} color="#7A9B76" />
            <span>VELVET 3.4 • UNIFYING HEADLESS CMS WITH LIVE VISUAL STUDIO</span>
          </div>
        </div>

        {/* Main Grand Headline */}
        <h1 className="hero-title">
          The Content Engine for{' '}
          <span className="gradient-text-bordeaux">Disciplined Designers</span>{' '}
          & Engineers.
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Eliminate the friction between rigid templates and developer workflows. Velvet unifies 
          an ultra-fast <strong style={{ color: '#7A9B76' }}>GraphQL & REST edge engine</strong> with a 
          rich, real-time <strong style={{ color: '#C8BFC7' }}>visual block editor</strong> crafted with surgical aesthetic precision.
        </p>

        {/* Action Buttons */}
        <div className="hero-actions">
          <a href="#studio" className="btn btn-primary btn-lg">
            <span>Explore Interactive Studio</span>
            <ArrowRight size={18} />
          </a>
          <a href="#apis" className="btn btn-secondary btn-lg">
            <Terminal size={18} color="#C8BFC7" />
            <span>Developer API Playground</span>
          </a>
          <button onClick={onOpenDemo} className="btn btn-bordeaux btn-lg">
            <ShieldCheck size={18} color="#C8BFC7" />
            <span>Request Enterprise Access</span>
          </button>
        </div>

        {/* Metrics Strip */}
        <div className="metrics-strip">
          <div className="metric-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
              <Zap size={18} color="#7A9B76" />
              <span className="metric-num">{stats.apiLatency}</span>
            </div>
            <span className="metric-label">Median Edge Latency</span>
          </div>

          <div className="metric-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
              <ShieldCheck size={18} color="#7A9B76" />
              <span className="metric-num">{stats.uptime}</span>
            </div>
            <span className="metric-label">Guaranteed Edge SLA</span>
          </div>

          <div className="metric-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
              <Globe size={18} color="#7A9B76" />
              <span className="metric-num">{stats.monthlyQueries}</span>
            </div>
            <span className="metric-label">Monthly Content Queries</span>
          </div>

          <div className="metric-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
              <Cpu size={18} color="#7A9B76" />
              <span className="metric-num">{stats.customerRating}</span>
            </div>
            <span className="metric-label">Developer Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
}
