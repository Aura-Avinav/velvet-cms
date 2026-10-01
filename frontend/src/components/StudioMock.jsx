import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, ArrowUp, ArrowDown, Eye, CheckCircle2, 
  RefreshCw, CloudUpload, Code2, Sparkles, Sliders, Layout, 
  FileText, Quote, Compass, Layers, Check
} from 'lucide-react';

const INITIAL_BLOCKS = [
  {
    id: 'blk-1',
    type: 'hero',
    badge: 'NEW CURATION',
    title: 'Architectures of Modern Stillness',
    subtitle: 'Bespoke editorial storytelling powered by structured headless content graphs and real-time visual canvases.',
    body: 'Crafted for designers, publishers, and modern engineering teams who demand precision and aesthetic discipline.',
    accent: 'bordeaux',
    published: true,
    metrics: { views: 1420, readTime: '4 min read' }
  },
  {
    id: 'blk-2',
    type: 'article',
    badge: 'DEEP DIVE',
    title: 'Decoupled Publishing Without The Complexity',
    subtitle: 'Instant CDN edge previews, sub-millisecond GraphQL queries, and zero layout shift.',
    body: 'Empower writers with WYSIWYG block mechanics while developers consume pure typed JSON with full schema parity across mobile, web, and IoT surfaces.',
    accent: 'sage',
    published: true,
    metrics: { views: 890, readTime: '6 min read' }
  },
  {
    id: 'blk-3',
    type: 'quote',
    badge: 'EDITORIAL SPOTLIGHT',
    title: 'Design as an Operating System',
    subtitle: '"A CMS should elevate your creative voice, not constrain your layout into rigid templates."',
    body: '— Julian Vance, Design Director at Atelier Monolith',
    accent: 'olive',
    published: true,
    metrics: { views: 2310, readTime: '2 min read' }
  }
];

export default function StudioMock({ showToast }) {
  const [blocks, setBlocks] = useState(INITIAL_BLOCKS);
  const [pageTitle, setPageTitle] = useState('Autumn Editorial Collection 2026');
  const [selectedBlockId, setSelectedBlockId] = useState('blk-1');
  const [isSaving, setIsSaving] = useState(false);
  const [version, setVersion] = useState(4);
  const [copiedJson, setCopiedJson] = useState(false);

  // Fetch initial blocks from MERN backend
  useEffect(() => {
    fetch('/api/studio/blocks')
      .then(res => res.json())
      .then(data => {
        if (data && data.blocks && data.blocks.length > 0) {
          setBlocks(data.blocks);
          if (data.title) setPageTitle(data.title);
          if (data.version) setVersion(data.version);
        }
      })
      .catch(() => {
        // Fallback already in place
      });
  }, []);

  const handleUpdateBlock = (id, field, value) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const handleAddBlock = (type) => {
    const newId = `blk-${Date.now()}`;
    const newBlock = {
      id: newId,
      type: type,
      badge: type === 'hero' ? 'HEADLINE' : type === 'quote' ? 'VOICE' : 'INSIGHT',
      title: type === 'hero' ? 'New Architectural Horizon' : type === 'quote' ? '"Elegance is the elimination of the unnecessary."' : 'Modular Content Graphs',
      subtitle: 'Structured metadata dynamic entry point',
      body: 'Seamlessly managed within the visual studio and broadcasted through instantaneous edge webhooks.',
      accent: type === 'hero' ? 'bordeaux' : type === 'quote' ? 'olive' : 'sage',
      published: true,
      metrics: { views: 10, readTime: '3 min read' }
    };

    setBlocks(prev => [...prev, newBlock]);
    setSelectedBlockId(newId);
    showToast('New visual block appended to canvas');
  };

  const handleDeleteBlock = (id) => {
    if (blocks.length <= 1) {
      showToast('At least one content block is required in canvas');
      return;
    }
    setBlocks(prev => prev.filter(b => b.id !== id));
    if (selectedBlockId === id) {
      const remaining = blocks.filter(b => b.id !== id);
      if (remaining.length > 0) setSelectedBlockId(remaining[0].id);
    }
    showToast('Block removed from editorial page');
  };

  const handleMoveBlock = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;
    const updated = [...blocks];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setBlocks(updated);
  };

  const handleSaveToBackend = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/studio/blocks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blocks, title: pageTitle })
      });
      const data = await response.json();
      if (data.success) {
        setVersion(prev => prev + 1);
        showToast('✨ Synced to MERN backend! Edge caches invalidated.');
      } else {
        showToast('Changes stored locally.');
      }
    } catch {
      showToast('Changes committed to client memory.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setBlocks(INITIAL_BLOCKS);
    setSelectedBlockId('blk-1');
    showToast('Reset to default curated layout');
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(blocks, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
    showToast('Content JSON schema copied to clipboard');
  };

  const selectedBlock = blocks.find(b => b.id === selectedBlockId) || blocks[0];

  return (
    <section id="studio" className="studio-section">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="badge badge-sage" style={{ marginBottom: '1rem' }}>
            <Sparkles size={14} />
            <span>LIVE INTERACTIVE CMS STUDIO</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', marginBottom: '0.75rem' }}>
            Visual Studio Power. Headless Precision.
          </h2>
          <p style={{ maxWidth: '680px', margin: '0 auto', color: '#8A7E72' }}>
            Interact with the live studio below. Edit copy inline, reorder blocks, toggle accents, 
            or push changes directly to the Express & Mongoose edge backend.
          </p>
        </div>

        {/* Studio Window Box */}
        <div className="studio-container">
          {/* Top Window Bar */}
          <div className="studio-topbar">
            <div className="studio-topbar-left">
              <div className="studio-dots">
                <div className="studio-dot dot-red"></div>
                <div className="studio-dot dot-yellow"></div>
                <div className="studio-dot dot-green"></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Layout size={16} color="#7A9B76" />
                <span style={{ fontSize: '0.825rem', fontFamily: 'var(--font-mono)', color: '#C8BFC7' }}>
                  pages / {pageTitle.toLowerCase().replace(/\s+/g, '-')}.json
                </span>
                <span className="badge badge-olive" style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem' }}>
                  v{version}.0 LIVE
                </span>
              </div>
            </div>

            {/* Topbar Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button 
                onClick={handleReset}
                className="btn btn-secondary btn-sm"
                title="Reset blocks"
              >
                <RefreshCw size={13} color="#8A7E72" />
                <span>Reset</span>
              </button>

              <button 
                onClick={handleSaveToBackend} 
                disabled={isSaving}
                className="btn btn-primary btn-sm"
                style={{ background: '#7A9B76', color: '#090302' }}
              >
                <CloudUpload size={14} />
                <span>{isSaving ? 'Syncing...' : 'Push to Edge'}</span>
              </button>
            </div>
          </div>

          {/* 3-Column Studio Interface */}
          <div className="studio-body">
            {/* Left Column: Preset Palette / Block Catalog */}
            <div className="studio-sidebar">
              <div>
                <span className="sidebar-heading">Page Document Title</span>
                <input 
                  type="text" 
                  value={pageTitle} 
                  onChange={(e) => setPageTitle(e.target.value)}
                  className="form-input"
                  style={{ marginTop: '0.4rem', fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
                />
              </div>

              <div>
                <span className="sidebar-heading" style={{ marginBottom: '0.75rem', display: 'block' }}>
                  Insert Content Blocks
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <button onClick={() => handleAddBlock('hero')} className="block-preset-btn">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Layers size={15} color="#5A2328" />
                      <span>Hero Headline</span>
                    </div>
                    <Plus size={14} color="#7A9B76" />
                  </button>

                  <button onClick={() => handleAddBlock('article')} className="block-preset-btn">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FileText size={15} color="#7A9B76" />
                      <span>Editorial Article</span>
                    </div>
                    <Plus size={14} color="#7A9B76" />
                  </button>

                  <button onClick={() => handleAddBlock('quote')} className="block-preset-btn">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Quote size={15} color="#8A7E72" />
                      <span>Quote Spotlight</span>
                    </div>
                    <Plus size={14} color="#7A9B76" />
                  </button>

                  <button onClick={() => handleAddBlock('cta')} className="block-preset-btn">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Compass size={15} color="#C8BFC7" />
                      <span>Call to Action</span>
                    </div>
                    <Plus size={14} color="#7A9B76" />
                  </button>
                </div>
              </div>

              {/* Palette Color Reference Widget */}
              <div style={{ marginTop: 'auto', padding: '0.85rem', background: 'rgba(90, 35, 40, 0.15)', borderRadius: '10px', border: '1px solid rgba(138, 126, 114, 0.2)' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#C8BFC7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Strict Palette Tokens
                </span>
                <div style={{ display: 'flex', gap: '6px', marginTop: '0.5rem' }}>
                  <div title="Pitch Black #090302" style={{ width: '20px', height: '20px', borderRadius: '4px', background: '#090302', border: '1px solid #8A7E72' }}></div>
                  <div title="Night Bordeaux #5A2328" style={{ width: '20px', height: '20px', borderRadius: '4px', background: '#5A2328' }}></div>
                  <div title="Grey Olive #8A7E72" style={{ width: '20px', height: '20px', borderRadius: '4px', background: '#8A7E72' }}></div>
                  <div title="Sage Green #7A9B76" style={{ width: '20px', height: '20px', borderRadius: '4px', background: '#7A9B76' }}></div>
                  <div title="Pale Slate #C8BFC7" style={{ width: '20px', height: '20px', borderRadius: '4px', background: '#C8BFC7' }}></div>
                </div>
              </div>
            </div>

            {/* Center Column: Live Editorial Canvas */}
            <div className="studio-canvas">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#8A7E72', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Canvas Preview • {blocks.length} Blocks
                </span>
                <span style={{ fontSize: '0.75rem', color: '#7A9B76' }}>
                  ● Click text to edit live
                </span>
              </div>

              {blocks.map((block, idx) => (
                <div 
                  key={block.id}
                  onClick={() => setSelectedBlockId(block.id)}
                  className={`canvas-block-card accent-${block.accent}`}
                  style={{
                    outline: selectedBlockId === block.id ? '2px solid #7A9B76' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  <div className="block-header-actions">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className={`badge badge-${block.accent === 'bordeaux' ? 'bordeaux' : block.accent === 'sage' ? 'sage' : 'olive'}`} style={{ fontSize: '0.65rem' }}>
                        {block.badge || block.type.toUpperCase()}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#8A7E72', fontFamily: 'var(--font-mono)' }}>
                        #{block.id}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {/* Move up / down */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleMoveBlock(idx, -1); }}
                        disabled={idx === 0}
                        style={{ opacity: idx === 0 ? 0.3 : 1, color: '#C8BFC7', padding: '0.2rem' }}
                        title="Move Up"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleMoveBlock(idx, 1); }}
                        disabled={idx === blocks.length - 1}
                        style={{ opacity: idx === blocks.length - 1 ? 0.3 : 1, color: '#C8BFC7', padding: '0.2rem' }}
                        title="Move Down"
                      >
                        <ArrowDown size={14} />
                      </button>

                      {/* Delete */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDeleteBlock(block.id); }}
                        style={{ color: '#5A2328', padding: '0.2rem', marginLeft: '0.4rem' }}
                        title="Delete block"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Editable Title */}
                  <input 
                    type="text" 
                    value={block.title} 
                    onChange={(e) => handleUpdateBlock(block.id, 'title', e.target.value)}
                    className="block-title-input"
                    placeholder="Enter block headline..."
                  />

                  {/* Editable Body */}
                  <textarea 
                    value={block.body} 
                    onChange={(e) => handleUpdateBlock(block.id, 'body', e.target.value)}
                    className="block-body-input"
                    rows={2}
                    placeholder="Enter editorial body text..."
                  />

                  {/* Block Bottom Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(138, 126, 114, 0.15)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.7rem', color: '#8A7E72' }}>Accent:</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleUpdateBlock(block.id, 'accent', 'bordeaux'); }}
                        style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#5A2328', border: block.accent === 'bordeaux' ? '2px solid #C8BFC7' : 'none' }}
                        title="Night Bordeaux"
                      />
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleUpdateBlock(block.id, 'accent', 'sage'); }}
                        style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#7A9B76', border: block.accent === 'sage' ? '2px solid #C8BFC7' : 'none' }}
                        title="Sage Green"
                      />
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleUpdateBlock(block.id, 'accent', 'olive'); }}
                        style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#8A7E72', border: block.accent === 'olive' ? '2px solid #C8BFC7' : 'none' }}
                        title="Grey Olive"
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: '#8A7E72' }}>
                      <span>{block.metrics?.readTime || '3 min'}</span>
                      <span>•</span>
                      <span>{block.metrics?.views || 100} impressions</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Headless Schema & Real-Time JSON Output */}
            <div className="studio-inspector">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Code2 size={16} color="#7A9B76" />
                  <span className="sidebar-heading">Live Headless JSON</span>
                </div>
                <button 
                  onClick={handleCopyJson}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
                >
                  {copiedJson ? <Check size={12} color="#7A9B76" /> : 'Copy'}
                </button>
              </div>

              {/* Monospace JSON Output Box */}
              <pre className="inspector-json">
                <code>
                  {JSON.stringify(blocks, null, 2)}
                </code>
              </pre>

              {/* Selected Block Metadata Card */}
              {selectedBlock && (
                <div style={{ background: 'rgba(90, 35, 40, 0.2)', padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(138, 126, 114, 0.2)' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#C8BFC7', textTransform: 'uppercase' }}>
                    Active Node: {selectedBlock.id}
                  </span>
                  <div style={{ marginTop: '0.4rem', fontSize: '0.75rem', color: '#8A7E72', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <div><strong>Type:</strong> <span style={{ color: '#7A9B76' }}>{selectedBlock.type}</span></div>
                    <div><strong>Accent Palette:</strong> <span style={{ color: '#C8BFC7' }}>{selectedBlock.accent}</span></div>
                    <div><strong>Status:</strong> <span style={{ color: '#7A9B76' }}>Published Edge Route</span></div>
                  </div>
                </div>
              )}

              {/* Edge Delivery Note */}
              <div style={{ fontSize: '0.72rem', color: '#8A7E72', lineHeight: 1.5 }}>
                <strong style={{ color: '#C8BFC7' }}>MERN Synchronized:</strong> Changes in this block editor are exposed immediately via GraphQL at <code style={{ color: '#7A9B76' }}>/graphql</code> and REST at <code style={{ color: '#7A9B76' }}>/api/studio/blocks</code>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
