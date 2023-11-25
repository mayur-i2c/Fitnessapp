const express = require("express");
const router = express.Router();
const {
  AllUsers,
  DeleteUser,
  deleteMultiUser,
  updateUserStatus,
  updateUserProfile,
  addUser,
  getAllTrackedMeal,
  getLastUsers,
  getStatuswiseUserCount,
  userIssue,
  updateUserIssueStatus,
} = require("../../controllers/Admin/userController");
const authenticAdmin = require("../../helper/verifyAdminToken");
const { singleFileUpload } = require("../../helper/imageUpload");

router.get("/allUsers", authenticAdmin, AllUsers);
router.post("/deleteUser/:id", authenticAdmin, DeleteUser);
router.delete("/deleteMultiUser", authenticAdmin, deleteMultiUser);
router.put("/updateUserStatus/:id", authenticAdmin, updateUserStatus);
router.put(
  "/updateUserProfile/:id",
  authenticAdmin,
  singleFileUpload("public/images", ["image/png", "image/jpeg", "image/jpg"], 1024 * 1024, "image"),
  updateUserProfile
);
router.post(
  "/addUser",
  authenticAdmin,
  singleFileUpload("public/images", ["image/png", "image/jpeg", "image/jpg"], 1024 * 1024, "image"),
  addUser
);

router.post("/getAllTrackedMeal", authenticAdmin, getAllTrackedMeal);
router.get("/getLastUsers", authenticAdmin, getLastUsers);
router.get("/getStatuswiseUserCount", authenticAdmin, getStatuswiseUserCount);
router.get("/userIssue", authenticAdmin, userIssue);
router.put("/updateUserIssueStatus/:id", authenticAdmin, updateUserIssueStatus);

module.exports = router;
