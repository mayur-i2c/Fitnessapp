const express = require("express");
const router = express.Router();
const {
  addMeal,
  getAllTrackedMeal,
  getEatenCal,
  getAllCalBudget,
  getMealwiseCalBudget,
} = require("../../controllers/App/insightController");
const verifyToken = require("../../helper/verifyAppToken");

router.post("/addMeal", verifyToken, addMeal);
router.get("/getAllTrackedMeal", verifyToken, getAllTrackedMeal);
router.get("/getEatenCal", verifyToken, getEatenCal);
router.get("/getAllCalBudget", verifyToken, getAllCalBudget);
router.get("/getMealwiseCalBudget", verifyToken, getMealwiseCalBudget);

module.exports = router;
