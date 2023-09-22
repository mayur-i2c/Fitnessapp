const express = require('express');
const Admin = require('../../models/Admin');
const bcrypt = require('bcrypt');
const {createResponse, queryErrorRelatedResponse, successResponse} = require('../../helper/sendResponse');


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

        const output = await admin.save();
        successResponse(res, admin);

    }catch(err){
        next(err);
    }
}

module.exports = {
    RegisterAdmin,
    LoginAdmin
  };