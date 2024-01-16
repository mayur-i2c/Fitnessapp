const express = require("express");
const User = require("../../models/User");
const CalData = require("../../models/CalData");
const CalCronData = require("../../models/CalCronData");
const { sendMail } = require("../../helper/emailSender");
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
const serverUrl = process.env.NODE_ENV == "development" ? "http://localhost:5055/" : "http://167.71.227.102:5055/";

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
      fcm_token: req.body.fcm_token,
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

//Facebook & Google Login

const socialLogin = async (req, res, next) => {
  try {
    const accessToken = jwt.sign({ email: req.body.email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1m",
    });

    const refresh_token = jwt.sign({ email: req.body.email }, process.env.REFRESH_TOKEN_SECRET);
    const baseUrl = req.protocol + "://" + req.get("host") + process.env.BASE_URL_USER_PATH;

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      const newUser = await new User({
        name: req.body.name,
        email: req.body.email,
        fcm_token: req.body.fcm_token,
        remember_token: accessToken,
        mo_no: null,
      });
      const addedUser = await newUser.save();

      const userWithBaseUrl = {
        ...newUser.toObject(),
        baseUrl: baseUrl,
        refresh_token: refresh_token,
        loginStatus: 0,
      };
      createResponse(res, userWithBaseUrl);
    } else {
      user.remember_token = accessToken;
      user.fcm_token = req.body.fcm_token;

      await user.save();

      const userWithBaseUrl = {
        ...user.toObject(),
        baseUrl: baseUrl,
        refresh_token: refresh_token,
        loginStatus: 1,
      };

      createResponse(res, userWithBaseUrl);
    }

    //save User and response
  } catch (err) {
    next(err);
  }
};

//User Signin
const signinUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.username });
    if (!user) return queryErrorRelatedResponse(req, res, 401, "Invalid Username!");

    const validatePassword = await bcrypt.compare(req.body.password, user.password);
    if (!validatePassword) return queryErrorRelatedResponse(req, res, 401, "Invalid Password!");

    if (user.status === false)
      return queryErrorRelatedResponse(req, res, 401, "Your account has been suspended!! Please contact to admin.");

    const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1m",
    });
    user.remember_token = accessToken;
    user.fcm_token = req.body.fcm_token;

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

//Forgot Password - Check Email Id
const checkEmailId = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return queryErrorRelatedResponse(req, res, 401, "Invalid Email Id!");

    var otp = Math.floor(1000 + Math.random() * 9000);
    user.otp = otp;
    user.expireOtpTime = Date.now() + 300000; //Valid upto 5 min
    await user.save();

    sendMail({
      from: "admin@gmail.com",
      to: req.body.email,
      sub: "Fitness - Forgot Password",
      htmlFile: "./emailTemplate/forgotPassApp.html",
      extraData: {
        OTP: otp,
      },
    });

    successResponse(res, user);
  } catch (err) {
    next(err);
  }
};

//Forgot Password - Check OTP
const checkUserOtp = async (req, res, next) => {
  try {
    const user = await User.findOne({ otp: req.body.otp, email: req.body.email });
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
    const user = await User.findOne({ email: req.body.email });
    if (!user) return queryErrorRelatedResponse(req, res, 401, "Invalid Email Id!");

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

    if (
      req.body.c_weight &&
      req.body.height_measure &&
      req.body.height &&
      req.body.age &&
      req.body.active_status &&
      req.body.t_weight
    ) {
      const height = req.body.height_measure == 1 ? req.body.height * 30.48 : req.body.height;

      if (req.body.sex == 1) {
        //For male
        bmr = 10 * req.body.c_weight + 6.25 * height - 5 * req.body.age + 5;
      } else {
        //For Female
        bmr = 10 * req.body.c_weight + 6.25 * height - 5 * req.body.age - 161;
      }

      // Sedentary (little or no exercise): BMR * 1.2
      // Lightly active (light exercise or sports 1-3 days a week): BMR * 1.375
      // Moderately active (moderate exercise or sports 3-5 days a week): BMR * 1.55
      // Very active (hard exercise or sports 6-7 days a week): BMR * 1.725

      if (req.body.active_status == 1) {
        req.body.cal = parseInt(req.body.c_weight > req.body.t_weight ? bmr * 1.2 - 500 : bmr * 1.2 + 500);
      } else if (req.body.active_status == 2) {
        req.body.cal = parseInt(req.body.c_weight > req.body.t_weight ? bmr * 1.375 - 500 : bmr * 1.375 + 500);
      } else if (req.body.active_status == 3) {
        req.body.cal = parseInt(req.body.c_weight > req.body.t_weight ? bmr * 1.55 - 500 : bmr * 1.55 + 500);
      } else {
        req.body.cal = parseInt(req.body.c_weight > req.body.t_weight ? bmr * 1.725 - 500 : bmr * 1.725 + 500);
      }
    }

    if (req.body.dob) {
      const dateOfBirth = new Date(req.body.dob);
      req.body.dob = dateOfBirth.getTime();
    }

    const isUpdate = await User.findByIdAndUpdate(req.body.userid, { $set: req.body });
    if (!isUpdate) return queryErrorRelatedResponse(req, res, 401, "Something Went wrong!!");

    const updatedUser = await User.findById(req.body.userid);

    const baseUrl = req.protocol + "://" + req.get("host") + process.env.BASE_URL_USER_PATH;

    const today = new Date(); // Get the current date and time
    today.setHours(0, 0, 0, 0); // Set the time to the start of the day

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Set it to the start of the next day

    const isAdded = await CalCronData.findOne({
      date: {
        $gte: today,
        $lt: tomorrow,
      },
      userId: req.body.userid,
    });

    if (isAdded) {
      isAdded.cal = req.body.cal ? req.body.cal : "0";
      await isAdded.save();
    } else {
      const newCalCronData = new CalCronData({
        userId: req.body.userid,
        cal: req.body.cal ? req.body.cal : "0",
        date: new Date(),
      });
      newCalCronData.save();
    }

    // const today = new Date();
    // today.setHours(0, 0, 0, 0);

    // const existingDoc = await CalData.findOne({ date: today, userId: req.body.userid });
    // let calData = existingDoc;
    // if (existingDoc) {
    //   existingDoc.cal = req.body.cal;
    //   calData = await existingDoc.save();
    // } else {
    //   const newDoc = new CalData({ date: today, userId: req.body.userid, cal: req.body.cal });
    //   calData = await newDoc.save();
    // }

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

//Get User Profile Data
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return queryErrorRelatedResponse(req, res, 401, "Invalid User!!");

    const baseUrl = req.protocol + "://" + req.get("host") + process.env.BASE_URL_USER_PATH;

    const userWithBaseUrl = {
      ...user.toObject(),
      baseUrl: baseUrl,
    };

    successResponse(res, userWithBaseUrl);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  signupUser,
  signinUser,
  RefreshToken,
  checkEmailId,
  checkUserOtp,
  resetPassword,
  updateUserProfile,
  updateProfilePic,
  RefreshToken,
  getUserProfile,
  socialLogin,
};
