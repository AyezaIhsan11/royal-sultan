import React from 'react';

export default function Hero() {
  return (
    <section className="hero-section" id="home">
      <img 
        src="/assets/images/instagram/post_11_DeWN_-AEZ6T.jpg" 
        alt="Royal Sultan Premium Basmati Falling Grains" 
        className="hero-background-art" 
      />
      <div className="hero-overlay"></div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="badge-tag">
            <span>👑</span> "Khushbu Jo Royal Ho" • Pure Punjab 1121
          </div>

          <h1 className="hero-title">
            The Taste of <span className="gold-text">Royalty</span> In Every Fragrant Grain
          </h1>

          <p className="hero-description">
            Experience the imperial aroma and sublime elegance of <strong>Pure Punjab 1121 Basmati</strong>. Handpicked from Punjab's mineral-rich Himalayan river basins, naturally aged, and milled to guarantee <strong>8.35mm+ uncooked extra long grains</strong> with unmatched non-sticky cooking perfection.
          </p>

          {/* Key Value Proposition Badges */}
          <div className="hero-badges-row">
            <div className="hero-badge-pill">
              <span style={{ color: 'var(--gold-primary)' }}>✓</span> 8.35mm+ Extra Long Grain
            </div>
            <div className="hero-badge-pill">
              <span style={{ color: 'var(--gold-primary)' }}>✓</span> ISO 22000 Certified
            </div>
            <div className="hero-badge-pill">
              <span style={{ color: 'var(--gold-primary)' }}>✓</span> 100% Halal Certified
            </div>
            <div className="hero-badge-pill">
              <span style={{ color: 'var(--gold-primary)' }}>✓</span> Product of Pakistan 🇵🇰
            </div>
          </div>

          {/* Dual-Engine CTAs */}
          <div className="hero-cta-group">
            <a href="#configurator" className="btn btn-gold" id="hero-b2c-cta">
              ⚡ Build Your Custom Bag (B2C)
            </a>
            <a href="https://wa.me/923091065712?text=Hello%20Royal%20Sultan,%20I%20am%20interested%20in%20placing%20an%20order." target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" id="hero-whatsapp-cta">
              <span>💬</span> WhatsApp Order: 0309 1065712
            </a>
          </div>
        </div>

        {/* Visual Hero Showcase Card */}
        <div className="hero-media-card">
          <img 
            src="/assets/images/instagram/post_8_DekJSnPkQnc.jpg" 
            alt="Royal Sultan 1121 Kainat Basmati Khushbu Jo Royal Ho" 
            className="hero-main-img" 
          />
          <div className="hero-floating-seal">
            <div className="seal-icon">👑</div>
            <div className="seal-text">
              <h4>Khushbu Jo Royal Ho</h4>
              <p>Pure Punjab 1121 Basmati</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
