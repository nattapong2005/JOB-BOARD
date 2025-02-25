const express = require('express');
const app = express.Router();
const company = require('../controllers/company.controller');

app.get("/", company.get);
app.post("/", company.create);


module.exports = app;