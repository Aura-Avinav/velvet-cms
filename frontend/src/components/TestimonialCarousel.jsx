import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star, Play, Pause, TrendingUp } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "Velvet CMS is the first platform where our creative directors didn't feel handcuffed by developer schemas, and our frontend engineers never had to compromise on strict GraphQL type definitions. The Rich Cerulean and Sand Dune aesthetic is just sublime.",
    author: "Julian Vance",
    role: "Design Director",
    company: "Atelier Monolith (London & Paris)",
    initials: "JV",
    metricLabel: "Publishing Velocity",
    metricValue: "+340%",
    accent: "cerulean"
  },
  {
    quote: "We migrated 18 digital publications to Velvet's MERN-powered edge engine. Our median cache hit ratio jumped to 99.4%, and we cut our CDN infrastructure costs by 62% in the first quarter alone.",
    author: "Dr. Priya Nambiar",
    role: "VP of Engineering",
    company: "Lumina Global Media",
    initials: "PN",
    metricLabel: "Median Global Latency",
    metricValue: "36ms",
    accent: "sand"
  },
  {
    quote: "The visual block studio gave our editorial staff superpowers. They can assemble bespoke longform features in minutes without requesting single-page template pull requests from engineering.",
    author: "Alexandre Moreau",
    role: "Head of Digital Architecture",
    company: "Cerulean & Co. Publishing",
    initials: "AM",
    metricLabel: "Editorial Output",
    metricValue: "4.8x",
    accent: "coffee"
  },
  {
    quote: "The Next.js 15 App Router integration was seamless. Having zero-bundle-size server components hydrate with live studio edits in preview mode made our engineering team fall in love instantly.",
    author: "Sarah Lin",
    role: "Principal Frontend Architect",
    company: "Hyperion Digital Studio",
    initials: "SL",
    metricLabel: "Time-to-Production",
    metricValue: "-70%",
    accent: "cerulean"
  }
];

export default function TestimonialCarousel() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setCurrentIdx(prev => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const item = TESTIMONIALS[currentIdx];

  return (
    <section id="testimonials" className="testimonial-section">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge badge-sand" style={{ marginBottom: '1rem' }}>
            <Star size={14} fill="#2274A5" color="#2274A5" />
            <span>VERIFIED CASE STUDIES & TESTIMONIALS</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', marginBottom: '0.75rem' }}>
            Trusted by the World's Leading Publishers
          </h2>
          <p style={{ maxWidth: '620px', margin: '0 auto', color: '#E7DFC6', opacity: 0.85 }}>
            Discover how visionary media companies and design agencies transform their publishing 
            cadence with Velvet CMS.
          </p>
        </div>

        {/* Carousel Box */}
        <div className="carousel-container">
          <div className="testimonial-card">
            {/* Top Row: Metric & AutoPlay Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(34, 116, 165, 0.15)',
                padding: '0.4rem 0.9rem',
                borderRadius: '999px',
                border: '1px solid rgba(34, 116, 165, 0.4)',
                color: '#E9F1F7',
                fontSize: '0.8rem',
                fontWeight: 700
              }}>
                <TrendingUp size={15} color="#2274A5" />
                <span>{item.metricLabel}: <strong style={{ color: '#E9F1F7' }}>{item.metricValue}</strong></span>
              </div>

              <button 
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
                title={isAutoPlaying ? 'Pause rotation' : 'Resume auto rotation'}
              >
                {isAutoPlaying ? <Pause size={12} color="#E7DFC6" /> : <Play size={12} color="#2274A5" />}
                <span style={{ color: '#E7DFC6' }}>{isAutoPlaying ? 'Auto' : 'Paused'}</span>
              </button>
            </div>

            {/* Large Quote Mark */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <Quote size={40} color="#2274A5" style={{ opacity: 0.85 }} />
            </div>

            {/* Quote Body */}
            <p className="testimonial-quote">
              "{item.quote}"
            </p>

            {/* Author Profile */}
            <div className="testimonial-author-box">
              <div className="author-avatar" style={{
                borderColor: (item.accent === 'cerulean' || item.accent === 'bordeaux') ? '#2274A5' : item.accent === 'sand' ? '#E7DFC6' : '#2A140E'
              }}>
                {item.initials}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: '#E9F1F7' }}>
                  {item.author}
                </div>
                <div style={{ fontSize: '0.825rem', color: '#E7DFC6', opacity: 0.85 }}>
                  {item.role} • <span style={{ color: '#2274A5' }}>{item.company}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Nav Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '2rem'
          }}>
            <button 
              onClick={handlePrev}
              className="btn btn-secondary btn-sm"
              style={{ width: '42px', height: '42px', padding: 0, borderRadius: '50%' }}
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={20} color="#E9F1F7" />
            </button>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  style={{
                    width: idx === currentIdx ? '28px' : '9px',
                    height: '9px',
                    borderRadius: '999px',
                    background: idx === currentIdx ? '#2274A5' : 'rgba(231, 223, 198, 0.3)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="btn btn-secondary btn-sm"
              style={{ width: '42px', height: '42px', padding: 0, borderRadius: '50%' }}
              aria-label="Next Testimonial"
            >
              <ChevronRight size={20} color="#E9F1F7" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
