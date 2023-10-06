const express = require("express");
const User = require("../../models/User");
const { successResponse } = require("../../helper/sendResponse");
const mongoose = require("mongoose");
const deleteFiles = require("../../helper/deleteFiles");

// Get All User
const AllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    successResponse(res, users);
  } catch (error) {
    next(error);
  }
};

// Delete User
const DeleteUser = async (req, res, next) => {
  try {
    // Convert string is into Object id
    const id = new mongoose.Types.ObjectId(req.params.id);
    const user = await User.findById(id);
    if (!user) return queryErrorRelatedResponse(req, res, 404, "User not found.");
    // deleteFiles(user.image);
    user.delete();
    deleteResponse(res, "User deleted successfully.");
  } catch (error) {
    next(error);
  }
};

module.exports = { AllUsers, DeleteUser };
