const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

const uri = process.env.MONGO_URI;

async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = connectToDatabase;
