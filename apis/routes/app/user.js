const express = require('express');
const router = express.Router();
const verifyToken = require("../../helper/verifyAppToken");
const {signupUser, signinUser, checkUserMo, checkUserOtp, resetPassword, updateUserProfile, updateProfilePic}  = require('../../controllers/App/userController');

router.post('/signup',signupUser);
router.post('/signin',signinUser);
router.post('/checkMoNo',checkUserMo);
router.post('/checkOtp',checkUserOtp);
router.post('/resetPassword',resetPassword);
router.post('/updateProfile',verifyToken,updateUserProfile);
router.post('/updateProfilePic',verifyToken,updateProfilePic);

module.exports = router;