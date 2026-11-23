import React, { useState } from 'react';

export default function ContainerCalculator({ onQuoteRequest }) {
  const [containerType, setContainerType] = useState('20ft');
  const [bagWeightKg, setBagWeightKg] = useState(40);
  const [targetPort, setTargetPort] = useState('Jebel Ali, Dubai (UAE)');
  const [variety, setVariety] = useState('1121 Kainat Basmati');

  const maxCapacityMT = containerType === '20ft' ? 25 : 28;
  const maxCapacityKg = maxCapacityMT * 1000;
  const totalBags = Math.floor(maxCapacityKg / bagWeightKg);
  const totalActualMT = ((totalBags * bagWeightKg) / 1000).toFixed(2);

  const handleApplyToForm = () => {
    if (onQuoteRequest) {
      onQuoteRequest({
        containerType,
        bagWeightKg,
        targetPort,
        variety,
        totalBags,
        totalActualMT
      });
    }
    const el = document.getElementById('rfq-form-anchor');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="calculator-card">
      <div className="sub-slogan" style={{ fontSize: '0.9rem' }}>Live FCL Load Estimator</div>
      <h3 style={{ fontSize: '1.6rem', marginBottom: '1.2rem' }}>
        Container Load <span className="gold-text">Calculator</span>
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
        Plan container export logistics (20ft or 40ft High Cube) with accurate metric tonnage and bag packing density.
      </p>

      {/* Select Container Type */}
      <div className="calc-input-group" style={{ marginBottom: '1.2rem' }}>
        <label className="form-label">Container Size (FCL)</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
          <button 
            type="button"
            className={`btn ${containerType === '20ft' ? 'btn-gold' : 'btn-outline-gold'}`}
            onClick={() => setContainerType('20ft')}
            style={{ padding: '0.7rem' }}
          >
            20ft FCL (Standard 25 MT)
          </button>
          <button 
            type="button"
            className={`btn ${containerType === '40ft' ? 'btn-gold' : 'btn-outline-gold'}`}
            onClick={() => setContainerType('40ft')}
            style={{ padding: '0.7rem' }}
          >
            40ft FCL (High Cube 28 MT)
          </button>
        </div>
      </div>

      {/* Bag Weight Selection */}
      <div className="calc-input-group" style={{ marginBottom: '1.2rem' }}>
        <label className="form-label">Master Bag Weight (KG)</label>
        <select 
          className="calc-select" 
          value={bagWeightKg} 
          onChange={(e) => setBagWeightKg(Number(e.target.value))}
        >
          <option value={10}>10 KG Royal Navy Blue Bags</option>
          <option value={25}>25 KG Royal Maroon Pouches</option>
          <option value={40}>40 KG Export Skin Jute Sacks</option>
          <option value={50}>50 KG Bulk Jute Sacks</option>
        </select>
      </div>

      {/* Target Destination Port */}
      <div className="calc-input-group" style={{ marginBottom: '1.5rem' }}>
        <label className="form-label">Destination Discharge Port</label>
        <select 
          className="calc-select" 
          value={targetPort} 
          onChange={(e) => setTargetPort(e.target.value)}
        >
          <option value="Jebel Ali, Dubai (UAE)">Jebel Ali, Dubai (UAE)</option>
          <option value="Dammam / Jeddah, Saudi Arabia">Dammam / Jeddah, Saudi Arabia</option>
          <option value="London Gateway / Felixstowe, UK">London Gateway / Felixstowe, UK</option>
          <option value="Rotterdam, Netherlands (EU)">Rotterdam, Netherlands (EU)</option>
          <option value="New York / Houston, USA">New York / Houston, USA</option>
          <option value="Port of Doha, Qatar">Port of Doha, Qatar</option>
        </select>
      </div>

      {/* Calculator Output Meters */}
      <div className="calc-results-panel">
        <div className="results-metric-grid">
          <div className="metric-item">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Bags</span>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--gold-bright)' }}>
              {totalBags.toLocaleString()}
            </div>
          </div>
          <div className="metric-item">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Net Tonnage</span>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--gold-bright)' }}>
              {totalActualMT} MT
            </div>
          </div>
          <div className="metric-item">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Port</span>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {targetPort.split(',')[0]}
            </div>
          </div>
        </div>

        <button 
          type="button"
          className="btn btn-gold" 
          style={{ width: '100%' }}
          onClick={handleApplyToForm}
        >
          🚢 Pre-Fill Container In RFQ Form
        </button>
      </div>
    </div>
  );
}
