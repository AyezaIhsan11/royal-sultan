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

          {/* Desktop Navigation Menu */}
          <nav>
            <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`} id="primary-nav-links">
              <li><a href="#home" className="nav-link active" onClick={closeMobileMenu}>Home</a></li>
              <li><a href="#configurator" className="nav-link" onClick={closeMobileMenu}>Configurator</a></li>
              <li><a href="#varieties" className="nav-link" onClick={closeMobileMenu}>Varieties</a></li>
              <li><a href="#packaging" className="nav-link" onClick={closeMobileMenu}>Packaging</a></li>
              <li><a href="#about" className="nav-link" onClick={closeMobileMenu}>Our Heritage</a></li>
              <li><a href="#export-rfq" className="nav-link" onClick={closeMobileMenu}>B2B / Export</a></li>
              <li><a href="#contact" className="nav-link" onClick={closeMobileMenu}>Contact</a></li>
            </ul>
          </nav>

          {/* Action Utilities */}
          <div className="nav-actions">
            {/* Orders Portal Button */}
            <button 
              className="btn btn-sm btn-outline-gold" 
              onClick={onOpenAdmin}
              title="Admin Orders Portal"
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.8rem' }}
            >
              📋 Orders Portal
            </button>

            <a 
              href="https://wa.me/923001234567" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-sm btn-whatsapp" 
              id="nav-whatsapp-btn"
            >
              <span>💬</span> <span>WhatsApp</span>
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
