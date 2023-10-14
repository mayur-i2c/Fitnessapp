const express = require("express");
const router = express.Router();
const {
  addEssentials,
  updateEssentials,
  updateEssStatus,
  deleteEssentials,
  deleteMultEssentials,
  getAllEssentials,
} = require("../../controllers/Admin/EssentialsController");
const authenticAdmin = require("../../helper/verifyAdminToken");
const { singleFileUpload } = require("../../helper/imageUpload");

router.post(
  "/addEssentials",
  authenticAdmin,
  singleFileUpload("public/images/essentials", ["image/png", "image/jpeg", "image/jpg"], 1024 * 1024, "image"),
  addEssentials
);
router.put(
  "/updateEssentials/:id",
  authenticAdmin,
  singleFileUpload("public/images/essentials", ["image/png", "image/jpeg", "image/jpg"], 1024 * 1024, "image"),
  updateEssentials
);
router.put("/updateEssStatus/:id", authenticAdmin, updateEssStatus);
router.delete("/deleteEssentials/:id", authenticAdmin, deleteEssentials);
router.delete("/deleteMultEssentials", authenticAdmin, deleteMultEssentials);
router.get("/getAllEssentials", authenticAdmin, getAllEssentials);

module.exports = router;
