const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  varietyCode: { type: String, required: true },
  title: { type: String, required: true },
  processingName: { type: String, required: true },
  weightLabel: { type: String, required: true },
  weightKg: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  total: { type: Number, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderCode: { type: String, required: true, unique: true },
  customer: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true }
  },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  shippingFee: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cod', 'bank_transfer', 'online'], default: 'cod' },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Dispatched', 'Delivered', 'Cancelled'], default: 'Pending' },
  notes: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
