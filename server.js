require("module-alias/register");
const express = require("express");
const helmet = require("helmet");
const { connectDB, EnvConfig } = require("@config");
const { adminRoutes, authRoutes, bookingRoutes } = require("@routes");
const cors = require("cors");
const profileRoutes = require("@routes/ProfileRoutes");
const roomAccessRoutes = require("@routes/RoomAccessRoutes");


const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(helmet());
app.use(express.json());

connectDB();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());
app.use(helmet());

app.use("/api", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/room-access", roomAccessRoutes);


app.listen(EnvConfig.PORT, () => {
  console.log(`หลีกทางไอ้ไก่ ${EnvConfig.PORT}`);
});
