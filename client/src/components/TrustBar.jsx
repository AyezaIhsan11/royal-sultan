import React from 'react';

export default function TrustBar() {
  return (
    <section className="trust-bar" id="trust-parameters">
      <div className="container">
        <div className="trust-grid">
          <div className="trust-item">
            <div className="trust-icon-box">🌾</div>
            <div className="trust-info">
              <h4>Pure Punjab Heritage</h4>
              <p>Grown in fertile Himalayan-fed soils of Punjab for deep authentic aroma.</p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon-box">📏</div>
            <div className="trust-info">
              <h4>8.35mm+ Extra Long Grain</h4>
              <p>Uncooked grain length benchmark with exceptional 2.4x elongation ratio.</p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon-box">🛡️</div>
            <div className="trust-info">
              <h4>ISO 22000 & Halal</h4>
              <p>International food safety certified milling, optical laser sorting & packaging.</p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon-box">🇵🇰</div>
            <div className="trust-info">
              <h4>Product of Pakistan</h4>
              <p>Authentic Geographical Indication verified Basmati for domestic & global export.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
