import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, Zap, Database, ArrowRight } from 'lucide-react';

const SNIPPETS = {
  graphql: {
    label: 'GraphQL Query',
    tag: 'GRAPHQL EDGE',
    lang: 'graphql',
    code: `query GetCuratedEditorial($slug: String!) {
  editorial(slug: $slug) {
    id
    title
    publishedAt
    author {
      name
      role
      avatar
    }
    blocks {
      __typename
      ... on HeroBlock {
        headline
        badge
        cta { label url }
      }
      ... on ArticleBlock {
        body
        accentTheme
      }
    }
  }
}`
  },
  rest: {
    label: 'REST API v2',
    tag: 'cURL / HTTP',
    lang: 'bash',
    code: `curl -X GET "https://api.velvetcms.io/v2/content/pages/home-preview" \\
  -H "Authorization: Bearer sec_live_bordeaux_sage_9a7" \\
  -H "Accept: application/json" \\
  -H "Cache-Control: max-age=60, s-maxage=3600"`
  },
  typescript: {
    label: 'TypeScript SDK',
    tag: 'TYPE-SAFE SDK',
    lang: 'typescript',
    code: `import { VelvetClient } from '@velvet/sdk';

const velvet = new VelvetClient({
  apiKey: process.env.VELVET_API_KEY,
  environment: 'production',
  cache: 'edge-first'
});

// Full TypeScript type safety generated from your visual models
const page = await velvet.pages.getBySlug('autumn-editorial-2026', {
  includeDrafts: false,
  locale: 'en-US'
});

console.log(page.blocks.map(b => b.title));`
  },
  nextjs: {
    label: 'Next.js 15 App Router',
    tag: 'SERVER COMPONENT',
    lang: 'tsx',
    code: `// app/editorial/[slug]/page.tsx
import { VelvetLiveStudio } from '@velvet/react';
import { getEditorialData } from '@/lib/velvet';

export default async function EditorialPage({ params }: { params: { slug: string } }) {
  const content = await getEditorialData(params.slug);

  return (
    <main className="velvet-container">
      {/* Renders server-side with zero JS overhead, enables visual block editing in draft mode */}
      <VelvetLiveStudio 
        data={content} 
        themePalette="editorial-dark" 
      />
    </main>
  );
}`
  }
};

export default function CodePlayground({ showToast }) {
  const [activeTab, setActiveTab] = useState('graphql');
  const [copied, setCopied] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);

  const currentSnippet = SNIPPETS[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast(`Copied ${currentSnippet.label} to clipboard`);
  };

  const handleExecuteLive = async () => {
    setIsExecuting(true);
    const start = performance.now();
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      const end = performance.now();
      const latency = Math.round(end - start);

      setExecutionResult({
        latency: `${latency}ms`,
        status: '200 OK (MERN Edge Node)',
        data: {
          status: data.status,
          engine: data.engine,
          database: data.database,
          edgeLocation: 'iad1-edge-worker',
          queryTimestamp: data.timestamp
        }
      });
      showToast(`Live query resolved in ${latency}ms`);
    } catch {
      setExecutionResult({
        latency: '42ms',
        status: '200 OK (Simulated Edge)',
        data: {
          status: 'online',
          engine: 'Bordeaux-Sage CMS Core v3.4.2',
          database: 'in-memory-engine',
          edgeLocation: 'iad1-edge-worker'
        }
      });
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <section id="apis" className="api-section">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge badge-bordeaux" style={{ marginBottom: '1rem' }}>
            <Terminal size={14} color="#7A9B76" />
            <span>DEVELOPER-FIRST API ENGINE</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', marginBottom: '0.75rem' }}>
            Query Any Block. In Any Language.
          </h2>
          <p style={{ maxWidth: '650px', margin: '0 auto', color: '#8A7E72' }}>
            Every content block you design in the studio is instantly available via high-throughput 
            GraphQL endpoints, REST APIs, or typed TypeScript SDKs.
          </p>
        </div>

        {/* Code Terminal Box */}
        <div className="code-terminal">
          {/* Header & Tabs */}
          <div className="terminal-header">
            <div className="terminal-tabs">
              {Object.keys(SNIPPETS).map((key) => (
                <button
                  key={key}
                  onClick={() => { setActiveTab(key); setExecutionResult(null); }}
                  className={`terminal-tab-btn ${activeTab === key ? 'active' : ''}`}
                >
                  {SNIPPETS[key].label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={handleExecuteLive}
                disabled={isExecuting}
                className="btn btn-primary btn-sm"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                title="Test query against MERN backend"
              >
                <Play size={12} fill="#090302" />
                <span>{isExecuting ? 'Querying...' : 'Test Live API'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
              >
                {copied ? <Check size={13} color="#7A9B76" /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Terminal Code Display */}
          <div style={{ position: 'relative' }}>
            <pre className="code-pre-box">
              <code>{currentSnippet.code}</code>
            </pre>

            <div style={{
              position: 'absolute',
              top: '1rem',
              right: '1.25rem',
              pointerEvents: 'none'
            }}>
              <span className="badge badge-sage" style={{ fontSize: '0.65rem' }}>
                {currentSnippet.tag}
              </span>
            </div>
          </div>

          {/* Live Execution Result Console Drawer */}
          {executionResult && (
            <div style={{
              borderTop: '1px solid rgba(122, 155, 118, 0.3)',
              background: 'rgba(9, 3, 2, 0.96)',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Zap size={15} color="#7A9B76" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#C8BFC7', textTransform: 'uppercase' }}>
                    Live Response
                  </span>
                  <span className="badge badge-sage" style={{ fontSize: '0.65rem' }}>
                    {executionResult.status}
                  </span>
                </div>
                <span style={{ fontSize: '0.78rem', color: '#7A9B76', fontFamily: 'var(--font-mono)' }}>
                  Roundtrip Latency: {executionResult.latency}
                </span>
              </div>

              <pre style={{
                margin: 0,
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                color: '#C8BFC7',
                background: 'rgba(90, 35, 40, 0.25)',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(90, 35, 40, 0.5)',
                overflowX: 'auto'
              }}>
                <code>{JSON.stringify(executionResult.data, null, 2)}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Feature Points Grid below Code Playground */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          marginTop: '2.5rem'
        }}>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7A9B76' }}></div>
              <h4 style={{ fontSize: '1rem', color: '#C8BFC7' }}>Automatic TypeScript Types</h4>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#8A7E72' }}>
              Every schema mutation in the visual studio automatically generates end-to-end typed definitions.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#5A2328' }}></div>
              <h4 style={{ fontSize: '1rem', color: '#C8BFC7' }}>Edge Webhooks & SSR</h4>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#8A7E72' }}>
              Instant cache purging on Vercel, Netlify, Cloudflare Workers, and custom Node clusters.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8A7E72' }}></div>
              <h4 style={{ fontSize: '1rem', color: '#C8BFC7' }}>MERN & MongoDB Native</h4>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#8A7E72' }}>
              Store flexible schemaless block documents with high-throughput indexing and native aggregations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
