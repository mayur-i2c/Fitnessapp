const express = require("express");
const User = require("../../models/User");
const {
  successResponse,
  deleteResponse,
  queryErrorRelatedResponse,
  createResponse,
} = require("../../helper/sendResponse");
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

//Update User Profile
const updateUserProfile = async (req, res, next) => {
  try {
    //Find Banner by params id
    const user = await User.findById(req.params.id);
    // Checking for banner exist with authenticate(JWT) token and params id
    if (!user) return queryErrorRelatedResponse(req, res, 404, "User not found.");

    const updatedData = req.body;

    const dateOfBirth = new Date(req.body.dob);
    updatedData.dob = dateOfBirth.getTime();
    updatedData.image = user.image;
    if (req.file) {
      deleteFiles(user.image);
      updatedData.image = req.file.filename;
    }

    const isUpdate = await User.findByIdAndUpdate(req.params.id, { $set: updatedData });
    if (!isUpdate) return queryErrorRelatedResponse(req, res, 401, "Something Went wrong!!");

    const updatedUser = await User.findById(req.params.id);
    successResponse(res, updatedUser);
  } catch (err) {
    next(err);
  }
};

const addUser = async (req, res, next) => {
  try {
    const addedUser = req.body;

    const dateOfBirth = new Date(req.body.dob);
    addedUser.dob = dateOfBirth.getTime();
    console.log(addedUser);

    if (req.file) {
      addedUser.image = req.file.filename;
    }

    const newUser = await new User(addedUser);

    const newu = await newUser.save();

    //save User and response
    createResponse(res, newu);
  } catch (err) {
    next(err);
  }
};
module.exports = { AllUsers, DeleteUser, deleteMultiUser, updateUserStatus, updateUserProfile, addUser };
