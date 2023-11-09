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
const CalCronData = require("../../models/CalCronData");
const mealSettings = require("../../models/MealSettings");
const { getMealTimewiseRecipes } = require("../../helper/commonServices");

const moment = require("moment");
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
    addedUser.password = "123456";

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

//Get All Tracked Meal
const getAllTrackedMeal = async (req, res, next) => {
  try {
    const { userid, date } = req.body;
    const requestDate = moment(date, "MM/DD/YYYY").toDate();

    // Query the database for matching documents
    const results = await CalCronData.find({ userId: userid });

    // Filter results based on date matching (ignoring time)
    const matchingResults = results.filter((result) => {
      const storedDate = moment(result.date).startOf("day").toDate(); // Set time to 00:00:00
      return moment(requestDate).isSame(storedDate, "day");
    });

    let user_cal = 0;
    if (matchingResults.length > 0) {
      user_cal = matchingResults[0].cal;
    } else {
      const user_id = new mongoose.Types.ObjectId(userid);
      const user = await User.findById(user_id);
      user_cal = user.cal;
    }

    const mealPer = await mealSettings.findOne();

    let totalBreakfastCalory = 0;
    let totalMorningCalory = 0;
    let totalLunchCalory = 0;
    let totalEveningCalory = 0;
    let totalDinnerCalory = 0;

    if (mealPer) {
      totalBreakfastCalory = parseInt((user_cal * mealPer.breakfast) / 100);
      totalMorningCalory = parseInt((user_cal * mealPer.morning_snack) / 100);
      totalLunchCalory = parseInt((user_cal * mealPer.lunch) / 100);
      totalEveningCalory = parseInt((user_cal * mealPer.evening_snack) / 100);
      totalDinnerCalory = parseInt((user_cal * mealPer.dinner) / 100);
    }

    const bf_recipes = await getMealTimewiseRecipes(date, userid, 1);
    const mo_recipes = await getMealTimewiseRecipes(date, userid, 2);
    const lunch_recipes = await getMealTimewiseRecipes(date, userid, 3);
    const eve_recipes = await getMealTimewiseRecipes(date, userid, 4);
    const dinner_recipes = await getMealTimewiseRecipes(date, userid, 5);

    // Assuming you have a `baseUrl` variable
    const baseUrl = req.protocol + "://" + req.get("host") + process.env.BASE_URL_RECIPES_PATH; // Replace with your actual base URL

    const totalBfUsedCalory = parseInt(bf_recipes.totalUsedCalories);
    const breakfastData = {
      totalBreakfastCalory: totalBreakfastCalory,
      totalUsedCalories: totalBfUsedCalory,
      receipes: bf_recipes.recipes,
    };
    const totalmoUsedCalory = parseInt(mo_recipes.totalUsedCalories);
    const morningData = {
      totalMorningCalory: totalMorningCalory,
      totalUsedCalories: totalmoUsedCalory,
      receipes: mo_recipes.recipes,
    };

    const totalLunchUsedCalory = parseInt(lunch_recipes.totalUsedCalories);
    const lunchData = {
      totalLunchCalory: totalLunchCalory,
      totalUsedCalories: totalLunchUsedCalory,
      receipes: lunch_recipes.recipes,
    };

    const totalEveningUsedCalory = parseInt(eve_recipes.totalUsedCalories);
    const eveningData = {
      totalEveningCalory: totalEveningCalory,
      totalUsedCalories: totalEveningUsedCalory,
      receipes: eve_recipes.recipes,
    };

    const totalDinnerUsedCalory = parseInt(dinner_recipes.totalUsedCalories);
    const dinnerData = {
      totalDinnerCalory: totalDinnerCalory,
      totalUsedCalories: totalDinnerUsedCalory,
      receipes: dinner_recipes.recipes,
    };

    const recipes = {
      breakfast: breakfastData,
      morning: morningData,
      lunch: lunchData,
      evening: eveningData,
      dinner: dinnerData,
    };

    const totalUsedCal =
      totalBfUsedCalory + totalmoUsedCalory + totalLunchUsedCalory + totalEveningUsedCalory + totalDinnerUsedCalory;

    const finalResponse = {
      recipes: recipes,
      baseUrl: baseUrl,
      totalCal: parseInt(user_cal),
      totalUsedCal: parseInt(totalUsedCal),
    };

    successResponse(res, finalResponse);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  AllUsers,
  DeleteUser,
  deleteMultiUser,
  updateUserStatus,
  updateUserProfile,
  addUser,
  getAllTrackedMeal,
};
