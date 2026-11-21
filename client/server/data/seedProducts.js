require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Fix Windows ISP DNS SRV resolution

const mongoose = require('mongoose');
const Product = require('../models/Product');
const { INITIAL_PRODUCTS } = require('./seedData');

const seedDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI is missing in .env file!');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas database successfully!');

    await Product.deleteMany({});
    console.log('Cleared existing products.');

    const created = await Product.insertMany(INITIAL_PRODUCTS);
    console.log(`✅ Successfully seeded ${created.length} Royal Sultan rice varieties to MongoDB!`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
};

seedDB();
