import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    closeCart, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    shippingFee, 
    totalAmount, 
    openCheckout 
  } = useCart();

  const freeDeliveryThreshold = 5000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`modal-receipt-backdrop ${isCartOpen ? 'open' : ''}`}
        style={{ zIndex: 2000 }}
        onClick={closeCart}
      ></div>

      {/* Drawer Panel */}
      <div className={`slide-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h3>👑 Royal Shopping Cart</h3>
          <button className="drawer-close-btn" onClick={closeCart} aria-label="Close Cart">
            ✕
          </button>
        </div>

        <div className="drawer-body">
          {/* Free Shipping Meter */}
          <div style={{ background: '#FAF7F2', border: '1px solid var(--gold-border)', borderRadius: '8px', padding: '0.8rem', marginBottom: '1.2rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginBottom: '0.4rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>
                {subtotal >= freeDeliveryThreshold ? (
                  <strong style={{ color: 'var(--emerald)' }}>✓ You have unlocked FREE Express Delivery!</strong>
                ) : (
                  <span>Add <strong>PKR {(freeDeliveryThreshold - subtotal).toLocaleString()}</strong> for Free Delivery</span>
                )}
              </span>
              <span style={{ fontWeight: '700' }}>{progressPercent}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: '#EAE2D2', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--gold-gradient)', transition: 'width 0.3s' }}></div>
            </div>
          </div>

          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛍️</div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Your Royal Cart is Empty</h4>
              <p style={{ fontSize: '0.85rem' }}>
                Explore our 1121 Kainat and Super Kernel harvests in the interactive configurator.
              </p>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item, idx) => (
                <div key={idx} className="cart-item-card">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '6px' }}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {item.weightLabel} • {item.packagingType}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', marginTop: '0.2rem' }}>
                      {item.processingName}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.6rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button className="qty-btn" onClick={() => updateQuantity(idx, -1)}>-</button>
                        <span className="qty-val">{item.quantity}</span>
                        <button className="qty-btn" onClick={() => updateQuantity(idx, 1)}>+</button>
                      </div>
                      <div style={{ fontWeight: '800', color: 'var(--gold-bright)' }}>
                        PKR {(item.unitPrice * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <button 
                    className="cart-item-remove" 
                    onClick={() => removeFromCart(idx)}
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="cart-cost-breakdown">
              <div className="cost-row">
                <span>Subtotal:</span>
                <span>PKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="cost-row">
                <span>Shipping Fee:</span>
                <span>{shippingFee === 0 ? <strong style={{ color: 'var(--emerald)' }}>FREE</strong> : `PKR ${shippingFee}`}</span>
              </div>
              <div className="cost-row total-row">
                <span>Total Amount:</span>
                <span>PKR {totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="cart-action-buttons">
              <button 
                className="btn btn-gold" 
                style={{ width: '100%' }}
                onClick={openCheckout}
              >
                ⚡ Proceed to Express Checkout
              </button>
              <button 
                className="btn btn-outline-gold" 
                style={{ width: '100%' }}
                onClick={closeCart}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
