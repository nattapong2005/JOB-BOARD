const express = require('express');
const app = express.Router();
const company = require('../controllers/company.controller');

app.get("/", company.get);
app.get("/:id", company.getById);
app.post("/", company.create);
app.delete("/:id", company.delete);


module.exports = app;