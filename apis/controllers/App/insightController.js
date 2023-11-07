const express = require("express");
const TrackedMeal = require("../../models/TrackedMeal");
const RecipesSubCat = require("../../models/RecipesSubCat");
const User = require("../../models/User");
const CalCronData = require("../../models/CalCronData");
const mealSettings = require("../../models/MealSettings");
const { formatDate } = require("../../helper/formatterFiles");
const { getMealTimewiseRecipes } = require("../../helper/commonServices");
const {
  createResponse,
  successResponse,
  queryErrorRelatedResponse,
  deleteResponse,
} = require("../../helper/sendResponse");
const mongoose = require("mongoose");
const moment = require("moment");

//Add Tracking Meal
const addMeal = async (req, res, next) => {
  try {
    const { userid, date, mealime, subcatid, qty, unitid, protine, carbs, fats, fiber, cal } = req.body;
    const FormattedDate = new Date(date);
    FormattedDate.setHours(0, 0, 0, 0);
    const existingMeal = await TrackedMeal.findOne({
      date: FormattedDate,
      userid: userid,
      subcatid: subcatid,
      mealime: mealime,
    });
    let calData = existingMeal;
    if (existingMeal) {
      existingMeal.qty = qty;
      existingMeal.unitid = unitid;
      existingMeal.protine = protine;
      existingMeal.carbs = carbs;
      existingMeal.fats = fats;
      existingMeal.fiber = fiber;
      existingMeal.cal = cal;
      calData = await existingMeal.save();
    } else {
      const NewMeal = await TrackedMeal.create({
        userid,
        date,
        mealime,
        subcatid,
        qty,
        unitid,
        protine,
        carbs,
        fats,
        fiber,
        cal,
      });
      calData = await NewMeal.save();
    }

    return createResponse(res, calData);
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

module.exports = { addMeal, getAllTrackedMeal };
