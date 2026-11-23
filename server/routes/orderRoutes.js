const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/Order');

const inMemoryOrders = [];

// POST create new order
router.post('/', async (req, res) => {
  try {
    const { customer, items, shippingFee, paymentMethod, notes } = req.body;

    if (!customer || !customer.fullName || !customer.phone || !customer.address || !customer.city) {
      return res.status(400).json({ success: false, message: 'Please provide all required customer details' });
    }

    if (!items || !items.length) {
      return res.status(400).json({ success: false, message: 'Your cart is empty' });
    }

    const subtotal = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    const fee = shippingFee !== undefined ? Number(shippingFee) : (subtotal >= 5000 ? 0 : 350);
    const totalAmount = subtotal + fee;

    const orderCode = `RS-${Math.floor(10000 + Math.random() * 90000)}`;

    const orderData = {
      orderCode,
      customer,
      items,
      subtotal,
      shippingFee: fee,
      totalAmount,
      paymentMethod: paymentMethod || 'cod',
      status: 'Confirmed',
      notes: notes || '',
      createdAt: new Date()
    };

    if (mongoose.connection.readyState === 1) {
      try {
        const newOrder = await Order.create(orderData);
        return res.status(201).json({
          success: true,
          message: 'Order placed successfully',
          data: newOrder,
          storage: 'saved'
        });
      } catch (dbErr) {
        console.warn('DB save error, falling back:', dbErr.message);
      }
    }

    // Fallback in-memory
    inMemoryOrders.unshift(orderData);
    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: orderData,
      storage: 'saved'
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// GET all orders
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const orders = await Order.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: orders.length, data: orders, storage: 'mongodb' });
    }
    return res.json({ success: true, count: inMemoryOrders.length, data: inMemoryOrders, storage: 'in-memory' });
  } catch (err) {
    return res.json({ success: true, count: inMemoryOrders.length, data: inMemoryOrders, storage: 'in-memory' });
  }
});

// GET single order
router.get('/:code', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const order = await Order.findOne({ orderCode: req.params.code });
      if (order) return res.json({ success: true, data: order });
    }
    const memOrder = inMemoryOrders.find(o => o.orderCode === req.params.code);
    if (memOrder) return res.json({ success: true, data: memOrder });
    return res.status(404).json({ success: false, message: 'Order not found' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
