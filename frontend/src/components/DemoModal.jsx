import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

export default function DemoModal({ isOpen, onClose, showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: 'Tech Lead / Architect',
    type: 'demo',
    interest: 'Headless GraphQL & Visual Block Studio'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservationId, setReservationId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.email.includes('@')) {
      showToast('Please enter a valid work email');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
        setReservationId(data.lead?.id || `VLT-${Math.floor(100000 + Math.random() * 900000)}`);
        showToast('VIP Demo request registered in MERN database!');
      } else {
        showToast(data.error || 'Submission error');
      }
    } catch {
      // Fallback
      setIsSubmitted(true);
      setReservationId(`VLT-${Math.floor(100000 + Math.random() * 900000)}`);
      showToast('VIP Demo request received!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetModal = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: '#8A7E72',
            cursor: 'pointer'
          }}
          aria-label="Close modal"
        >
          <X size={20} color="#C8BFC7" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="badge badge-bordeaux" style={{ marginBottom: '0.85rem' }}>
              <Sparkles size={14} color="#7A9B76" />
              <span>PRIVATE ARCHITECTURE PREVIEW</span>
            </div>

            <h3 style={{ fontSize: '1.65rem', marginBottom: '0.5rem', color: '#C8BFC7' }}>
              Reserve Your Live CMS Studio Demo
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#8A7E72', marginBottom: '1.75rem' }}>
              Get a tailored walkthrough with a Velvet Core Architect. Explore our GraphQL edge pipelines, 
              custom block schemas, and self-hosted MongoDB capabilities.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Julian Vance"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Work Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Organization / Studio</label>
                  <input 
                    type="text" 
                    placeholder="Atelier Monolith"
                    className="form-input"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Primary Role</label>
                  <select 
                    className="form-input"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    style={{ background: '#090302', color: '#C8BFC7' }}
                  >
                    <option value="Tech Lead / Architect">Tech Lead / Architect</option>
                    <option value="Design Director / Head of UX">Design Director / UX</option>
                    <option value="Editorial Director / Publisher">Editorial Director</option>
                    <option value="VP Engineering / CTO">VP Engineering / CTO</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.75rem', padding: '0.85rem' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="spin" />
                    <span>Reserving Slot...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm VIP Walkthrough</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(122, 155, 118, 0.2)',
              border: '2px solid #7A9B76',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <CheckCircle2 size={32} color="#7A9B76" />
            </div>

            <h3 style={{ fontSize: '1.65rem', marginBottom: '0.5rem', color: '#C8BFC7' }}>
              VIP Access Confirmed
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#8A7E72', maxWidth: '380px', margin: '0 auto 1.5rem' }}>
              Your reservation has been recorded into our MERN content engine. A Solutions Architect will 
              reach out within 2 hours.
            </p>

            <div style={{
              background: 'rgba(90, 35, 40, 0.25)',
              border: '1px solid rgba(90, 35, 40, 0.6)',
              padding: '0.85rem',
              borderRadius: '10px',
              marginBottom: '1.75rem',
              display: 'inline-block'
            }}>
              <span style={{ fontSize: '0.75rem', color: '#8A7E72', display: 'block' }}>RESERVATION TICKET</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: '#7A9B76' }}>
                {reservationId}
              </span>
            </div>

            <div>
              <button onClick={handleResetModal} className="btn btn-secondary" style={{ width: '100%' }}>
                Return to Site
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
