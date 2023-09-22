const express = require('express');
const User = require('../../models/User');
const {createResponse, queryErrorRelatedResponse, successResponse} = require('../../helper/sendResponse');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');


//User Signup
const signupUser = async(req,res,next) => {
    try{
       
        const accessToken = jwt.sign({ email: req.body.email }, process.env.ACCESS_TOKEN_SECRET);
       
        const newUser = await new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            mo_no:  req.body.mo_no,
            dob:  req.body.dob,
            remember_token: accessToken
        });
        const addedUser = await newUser.save();

         //save User and response
        createResponse(res, addedUser);

    }catch(err){
        next(err);
    }
}

//User Signin
const signinUser = async (req, res, next) => {
    try{
        const user = await User.findOne({ "$or": [ { email: req.body.username }, { mo_no: req.body.username} ] });
        if(!user) return queryErrorRelatedResponse(req,res, 401, "Invalid Username!");

        const validatePassword = await bcrypt.compare(req.body.password, user.password);
        if(!validatePassword) return queryErrorRelatedResponse(req,res, 401, "Invalid Password!");

        const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET);
        user.remember_token = accessToken;

        const output = await user.save();
        successResponse(res, user);

    }catch(err){
        next(err);
    }
}

//Forgot Password - Check Mobile No
const checkUserMo = async (req, res, next) => {
 try{

    const user = await User.findOne({ mo_no: req.body.mo_no });
    if(!user) return queryErrorRelatedResponse(req,res, 401, "Invalid Mobile Number!");

    var otp = Math.floor(1000 + Math.random() * 9000);
    user.otp = otp;
    user.expireOtpTime =  Date.now() + 300000; //Valid upto 5 min
    await user.save();

    successResponse(res, user);

 }catch(err){
    next(err);
 }
}

//Forgot Password - Check OTP
const checkUserOtp = async (req, res, next) => {
    try{
        const user = await User.findOne({ otp: req.body.otp, mo_no: req.body.mo_no });
        if(!user) return queryErrorRelatedResponse(req,res, 401, "Invalid OTP!");  
 
        if(new Date(user.expireOtpTime).toTimeString() <= new Date(Date.now()).toTimeString()){
            return queryErrorRelatedResponse(req,res, 401, "OTP is Expired!"); 
        }

        successResponse(res,user);

    }catch(err){
        next(err)
    }   
}

//Forgot Password - Reset Password
const resetPassword = async (req, res,next) => {
    try {
    
        const user = await User.findOne({ mo_no : req.body.mo_no});
        if(!user) return queryErrorRelatedResponse(req,res,401,"Invalid Mobile Number!")

        if(req.body.new_pass !== req.body.confirm_pass){
            return queryErrorRelatedResponse(req,res,401,"Confirm Password does not match!")
        }

        user.otp = null;
        user.password = req.body.new_pass;
        await user.save()

        successResponse(res,"Your password has been change.");

    }catch(err){
        next(err)
    }
}

//User Profile Update
const updateUserProfile = async (req,res,next) => {
    try{
        const user = await User.findById(req.body.userid);
        if(!user) return queryErrorRelatedResponse(req,res,401,"Invalid User!!")

        const isUpdate = await User.findByIdAndUpdate(req.body.userid, { $set: req.body });
        if(!isUpdate) return queryErrorRelatedResponse(req,res,401,"Something Went wrong!!")

        const updatedUser = await User.findById(req.body.userid);
        successResponse(res,updatedUser);

    }catch(err){
        next(err)
    }
}

//User Profile Photo Update
const updateProfilePic = async (req,res,next) => {
    try{
        const user = await User.findById(req.body.userid);
        if(!user) return queryErrorRelatedResponse(req,res,401,"Invalid User!!")




    }catch(err){
        next(err)
    }
}

module.exports = {signupUser,signinUser,checkUserMo,checkUserOtp,resetPassword,updateUserProfile,updateProfilePic};