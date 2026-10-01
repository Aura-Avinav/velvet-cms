import React from 'react';
import { 
  Sparkles, Layers, Cpu, ShieldCheck, Zap, Globe, 
  Workflow, GitBranch, RefreshCw, KeyRound, MonitorSmartphone, Database
} from 'lucide-react';

const FEATURES = [
  {
    icon: Layers,
    title: 'Visual Block Studio',
    subtitle: 'Zero Code Bloat',
    desc: 'Empower writers, editors, and marketers with intuitive drag-and-drop block mechanics that maintain strict design system invariants.',
    accent: 'bordeaux',
    badge: 'STUDIO'
  },
  {
    icon: Zap,
    title: 'Sub-40ms Edge Delivery',
    subtitle: 'Global Fast Purge',
    desc: 'Content published in the studio propagates globally in milliseconds across 300+ edge points of presence with stale-while-revalidate caching.',
    accent: 'sage',
    badge: 'PERFORMANCE'
  },
  {
    icon: Database,
    title: 'MERN & Schemaless Core',
    subtitle: 'Flexible MongoDB Storage',
    desc: 'Structured polymorphic documents that effortlessly adapt to new marketing initiatives without expensive database migrations.',
    accent: 'olive',
    badge: 'ARCHITECTURE'
  },
  {
    icon: GitBranch,
    title: 'Branching & Previews',
    subtitle: 'Isolated Production Forks',
    desc: 'Fork entire editorial sites into shareable preview environments. Review revisions with stakeholders before pushing to production edge.',
    accent: 'sage',
    badge: 'COLLABORATION'
  },
  {
    icon: KeyRound,
    title: 'Granular Governance',
    subtitle: 'Enterprise RBAC',
    desc: 'Assign fine-grained field-level permissions. Ensure copywriters only touch copy while developers govern the structural schemas.',
    accent: 'bordeaux',
    badge: 'SECURITY'
  },
  {
    icon: MonitorSmartphone,
    title: 'Omnichannel Publishing',
    subtitle: 'One Source of Truth',
    desc: 'Deliver consistent content to Next.js web applications, native iOS/Android mobile apps, e-commerce storefronts, and IoT displays.',
    accent: 'olive',
    badge: 'OMNICHANNEL'
  }
];

export default function FeatureGrid() {
  return (
    <section id="features" style={{ padding: '5rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="badge badge-sage" style={{ marginBottom: '1rem' }}>
            <Cpu size={14} />
            <span>PLATFORM ARCHITECTURE</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', marginBottom: '0.75rem' }}>
            Engineered for Velocity. Styled for Luxury.
          </h2>
          <p style={{ maxWidth: '680px', margin: '0 auto', color: '#8A7E72' }}>
            Every layer of Velvet CMS was engineered to eliminate technical debt while honoring 
            the aesthetic standards of modern digital publishing houses.
          </p>
        </div>

        {/* 6-Card Feature Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            const isBordeaux = feat.accent === 'bordeaux';
            const isSage = feat.accent === 'sage';

            return (
              <div 
                key={idx} 
                className={`glass-card ${isBordeaux ? 'glass-card-bordeaux' : ''}`}
                style={{
                  padding: '2.25rem',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  {/* Top Bar with Icon and Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: isBordeaux ? 'rgba(90, 35, 40, 0.6)' : isSage ? 'rgba(122, 155, 118, 0.15)' : 'rgba(138, 126, 114, 0.2)',
                      border: `1px solid ${isSage ? '#7A9B76' : isBordeaux ? '#5A2328' : '#8A7E72'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={22} color={isSage ? '#7A9B76' : '#C8BFC7'} />
                    </div>

                    <span className={`badge badge-${feat.accent}`}>
                      {feat.badge}
                    </span>
                  </div>

                  {/* Title and Subtitle */}
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.4rem', color: '#C8BFC7' }}>
                    {feat.title}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: isSage ? '#7A9B76' : '#8A7E72', fontWeight: 600, marginBottom: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {feat.subtitle}
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: '0.925rem', color: '#8A7E72', lineHeight: 1.6 }}>
                    {feat.desc}
                  </p>
                </div>

                <div style={{ marginTop: '1.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(138, 126, 114, 0.15)', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#C8BFC7', fontSize: '0.8rem', fontWeight: 600 }}>
                  <span style={{ color: '#7A9B76' }}>●</span> Production Ready
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
