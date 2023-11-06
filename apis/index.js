const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
var bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http").Server(app);
const path = require("path");
process.env.TZ = "Asia/Kolkata";

// Get error controller
const errorController = require("./helper/errorController");

// cors configurations
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.json());

const adminRoutes = require("./routes/admin");
app.use(adminRoutes);

//App route
const userRoute = require("./routes/app");
app.use(userRoute);

// Error handling middleware
app.use(errorController);

// Define static files
app.use("/public", express.static(path.join(__dirname, "./public/images/")));
app.use("/public/essentials", express.static(path.join(__dirname, "./public/images/essentials")));
app.use("/public/reels", express.static(path.join(__dirname, "./public/images/reels")));
app.use("/public/exerciseLibrary", express.static(path.join(__dirname, "./public/images/exerciseLibrary")));
app.use("/public/workoutCollection", express.static(path.join(__dirname, "./public/images/workoutCollection")));
app.use("/public/recipes", express.static(path.join(__dirname, "./public/images/recipes")));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", function () {
  // console.log("Connected Successfully");
});

const cron = require("node-cron");
const CalCronData = require("./models/CalCronData");

// Creating a cron job which runs on every 10 second
// cron.schedule("*/10 * * * * *", function () {
//   console.log("running a task every 10 second");
//   console.log("Cron job executed at:", new Date().toLocaleString());
//   console.log("Cron job executed every hour:", new Date().toLocaleString());
//   const newCal = CalCronData.create({
//     userId: "123",
//     cal: "1000",
//     date: new Date(),
//   });
//   const result = CalCronData.save();
// });

cron.schedule("0 12 * * *", () => {
  // Your code to run at 12 PM daily goes here
  console.log("Cron job executed at 12 PM.");
  console.log("Cron job executed at:", new Date().toLocaleString());

  const newCal = CalCronData.create({
    userId: "123",
    cal: "1000",
    date: new Date(),
  });
  const result = CalCronData.save();
});

// // Schedule a cron job to run every hour (at minute 0)
// cron.schedule("0 * * * *", () => {
//   // Your code to run every hour goes here
//   console.log("Cron job executed every hour:", new Date().toLocaleString());
// });

// var server = app.listen(5000);
const port = process.env.PORT || 5055;
http.listen(port, () => console.log(`http://localhost:${port}`));
