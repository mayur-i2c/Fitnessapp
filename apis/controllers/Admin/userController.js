const express = require("express");
const User = require('../../models/User');
const { successResponse } = require("../../helper/sendResponse");

// Get banner
const AllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        successResponse(res, users);
    } catch (error) {
        next(error);
    }
}

module.exports = {AllUsers}