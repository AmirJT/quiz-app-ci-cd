import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000, // Helps with faster failure in case of connection issues
});

const db = mongoose.connection;

// Event listeners for better debugging
db.on('error', (err) => {
  console.error("❌ MongoDB connection error:", err);
});
db.once('open', () => {
  console.log("✅ Connected to MongoDB Atlas!");
});

export default db;