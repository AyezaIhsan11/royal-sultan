import React from 'react';

export default function VarietiesGrid({ products, onSelectVariety }) {
  return (
    <section className="section-padding" id="varieties">
      <div className="container">
        <div className="section-header text-center">
          <div className="sub-slogan">Curated Master Harvests</div>
          <h2>Our Imperial <span className="gold-text">Varieties</span></h2>
          <p>
            From the world-renowned 1121 Kainat Basmati to timeless Chenab vintage Super Kernel, each grain represents four decades of rice excellence.
          </p>
        </div>

        <div className="varieties-grid">
          {products.map(prod => (
            <div key={prod.code} className="variety-card">
              <div className="variety-card-header">
                <img src={prod.image} alt={prod.title} />
                <span className="variety-floating-tag">{prod.grainLength} Grain</span>
              </div>
              <div className="variety-card-body">
                <h3 className="variety-name">{prod.title}</h3>
                <div className="variety-subtitle">{prod.subtitle}</div>
                <p className="variety-description">{prod.description}</p>
                
                <div style={{ marginTop: 'auto', paddingTop: '1.2rem' }}>
                  <button 
                    className="btn btn-outline-gold" 
                    style={{ width: '100%', fontSize: '0.85rem' }}
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
          ))}
        </div>
      </div>
    </section>
  );
}
