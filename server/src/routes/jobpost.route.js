const express = require('express');
const app = express.Router();
const jobpost = require('../controllers/jobpost.controller');
const authMiddleware = require('../middlewares/auth');

app.get("/", jobpost.get);
app.get("/:id",jobpost.getById);
app.get("/company/:companyID",jobpost.getJobPostByCompanyId);
app.post("/", jobpost.create);
app.put("/:id", jobpost.update);
app.delete("/:id", authMiddleware, jobpost.delete);

module.exports = app;