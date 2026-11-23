import React from 'react';

export default function Footer({ onOpenAdmin }) {
  return (
    <footer className="site-footer" id="contact">
      <div className="container">
        <div className="footer-top-grid">
          {/* Col 1: Brand */}
          <div className="footer-brand-summary">
            <a href="#home" className="logo-brand" style={{ marginBottom: '1rem' }}>
              <div className="logo-crown-icon"><span>👑</span></div>
              <div className="logo-text-wrap">
                <span className="logo-title">Royal Sultan</span>
                <span className="logo-tagline">Premium Basmati Rice</span>
              </div>
            </a>
            <p>
              "Khushbu Jo Royal Ho" — ROYAL SULTAN 👑. Premium Basmati Rice with Taste, Quality, and Royalty. Pakistani Rice adhering to Global Standards.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.8rem', fontSize: '0.86rem' }}>
              <div>
                📸 Instagram: <a href="https://www.instagram.com/royalsultan_rs" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-primary)', textDecoration: 'none', fontWeight: '700' }}>@royalsultan_rs</a>
              </div>
              <div>
                🌐 Official Web: <a href="https://royalsultan.pk" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-primary)', textDecoration: 'none', fontWeight: '600' }}>royalsultan.pk</a>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <span className="badge-tag">ISO 22000</span>
              <span className="badge-tag">Halal Certified</span>
              <span className="badge-tag">Export Quality</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-nav-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#configurator">Bag Configurator</a></li>
              <li><a href="#varieties">Flagship Varieties</a></li>
              <li><a href="#packaging">Packaging Lineup</a></li>
              <li><a href="#about">Our Punjab Heritage</a></li>
              <li>
                <a 
                  href="#orders" 
                  onClick={(e) => { e.preventDefault(); if (onOpenAdmin) onOpenAdmin(); }}
                  style={{ color: 'var(--gold-bright)', fontWeight: '700' }}
                >
                  📋 Orders Portal (Admin)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: B2B Export */}
          <div className="footer-col">
            <h4>Global Export Ports</h4>
            <ul className="footer-nav-list">
              <li><a href="#export-rfq">Jebel Ali (UAE)</a></li>
              <li><a href="#export-rfq">Dammam / Jeddah (KSA)</a></li>
              <li><a href="#export-rfq">London Gateway (UK)</a></li>
              <li><a href="#export-rfq">Rotterdam (EU)</a></li>
              <li><a href="#export-rfq">Houston / NY (USA)</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="footer-col">
            <h4>Newsletter & Crop Rates</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.8rem' }}>
              Receive seasonal basmati harvest announcements, global freight updates, and wholesale CIF rate lists.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Royal Sultan Harvest Updates!'); }}>
              <div className="newsletter-box">
                <input type="email" placeholder="Enter work email" required />
                <button type="submit" className="btn btn-gold" style={{ padding: '0.6rem 1rem' }}>
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Royal Sultan Premium Basmati Rice. All rights reserved.
          </div>
          <div className="footer-cert-badges">
            <span>Product of Pakistan 🇵🇰</span>
            <span>Geographical Indication (GI) Protected</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
