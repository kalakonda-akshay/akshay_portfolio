const mongoose = require("mongoose");

let cachedConnection = null;

async function connectDB() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is missing in Vercel environment variables.");
  }

  cachedConnection = await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
  });

  return cachedConnection;
}

module.exports = connectDB;
