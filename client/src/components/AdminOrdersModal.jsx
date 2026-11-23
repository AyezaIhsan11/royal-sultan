import React, { useState, useEffect } from 'react';

export default function AdminOrdersModal({ isOpen, onClose }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/orders');
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        console.error('Non-JSON response from /api/orders:', text);
        throw new Error('Server returned an unexpected format. Please refresh in a moment.');
      }
      if (data && data.success && Array.isArray(data.data)) {
        setOrders(data.data);
      } else if (data && data.message) {
        setErrorMsg(data.message);
      } else {
        setErrorMsg('No orders found.');
      }
    } catch (err) {
      setErrorMsg('Failed to load orders: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-receipt-backdrop open" style={{ zIndex: 2300 }}>
      <div className="modal-receipt-box" style={{ maxWidth: '850px', width: '95%', maxHeight: '90vh', overflowY: 'auto', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', marginBottom: '1.2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', margin: 0 }}>
              👑 Royal Sultan Orders Management
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--gold-primary)' }}>
              Active Customer Orders ({orders.length} total)
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button className="btn btn-sm btn-outline-gold" onClick={fetchOrders} disabled={loading}>
              {loading ? 'Refreshing...' : '🔄 Refresh'}
            </button>
            <button className="drawer-close-btn" onClick={onClose} style={{ fontSize: '1.4rem' }}>
              ✕
            </button>
          </div>
        </div>

        {errorMsg && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.8rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem' }}>
            ⚠️ {errorMsg}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Loading live orders...
          </div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📦</div>
            <h4>No orders recorded yet</h4>
            <p style={{ fontSize: '0.85rem' }}>Orders placed by customers will appear here in real time.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.map((ord, idx) => (
              <div 
                key={idx} 
                style={{ 
                  background: '#FAF7F2', 
                  border: '1px solid var(--gold-border)', 
                  borderRadius: '10px', 
                  padding: '1.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '1px solid rgba(184, 142, 40, 0.15)', paddingBottom: '0.6rem' }}>
                  <div>
                    <span style={{ fontFamily: 'monospace', fontWeight: '800', color: 'var(--gold-primary)', fontSize: '1.05rem' }}>
                      {ord.orderCode}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: '0.8rem' }}>
                      {ord.createdAt ? new Date(ord.createdAt).toLocaleString() : 'Just now'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                    <span className="tier-category-badge tier-b2c">
                      {ord.status || 'Confirmed'}
                    </span>
                    <span style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--gold-bright)' }}>
                      PKR {ord.totalAmount?.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Customer Details */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem', fontSize: '0.86rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Customer: </span>
                    <strong>{ord.customer?.fullName}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Phone: </span>
                    <a href={`tel:${ord.customer?.phone}`} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '600' }}>
                      {ord.customer?.phone}
                    </a>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>City: </span>
                    <strong>{ord.customer?.city}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Payment: </span>
                    <strong style={{ textTransform: 'uppercase' }}>{ord.paymentMethod}</strong>
                  </div>
                </div>

                <div style={{ fontSize: '0.84rem', color: 'var(--text-cream)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Delivery Address: </span>
                  {ord.customer?.address}
                </div>

                {/* Ordered Items List */}
                <div style={{ background: '#FFFFFF', border: '1px solid rgba(184, 142, 40, 0.15)', borderRadius: '6px', padding: '0.8rem' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Items Ordered:
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.84rem' }}>
                    {ord.items?.map((it, i) => (
                      <li key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>
                          <strong>{it.quantity}x</strong> {it.title} ({it.weightLabel || `${it.weightKg} KG`}) - {it.processingName}
                        </span>
                        <span style={{ fontWeight: '600' }}>
                          PKR {(it.unitPrice * it.quantity).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* WhatsApp Action */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '0.3rem' }}>
                  <a 
                    href={`https://wa.me/${ord.customer?.phone?.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(ord.customer?.fullName || '')},%20this%20is%20Royal%20Sultan%20Rice.%20We%20have%20received%20your%20order%20(${ord.orderCode})%20for%20PKR%20${ord.totalAmount}.%20Your%20order%20is%20now%20being%20prepared%20for%20dispatch.`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-sm btn-whatsapp"
                  >
                    💬 WhatsApp Customer
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
