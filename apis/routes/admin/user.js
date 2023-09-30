const express = require('express');
const router = express.Router();
const {AllUsers}  = require('../../controllers/Admin/userController');
const authenticAdmin = require("../../helper/verifyAdminToken");


router.get('/allUsers',authenticAdmin,AllUsers);

module.exports = router;