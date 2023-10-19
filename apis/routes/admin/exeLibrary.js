const express = require("express");
const router = express.Router();
const {
  addExeLibrary,
  getAllExeLibrary,
  updateExeLibraryStatus,
  deleteExeLibrary,
  deleteMultExeLibrary,
  updateExeLibrary,
} = require("../../controllers/Admin/exerciseLibraryController");
const authenticAdmin = require("../../helper/verifyAdminToken");
const { multiDiffFileUpload } = require("../../helper/imageUpload");

router.post(
  "/addExeLibrary",
  authenticAdmin,
  multiDiffFileUpload("public/images/exerciseLibrary", [
    { name: "video", maxCount: 1, allowedMimes: ["video/mp4", "video/quicktime", "video/x-ms-wmv"] },
    { name: "icon", maxCount: 1, allowedMimes: ["image/png", "image/jpeg", "image/jpg"] },
  ]),
  addExeLibrary
);
router.get("/getAllExeLibrary", authenticAdmin, getAllExeLibrary);
router.put("/updateExeLibraryStatus/:id", authenticAdmin, updateExeLibraryStatus);
router.delete("/deleteExeLibrary/:id", authenticAdmin, deleteExeLibrary);
router.delete("/deleteMultExeLibrary", authenticAdmin, deleteMultExeLibrary);
router.put(
  "/updateExeLibrary/:id",
  authenticAdmin,
  multiDiffFileUpload("public/images/exerciseLibrary", [
    { name: "video", maxCount: 1, allowedMimes: ["video/mp4", "video/quicktime", "video/x-ms-wmv"] },
    { name: "icon", maxCount: 1, allowedMimes: ["image/png", "image/jpeg", "image/jpg"] },
  ]),
  updateExeLibrary
);

module.exports = router;
