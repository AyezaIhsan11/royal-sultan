import React, { useState, useEffect } from 'react';

export default function B2BRfqForm({ prefilledData }) {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: 'United Arab Emirates',
    destinationPort: 'Jebel Ali, Dubai (UAE)',
    containerType: '20ft',
    riceVariety: '1121 Kainat Basmati',
    millingFinish: 'Extra Long Steam',
    bagWeightKg: 40,
    estimatedMetricTons: 25,
    estimatedBags: 625,
    targetShippingDate: '',
    comments: ''
  });

  const [loading, setLoading] = useState(false);
  const [submittedRfq, setSubmittedRfq] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (prefilledData) {
      setFormData(prev => ({
        ...prev,
        containerType: prefilledData.containerType || prev.containerType,
        destinationPort: prefilledData.targetPort || prev.destinationPort,
        bagWeightKg: prefilledData.bagWeightKg || prev.bagWeightKg,
        estimatedMetricTons: Number(prefilledData.totalActualMT) || prev.estimatedMetricTons,
        estimatedBags: prefilledData.totalBags || prev.estimatedBags
      }));
    }
  }, [prefilledData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const resData = await response.json();
      if (resData.success) {
        setSubmittedRfq(resData.data);
      } else {
        setErrorMsg(resData.message || 'Failed to submit quote request.');
      }
    } catch (err) {
      setErrorMsg('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calculator-card" id="rfq-form-anchor">
      <div className="sub-slogan" style={{ fontSize: '0.9rem' }}>Official B2B Export Desk</div>
      <h3 style={{ fontSize: '1.6rem', marginBottom: '1.2rem' }}>
        Request Formal Container <span className="gold-text">RFQ</span>
      </h3>

      {submittedRfq ? (
        <div style={{ background: '#FAF7F2', border: '1.5px solid var(--gold-primary)', borderRadius: '10px', padding: '1.8rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📄</div>
          <h4 style={{ color: 'var(--gold-bright)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
            Container RFQ Successfully Logged in MongoDB!
          </h4>
          <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Reference Code: <strong style={{ fontFamily: 'monospace', color: 'var(--gold-primary)' }}>{submittedRfq.inquiryCode}</strong>
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
            Our export director will review your destination discharge port (<strong>{submittedRfq.destinationPort}</strong>) and provide CIF/FOB pricing within 4 business hours.
          </p>
          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center' }}>
            <a 
              href={`https://wa.me/923001234567?text=Hello%20Royal%20Sultan%20Export%20Desk,%20I%20have%20submitted%20B2B%20RFQ%20(${submittedRfq.inquiryCode})%20for%20${submittedRfq.estimatedMetricTons}%20MT%20to%20${encodeURIComponent(submittedRfq.destinationPort)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              💬 Connect Direct on WhatsApp
            </a>
            <button 
              className="btn btn-outline-gold" 
              onClick={() => setSubmittedRfq(null)}
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {errorMsg && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '0.8rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem' }}>
              ⚠️ {errorMsg}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="form-label">Company / Importer Name *</label>
              <input 
                type="text" 
                name="companyName" 
                className="form-control" 
                required 
                placeholder="e.g. Al-Sultan Foods LLC" 
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="form-label">Contact Person Name *</label>
              <input 
                type="text" 
                name="contactPerson" 
                className="form-control" 
                required 
                placeholder="Full Name" 
                value={formData.contactPerson}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="form-label">Official Work Email *</label>
              <input 
                type="email" 
                name="email" 
                className="form-control" 
                required 
                placeholder="purchasing@company.com" 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="form-label">WhatsApp / Phone Number *</label>
              <input 
                type="tel" 
                name="phone" 
                className="form-control" 
                required 
                placeholder="+971 50 123 4567" 
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="form-label">Target Rice Variety</label>
              <select name="riceVariety" className="form-control" value={formData.riceVariety} onChange={handleChange}>
                <option value="1121 Kainat Basmati">1121 Kainat Basmati (8.35mm+)</option>
                <option value="Super Kernel Basmati">Super Kernel Basmati (7.45mm+)</option>
                <option value="1121 Steam Sella">1121 Steam Sella (Golden Parboiled)</option>
                <option value="Super Fine White Rice">Super Fine White Rice</option>
              </select>
            </div>
            <div>
              <label className="form-label">Milling Finish</label>
              <select name="millingFinish" className="form-control" value={formData.millingFinish} onChange={handleChange}>
                <option value="Extra Long Steam">Steam Polished</option>
                <option value="Double Polished Raw">Double Polished Raw</option>
                <option value="Golden Sella">Golden Sella</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label className="form-label">Special Packing / Port Delivery Notes</label>
            <textarea 
              name="comments" 
              className="form-control" 
              rows="3" 
              placeholder="Private label branding, target CIF incoterms, SGS pre-shipment inspection requirement..."
              value={formData.comments}
              onChange={handleChange}
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="btn btn-gold" 
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Submitting to MongoDB...' : '📄 Transmit Export Inquiry (MongoDB)'}
          </button>
        </form>
      )}
    </div>
  );
}
