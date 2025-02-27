const express = require('express');
const app = express.Router();
const application = require('../controllers/application.controller');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/portfolio/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop()); 
  }
});
const upload = multer({ storage: storage });


app.get("/", application.get);
app.get("/:id", application.getById);
app.get("/user/:userID", application.getByUserId);
app.post("/", upload.single('portfolio'), application.apply);
app.put("/:id", application.update);
app.delete("/:id", application.delete);



module.exports = app;