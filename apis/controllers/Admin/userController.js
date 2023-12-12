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
const NutritionSettings = require("../../models/NutritionSettings");
const HelpCenter = require("../../models/HelpCenter");
const TrackedMeal = require("../../models/TrackedMeal");
const { formatDate } = require("../../helper/formatterFiles");
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

    const isUpdate = await User.findByIdAndUpdate(req.params.id, { $set: updatedData });
    if (!isUpdate) return queryErrorRelatedResponse(req, res, 401, "Something Went wrong!!");

    const today = new Date(); // Get the current date and time
    today.setHours(0, 0, 0, 0); // Set the time to the start of the day

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Set it to the start of the next day

    const isAdded = await CalCronData.findOne({
      date: {
        $gte: today,
        $lt: tomorrow,
      },
      userId: req.params.id,
    });

    if (isAdded) {
      isAdded.cal = req.body.cal ? req.body.cal : "0";
      await isAdded.save();
    } else {
      const newCalCronData = new CalCronData({
        userId: req.params.id,
        cal: req.body.cal ? req.body.cal : "0",
        date: new Date(),
      });
      newCalCronData.save();
    }

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

const getMicronutrition = async (recipesData, totalCalory, mealPer) => {
  const recipes = recipesData.recipes;

  // // Calculate the sum of "protine" values
  const UsedProteinCalory = recipes.reduce((totalCalories, recipe) => {
    return totalCalories + parseFloat(recipe.protine);
  }, 0);
  // Calculate the sum of "protine" values
  const UsedFatCalory = recipes.reduce((totalCalories, recipe) => {
    return totalCalories + parseFloat(recipe.fats);
  }, 0);
  // Calculate the sum of "protine" values
  const UsedCarbCalory = recipes.reduce((totalCalories, recipe) => {
    return totalCalories + parseFloat(recipe.carbs);
  }, 0);
  // Calculate the sum of "protine" values
  const UsedFibreCalory = recipes.reduce((totalCalories, recipe) => {
    return totalCalories + parseFloat(recipe.fiber);
  }, 0);
  const cal_per = Math.round((recipesData.totalUsedCalories * 100) / totalCalory);
  const nutritionPer = await NutritionSettings.findOne();
  let totalProteinCalory = 0;
  let totalCarbCalory = 0;
  let totalFatCalory = 0;
  let totalFibreCalory = 0;
  if (nutritionPer) {
    totalProteinCalory = ((totalCalory * nutritionPer.protein) / 100 / 4).toFixed(1);
    totalCarbCalory = ((totalCalory * nutritionPer.carb) / 100 / 4).toFixed(1);
    totalFatCalory = ((totalCalory * nutritionPer.fat) / 100 / 9).toFixed(1);
    totalFibreCalory = Number((nutritionPer.fibre * mealPer) / 100).toFixed(1);
  }
  macronutrients = {
    protine: {
      total: totalProteinCalory,
      used: UsedProteinCalory.toFixed(1),
      percent: Math.round((UsedProteinCalory * 100) / totalProteinCalory),
    },
    fats: {
      total: totalFatCalory,
      used: UsedFatCalory.toFixed(1),
      percent: Math.round((UsedFatCalory * 100) / totalFatCalory),
    },
    carbs: {
      total: totalCarbCalory,
      used: UsedCarbCalory.toFixed(1),
      percent: Math.round((UsedCarbCalory * 100) / totalCarbCalory),
    },
    fibre: {
      total: totalFibreCalory,
      used: UsedFibreCalory.toFixed(1),
      percent: Math.round((UsedFibreCalory * 100) / totalFibreCalory),
    },
  };
  return macronutrients;
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

    const bf_macronutrients = await getMicronutrition(bf_recipes, totalBreakfastCalory, mealPer.breakfast);
    const morning_macronutrients = await getMicronutrition(mo_recipes, totalMorningCalory, mealPer.morning_snack);
    const lunch_macronutrients = await getMicronutrition(lunch_recipes, totalLunchCalory, mealPer.lunch);
    const eve_macronutrients = await getMicronutrition(eve_recipes, totalEveningCalory, mealPer.evening_snack);
    const dinner_macronutrients = await getMicronutrition(dinner_recipes, totalDinnerCalory, mealPer.dinner);

    // Assuming you have a `baseUrl` variable
    const baseUrl = req.protocol + "://" + req.get("host") + process.env.BASE_URL_RECIPES_PATH; // Replace with your actual base URL

    const totalBfUsedCalory = parseInt(bf_recipes.totalUsedCalories);
    const breakfastData = {
      totalCalory: totalBreakfastCalory,
      totalUsedCalories: totalBfUsedCalory,
      cal_per: Math.round((totalBfUsedCalory * 100) / totalBreakfastCalory),
      receipes: bf_recipes.recipes,
      macronutrients: bf_macronutrients,
    };
    const totalmoUsedCalory = parseInt(mo_recipes.totalUsedCalories);
    const morningData = {
      totalCalory: totalMorningCalory,
      totalUsedCalories: totalmoUsedCalory,
      cal_per: Math.round((totalmoUsedCalory * 100) / totalMorningCalory),
      receipes: mo_recipes.recipes,
      macronutrients: morning_macronutrients,
    };

    const totalLunchUsedCalory = parseInt(lunch_recipes.totalUsedCalories);
    const lunchData = {
      totalCalory: totalLunchCalory,
      totalUsedCalories: totalLunchUsedCalory,
      cal_per: Math.round((totalLunchUsedCalory * 100) / totalLunchCalory),
      receipes: lunch_recipes.recipes,
      macronutrients: lunch_macronutrients,
    };

    const totalEveningUsedCalory = parseInt(eve_recipes.totalUsedCalories);
    const eveningData = {
      totalCalory: totalEveningCalory,
      totalUsedCalories: totalEveningUsedCalory,
      cal_per: Math.round((totalEveningUsedCalory * 100) / totalEveningCalory),
      receipes: eve_recipes.recipes,
      macronutrients: eve_macronutrients,
    };

    const totalDinnerUsedCalory = parseInt(dinner_recipes.totalUsedCalories);
    const dinnerData = {
      totalCalory: totalDinnerCalory,
      totalUsedCalories: totalDinnerUsedCalory,
      cal_per: Math.round((totalDinnerUsedCalory * 100) / totalDinnerCalory),
      receipes: dinner_recipes.recipes,
      macronutrients: dinner_macronutrients,
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

    const allRecipes = await getMealTimewiseRecipes(date, userid);

    const totalMacronutrientsawait = await getMicronutrition(allRecipes, user_cal, 100);

    const finalResponse = {
      recipes: recipes,
      baseUrl: baseUrl,
      totalCal: parseInt(user_cal),
      totalUsedCal: parseInt(totalUsedCal),
      cal_per: Math.round((totalUsedCal * 100) / user_cal),
      macronutrients: totalMacronutrientsawait,
    };

    successResponse(res, finalResponse);
  } catch (err) {
    next(err);
  }
};

// Get last 10 Signup Users
const getLastUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: "descending" }).limit(10);
    successResponse(res, users);
  } catch (error) {
    next(error);
  }
};

// API endpoint to get the total count of active and inactive users
const getStatuswiseUserCount = async (req, res, next) => {
  try {
    const users = await User.find();
    const activeCount = users.filter((user) => user.status).length;
    const inactiveCount = users.length - activeCount;

    const result = { activeCount: activeCount, inactiveCount: inactiveCount };
    successResponse(res, result);
  } catch (error) {
    next(error);
  }
};

// Get User Issue
const userIssue = async (req, res, next) => {
  try {
    const issues = await HelpCenter.find().populate("userid");

    successResponse(res, issues);
  } catch (error) {
    next(error);
  }
};

//Update User Issue Status
const updateUserIssueStatus = async (req, res, next) => {
  try {
    // Convert string is into Object id
    const id = new mongoose.Types.ObjectId(req.params.id);
    const issue = await HelpCenter.findById(id);
    if (!issue) return queryErrorRelatedResponse(req, res, 404, "issue not found.");
    issue.status = !issue.status;
    const result = await issue.save();
    return successResponse(res, result);
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
  getLastUsers,
  getStatuswiseUserCount,
  userIssue,
  updateUserIssueStatus,
};
