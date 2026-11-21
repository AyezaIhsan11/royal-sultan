require('dotenv').config();
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
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas...');

    await Product.deleteMany({});
    console.log('Cleared existing products.');

    const created = await Product.insertMany(INITIAL_PRODUCTS);
    console.log(`✅ Successfully seeded ${created.length} Royal Sultan rice varieties to MongoDB!`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedDB();
