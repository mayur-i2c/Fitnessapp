const express = require("express");
const router = express.Router();
const {
  addWorkCollection,
  updateWorkCollection,
  updateCollectionStatus,
  deletecollection,
  deleteMultCollection,
  getAllCollection,
} = require("../../controllers/Admin/workoutCollectionController");
const authenticAdmin = require("../../helper/verifyAdminToken");
const { singleFileUpload } = require("../../helper/imageUpload");

router.post(
  "/addWorkCollection",
  authenticAdmin,
  singleFileUpload("public/images/workoutCollection", ["image/png", "image/jpeg", "image/jpg"], 1024 * 1024, "image"),
  addWorkCollection
);
router.put(
  "/updateWorkCollection/:id",
  authenticAdmin,
  singleFileUpload("public/images/workoutCollection", ["image/png", "image/jpeg", "image/jpg"], 1024 * 1024, "image"),
  updateWorkCollection
);
router.put("/updateCollectionStatus/:id", authenticAdmin, updateCollectionStatus);
router.delete("/deletecollection/:id", authenticAdmin, deletecollection);
router.delete("/deleteMultCollection", authenticAdmin, deleteMultCollection);
router.get("/getAllCollection", authenticAdmin, getAllCollection);
module.exports = router;
