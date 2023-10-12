const express = require("express");
const router = express.Router();
const {
  AllUsers,
  DeleteUser,
  deleteMultiUser,
  updateUserStatus,
  updateUserProfile,
} = require("../../controllers/Admin/userController");
const authenticAdmin = require("../../helper/verifyAdminToken");

router.get("/allUsers", authenticAdmin, AllUsers);
router.post("/deleteUser/:id", authenticAdmin, DeleteUser);
router.delete("/deleteMultiUser", authenticAdmin, deleteMultiUser);
router.put("/updateUserStatus/:id", authenticAdmin, updateUserStatus);
router.put("/updateUserProfile/:id", authenticAdmin, updateUserProfile);

module.exports = router;
