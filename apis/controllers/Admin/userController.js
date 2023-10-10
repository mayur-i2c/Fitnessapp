const express = require("express");
const User = require("../../models/User");
const { successResponse, deleteResponse, queryErrorRelatedResponse } = require("../../helper/sendResponse");
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
    deleteFiles(user.image);
    await User.deleteOne({ _id: id });
    deleteResponse(res, "User deleted successfully.");
  } catch (error) {
    next(error);
  }
};

// Delete a multiple banner  or sub banner  with there Id's
const deleteMultiUser = async (req, res, next) => {
  try {
    const { Ids } = req.body;
    Ids.map(async (item) => {
      const id = new mongoose.Types.ObjectId(item);
      const user = await User.findById(id);
      deleteFiles(user.image);
      await User.deleteOne({ _id: id });
    });
    deleteResponse(res, "All selected users deleted successfully.");
  } catch (error) {
    next(error);
  }
};

//Update User Status
const updateUserStatus = async (req, res, next) => {
  try {
    // Convert string is into Object id
    const id = new mongoose.Types.ObjectId(req.params.id);
    const user = await User.findById(id);
    if (!user) return queryErrorRelatedResponse(req, res, 404, "User not found.");
    user.status = !user.status;
    const result = await user.save();
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

module.exports = { AllUsers, DeleteUser, deleteMultiUser, updateUserStatus };
