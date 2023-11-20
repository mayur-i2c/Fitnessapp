const express = require("express");
const User = require("../../models/User");
const Essentials = require("../../models/Essentials");
const Reels = require("../../models/Reels");
const ExerciseLibrary = require("../../models/ExerciseLibrary");
const Recipes = require("../../models/Recipes");
const WorkoutCollection = require("../../models/WorkoutCollection");
const {
  successResponse,
  deleteResponse,
  queryErrorRelatedResponse,
  createResponse,
} = require("../../helper/sendResponse");
const mongoose = require("mongoose");

//Get Dashboard Count Data
const getDashboardCount = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments();
    const essentialsCount = await Essentials.countDocuments();
    const reelsCount = await Reels.countDocuments();
    const exLibCount = await ExerciseLibrary.countDocuments();
    const recipesCount = await Recipes.countDocuments();
    const workCollCount = await WorkoutCollection.countDocuments();

    const result = {
      userCount: userCount,
      essentialsCount: essentialsCount,
      reelsCount: reelsCount,
      exLibCount: exLibCount,
      recipesCount: recipesCount,
      workCollCount: workCollCount,
    };

    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getDashboardCount,
};
