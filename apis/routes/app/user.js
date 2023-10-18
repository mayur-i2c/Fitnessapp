const express = require("express");
const router = express.Router();
const verifyToken = require("../../helper/verifyAppToken");
const { singleFileUpload } = require("../../helper/imageUpload");
const {
  signupUser,
  signinUser,
  checkUserMo,
  checkUserOtp,
  resetPassword,
  updateUserProfile,
  updateProfilePic,
  RefreshToken,
} = require("../../controllers/App/userController");

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.post("/refreshToken", RefreshToken);
router.post("/checkMoNo", checkUserMo);
router.post("/checkOtp", checkUserOtp);
router.post("/resetPassword", resetPassword);
router.post("/updateProfile", verifyToken, updateUserProfile);
router.post(
  "/updateProfilePic",
  verifyToken,
  singleFileUpload("public/images", ["image/png", "image/jpeg", "image/jpg"], 1024 * 1024, "image"),
  updateProfilePic
);

module.exports = router;
