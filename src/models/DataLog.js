const mongoose = require("mongoose");

const dataLogSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, enum: ["create", "delete", "fetch"], required: true },
  timestamp: { type: Date, default: Date.now },
  details: { type: Object },
});

const DataLog = mongoose.model("DataLog", dataLogSchema);
module.exports = DataLog;