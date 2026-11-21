import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('rs_mern_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    localStorage.setItem('rs_mern_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, processingOption, tier, quantity = 1) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => 
        item.varietyCode === product.code &&
        item.processingId === processingOption.id &&
        item.weightKg === tier.weight
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, {
          varietyCode: product.code,
          title: product.title,
          processingId: processingOption.id,
          processingName: processingOption.name,
          weightKg: tier.weight,
          weightLabel: tier.label,
          packagingType: tier.type,
          unitPrice: tier.price,
          quantity: quantity,
          image: product.image
        }];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, delta) => {
    setCart(prev => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  const shippingFee = subtotal === 0 ? 0 : (subtotal >= 5000 ? 0 : 350);
  const totalAmount = subtotal + shippingFee;
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      shippingFee,
      totalAmount,
      itemCount,
      isCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      isCheckoutOpen,
      openCheckout: () => { setIsCartOpen(false); setIsCheckoutOpen(true); },
      closeCheckout: () => setIsCheckoutOpen(false),
      isReceiptOpen,
      lastOrder,
      openReceipt: (order) => { setLastOrder(order); setIsReceiptOpen(true); },
      closeReceipt: () => setIsReceiptOpen(false)
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
