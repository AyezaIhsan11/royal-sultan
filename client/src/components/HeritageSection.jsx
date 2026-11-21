import React from 'react';

export default function HeritageSection() {
  return (
    <section className="section-padding" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-media-stack">
            <img 
              src="/assets/images/punjab-heritage.jpg" 
              alt="Punjab Golden Fields and Basmati Harvest" 
              className="about-primary-img" 
            />
            <div className="about-stamp-card">
              <h4>Chenab River Fed</h4>
              <p>Matured through natural aging for superior fragrance and non-sticky elongation.</p>
            </div>
          </div>

          <div className="about-content">
            <div className="sub-slogan">Our Heritage & Legacy</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.2rem' }}>
              Rooted in the Fertile Soils of <span className="gold-text">Punjab</span>
            </h2>
            <p style={{ color: 'var(--text-cream)', marginBottom: '1.2rem', lineHeight: '1.7' }}>
              Centuries of river-basin cultivation in Punjab have given birth to basmati rice that is prized worldwide. Royal Sultan selectively sources paddy only from GI-certified agricultural belts nourished by fresh Himalayan snowmelt.
            </p>
            <p style={{ color: 'var(--text-cream)', marginBottom: '1.8rem', lineHeight: '1.7' }}>
              Every single harvest is aged in state-of-the-art temperature-controlled silos. This natural maturation evaporates excess moisture, crystallizing starch structures so that every grain elongates up to <strong>2.4 times</strong> its original size when cooked.
            </p>

            <div className="heritage-features-list">
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontSize: '1.5rem', color: 'var(--gold-primary)' }}>🌾</span>
                <div>
                  <strong>Optical Sorting:</strong> 100% laser-sorted grains with zero broken percentage tolerance.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontSize: '1.5rem', color: 'var(--gold-primary)' }}>📦</span>
                <div>
                  <strong>Export Milling Facility:</strong> High capacity modern Buhler plant with ISO 22000, HACCP, and Halal certifications.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
