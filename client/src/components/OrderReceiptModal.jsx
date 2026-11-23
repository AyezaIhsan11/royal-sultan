import React from 'react';
import { useCart } from '../context/CartContext';

export default function OrderReceiptModal() {
  const { isReceiptOpen, lastOrder, closeReceipt } = useCart();

  if (!isReceiptOpen || !lastOrder) return null;

  return (
    <div className="modal-receipt-backdrop open" style={{ zIndex: 2200 }}>
      <div className="modal-receipt-box">
        <div className="receipt-crest">👑</div>
        <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
          Order Confirmed!
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.2rem' }}>
          Thank you for choosing Royal Sultan Basmati Rice. Your order has been confirmed and queued for premium dispatch.
        </p>

        <div className="receipt-order-code">
          Order Code: <strong>{lastOrder.orderCode}</strong>
        </div>

        <div className="receipt-breakdown" style={{ marginTop: '1.5rem', textAlign: 'left', padding: '1.2rem', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Customer:</span>
            <strong>{lastOrder.customer?.fullName}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Phone:</span>
            <span>{lastOrder.customer?.phone}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>City & Destination:</span>
            <span>{lastOrder.customer?.city}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Payment Mode:</span>
            <span style={{ textTransform: 'uppercase' }}>{lastOrder.paymentMethod}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.6rem', marginTop: '0.6rem', fontSize: '1.1rem', fontWeight: '800', color: 'var(--gold-bright)' }}>
            <span>Total Amount:</span>
            <span>PKR {lastOrder.totalAmount?.toLocaleString()}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1.8rem' }}>
          <a 
            href={`https://wa.me/923091065712?text=Hello%20Royal%20Sultan,%20I%20have%20placed%20order%20(${lastOrder.orderCode})%20for%20PKR%20${lastOrder.totalAmount}.%20Please%20confirm%20dispatch.`}
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-whatsapp"
          >
            💬 Confirm via WhatsApp Helpline
          </a>
          <button 
            className="btn btn-outline-gold" 
            onClick={closeReceipt}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
