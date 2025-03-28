const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const Booking = require("@models/Booking");
const Booking = require("../models/Booking");
const bookingRoutes = require("@routes/BookingRoutes");

router.post("/", verifyToken, async (req, res) => {
  try {
    const newBooking = new Booking({
      user: req.user.userId,
      room: req.body.room,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      status: "pending"
    });

    await newBooking.save();
    res.status(201).json({ message: "จองห้องสำเร็จ", booking: newBooking });
  } catch (error) {
    console.error("Error in POST /bookings:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการจองห้อง" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate("user", "fullName email");
    res.json(bookings);
  } catch (error) {
    console.error("Error in GET /bookings:", error);
    res.status(500).json({ error: "ไม่สามารถดึงข้อมูลการจองได้" });
  }
});

module.exports = router;
