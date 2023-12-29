const express = require("express");
const router = express.Router();
const {
  getAllMedicalCon,
  getTC,
  getPrivacyPolicy,
  getAllFaqs,
  SendHelpMail,
  getAllNotification,
} = require("../../controllers/App/settingsController");
const verifyToken = require("../../helper/verifyAppToken");

router.get("/getAllMedicalCon", getAllMedicalCon);
router.get("/getTC", getTC);
router.get("/getPrivacyPolicy", getPrivacyPolicy);
router.get("/getAllFaqs", getAllFaqs);
router.get("/getAllNotification", getAllNotification);
router.post("/sendhelpmail", verifyToken, SendHelpMail);

module.exports = router;
