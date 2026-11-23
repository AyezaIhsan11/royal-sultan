import React from 'react';

export default function VarietiesGrid({ products, onSelectVariety }) {
  const VARIETY_COLORS = {
    'RS-1121-KNT': { color: '#1A1815', pack: 'Royal Black Pouch (1 KG)', img: '/assets/images/varieties/variety_1121_kainat.jpg' },
    'RS-SUP-KRNL': { color: '#1A2A44', pack: 'Royal Navy Blue Bag (10 KG)', img: '/assets/images/varieties/variety_super_kernel.jpg' },
    'RS-SLA-PARB': { color: '#4A1521', pack: 'Royal Maroon Pouch (25 KG)', img: '/assets/images/varieties/variety_steam_sella.jpg' },
    'RS-WHT-FINE': { color: '#1B3B2B', pack: 'Emerald Green Pouch (5 KG)', img: '/assets/images/varieties/variety_super_fine.jpg' }
  };

  return (
    <section className="section-padding" id="varieties" style={{ padding: '3.5rem 0' }}>
      <div className="container">
        <div className="section-header text-center">
          <div className="sub-slogan">Curated Master Harvests</div>
          <h2>Our Imperial <span className="gold-text">Varieties</span></h2>
          <p style={{ maxWidth: '640px', margin: '0 auto', fontSize: '0.92rem' }}>
            Each flagship rice variety is paired with its signature Instagram collection packaging — aged naturally for distinct aromas, non-breaking elongation, and banquet elegance.
          </p>
        </div>

        <div className="varieties-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.4rem' }}>
          {products.map(prod => {
            const meta = VARIETY_COLORS[prod.code] || { color: '#1A1815', pack: 'Royal Packaging', img: prod.image };
            const cardImg = meta.img || prod.image;
            return (
              <div 
                key={prod.code} 
                className="variety-card" 
                style={{ 
                  borderRadius: '10px', 
                  borderTop: `4px solid ${meta.color}`,
                  boxShadow: '0 4px 18px rgba(0,0,0,0.06)'
                }}
              >
                <div className="variety-card-header" style={{ position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={cardImg} 
                    alt={prod.title} 
                    style={{ height: '175px', width: '100%', objectFit: 'cover' }} 
                  />
                  <span className="variety-floating-tag" style={{ fontSize: '0.74rem', padding: '0.25rem 0.6rem' }}>
                    {prod.grainLength} Grain
                  </span>
                </div>
                <div className="variety-card-body" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: meta.color }}></span>
                    <span style={{ fontSize: '0.74rem', fontWeight: '700', color: 'var(--gold-dark)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {meta.pack}
                    </span>
                  </div>
                  <h3 className="variety-name" style={{ fontSize: '1.25rem', marginBottom: '0.2rem' }}>{prod.title}</h3>
                  <div className="variety-subtitle" style={{ fontSize: '0.82rem', marginBottom: '0.6rem' }}>{prod.subtitle}</div>
                  <p className="variety-description" style={{ fontSize: '0.84rem', lineHeight: '1.5', color: 'var(--text-muted)' }}>
                    {prod.description}
                  </p>
                  
                  <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                    <button 
                      className="btn btn-outline-gold" 
                      style={{ width: '100%', fontSize: '0.82rem', padding: '0.55rem 0.8rem' }}
                      onClick={() => {
                        if (onSelectVariety) onSelectVariety(prod.code);
                        const el = document.getElementById('configurator');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Select in Configurator
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
