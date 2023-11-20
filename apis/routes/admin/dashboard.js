const express = require("express");
const router = express.Router();
const { getDashboardCount } = require("../../controllers/Admin/dashboardController");
const authenticAdmin = require("../../helper/verifyAdminToken");

router.get("/getDashboardCount", authenticAdmin, getDashboardCount);

module.exports = router;
