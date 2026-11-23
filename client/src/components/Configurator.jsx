import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const BAG_IMAGES_BY_WEIGHT = {
  1: '/assets/images/packaging/bag_1kg.jpg',
  5: '/assets/images/packaging/bag_5kg.jpg',
  10: '/assets/images/packaging/bag_10kg.jpg',
  25: '/assets/images/packaging/bag_25kg.jpg',
  40: '/assets/images/packaging/bag_40kg.jpg'
};

export default function Configurator({ products, activeProductCode, setActiveProductCode }) {
  const { addToCart } = useCart();
  const [selectedCode, setSelectedCode] = useState(activeProductCode || 'RS-1121-KNT');
  const [processingId, setProcessingId] = useState('steam');
  const [weightKg, setWeightKg] = useState(5);
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState('');

  // Keep synced if user clicked a card from the VarietiesGrid
  useEffect(() => {
    if (activeProductCode) {
      setSelectedCode(activeProductCode);
    }
  }, [activeProductCode]);

  const currentProduct = products.find(p => p.code === selectedCode) || products[0];

  useEffect(() => {
    if (currentProduct) {
      if (currentProduct.processingOptions && currentProduct.processingOptions.length > 0) {
        setProcessingId(currentProduct.processingOptions[0].id);
      }
      if (currentProduct.tiers && currentProduct.tiers.length > 0) {
        const hasWeight = currentProduct.tiers.some(t => t.weight === weightKg);
        if (!hasWeight) {
          setWeightKg(currentProduct.tiers[0].weight);
        }
      }
    }
  }, [selectedCode]);

  if (!currentProduct) return null;

  const currentProcessing = currentProduct.processingOptions?.find(p => p.id === processingId) || currentProduct.processingOptions?.[0] || { id: 'default', name: 'Standard Mill', tag: 'Standard' };
  const currentTier = currentProduct.tiers?.find(t => t.weight === weightKg) || currentProduct.tiers?.[0] || { weight: 5, label: '5 KG', type: 'Bag', price: 4300, isB2C: true };
  const totalPrice = currentTier.price * quantity;

  const handleSelectVariety = (code) => {
    setSelectedCode(code);
    if (setActiveProductCode) setActiveProductCode(code);
  };

  const handleAddToCart = () => {
    addToCart(currentProduct, currentProcessing, currentTier, quantity);
    triggerToast(`Added ${quantity}x ${currentProduct.title} (${currentTier.label}) to Royal Cart!`);
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <section className="configurator-section section-padding" id="configurator">
      <div className="container">
        <div className="section-header text-center">
          <div className="sub-slogan">Dynamic Product Matrix</div>
          <h2>Interactive Rice & Packaging <span className="gold-text">Configurator</span></h2>
          <p>
            Select your preferred rice variety, milling finish, and bespoke packaging size. Our dual-engine system calculates live pricing, shipping rates, and adapts direct checkout or bulk container quotes instantly.
          </p>
        </div>

        <div className="configurator-wrapper">
          {/* Controls Column */}
          <div className="config-controls-col">
            {/* Step 1: Select Variety */}
            <div className="config-step">
              <div className="step-label">
                <span className="step-number">1</span> Select Rice Variety
              </div>
              <div className="options-grid">
                {products.map(prod => (
                  <div 
                    key={prod.code}
                    className={`config-card-option ${prod.code === selectedCode ? 'active' : ''}`}
                    onClick={() => handleSelectVariety(prod.code)}
                  >
                    <span className="option-tag">{prod.grainLength}</span>
                    <div className="option-title">{prod.title}</div>
                    <div className="option-desc">{prod.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Processing Finish */}
            <div className="config-step">
              <div className="step-label">
                <span className="step-number">2</span> Select Milling & Processing Grade
              </div>
              <div className="options-grid">
                {currentProduct.processingOptions?.map(opt => (
                  <div 
                    key={opt.id}
                    className={`config-card-option ${opt.id === processingId ? 'active' : ''}`}
                    onClick={() => setProcessingId(opt.id)}
                  >
                    <span className="option-tag">{opt.tag}</span>
                    <div className="option-title">{opt.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Packaging Size */}
            <div className="config-step">
              <div className="step-label">
                <span className="step-number">3</span> Select Packaging Size Tier
              </div>
              <div className="weights-grid">
                {currentProduct.tiers?.map(tier => (
                  <div 
                    key={tier.weight}
                    className={`config-card-option weight-card ${tier.weight === weightKg ? 'active' : ''}`}
                    onClick={() => setWeightKg(tier.weight)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                  >
                    <div style={{ height: '54px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.35rem' }}>
                      <img 
                        src={BAG_IMAGES_BY_WEIGHT[tier.weight] || '/assets/images/packaging/bag_1kg.jpg'} 
                        alt={tier.label}
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                      />
                    </div>
                    <div className="weight-val">{tier.label}</div>
                    <div className="weight-sub">{tier.type}</div>
                    <span className={`tier-category-badge ${tier.isB2C ? 'tier-b2c' : 'tier-b2b'}`}>
                      {tier.isB2C ? 'Household' : 'Bulk / Export'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4: Quantity */}
            <div className="config-step">
              <div className="step-label">
                <span className="step-number">4</span> Select Order Quantity
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button 
                  className="qty-btn" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}
                >
                  -
                </button>
                <span style={{ fontSize: '1.3rem', fontWeight: '800', minWidth: '40px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button 
                  className="qty-btn" 
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}
                >
                  +
                </button>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginLeft: '0.5rem' }}>
                  Total Weight: <strong>{weightKg * quantity} KG</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Live Preview Panel */}
          <div className="config-preview-panel">
            <div>
              <div className="preview-badge-status">
                <span className="badge-tag">Official Royal Quality</span>
                <span className="preview-sku">{currentProduct.code}</span>
              </div>

              <div className="preview-art-frame">
                <img 
                  src={BAG_IMAGES_BY_WEIGHT[currentTier.weight] || currentProduct.image} 
                  alt={`${currentProduct.title} - ${currentTier.label}`} 
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>

              <h3 className="preview-product-title">{currentProduct.title}</h3>
              <div className="preview-package-summary">
                {currentTier.label} • {currentTier.type} • {currentProcessing.name}
              </div>

              {/* Technical Grain Metrics */}
              <div className="spec-pills-row">
                <div className="spec-pill">
                  <div className="spec-pill-label">Grain Size</div>
                  <div className="spec-pill-val">{currentProduct.grainLength}</div>
                </div>
                <div className="spec-pill">
                  <div className="spec-pill-label">Cooked Size</div>
                  <div className="spec-pill-val">{currentProduct.cookedLength}</div>
                </div>
                <div className="spec-pill">
                  <div className="spec-pill-label">Elongation</div>
                  <div className="spec-pill-val">{currentProduct.elongation}</div>
                </div>
              </div>

              {/* Pricing Box */}
              <div className="preview-price-box">
                <div>
                  <div className="price-meta-label">Total Price (Incl. Taxes)</div>
                  <div className="price-figure">PKR {totalPrice.toLocaleString()}</div>
                </div>
                <div className="price-unit">
                  PKR {currentTier.price.toLocaleString()} / bag
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="preview-cta-stack">
              <button 
                className="btn btn-gold" 
                onClick={handleAddToCart}
                style={{ width: '100%' }}
              >
                🛒 Add To Royal Cart
              </button>
              <a 
                href={`https://wa.me/923091065712?text=Hello%20Royal%20Sultan,%20I%20would%20like%20to%20order%20${quantity}x%20${encodeURIComponent(currentProduct.title)}%20(${currentTier.label})%20Total:%20PKR%20${totalPrice}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-whatsapp"
                style={{ width: '100%' }}
              >
                💬 Order Direct via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="toast active" style={{ display: 'block' }}>
          ✨ {toastMessage}
        </div>
      )}
    </section>
  );
}
