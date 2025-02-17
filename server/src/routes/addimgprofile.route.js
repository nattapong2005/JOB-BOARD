const express = require('express');
const app = express.Router();
const addimg = require('../controllers/addimgprofile.controller');
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

app.put("/:id",upload.single('img'), addimg.add);


module.exports = app