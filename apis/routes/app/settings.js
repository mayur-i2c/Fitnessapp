const express = require("express");
const router = express.Router();
const {
  getAllMedicalCon,
  getTC,
  getPrivacyPolicy,
  getAllFaqs,
  SendHelpMail,
  getAllNotification,
  getGeneralSettings,
} = require("../../controllers/App/settingsController");
const verifyToken = require("../../helper/verifyAppToken");

router.get("/getAllMedicalCon", getAllMedicalCon);
router.get("/getTC", getTC);
router.get("/getPrivacyPolicy", getPrivacyPolicy);
router.get("/getAllFaqs", getAllFaqs);
router.get("/getAllNotification", getAllNotification);
router.post("/sendhelpmail", verifyToken, SendHelpMail);
router.get("/getGeneralSettings", getGeneralSettings);

module.exports = router;
