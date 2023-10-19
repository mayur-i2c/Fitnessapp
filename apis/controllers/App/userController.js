const express = require("express");
const User = require("../../models/User");
const {
  createResponse,
  queryErrorRelatedResponse,
  successResponse,
  successResponseOfFiles,
} = require("../../helper/sendResponse");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const deleteFiles = require("../../helper/deleteFiles");
// Here is your server running URL
const serverUrl = process.env.NODE_ENV == "development" ? "http://localhost:5055/" : "";

//User Signup
const signupUser = async (req, res, next) => {
  try {
    const accessToken = jwt.sign({ email: req.body.email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1m",
    });

    // Convert the requested date to a JavaScript Date object
    const dateOfBirth = new Date(req.body.dob);

    // Get the timestamp from the date object
    const dateOfBirthTimestamp = dateOfBirth.getTime();

    const newUser = await new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      mo_no: req.body.mo_no,
      dob: dateOfBirthTimestamp,
      remember_token: accessToken,
    });
    const addedUser = await newUser.save();

    const refresh_token = jwt.sign({ email: req.body.email }, process.env.REFRESH_TOKEN_SECRET);
    const baseUrl = req.protocol + "://" + req.get("host") + process.env.BASE_URL_USER_PATH;
    const userWithBaseUrl = {
      ...newUser.toObject(),
      baseUrl: baseUrl,
      refresh_token: refresh_token,
    };

    //save User and response
    createResponse(res, userWithBaseUrl);
  } catch (err) {
    next(err);
  }
};

//User Signin
const signinUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ $or: [{ email: req.body.username }, { mo_no: req.body.username }] });
    if (!user) return queryErrorRelatedResponse(req, res, 401, "Invalid Username!");

    const validatePassword = await bcrypt.compare(req.body.password, user.password);
    if (!validatePassword) return queryErrorRelatedResponse(req, res, 401, "Invalid Password!");

    if (user.status === false)
      return queryErrorRelatedResponse(req, res, 401, "Your account has been suspended!! Please contact to admin.");

    const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1m",
    });
    user.remember_token = accessToken;

    const refresh_token = jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET);

    const output = await user.save();

    const baseUrl = req.protocol + "://" + req.get("host") + process.env.BASE_URL_USER_PATH;
    // Assuming you have a `baseUrl` variable
    const userWithBaseUrl = {
      ...user.toObject(),
      baseUrl: baseUrl,
      refresh_token: refresh_token,
    };

    successResponse(res, userWithBaseUrl);
  } catch (err) {
    next(err);
  }
};

//Get RefreshToken
const RefreshToken = async (req, res, next) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(402).send("Access Denied. No refresh token provided.");
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findOne({ email: decoded.email });
    if (!user) return queryErrorRelatedResponse(req, res, 401, "Invalid Username!");

    const token = jwt.sign({ email: decoded.email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1m",
    });
    successResponse(res, token);
  } catch (err) {
    next(err);
  }
};

//Forgot Password - Check Mobile No
const checkUserMo = async (req, res, next) => {
  try {
    const user = await User.findOne({ mo_no: req.body.mo_no });
    if (!user) return queryErrorRelatedResponse(req, res, 401, "Invalid Mobile Number!");

    var otp = Math.floor(1000 + Math.random() * 9000);
    user.otp = otp;
    user.expireOtpTime = Date.now() + 300000; //Valid upto 5 min
    await user.save();

    successResponse(res, user);
  } catch (err) {
    next(err);
  }
};

//Forgot Password - Check OTP
const checkUserOtp = async (req, res, next) => {
  try {
    const user = await User.findOne({ otp: req.body.otp, mo_no: req.body.mo_no });
    if (!user) return queryErrorRelatedResponse(req, res, 401, "Invalid OTP!");

    if (new Date(user.expireOtpTime).toTimeString() <= new Date(Date.now()).toTimeString()) {
      return queryErrorRelatedResponse(req, res, 401, "OTP is Expired!");
    }

    successResponse(res, user);
  } catch (err) {
    next(err);
  }
};

//Forgot Password - Reset Password
const resetPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ mo_no: req.body.mo_no });
    if (!user) return queryErrorRelatedResponse(req, res, 401, "Invalid Mobile Number!");

    if (req.body.new_pass !== req.body.confirm_pass) {
      return queryErrorRelatedResponse(req, res, 401, "Confirm Password does not match!");
    }

    user.otp = null;
    user.password = req.body.new_pass;
    await user.save();

    successResponse(res, "Your password has been change.");
  } catch (err) {
    next(err);
  }
};

//User Profile Update
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userid);
    if (!user) return queryErrorRelatedResponse(req, res, 401, "Invalid User!!");

    const isUpdate = await User.findByIdAndUpdate(req.body.userid, { $set: req.body });
    if (!isUpdate) return queryErrorRelatedResponse(req, res, 401, "Something Went wrong!!");

    const updatedUser = await User.findById(req.body.userid);

    const baseUrl = req.protocol + "://" + req.get("host") + process.env.BASE_URL_USER_PATH;
    // Assuming you have a `baseUrl` variable
    const userWithBaseUrl = {
      ...updatedUser.toObject(),
      baseUrl: baseUrl,
    };

    successResponse(res, userWithBaseUrl);
  } catch (err) {
    next(err);
  }
};

//User Profile Photo Update
const updateProfilePic = async (req, res, next) => {
  try {
    //Check user exist or not
    const user = await User.findById(req.user._id);
    if (!user) return queryErrorRelatedResponse(req, res, 401, "Invalid User!!");

    // Checking for file selected or not...
    if (!req.file) return queryErrorRelatedResponse(res, res, 404, "File not found.");

    //If file already exist then it delete first
    const filed = deleteFiles(user.image);

    user.image = req.file.filename;
    const result = await user.save();

    const baseUrl = req.protocol + "://" + req.get("host") + process.env.BASE_URL_USER_PATH + result.image;

    successResponseOfFiles(res, "Profile Updated!", baseUrl);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signupUser,
  signinUser,
  RefreshToken,
  checkUserMo,
  checkUserOtp,
  resetPassword,
  updateUserProfile,
  updateProfilePic,
  RefreshToken,
};
