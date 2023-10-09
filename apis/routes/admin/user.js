const express = require("express");
const router = express.Router();
const { AllUsers, DeleteUser, deleteMultiUser } = require("../../controllers/Admin/userController");
const authenticAdmin = require("../../helper/verifyAdminToken");

router.get("/allUsers", authenticAdmin, AllUsers);
router.post("/deleteUser/:id", authenticAdmin, DeleteUser);
router.delete("/deleteMultiUser", authenticAdmin, deleteMultiUser);

module.exports = router;
