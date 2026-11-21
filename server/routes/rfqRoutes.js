const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const RfqInquiry = require('../models/RfqInquiry');

const inMemoryRfqs = [];

// POST create B2B RFQ inquiry
router.post('/', async (req, res) => {
  try {
    const {
      companyName,
      contactPerson,
      email,
      phone,
      country,
      destinationPort,
      containerType,
      riceVariety,
      millingFinish,
      bagWeightKg,
      estimatedMetricTons,
      estimatedBags,
      targetShippingDate,
      comments
    } = req.body;

    if (!companyName || !contactPerson || !email || !phone || !destinationPort) {
      return res.status(400).json({ success: false, message: 'Please fill in all required company and port details.' });
    }

    const inquiryCode = `RFQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const rfqData = {
      inquiryCode,
      companyName,
      contactPerson,
      email,
      phone,
      country: country || 'Not Specified',
      destinationPort,
      containerType: containerType || '20ft',
      riceVariety: riceVariety || '1121 Kainat Basmati',
      millingFinish: millingFinish || 'Extra Long Steam',
      bagWeightKg: bagWeightKg || 40,
      estimatedMetricTons: estimatedMetricTons || 25,
      estimatedBags: estimatedBags || 625,
      targetShippingDate: targetShippingDate || '',
      comments: comments || '',
      status: 'New',
      createdAt: new Date()
    };

    if (mongoose.connection.readyState === 1) {
      try {
        const newRfq = await RfqInquiry.create(rfqData);
        return res.status(201).json({
          success: true,
          message: 'B2B Container Export RFQ successfully saved to MongoDB.',
          data: newRfq,
          storage: 'mongodb'
        });
      } catch (dbErr) {
        console.warn('MongoDB RFQ save error, falling back:', dbErr.message);
      }
    }

    inMemoryRfqs.unshift(rfqData);
    return res.status(201).json({
      success: true,
      message: 'B2B RFQ received and logged for review.',
      data: rfqData,
      storage: 'in-memory'
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// GET all RFQs
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const rfqs = await RfqInquiry.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: rfqs.length, data: rfqs, storage: 'mongodb' });
    }
    return res.json({ success: true, count: inMemoryRfqs.length, data: inMemoryRfqs, storage: 'in-memory' });
  } catch (err) {
    return res.json({ success: true, count: inMemoryRfqs.length, data: inMemoryRfqs, storage: 'in-memory' });
  }
});

module.exports = router;
