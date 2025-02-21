const express = require('express');
const app = express.Router();
const checklogin = require('../controllers/checklogin.controller');
const authMiddleware = require('../middlewares/auth');

app.get("/", authMiddleware, checklogin.check);


module.exports = app;