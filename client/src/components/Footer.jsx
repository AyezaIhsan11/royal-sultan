import React from 'react';

export default function Footer() {
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
              "Khushbu Jo Royal Ho". Premium 1121 Kainat Basmati, aged in natural Punjab river valleys for non-sticky, long-grain perfection. Domestic delivery and worldwide container export.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem' }}>
              <span className="badge-tag">ISO 22000</span>
              <span className="badge-tag">Halal Certified</span>
              <span className="badge-tag">HACCP</span>
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
            © {new Date().getFullYear()} Royal Sultan Premium Basmati Rice. Built with MERN Stack (MongoDB, Express, React, Node.js). All rights reserved.
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
