require("module-alias/register");
const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const helmet = require("helmet");
const { connectDB, EnvConfig } = require("@config");
const { adminRoutes, authRoutes, bookingRoutes } = require("@routes");
const cors = require("cors");
const profileRoutes = require("@routes/ProfileRoutes");
const roomAccessRoutes = require("@routes/RoomAccessRoutes");
const roomsRoutes = require("@routes/RoomsRoutes");
const logger = require('./logger'); 
const path = require("path");
const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

connectDB();

logger.info('Server started successfully');

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use("/api", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/room-access", roomAccessRoutes);
app.use("/api/rooms", roomsRoutes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "cross-origin");
  next();
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

let httpsServer;
try {
  const privateKey = fs.readFileSync('C:/V5/backend/twk56.pem', 'utf8');
  const certificate = fs.readFileSync('C:/V5/backend/twk56-cert.pem', 'utf8');
  // const ca = fs.readFileSync('path/to/chain.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  const httpsPort = EnvConfig.HTTPS_PORT || 443;
  httpsServer = https.createServer(credentials, app);
  httpsServer.listen(httpsPort, () => {
    console.log(`HTTPS Server running on port ${httpsPort}`);
  });
} catch (error) {
  console.warn("ไม่พบ SSL certificates หรือโหลดไม่ได้, HTTPS server จะไม่เปิด:", error.message);
}

const httpPort = EnvConfig.HTTP_PORT || EnvConfig.PORT || 80;
const httpServer = http.createServer(app);
httpServer.listen(httpPort, () => {
  console.log(`HTTP Server running on port ${httpPort}`);
});
