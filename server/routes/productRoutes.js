const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const { INITIAL_PRODUCTS } = require('../data/seedData');

// GET all products
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const products = await Product.find({ isActive: true });
      if (products && products.length > 0) {
        return res.json({ success: true, count: products.length, data: products, source: 'mongodb' });
      }
    }
    return res.json({ success: true, count: INITIAL_PRODUCTS.length, data: INITIAL_PRODUCTS, source: 'fallback' });
  } catch (err) {
    console.warn('DB read fallback:', err.message);
    return res.json({ success: true, count: INITIAL_PRODUCTS.length, data: INITIAL_PRODUCTS, source: 'fallback' });
  }
});

// GET single product by code
router.get('/:code', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const product = await Product.findOne({ code: req.params.code });
      if (product) return res.json({ success: true, data: product });
    }
    const fallbackItem = INITIAL_PRODUCTS.find(p => p.code === req.params.code);
    if (fallbackItem) {
      return res.json({ success: true, data: fallbackItem });
    }
    return res.status(404).json({ success: false, message: 'Product not found' });
  } catch (err) {
    const fallbackItem = INITIAL_PRODUCTS.find(p => p.code === req.params.code);
    if (fallbackItem) return res.json({ success: true, data: fallbackItem });
    return res.status(500).json({ success: false, message: err.message });
  }
});

// POST seed products
router.post('/seed', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, message: 'MongoDB is not connected yet. Please set MONGODB_URI.' });
    }
    await Product.deleteMany({});
    const inserted = await Product.insertMany(INITIAL_PRODUCTS);
    return res.json({ success: true, message: `Seeded ${inserted.length} products to MongoDB`, data: inserted });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
