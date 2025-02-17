const express = require('express');
const app = express.Router();
const jobtype = require('../controllers/jobtype.controller');


app.get("/", jobtype.get);
app.get("/:id",jobtype.getById);
app.post("/", jobtype.create);
app.put("/:id", jobtype.update);
app.delete("/:id", jobtype.delete);

module.exports = app;