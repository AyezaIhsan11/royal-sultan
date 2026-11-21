const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Fix Windows ISP DNS SRV resolution for MongoDB Atlas

const mongoose = require('mongoose');

let cachedConnection = global.mongooseConnection;

if (!cachedConnection) {
  cachedConnection = global.mongooseConnection = { conn: null, promise: null };
}

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('⚠️ [MongoDB] MONGODB_URI is not defined in environment variables. Running in resilient mock/offline mode.');
    return null;
  }

  if (cachedConnection.conn) {
    return cachedConnection.conn;
  }

  if (!cachedConnection.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    };

    cachedConnection.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      console.log('✅ [MongoDB] Connected successfully to MongoDB Atlas database:', mongooseInstance.connection.name);
      return mongooseInstance;
    }).catch((err) => {
      console.error('❌ [MongoDB] Connection error:', err.message);
      cachedConnection.promise = null;
      return null;
    });
  }

  try {
    cachedConnection.conn = await cachedConnection.promise;
  } catch (e) {
    cachedConnection.promise = null;
    throw e;
  }

  return cachedConnection.conn;
};

module.exports = connectDB;
