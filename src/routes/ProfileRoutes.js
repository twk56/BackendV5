const express = require("express");
const router = express.Router();
const { verifyToken } = require("@middlewares/auth");


router.get("/", verifyToken, async (req, res) => {

  res.json({ message: "ข้อมูลโปรไฟล์ของผู้ใช้" });
});

module.exports = router;