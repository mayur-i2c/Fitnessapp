const express = require("express");
const router = express.Router();
const {
  addEssentials,
  updateEssentials,
  updateEssStatus,
  deleteEssentials,
  deleteMultEssentials,
  getAllEssentials,
  getAllEssSubCat1,
  addEssSubCatLevel1,
  updateEssSubCat1Status,
  deleteMultSubCat1,
  deleteEssSubCat1,
  updateEssSubCat1,
  addEssSubCatLevel2,
  getAllEssSubCat2,
  updateEssSubCat2Status,
  deleteMultSubCat2,
  deleteEssSubCat2,
  updateEssSubCat2,
} = require("../../controllers/Admin/EssentialsController");
const authenticAdmin = require("../../helper/verifyAdminToken");
const { singleFileUpload, multiDiffFileUpload } = require("../../helper/imageUpload");

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
router.get("/getAllEssSubCat1/:id", authenticAdmin, getAllEssSubCat1);
router.post(
  "/addEssSubCatLevel1/:id",
  authenticAdmin,
  singleFileUpload("public/images/essentials", ["image/png", "image/jpeg", "image/jpg"], 1024 * 1024, "image"),
  addEssSubCatLevel1
);
router.put("/updateEssSubCat1Status/:id", authenticAdmin, updateEssSubCat1Status);
router.delete("/deleteEssSubCat1/:id", authenticAdmin, deleteEssSubCat1);
router.delete("/deleteMultSubCat1", authenticAdmin, deleteMultSubCat1);
router.put(
  "/updateEssSubCat1/:id",
  authenticAdmin,
  singleFileUpload("public/images/essentials", ["image/png", "image/jpeg", "image/jpg"], 1024 * 1024, "image"),
  updateEssSubCat1
);

router.post(
  "/addEssSubCatLevel2/:id",
  authenticAdmin,
  multiDiffFileUpload("public/images/essentials", [
    { name: "video", maxCount: 1, allowedMimes: ["video/mp4", "video/quicktime", "video/x-ms-wmv"] },
    { name: "icon", maxCount: 1, allowedMimes: ["image/png", "image/jpeg", "image/jpg"] },
  ]),
  addEssSubCatLevel2
);
router.get("/getAllEssSubCat2/:id", authenticAdmin, getAllEssSubCat2);
router.put("/updateEssSubCat2Status/:id", authenticAdmin, updateEssSubCat2Status);
router.delete("/deleteEssSubCat2/:id", authenticAdmin, deleteEssSubCat2);
router.delete("/deleteMultSubCat2", authenticAdmin, deleteMultSubCat2);
router.put(
  "/updateEssSubCat2/:id",
  authenticAdmin,
  multiDiffFileUpload("public/images/essentials", [
    { name: "video", maxCount: 1, allowedMimes: ["video/mp4", "video/quicktime", "video/x-ms-wmv"] },
    { name: "icon", maxCount: 1, allowedMimes: ["image/png", "image/jpeg", "image/jpg"] },
  ]),
  updateEssSubCat2
);
module.exports = router;
