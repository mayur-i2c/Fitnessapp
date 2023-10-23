const express = require("express");
const router = express.Router();
const { getAllMedicalCon, getTC, getPrivacyPolicy, getAllFaqs } = require("../../controllers/App/settingsController");

router.get("/getAllMedicalCon", getAllMedicalCon);
router.get("/getTC", getTC);
router.get("/getPrivacyPolicy", getPrivacyPolicy);
router.get("/getAllFaqs", getAllFaqs);

module.exports = router;
