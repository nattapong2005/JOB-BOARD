const express = require('express');
const app = express.Router();
const profile = require('../controllers/profile.controller');
const authMiddleware = require('../middlewares/auth');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/img/'); // เก็บไฟล์รูปในโฟล์เดอร์ img
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop()); 
  }
});
const upload = multer({ storage: storage });

app.get("/", authMiddleware, profile.getUserProfile);
app.get("/company/:id", profile.getCompanyProfile);
// app.put("/update", authMiddleware, profile.updateProfile);
app.put("/update", authMiddleware, upload.single('img'), profile.updateProfile);


module.exports = app;