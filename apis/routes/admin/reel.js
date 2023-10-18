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
const { singleFileUpload } = require("../../helper/imageUpload");

router.post(
  "/addReel",
  authenticAdmin,
  singleFileUpload(
    "public/images/reels",
    ["video/mp4", "video/quicktime", "video/x-ms-wmv"],
    10 * 1024 * 1024,
    "video"
  ),
  addReel
);

router.put(
  "/updateReel/:id",
  authenticAdmin,
  singleFileUpload(
    "public/images/reels",
    ["video/mp4", "video/quicktime", "video/x-ms-wmv"],
    10 * 1024 * 1024,
    "video"
  ),
  updateReel
);
router.put("/updateReelStatus/:id", authenticAdmin, updateReelStatus);
router.delete("/deleteReel/:id", authenticAdmin, deleteReel);
router.delete("/deleteMultReel", authenticAdmin, deleteMultReel);
router.get("/getAllReel", authenticAdmin, getAllReel);

module.exports = router;
