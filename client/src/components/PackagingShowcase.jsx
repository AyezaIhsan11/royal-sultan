import React from 'react';

export default function PackagingShowcase() {
  const PACK_SIZES = [
    { weight: '1 KG', type: 'Luxury Handle Bag', target: 'Retail / Gift', desc: 'Matte metallic finish with moisture lock barrier.' },
    { weight: '5 KG', type: 'Resealable Zipper', target: 'Urban Household', desc: 'Aroma-seal zip lock keeping every grain fresh.' },
    { weight: '10 KG', type: 'Non-Woven Eco Tote', target: 'Family Choice', desc: 'Heavy-duty ergonomic stitched handle bag.' },
    { weight: '20 KG', type: 'Master Poly Pack', target: 'Banquets & HoReCa', desc: 'Commercial grade reinforced tear-resistant bag.' },
    { weight: '40 KG', type: 'Export Jute Sack', target: 'Global Container FCL', desc: 'ISO fumigated breathable natural golden jute.' }
  ];

  return (
    <section className="section-padding" id="packaging" style={{ background: 'var(--bg-surface-elevated)' }}>
      <div className="container">
        <div className="section-header text-center">
          <div className="sub-slogan">International Food Grade Preservation</div>
          <h2>Bespoke Packaging <span className="gold-text">Excellence</span></h2>
          <p>
            From consumer zipper bags to 40ft container export master sacks, our multi-barrier packaging protects delicate basmati volatile aromas and delivers pristine non-sticky grains.
          </p>
        </div>

        <div className="packaging-lineup-banner">
          <img 
            src="/assets/images/packaging-lineup.jpg" 
            alt="Royal Sultan Full Packaging Lineup" 
          />
        </div>

        <div className="packaging-cards-grid">
          {PACK_SIZES.map(item => (
            <div key={item.weight} className="config-card-option" style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
              <span className="option-tag">{item.target}</span>
              <div className="option-title" style={{ fontSize: '1.5rem', color: 'var(--gold-bright)', margin: '0.4rem 0' }}>
                {item.weight}
              </div>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                {item.type}
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
