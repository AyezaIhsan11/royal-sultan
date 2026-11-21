const mongoose = require('mongoose');

const processingOptionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  tag: { type: String, required: true }
}, { _id: false });

const tierSchema = new mongoose.Schema({
  weight: { type: Number, required: true },
  label: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  isB2C: { type: Boolean, default: true },
  popular: { type: Boolean, default: false }
}, { _id: false });

const productSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  grainLength: { type: String, required: true },
  cookedLength: { type: String, required: true },
  elongation: { type: String, required: true },
  aroma: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  processingOptions: [processingOptionSchema],
  tiers: [tierSchema],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
