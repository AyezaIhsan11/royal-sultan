const mongoose = require('mongoose');

const rfqInquirySchema = new mongoose.Schema({
  inquiryCode: { type: String, required: true, unique: true },
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  destinationPort: { type: String, required: true },
  containerType: { type: String, default: '20ft' },
  riceVariety: { type: String, default: '1121 Kainat Basmati' },
  millingFinish: { type: String, default: 'Extra Long Steam' },
  bagWeightKg: { type: Number, default: 40 },
  estimatedMetricTons: { type: Number, default: 25 },
  estimatedBags: { type: Number, default: 625 },
  targetShippingDate: { type: String },
  comments: { type: String },
  status: { type: String, enum: ['New', 'Under Review', 'Quote Sent', 'Closed'], default: 'New' }
}, {
  timestamps: true
});

module.exports = mongoose.models.RfqInquiry || mongoose.model('RfqInquiry', rfqInquirySchema);
