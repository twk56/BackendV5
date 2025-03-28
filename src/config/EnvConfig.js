const dotenv = require("dotenv");
dotenv.config();

const EnvConfig = {
  PORT: process.env.PORT || 5002,
  HTTP_PORT: process.env.HTTP_PORT || 80,
  HTTPS_PORT: process.env.HTTPS_PORT || 443,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "your_default_refresh_secret"
};

if (!EnvConfig.MONGO_URI) {
  throw new Error("MONGO_URI is not set in .env");
}

module.exports = EnvConfig;
