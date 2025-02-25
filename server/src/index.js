const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// เพิ่มตัวแปร route เส้นทาง
const userRoute = require("./routes/users.route");
const jobtypeRoute = require("./routes/jobtype.route");
const jobpostRoute = require("./routes/jobpost.route");
const profileRoute = require("./routes/profile.route");
const registerRoute = require("./routes/register.route");
const loginRoute = require("./routes/login.route");
const companyRoute = require("./routes/company.route");


app.use(cors());
app.use(bodyParser.json());
// app.use("/img", express.static("img"));
app.use("/img", express.static(path.join(__dirname, "img")));
app.use(bodyParser.urlencoded({ extended: true }));

//  หน้าแรก
app.get("/", (req, res) => {
  res.send("<b>JOB BOARD API is online</b>");
});

// เพิ่มเส้นทาง route ตรงนี้
app.use("/users", userRoute);
app.use("/jobtype", jobtypeRoute);
app.use("/jobpost", jobpostRoute);
app.use("/profile", profileRoute);
app.use("/company", companyRoute);

app.use("/register", registerRoute);
app.use("/login", loginRoute);

// เมือไม่พบ Route
app.use((req, res, next) => {
  res.status(400).json({ error: "ไม่พบเส้นทางที่เรียกใช้" });
});

async function connect() {
  try {
    await prisma.$connect();
    console.log("Database is connected");
  } catch (e) {
    console.error("Database connect failed " + e.message);
  }
}
connect();

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
