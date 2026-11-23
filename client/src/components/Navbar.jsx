import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar({ onOpenAdmin }) {
  const { itemCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Top Announcement Notice */}
      <div className="top-notice-bar">
        <span>👑 <strong>Product of Pakistan:</strong> Direct from Punjab's fertile heartland. Free delivery in Lahore & Karachi on orders above PKR 5,000 | 
        <span className="highlight"> B2B Container Export Inquiries Open for UAE, UK, EU & USA</span></span>
      </div>

      {/* Sticky Main Navigation */}
      <header className="header-main" id="site-header">
        <div className="container navbar">
          {/* Brand Logo */}
          <a href="#home" className="logo-brand" id="brand-logo-link">
            <div className="logo-crown-icon">
              <span>👑</span>
            </div>
            <div className="logo-text-wrap">
              <span className="logo-title">Royal Sultan</span>
              <span className="logo-tagline">Premium Basmati Rice</span>
            </div>
          </a>

          {/* Desktop & Mobile Navigation Menu */}
          <nav>
            <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`} id="primary-nav-links">
              <li><a href="#home" className="nav-link active" onClick={closeMobileMenu}>Home</a></li>
              <li><a href="#configurator" className="nav-link" onClick={closeMobileMenu}>Configurator</a></li>
              <li><a href="#varieties" className="nav-link" onClick={closeMobileMenu}>Varieties</a></li>
              <li><a href="#packaging" className="nav-link" onClick={closeMobileMenu}>Packaging</a></li>
              <li><a href="#about" className="nav-link" onClick={closeMobileMenu}>Our Heritage</a></li>
              <li><a href="#export-rfq" className="nav-link" onClick={closeMobileMenu}>B2B / Export</a></li>
              <li><a href="#contact" className="nav-link" onClick={closeMobileMenu}>Contact</a></li>
              {/* Mobile Drawer Dedicated Links */}
              <li className="mobile-only-link">
                <a 
                  href="#orders" 
                  onClick={(e) => { e.preventDefault(); closeMobileMenu(); onOpenAdmin(); }}
                  style={{ color: 'var(--gold-bright)', fontWeight: '700' }}
                >
                  📋 Orders Portal (Admin)
                </a>
              </li>
              <li className="mobile-only-link">
                <a 
                  href="https://www.instagram.com/royalsultan_rs" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={closeMobileMenu}
                  style={{ color: 'var(--gold-primary)', fontWeight: '600' }}
                >
                  📸 Instagram: @royalsultan_rs
                </a>
              </li>
              <li className="mobile-only-link">
                <a 
                  href="https://wa.me/923091065712" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={closeMobileMenu}
                  style={{ color: '#059669', fontWeight: '700' }}
                >
                  💬 WhatsApp: 0309 1065712
                </a>
              </li>
            </ul>
          </nav>

          {/* Action Utilities */}
          <div className="nav-actions">
            {/* Orders Portal Button (Desktop) */}
            <button 
              className="btn btn-sm btn-outline-gold desktop-only-btn" 
              onClick={onOpenAdmin}
              title="Admin Orders Portal"
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.8rem' }}
            >
              📋 Orders Portal
            </button>

            {/* Instagram Official Link (Desktop) */}
            <a 
              href="https://www.instagram.com/royalsultan_rs" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-sm btn-outline-gold desktop-only-btn" 
              title="Official Instagram @royalsultan_rs"
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.75rem' }}
            >
              <span>📸</span> <span>@royalsultan_rs</span>
            </a>

            <a 
              href="https://wa.me/923091065712" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-sm btn-whatsapp nav-whatsapp-btn" 
              id="nav-whatsapp-btn"
              title="Chat on WhatsApp 0309 1065712"
            >
              <span>💬</span> <span className="whatsapp-btn-text">WhatsApp</span>
            </a>

            {/* Slide-out Cart Toggle Button */}
            <button 
              className="cart-toggle-btn" 
              onClick={openCart}
              title="View Cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span className="cart-count-badge">{itemCount}</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button 
              className="mobile-menu-btn" 
              onClick={toggleMobileMenu} 
              aria-label="Toggle Navigation Menu"
            >
              ☰
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
