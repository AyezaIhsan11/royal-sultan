require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const rfqRoutes = require('./routes/rfqRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB().catch(err => {
  console.warn('Initial DB connection warning (running fallback):', err.message);
});

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static public assets (images, etc)
app.use('/assets', express.static(path.join(__dirname, '../client/public/assets')));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/rfq', rfqRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Royal Sultan Premium Rice MERN API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Root welcome message
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Royal Sultan MERN Stack API Server',
    endpoints: {
      products: '/api/products',
      orders: '/api/orders',
      rfq: '/api/rfq',
      health: '/api/health'
    }
  });
});

// Only listen when executed directly (not when imported as Vercel serverless function)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🌾 Royal Sultan MERN Server running on port http://localhost:${PORT}`);
  });
}

module.exports = app;
