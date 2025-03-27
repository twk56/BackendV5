const mongoose = require("mongoose");
const EnvConfig = require("./EnvConfig");

async function connectDB() {
  try {
    await mongoose.connect(EnvConfig.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
}

module.exports = connectDB;