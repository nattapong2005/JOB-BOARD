const express = require('express');
const app = express.Router();
const profile = require('../controllers/profile.controller');
const authMiddleware = require('../middlewares/auth');


app.get("/", authMiddleware, profile.getUserProfile);
app.put("/update", authMiddleware, profile.updateProfile);


module.exports = app;