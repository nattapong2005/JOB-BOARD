const express = require('express');
const app = express.Router();
const jobpost = require('../controllers/jobpost.controller');

app.get("/", jobpost.get);
app.get("/:id",jobpost.getById);
app.post("/", jobpost.create);
app.put("/:id", jobpost.update);
app.delete("/:id", jobpost.delete);

module.exports = app;