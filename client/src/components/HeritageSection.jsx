import React from 'react';

export default function HeritageSection() {
  return (
    <section className="section-padding" id="about" style={{ padding: '3rem 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        <div className="about-grid" style={{ alignItems: 'center', gap: '2.5rem' }}>
          <div className="about-media-stack" style={{ position: 'relative' }}>
            <img 
              src="/assets/images/heritage_punjab.jpg" 
              alt="Royal Sultan Basmati Rice Fields - Punjab, Pakistan" 
              className="about-primary-img" 
              style={{ maxHeight: '340px', width: '100%', objectFit: 'cover', borderRadius: '12px', boxShadow: 'var(--shadow-gold)' }}
            />
            <div className="about-stamp-card" style={{ padding: '0.8rem 1rem' }}>
              <h4 style={{ fontSize: '0.95rem', margin: 0 }}>Product of Punjab, Pakistan</h4>
              <p style={{ fontSize: '0.78rem', margin: '0.2rem 0 0 0' }}>Nurtured by fertile river basins & Himalayan snowmelt.</p>
            </div>
          </div>

          <div className="about-content">
            <div className="sub-slogan" style={{ fontSize: '0.9rem', marginBottom: '0.4rem' }}>Our Heritage & Legacy</div>
            <h2 style={{ fontSize: '1.9rem', marginBottom: '0.8rem', lineHeight: '1.25' }}>
              Rooted in the Fertile Soils of <span className="gold-text">Punjab</span>
            </h2>
            <p style={{ color: 'var(--text-cream)', marginBottom: '0.8rem', lineHeight: '1.6', fontSize: '0.92rem' }}>
              Harvested from GI-protected agricultural belts along the Chenab river basin. Naturally matured in climate-regulated silos to ensure authentic aroma and non-sticky 2.4x cooking elongation.
            </p>

            <div className="heritage-features-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.8rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <span style={{ fontSize: '1.3rem', color: 'var(--gold-primary)' }}>🌾</span>
                <div style={{ fontSize: '0.85rem' }}>
                  <strong>Optical Sorting:</strong> 100% laser-sorted grains with zero broken tolerance.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <span style={{ fontSize: '1.3rem', color: 'var(--gold-primary)' }}>📦</span>
                <div style={{ fontSize: '0.85rem' }}>
                  <strong>Export Milling:</strong> ISO 22000, HACCP, and Halal certified facility.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
