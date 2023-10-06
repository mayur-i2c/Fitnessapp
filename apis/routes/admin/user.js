const express = require("express");
const router = express.Router();
const { AllUsers, DeleteUser } = require("../../controllers/Admin/userController");
const authenticAdmin = require("../../helper/verifyAdminToken");

router.get("/allUsers", authenticAdmin, AllUsers);
router.delete("/deleteUser/:id", authenticAdmin, DeleteUser);

module.exports = router;
