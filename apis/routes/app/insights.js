const express = require("express");
const router = express.Router();
const { addMeal, getAllTrackedMeal } = require("../../controllers/App/insightController");
const verifyToken = require("../../helper/verifyAppToken");
router.post("/addMeal", addMeal);
router.get("/getAllTrackedMeal", getAllTrackedMeal);

module.exports = router;
