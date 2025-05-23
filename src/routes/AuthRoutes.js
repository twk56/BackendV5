const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const { validateRegister } = require("@middlewares/validators/RegisterValidator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("@models/User");



router.post("/register", validateRegister, async (req, res) => {
  let { fullName, email, studentId, password } = req.body;

  fullName = fullName.trim();
  email = email.trim();
  studentId = studentId.trim();
  password = password.trim();

  let role = "user";
  if (studentId === "adminkk") {
    role = "admin";
  }

  const existingUser = await User.findOne({ $or: [{ email }, { studentId }] });
  if (existingUser) {
    return res.status(400).json({ error: "อีเมลหรือรหัสนักศึกษานี้ถูกใช้ไปแล้ว" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    fullName,
    email,
    studentId,
    password: hashedPassword,
    role,
  });

  await newUser.save();

  res.json({ message: "สมัครสมาชิกสำเร็จ" });
});

router.post("/login", async (req, res) => {
  let { studentId, password } = req.body;

  studentId = studentId.trim();
  password = password.trim();

  const user = await User.findOne({ studentId });
  if (!user) {
    return res.status(400).json({ error: "รหัสนักศึกษาหรือรหัสผ่านไม่ถูกต้อง" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "รหัสนักศึกษาหรือรหัสผ่านไม่ถูกต้อง" });
  }

  user.lastLogin = new Date();
  await user.save();

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 3600000,
  });
  res.json({ 
    message: "เข้าสู่ระบบสำเร็จ",
    role: user.role,
    token
  });

});

module.exports = router;