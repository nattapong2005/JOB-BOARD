const express = require('express');
const app = express.Router();
const signup = require('../controllers/signup.controller');

app.post("/", signup.signup);


module.exports = app