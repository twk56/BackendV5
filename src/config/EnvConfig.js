const dotenv = require("dotenv");
dotenv.config();

const EnvConfig = {
  PORT: process.env.PORT || 5002,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET
};

if (!EnvConfig.MONGO_URI) {
  throw new Error("MONGO_URI is not set in .env");
}

module.exports = EnvConfig;