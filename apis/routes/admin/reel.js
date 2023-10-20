const express = require("express");
const router = express.Router();
const {
  addReel,
  updateReel,
  updateReelStatus,
  deleteReel,
  deleteMultReel,
  getAllReel,
} = require("../../controllers/Admin/reelController");
const authenticAdmin = require("../../helper/verifyAdminToken");
const { multiDiffFileUpload } = require("../../helper/imageUpload");

router.post(
  "/addReel",
  authenticAdmin,
  multiDiffFileUpload("public/images/reels", [
    { name: "video", maxCount: 1, allowedMimes: ["video/mp4", "video/quicktime", "video/x-ms-wmv"] },
    { name: "image", maxCount: 1, allowedMimes: ["image/png", "image/jpeg", "image/jpg"] },
  ]),
  addReel
);

router.put(
  "/updateReel/:id",
  authenticAdmin,
  multiDiffFileUpload("public/images/reels", [
    { name: "video", maxCount: 1, allowedMimes: ["video/mp4", "video/quicktime", "video/x-ms-wmv"] },
    { name: "image", maxCount: 1, allowedMimes: ["image/png", "image/jpeg", "image/jpg"] },
  ]),
  updateReel
);
router.put("/updateReelStatus/:id", authenticAdmin, updateReelStatus);
router.delete("/deleteReel/:id", authenticAdmin, deleteReel);
router.delete("/deleteMultReel", authenticAdmin, deleteMultReel);
router.get("/getAllReel", authenticAdmin, getAllReel);

module.exports = router;
