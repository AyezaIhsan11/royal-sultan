import React from 'react';

export default function PackagingShowcase() {
  const PACK_SIZES = [
    { 
      weight: '1 KG', 
      type: 'Royal Black Pouch', 
      color: '#1A1815', 
      target: 'Retail & Gifting', 
      desc: 'Sleek matte black finish with royal gold crown, gold trim, and moisture barrier.',
      image: '/assets/images/packaging/bag_1kg.jpg'
    },
    { 
      weight: '5 KG', 
      type: 'Emerald Green Pouch', 
      color: '#1B3B2B', 
      target: 'Modern Household', 
      desc: 'Rich emerald green packaging preserving pure Himalayan aroma.',
      image: '/assets/images/packaging/bag_5kg.jpg'
    },
    { 
      weight: '10 KG', 
      type: 'Royal Navy Blue Bag', 
      color: '#1A2A44', 
      target: 'Family Selection', 
      desc: 'Equipped with a sturdy gold carrying handle and reinforced base.',
      image: '/assets/images/packaging/bag_10kg.jpg'
    },
    { 
      weight: '25 KG', 
      type: 'Royal Maroon Pouch', 
      color: '#4A1521', 
      target: 'Banquet & Feasts', 
      desc: 'Master royal maroon bag with gold handle for celebratory feasts.',
      image: '/assets/images/packaging/bag_25kg.jpg'
    },
    { 
      weight: '40 KG', 
      type: 'Export Skin Jute Sack', 
      color: '#B49B76', 
      target: 'Global Shipping / FCL', 
      desc: 'Natural skin-color jute burlap sack with breathable moisture barrier for bulk export.',
      image: '/assets/images/packaging/bag_40kg.jpg'
    }
  ];

  return (
    <section className="section-padding" id="packaging" style={{ background: 'var(--bg-surface-elevated)' }}>
      <div className="container">
        <div className="section-header text-center">
          <div className="sub-slogan">Official Royal Sultan Collection</div>
          <h2>Bespoke Packaging <span className="gold-text">Excellence</span></h2>
          <p>
            "Khushbu Jo Royal Ho" — Our complete 1 KG to 40 KG packaging lineup, with distinct colors for each size tier, moisture-lock protection, and export-grade natural skin jute sacks.
          </p>
        </div>

        {/* Panoramic Horizontal Banner showing all bags in a line */}
        <div className="packaging-lineup-banner" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 36px rgba(0,0,0,0.08)', marginBottom: '2.5rem', background: '#FAF7F2' }}>
          <img 
            src="/assets/images/packaging/packaging_lineup_horizontal.jpg" 
            alt="Royal Sultan Complete Lineup - 1KG, 5KG, 10KG, 25KG, 40KG" 
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <div className="packaging-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
          {PACK_SIZES.map(item => (
            <div 
              key={item.weight} 
              className="config-card-option" 
              style={{ 
                textAlign: 'center', 
                padding: '1.6rem 1.2rem', 
                borderTop: `4px solid ${item.color}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'var(--bg-surface)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.05)'
              }}
            >
              <span className="option-tag">{item.target}</span>
              
              {/* Dedicated Individual Bag Picture */}
              <div style={{ height: '180px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0.8rem 0' }}>
                <img 
                  src={item.image} 
                  alt={`Royal Sultan ${item.weight} ${item.type}`} 
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.12))' }} 
                />
              </div>

              <div className="option-title" style={{ fontSize: '1.55rem', color: 'var(--gold-bright)', margin: '0.3rem 0' }}>
                {item.weight}
              </div>
              <div style={{ fontWeight: '700', fontSize: '0.92rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                {item.type}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
