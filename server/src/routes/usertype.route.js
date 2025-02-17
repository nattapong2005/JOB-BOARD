const express = require('express');
const app = express.Router();
const usertype = require('../controllers/usertype.controller');

app.get("/", usertype.get);
app.get("/:id", usertype.getById);
app.post("/", usertype.create);
app.put("/:id", usertype.update);
app.delete("/:id", usertype.delete);

module.exports = app;
