const express = require("express");
const router = express.Router();
const { singleFileUpload } = require("../../helper/imageUpload");
const {
  addNotification,
  updateNotification,
  deleteNotification,
  deleteMultNotification,
  getAllNotification,
  sendNotification,
  updateNotiStatus,
} = require("../../controllers/Admin/notificationController");
const authenticAdmin = require("../../helper/verifyAdminToken");

router.post("/addNotification", authenticAdmin, addNotification);
router.put("/updateNotification/:id", authenticAdmin, updateNotification);
router.delete("/deleteNotification/:id", authenticAdmin, deleteNotification);
router.delete("/deleteMultNotification", authenticAdmin, deleteMultNotification);
router.get("/getAllNotification", authenticAdmin, getAllNotification);
router.post("/sendNotification", authenticAdmin, sendNotification);
router.put("/updateNotiStatus/:id", authenticAdmin, updateNotiStatus);

module.exports = router;
