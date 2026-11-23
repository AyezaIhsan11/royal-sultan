/**
 * ROYAL SULTAN PREMIUM RICE - CORE PLATFORM SCRIPT
 * Implements: Dynamic Rice Variety & Packaging Configurator,
 * Cart Drawer, 1-Click Express Checkout, WhatsApp Bot Order Builder,
 * Container Load Calculator (20ft/40ft FCL), and Interactive Modals.
 */

// ==========================================
// 1. DATA DICTIONARY & SKU MATRIX
// ==========================================
const RICE_CATALOG = {
  'RS-1121-KNT': {
    code: 'RS-1121-KNT',
    title: '1121 Kainat Basmati',
    subtitle: 'Flagship Extra Long Grain',
    grainLength: '8.35 mm+',
    cookedLength: '19.5 mm+',
    elongation: '2.4x Elongation',
    aroma: 'Supreme Imperial Aroma',
    image: 'assets/images/varieties/variety_1121_kainat.jpg',
    description: 'The crowning jewel of Punjab basmati. Hand-selected extra long grains aged to perfection for non-sticky, grand banquet biryanis and royal pulaos.',
    processingOptions: [
      { id: 'steam', name: 'Extra Long Steam Rice', tag: 'Aromatic & Light' },
      { id: 'raw', name: 'Double Polished Aged Raw', tag: 'Traditional Fluffy' },
      { id: 'sella', name: 'Parboiled Sella', tag: 'Firm & Non-Breaking' }
    ],
    tiers: [
      { weight: 1, label: '1 KG', type: 'Royal Black Pouch (Gold Trim)', price: 950, isB2C: true },
      { weight: 5, label: '5 KG', type: 'Emerald Green Pouch (Gold Trim)', price: 4300, isB2C: true, popular: true },
      { weight: 10, label: '10 KG', type: 'Royal Navy Blue Bag (Gold Handle)', price: 8400, isB2C: true },
      { weight: 25, label: '25 KG', type: 'Royal Maroon Pouch (Gold Handle)', price: 20500, isB2C: true },
      { weight: 40, label: '40 KG', type: 'Export Skin Jute Sack', price: 32000, isB2C: false }
    ]
  },
  'RS-SUP-KRNL': {
    code: 'RS-SUP-KRNL',
    title: 'Super Kernel Basmati',
    subtitle: 'Traditional Aromatic Vintage',
    grainLength: '7.45 mm+',
    cookedLength: '16.5 mm+',
    elongation: '2.2x Elongation',
    aroma: 'Classic Rich Fragrance',
    image: 'assets/images/varieties/variety_super_kernel.jpg',
    description: 'Harvested from historical Chenab river fed valleys, cherished across generations for its naturally sweet taste, delicate texture, and comforting aroma.',
    processingOptions: [
      { id: 'raw', name: 'Double Polished Aged Raw', tag: 'Heritage Choice' },
      { id: 'steam', name: 'Steam Basmati', tag: 'Quick Cooking' }
    ],
    tiers: [
      { weight: 1, label: '1 KG', type: 'Royal Black Pouch (Gold Trim)', price: 750, isB2C: true },
      { weight: 5, label: '5 KG', type: 'Emerald Green Pouch (Gold Trim)', price: 3500, isB2C: true },
      { weight: 10, label: '10 KG', type: 'Royal Navy Blue Bag (Gold Handle)', price: 6800, isB2C: true },
      { weight: 25, label: '25 KG', type: 'Royal Maroon Pouch (Gold Handle)', price: 16500, isB2C: true },
      { weight: 40, label: '40 KG', type: 'Export Skin Jute Sack', price: 26000, isB2C: false }
    ]
  },
  'RS-SLA-PARB': {
    code: 'RS-SLA-PARB',
    title: '1121 Steam Sella',
    subtitle: 'Golden Grain Parboiled',
    grainLength: '8.30 mm+',
    cookedLength: '18.8 mm+',
    elongation: '2.3x Elongation',
    aroma: 'Nutty Golden Aroma',
    image: 'assets/images/varieties/variety_steam_sella.jpg',
    description: 'Parboiled under steam pressure to seal in natural nutrients and vitamins. Withstands vigorous catering stirring without breaking a single grain.',
    processingOptions: [
      { id: 'sella', name: 'Golden Parboiled Sella', tag: 'Chef Choice' },
      { id: 'white-sella', name: 'Creamy White Sella', tag: 'Banquet Grade' }
    ],
    tiers: [
      { weight: 5, label: '5 KG', type: 'Emerald Green Pouch (Gold Trim)', price: 3950, isB2C: true },
      { weight: 10, label: '10 KG', type: 'Royal Navy Blue Bag (Gold Handle)', price: 7700, isB2C: true },
      { weight: 25, label: '25 KG', type: 'Royal Maroon Pouch (Gold Handle)', price: 18800, isB2C: true },
      { weight: 40, label: '40 KG', type: 'Export Skin Jute Sack', price: 29500, isB2C: false }
    ]
  },
  'RS-WHT-FINE': {
    code: 'RS-WHT-FINE',
    title: 'Super Fine White Rice',
    subtitle: 'Daily Kitchen Essential',
    grainLength: '6.80 mm+',
    cookedLength: '14.2 mm+',
    elongation: '2.0x Elongation',
    aroma: 'Mild Fresh Aroma',
    image: 'assets/images/varieties/variety_super_fine.jpg',
    description: 'Silky, double-sorted daily cooking rice. Ideal for wholesome daal chawal, Chinese fried rice, and comforting everyday meals.',
    processingOptions: [
      { id: 'double-polish', name: 'Silky Double Polished', tag: 'Clean & Pure' }
    ],
    tiers: [
      { weight: 5, label: '5 KG', type: 'Emerald Green Pouch (Gold Trim)', price: 2100, isB2C: true },
      { weight: 10, label: '10 KG', type: 'Royal Navy Blue Bag (Gold Handle)', price: 4000, isB2C: true },
      { weight: 25, label: '25 KG', type: 'Royal Maroon Pouch (Gold Handle)', price: 9800, isB2C: true },
      { weight: 40, label: '40 KG', type: 'Export Skin Jute Sack', price: 15500, isB2C: false }
    ]
  }
};

// ==========================================
// 2. APP STATE
// ==========================================
const appState = {
  config: {
    varietyCode: 'RS-1121-KNT',
    processingId: 'steam',
    weightKg: 5,
    quantity: 1
  },
  cart: [],
  containerCalc: {
    containerType: '20ft', // 20ft (25MT) or 40ft (28MT)
    bagWeightKg: 40,
    bagsCount: 600,
    targetPort: 'Jebel Ali, UAE'
  }
};

// ==========================================
// 3. INITIALIZATION & DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  loadCartFromStorage();
  initVarietySelector();
  updateConfiguratorUI();
  initContainerCalculator();
  initFaqAccordion();
  initFormListeners();
});

// ==========================================
// 4. CONFIGURATOR CONTROLLER
// ==========================================
function initVarietySelector() {
  const varietyCards = document.querySelectorAll('[data-variety-code]');
  varietyCards.forEach(card => {
    card.addEventListener('click', () => {
      const code = card.dataset.varietyCode;
      if (code && RICE_CATALOG[code]) {
        appState.config.varietyCode = code;
        
        // Auto select first processing option
        appState.config.processingId = RICE_CATALOG[code].processingOptions[0].id;
        
        // Pick available weight tier
        const availableTiers = RICE_CATALOG[code].tiers;
        const hasCurrentWeight = availableTiers.some(t => t.weight === appState.config.weightKg);
        if (!hasCurrentWeight) {
          appState.config.weightKg = availableTiers[0].weight;
        }

        updateConfiguratorUI();
        showToast(`Selected: ${RICE_CATALOG[code].title}`);
      }
    });
  });
}

function updateConfiguratorUI() {
  const currentProduct = RICE_CATALOG[appState.config.varietyCode];
  if (!currentProduct) return;

  // 1. Update Variety Buttons Active State
  document.querySelectorAll('[data-variety-code]').forEach(card => {
    if (card.dataset.varietyCode === appState.config.varietyCode) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  // 2. Render Step 2: Processing Grade
  const processingContainer = document.getElementById('processing-options-container');
  if (processingContainer) {
    processingContainer.innerHTML = currentProduct.processingOptions.map(opt => `
      <div class="config-card-option ${opt.id === appState.config.processingId ? 'active' : ''}" 
           onclick="selectProcessingGrade('${opt.id}')">
        <span class="option-tag">${opt.tag}</span>
        <div class="option-title">${opt.name}</div>
      </div>
    `).join('');
  }

  // 3. Render Step 3: Packaging Sizes
  const weightsContainer = document.getElementById('weights-options-container');
  if (weightsContainer) {
    weightsContainer.innerHTML = currentProduct.tiers.map(tier => `
      <div class="config-card-option weight-card ${tier.weight === appState.config.weightKg ? 'active' : ''}" 
           onclick="selectWeightTier(${tier.weight})">
        <div class="weight-val">${tier.label}</div>
        <div class="weight-sub">${tier.type}</div>
        <span class="tier-category-badge ${tier.isB2C ? 'tier-b2c' : 'tier-b2b'}">
          ${tier.isB2C ? 'Household' : 'Bulk / Export'}
        </span>
      </div>
    `).join('');
  }

  // 4. Resolve Dynamic State & Price
  const activeTier = currentProduct.tiers.find(t => t.weight === appState.config.weightKg) || currentProduct.tiers[0];
  const activeProcessing = currentProduct.processingOptions.find(p => p.id === appState.config.processingId) || currentProduct.processingOptions[0];

  // Update Preview Elements
  const previewSku = document.getElementById('preview-sku');
  const previewTitle = document.getElementById('preview-title');
  const previewPackage = document.getElementById('preview-package');
  const previewGrain = document.getElementById('preview-grain');
  const previewElongation = document.getElementById('preview-elongation');
  const previewAroma = document.getElementById('preview-aroma');
  const previewPrice = document.getElementById('preview-price');
  const previewImage = document.getElementById('preview-image');
  const previewCtaContainer = document.getElementById('preview-cta-container');

  if (previewSku) previewSku.innerText = `${currentProduct.code}-${activeTier.weight}KG`;
  if (previewTitle) previewTitle.innerText = `${currentProduct.title} (${activeProcessing.name})`;
  if (previewPackage) previewPackage.innerText = `${activeTier.label} • ${activeTier.type}`;
  if (previewGrain) previewGrain.innerText = currentProduct.grainLength;
  if (previewElongation) previewElongation.innerText = currentProduct.elongation;
  if (previewAroma) previewAroma.innerText = currentProduct.aroma;
  if (previewImage) previewImage.src = currentProduct.image;

  if (previewPrice) {
    previewPrice.innerHTML = `PKR ${activeTier.price.toLocaleString()} <span class="price-unit">/ ${activeTier.label}</span>`;
  }

  // 5. Alternate CTAs based on B2C vs B2B bulk tier (PRD Section 4 & 5)
  if (previewCtaContainer) {
    if (activeTier.isB2C) {
      previewCtaContainer.innerHTML = `
        <div style="display: flex; gap: 0.6rem;">
          <button class="btn btn-gold" style="flex: 1;" onclick="handleInstantBuyNow()">
            ⚡ Instant Buy Now
          </button>
          <button class="btn btn-outline-gold" style="flex: 1;" onclick="addCurrentConfigToCart()">
            🛒 Add to Cart
          </button>
        </div>
        <button class="btn btn-whatsapp" onclick="launchWhatsAppOrder()">
          <span style="font-size: 1.2rem;">💬</span> Order on WhatsApp
        </button>
      `;
    } else {
      previewCtaContainer.innerHTML = `
        <button class="btn btn-gold" onclick="jumpToRfqForm('${currentProduct.title}', '${activeTier.label}', '${activeTier.type}')">
          📋 Request Bulk Export Quote (RFQ)
        </button>
        <button class="btn btn-whatsapp" onclick="launchWhatsAppOrder(true)">
          <span style="font-size: 1.2rem;">💬</span> WhatsApp Commercial Desk
        </button>
      `;
    }
  }
}

function selectProcessingGrade(processingId) {
  appState.config.processingId = processingId;
  updateConfiguratorUI();
}

function selectWeightTier(weightKg) {
  appState.config.weightKg = weightKg;
  updateConfiguratorUI();
}

function configureProduct(code) {
  if (RICE_CATALOG[code]) {
    appState.config.varietyCode = code;
    appState.config.processingId = RICE_CATALOG[code].processingOptions[0].id;
    appState.config.weightKg = RICE_CATALOG[code].tiers[0].weight;
    updateConfiguratorUI();
    const configElem = document.getElementById('configurator');
    if (configElem) {
      configElem.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// ==========================================
// 5. CART & ORDER STATE ENGINE
// ==========================================
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('royal_sultan_cart');
    if (saved) {
      appState.cart = JSON.parse(saved);
    }
  } catch (e) {
    appState.cart = [];
  }
  updateCartBadge();
  renderCartDrawer();
}

function saveCartToStorage() {
  localStorage.setItem('royal_sultan_cart', JSON.stringify(appState.cart));
  updateCartBadge();
  renderCartDrawer();
}

function addCurrentConfigToCart() {
  const currentProduct = RICE_CATALOG[appState.config.varietyCode];
  const activeTier = currentProduct.tiers.find(t => t.weight === appState.config.weightKg);
  const activeProcessing = currentProduct.processingOptions.find(p => p.id === appState.config.processingId);

  const cartItemId = `${currentProduct.code}-${activeProcessing.id}-${activeTier.weight}`;
  const existing = appState.cart.find(i => i.id === cartItemId);

  if (existing) {
    existing.qty += 1;
  } else {
    appState.cart.push({
      id: cartItemId,
      productCode: currentProduct.code,
      title: currentProduct.title,
      processing: activeProcessing.name,
      weightKg: activeTier.weight,
      weightLabel: activeTier.label,
      bagType: activeTier.type,
      price: activeTier.price,
      qty: 1,
      image: currentProduct.image
    });
  }

  saveCartToStorage();
  openCartDrawer();
  showToast(`Added ${currentProduct.title} (${activeTier.label}) to Cart!`);
}

function updateCartItemQty(cartItemId, delta) {
  const item = appState.cart.find(i => i.id === cartItemId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    appState.cart = appState.cart.filter(i => i.id !== cartItemId);
  }
  saveCartToStorage();
}

function removeCartItem(cartItemId) {
  appState.cart = appState.cart.filter(i => i.id !== cartItemId);
  saveCartToStorage();
  showToast("Item removed from cart");
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-count-badge');
  const count = appState.cart.reduce((sum, item) => sum + item.qty, 0);
  badges.forEach(b => {
    b.innerText = count;
  });
}

function calculateCartTotals() {
  const subtotal = appState.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalWeightKg = appState.cart.reduce((sum, item) => sum + (item.weightKg * item.qty), 0);
  
  // Weight based courier rule in Pakistan: Base PKR 250 + PKR 60 per KG over 5kg
  let shipping = 0;
  if (subtotal > 0) {
    shipping = totalWeightKg <= 5 ? 250 : 250 + Math.ceil(totalWeightKg - 5) * 60;
  }

  return {
    subtotal,
    totalWeightKg,
    shipping,
    grandTotal: subtotal + shipping
  };
}

function renderCartDrawer() {
  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const shippingEl = document.getElementById('cart-shipping');
  const grandTotalEl = document.getElementById('cart-grand-total');

  if (!container) return;

  if (appState.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <div style="font-size: 3rem; margin-bottom: 1rem; color: var(--gold-primary);">🌾</div>
        <p style="font-size: 1.1rem; color: var(--text-cream); margin-bottom: 0.5rem;">Your Cart is Empty</p>
        <p style="font-size: 0.85rem;">Discover our 1121 Kainat Basmati and elevate your dining experience.</p>
        <button class="btn btn-outline-gold" style="margin-top: 1.5rem;" onclick="closeAllDrawers(); location.href='#configurator';">
          Explore Varieties
        </button>
      </div>
    `;
    if (subtotalEl) subtotalEl.innerText = 'PKR 0';
    if (shippingEl) shippingEl.innerText = 'PKR 0';
    if (grandTotalEl) grandTotalEl.innerText = 'PKR 0';
    return;
  }

  container.innerHTML = appState.cart.map(item => `
    <div class="cart-item-card">
      <img src="${item.image}" alt="${item.title}" class="cart-item-thumb">
      <div class="cart-item-details">
        <div class="cart-item-name">${item.title}</div>
        <div class="cart-item-tier">${item.weightLabel} • ${item.processing}</div>
        <div class="cart-item-price">PKR ${(item.price * item.qty).toLocaleString()}</div>
      </div>
      <div class="cart-qty-ctrl">
        <button class="qty-btn" onclick="updateCartItemQty('${item.id}', -1)">-</button>
        <span class="qty-val">${item.qty}</span>
        <button class="qty-btn" onclick="updateCartItemQty('${item.id}', 1)">+</button>
      </div>
      <button class="cart-item-remove" onclick="removeCartItem('${item.id}')" title="Remove">✕</button>
    </div>
  `).join('');

  const totals = calculateCartTotals();
  if (subtotalEl) subtotalEl.innerText = `PKR ${totals.subtotal.toLocaleString()}`;
  if (shippingEl) shippingEl.innerText = `PKR ${totals.shipping.toLocaleString()} (${totals.totalWeightKg} KG)`;
  if (grandTotalEl) grandTotalEl.innerText = `PKR ${totals.grandTotal.toLocaleString()}`;
}

// ==========================================
// 6. DRAWERS & MODALS CONTROLLER
// ==========================================
function openCartDrawer() {
  closeAllDrawers();
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (drawer && backdrop) {
    drawer.classList.add('open');
    backdrop.classList.add('open');
  }
}

function openCheckoutDrawer(prefillItem = null) {
  closeAllDrawers();
  const drawer = document.getElementById('checkout-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const checkoutSummary = document.getElementById('checkout-order-summary');

  if (checkoutSummary) {
    if (prefillItem) {
      const shipping = prefillItem.weightKg <= 5 ? 250 : 250 + Math.ceil(prefillItem.weightKg - 5) * 60;
      const total = prefillItem.price + shipping;
      checkoutSummary.innerHTML = `
        <div class="cost-row">
          <span>${prefillItem.title} (${prefillItem.weightLabel}) x 1</span>
          <span>PKR ${prefillItem.price.toLocaleString()}</span>
        </div>
        <div class="cost-row">
          <span>Weight-Based Courier (${prefillItem.weightKg} KG)</span>
          <span>PKR ${shipping.toLocaleString()}</span>
        </div>
        <div class="cost-row total-row">
          <span>Grand Total Payable</span>
          <span>PKR ${total.toLocaleString()}</span>
        </div>
      `;
    } else {
      const totals = calculateCartTotals();
      checkoutSummary.innerHTML = `
        <div class="cost-row">
          <span>Cart Subtotal (${appState.cart.reduce((s, i) => s + i.qty, 0)} items)</span>
          <span>PKR ${totals.subtotal.toLocaleString()}</span>
        </div>
        <div class="cost-row">
          <span>Nationwide Logistics (${totals.totalWeightKg} KG)</span>
          <span>PKR ${totals.shipping.toLocaleString()}</span>
        </div>
        <div class="cost-row total-row">
          <span>Grand Total Payable</span>
          <span>PKR ${totals.grandTotal.toLocaleString()}</span>
        </div>
      `;
    }
  }

  if (drawer && backdrop) {
    drawer.classList.add('open');
    backdrop.classList.add('open');
  }
}

function handleInstantBuyNow() {
  const currentProduct = RICE_CATALOG[appState.config.varietyCode];
  const activeTier = currentProduct.tiers.find(t => t.weight === appState.config.weightKg);
  const activeProcessing = currentProduct.processingOptions.find(p => p.id === appState.config.processingId);

  const directItem = {
    title: currentProduct.title,
    processing: activeProcessing.name,
    weightKg: activeTier.weight,
    weightLabel: activeTier.label,
    price: activeTier.price,
    bagType: activeTier.type
  };

  openCheckoutDrawer(directItem);
}

function closeAllDrawers() {
  document.querySelectorAll('.slide-drawer').forEach(d => d.classList.remove('open'));
  const backdrop = document.getElementById('drawer-backdrop');
  if (backdrop) backdrop.classList.remove('open');
  const receiptBackdrop = document.getElementById('receipt-modal-backdrop');
  if (receiptBackdrop) receiptBackdrop.classList.remove('open');
}

// ==========================================
// 7. WHATSAPP AUTOMATED ORDER BOT BUILDER (Workflow 2 from PRD)
// ==========================================
function launchWhatsAppOrder(isBulk = false) {
  const currentProduct = RICE_CATALOG[appState.config.varietyCode];
  const activeTier = currentProduct.tiers.find(t => t.weight === appState.config.weightKg);

  let message = '';
  if (isBulk) {
    message = `*ROYAL SULTAN RICE - COMMERCIAL BULK ENQUIRY*
----------------------------------------
*Product Variety:* ${currentProduct.title}
*Packaging Size:* ${activeTier.label} (${activeTier.type})
*Estimated Requirement:* 500+ Bags
*Port / Destination City:* Lahore / Karachi Port
Please connect me with the Export / Institutional Sales Desk.`;
  } else {
    // Exact structure specified in Technical PRD Section 6 Workflow 2
    message = `*ROYAL SULTAN RICE - NEW DIRECT ORDER*
----------------------------------------
*Product:* Royal Sultan ${currentProduct.title}
*Package Size:* ${activeTier.label} ${activeTier.type}
*Quantity:* 1 Unit (Total ${activeTier.weight} KG)
*Price:* PKR ${activeTier.price.toLocaleString()} (+ Shipping)
*Customer City:* Lahore
Please confirm stock availability and dispatch time.`;
  }

  const encoded = encodeURIComponent(message);
  // Official Royal Sultan WhatsApp Gateway
  const waUrl = `https://wa.me/923001234567?text=${encoded}`;
  window.open(waUrl, '_blank');
}

// ==========================================
// 8. EXPRESS CHECKOUT FORM SUBMISSION & RECEIPT
// ==========================================
function initFormListeners() {
  const checkoutForm = document.getElementById('express-checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('cust-name').value;
      const phone = document.getElementById('cust-phone').value;
      const address = document.getElementById('cust-address').value;
      const city = document.getElementById('cust-city').value;
      const paymentMethod = document.querySelector('input[name="payment_method"]:checked')?.value || 'Cash on Delivery (COD)';

      const orderCode = 'RS-PK-' + Math.floor(100000 + Math.random() * 900000);
      const totals = calculateCartTotals();
      const grandTotal = totals.grandTotal > 0 ? totals.grandTotal : 4550;

      // Populate Receipt Modal
      const modalCode = document.getElementById('receipt-code');
      const modalName = document.getElementById('receipt-name');
      const modalPhone = document.getElementById('receipt-phone');
      const modalCity = document.getElementById('receipt-city');
      const modalPayment = document.getElementById('receipt-payment');
      const modalTotal = document.getElementById('receipt-total');

      if (modalCode) modalCode.innerText = orderCode;
      if (modalName) modalName.innerText = name;
      if (modalPhone) modalPhone.innerText = phone;
      if (modalCity) modalCity.innerText = `${city}, Pakistan`;
      if (modalPayment) modalPayment.innerText = paymentMethod;
      if (modalTotal) modalTotal.innerText = `PKR ${grandTotal.toLocaleString()}`;

      // Clear cart
      appState.cart = [];
      saveCartToStorage();
      closeAllDrawers();

      // Show receipt modal
      const receiptModal = document.getElementById('receipt-modal-backdrop');
      if (receiptModal) receiptModal.classList.add('open');
      showToast("Order Placed Successfully!");
    });
  }

  // RFQ Form listener
  const rfqForm = document.getElementById('b2b-rfq-form');
  if (rfqForm) {
    rfqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast("Thank you! Your export RFQ has been logged. Sales team will contact within 2 hours.");
      rfqForm.reset();
    });
  }
}

function jumpToRfqForm(variety, bagSize, material) {
  const varietySelect = document.getElementById('rfq-variety');
  const notesField = document.getElementById('rfq-notes');
  if (varietySelect) varietySelect.value = variety;
  if (notesField) notesField.value = `Packaging requested: ${bagSize} (${material})`;
  
  const rfqSection = document.getElementById('export-rfq');
  if (rfqSection) {
    rfqSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// ==========================================
// 9. B2B CONTAINER LOAD CALCULATOR (PRD SECTION 2 & 8)
// ==========================================
function initContainerCalculator() {
  const containerTabs = document.querySelectorAll('[data-container-type]');
  const bagWeightSelect = document.getElementById('calc-bag-weight');
  const bagCountInput = document.getElementById('calc-bag-count');
  const targetPortSelect = document.getElementById('calc-port');

  containerTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      containerTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      appState.containerCalc.containerType = tab.dataset.containerType;
      recalculateContainerMetrics();
    });
  });

  if (bagWeightSelect) {
    bagWeightSelect.addEventListener('change', (e) => {
      appState.containerCalc.bagWeightKg = parseFloat(e.target.value);
      recalculateContainerMetrics();
    });
  }

  if (bagCountInput) {
    bagCountInput.addEventListener('input', (e) => {
      appState.containerCalc.bagsCount = parseInt(e.target.value) || 0;
      recalculateContainerMetrics();
    });
  }

  if (targetPortSelect) {
    targetPortSelect.addEventListener('change', (e) => {
      appState.containerCalc.targetPort = e.target.value;
    });
  }

  recalculateContainerMetrics();
}

function recalculateContainerMetrics() {
  const { containerType, bagWeightKg, bagsCount } = appState.containerCalc;
  
  // Standard Container Payload limits (Metric Tons)
  // 20ft FCL ~ 25.0 MT (25,000 KG)
  // 40ft FCL ~ 28.0 MT (28,000 KG)
  const maxPayloadKg = containerType === '20ft' ? 25000 : 28000;
  const currentTotalKg = bagWeightKg * bagsCount;
  const currentMetricTons = (currentTotalKg / 1000).toFixed(2);
  const utilizationPct = Math.min(100, Math.round((currentTotalKg / maxPayloadKg) * 100));

  const totalMtEl = document.getElementById('calc-total-mt');
  const totalBagsEl = document.getElementById('calc-total-bags');
  const utilPctEl = document.getElementById('calc-util-pct');
  const progressFill = document.getElementById('calc-progress-fill');
  const statusMsg = document.getElementById('calc-status-msg');

  if (totalMtEl) totalMtEl.innerText = `${currentMetricTons} MT`;
  if (totalBagsEl) totalBagsEl.innerText = `${bagsCount} Bags`;
  if (utilPctEl) utilPctEl.innerText = `${utilPct}%`;
  
  if (progressFill) {
    progressFill.style.width = `${utilPct}%`;
    if (currentTotalKg > maxPayloadKg) {
      progressFill.style.background = '#EF4444';
      if (statusMsg) statusMsg.innerHTML = `<span style="color:#EF4444">⚠️ Exceeds safe container payload limit by ${(currentMetricTons - (maxPayloadKg/1000)).toFixed(1)} MT</span>`;
    } else {
      progressFill.style.background = 'var(--gold-gradient)';
      if (statusMsg) statusMsg.innerHTML = `<span style="color:#34D399">✓ Optimal freight load efficiency for ${containerType} FCL</span>`;
    }
  }
}

// ==========================================
// 10. FAQ ACCORDION & NOTIFICATION TOAST
// ==========================================
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });
}

function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>👑</span> ${message}`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    navLinks.classList.toggle('mobile-open');
  }
}
