const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  room: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, default: "pending", enum: ["pending", "confirmed", "cancelled"] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", BookingSchema);
