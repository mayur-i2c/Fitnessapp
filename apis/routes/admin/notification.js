const express = require("express");
const router = express.Router();
const { singleFileUpload } = require("../../helper/imageUpload");
const {
  addNotification,
  updateNotification,
  deleteNotification,
  deleteMultNotification,
  getAllNotification,
} = require("../../controllers/Admin/notificationController");
const authenticAdmin = require("../../helper/verifyAdminToken");

router.post("/addNotification", authenticAdmin, addNotification);
router.put("/updateNotification/:id", authenticAdmin, updateNotification);
router.delete("/deleteNotification/:id", authenticAdmin, deleteNotification);
router.delete("/deleteMultNotification", authenticAdmin, deleteMultNotification);
router.get("/getAllNotification", authenticAdmin, getAllNotification);

module.exports = router;
