const express = require("express");
const router = express.Router();
const verifyToken = require("../../helper/verifyAppToken");
const { singleFileUpload } = require("../../helper/imageUpload");
const {
  signupUser,
  signinUser,
  checkEmailId,
  checkUserOtp,
  resetPassword,
  updateUserProfile,
  updateProfilePic,
  RefreshToken,
  getUserProfile,
  socialLogin,
} = require("../../controllers/App/userController");

router.post("/signup", signupUser);
router.post("/socialLogin", socialLogin);
router.post("/signin", signinUser);
router.post("/refreshToken", RefreshToken);
router.post("/checkEmailId", checkEmailId);
router.post("/checkOtp", checkUserOtp);
router.post("/resetPassword", resetPassword);
router.post("/updateProfile", verifyToken, updateUserProfile);
router.post(
  "/updateProfilePic",
  verifyToken,
  singleFileUpload("public/images", ["image/png", "image/jpeg", "image/jpg"], 1024 * 1024, "image"),
  updateProfilePic
);
router.get("/getUserProfile/:id", verifyToken, getUserProfile);

module.exports = router;
