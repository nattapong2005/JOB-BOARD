const express = require('express');
const app = express.Router();
const register = require('../controllers/register.controller');

app.post("/", register.register);

module.exports = app