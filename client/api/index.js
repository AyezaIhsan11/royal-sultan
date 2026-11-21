const connectDB = require('../server/config/db');
const app = require('../server/index');

module.exports = async (req, res) => {
  // Ensure DB connection is established in serverless environment
  try {
    await connectDB();
  } catch (err) {
    console.error('Serverless DB connect error:', err);
  }
  return app(req, res);
};
