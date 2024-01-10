const express = require("express");
const router = express.Router();
const {
  updateGeneralSetting,
  getGeneralSettings,
  addGeneralSettings,
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
  addNutritionSettings,
  updateNutritionSettings,
  getNutrition,
  addMealSettings,
  updateMealSettings,
  getMeal,
  addRecipeUnits,
  getAllRecipeUnits,
  updateRecipeUnits,
  updateRecipeUnitsStatus,
  deleteRecipeUnit,
  deleteMultRecipeUnit,
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
router.post("/addNutritionSettings", authenticAdmin, addNutritionSettings);
router.put("/updateNutritionSettings/:id", authenticAdmin, updateNutritionSettings);
router.get("/getNutrition", authenticAdmin, getNutrition);
router.post("/addMealSettings", authenticAdmin, addMealSettings);
router.put("/updateMealSettings/:id", authenticAdmin, updateMealSettings);
router.get("/getMeal", authenticAdmin, getMeal);
router.post("/addRecipeUnits", authenticAdmin, addRecipeUnits);
router.get("/getAllRecipeUnits", authenticAdmin, getAllRecipeUnits);
router.put("/updateRecipeUnits/:id", authenticAdmin, updateRecipeUnits);
router.delete("/deleteRecipeUnit/:id", authenticAdmin, deleteRecipeUnit);
router.delete("/deleteMultRecipeUnit", authenticAdmin, deleteMultRecipeUnit);
router.put("/updateRecipeUnitsStatus/:id", authenticAdmin, updateRecipeUnitsStatus);
router.put("/updateGeneralSetting/:id", authenticAdmin, updateGeneralSetting);
router.get("/getGeneralSettings", authenticAdmin, getGeneralSettings);
router.post("/addGeneralSettings", authenticAdmin, addGeneralSettings);

module.exports = router;
