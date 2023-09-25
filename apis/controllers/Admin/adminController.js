const express = require('express');
const Admin = require('../../models/Admin');
const bcrypt = require('bcrypt');
const {createResponse, queryErrorRelatedResponse, successResponse} = require('../../helper/sendResponse');
const jwt = require('jsonwebtoken')


//Admin Register
const RegisterAdmin = async(req,res,next) => {
    try{
    const { name, email, password } = req.body;
    const newAdmin = await Admin.create({
        name,
        email,
        password,
      });
     //save Admin and response
      createResponse(res, newAdmin);
    }catch(err){
        next(err);
    }
}

//Admin Login
const LoginAdmin = async(req,res,next) => {
    try{

        const admin = await Admin.findOne({ email: req.body.email });
        if(!admin) return queryErrorRelatedResponse(req,res, 401, "Invalid Username!");

        const validatePassword = await bcrypt.compare(req.body.password, admin.password);
        if(!validatePassword) return queryErrorRelatedResponse(req,res, 401, "Invalid Password!");

        const token = admin.generateAuthToken({ email : req.body.email});
        admin.remember_token = token;

        const refresh_token = admin.generateRefreshToken({ email : req.body.email});

        const output = await admin.save();
        const tokens = {
            token : token,
            refresh_token : refresh_token
        }
        successResponse(res, tokens);

    }catch(err){
        next(err);
    }
}


const RefreshToken = async(req,res,next) => {

    const refreshToken = req.body.refreshToken;
    
    if (!refreshToken) {
      return res.status(402).send('Access Denied. No refresh token provided.');
    }
  
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      const admin = await Admin.findOne({ email: decoded.email });
      if(!admin) return queryErrorRelatedResponse(req,res, 401, "Invalid Username!");

      const token = admin.generateAuthToken({ email : decoded.email});
      successResponse(res, token);

    } catch (err) {
        next(err);
    }
}


module.exports = {
    RegisterAdmin,
    LoginAdmin,
    RefreshToken
  };