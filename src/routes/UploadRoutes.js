const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if(mimetype && extname){
      return cb(null, true);
    }
    cb(new Error("Error: Only images are allowed"));
  }
});

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "กรุณาเลือกไฟล์" });
  }
  
  const imageUrl = `${process.env.BASE_URL || "http://localhost:5001"}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

module.exports = router;
