const express = require("express");
const router = express.Router();
const { getAllMedicalCon } = require("../../controllers/App/settingsController");

router.get("/getAllMedicalCon", getAllMedicalCon);

module.exports = router;
