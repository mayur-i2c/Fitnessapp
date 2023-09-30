const express = require('express');
const router = express.Router();
const {RegisterAdmin, LoginAdmin, RefreshToken,CheckEmailId,ResetPassword,adminDetails}  = require('../../controllers/Admin/adminController');
const authenticAdmin = require("../../helper/verifyAdminToken");

router.post('/register',RegisterAdmin);
router.post('/login',LoginAdmin);
router.post('/refreshToken',RefreshToken);
router.post('/checkmailid',CheckEmailId);
router.post('/resetPassword',ResetPassword);
router.get('/adminDetails',authenticAdmin,adminDetails);


module.exports = router;
