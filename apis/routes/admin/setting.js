const express = require("express");
const router = express.Router();
const {
  addMedicalCon,
  getAllMedicalCon,
  updateMedicalCon,
  deleteMedicalCon,
  deleteMultMedicalCon,
  updateMedicalConStatus,
  getActiveMedicalCon,
  updatetc,
  gettc,
  addPrivacyPolicy,
  updatepolicy,
  getpolicy,
  addtc,
  addfaqs,
  getAllFaqs,
  updateFaq,
  updateFaqStatus,
  deleteMultFaq,
  deletefaq,
} = require("../../controllers/Admin/settingController");
const authenticAdmin = require("../../helper/verifyAdminToken");

router.post("/addMedicalCon", authenticAdmin, addMedicalCon);
router.get("/getAllMedicalCon", authenticAdmin, getAllMedicalCon);
router.get("/getActiveMedicalCon", authenticAdmin, getActiveMedicalCon);
router.put("/updateMedicalCon/:id", authenticAdmin, updateMedicalCon);
router.delete("/deleteMedicalCon/:id", authenticAdmin, deleteMedicalCon);
router.delete("/deleteMultMedicalCon", authenticAdmin, deleteMultMedicalCon);
router.put("/updateMedicalConStatus/:id", authenticAdmin, updateMedicalConStatus);
router.put("/updatetc/:id", authenticAdmin, updatetc);
router.get("/gettc", authenticAdmin, gettc);
router.post("/addPrivacyPolicy", authenticAdmin, addPrivacyPolicy);
router.put("/updatepolicy/:id", authenticAdmin, updatepolicy);
router.get("/getpolicy", authenticAdmin, getpolicy);
router.post("/addtc", authenticAdmin, addtc);
router.post("/addfaqs", authenticAdmin, addfaqs);
router.get("/getAllFaqs", authenticAdmin, getAllFaqs);
router.put("/updateFaq/:id", authenticAdmin, updateFaq);
router.delete("/deletefaq/:id", authenticAdmin, deletefaq);
router.delete("/deleteMultFaq", authenticAdmin, deleteMultFaq);
router.put("/updateFaqStatus/:id", authenticAdmin, updateFaqStatus);

module.exports = router;
