const express = require("express");
const TrackedMeal = require("../../models/TrackedMeal");
const RecipesSubCat = require("../../models/RecipesSubCat");
const User = require("../../models/User");
const CalCronData = require("../../models/CalCronData");
const mealSettings = require("../../models/MealSettings");
const NutritionSettings = require("../../models/NutritionSettings");
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
    // const FormattedDate = new Date(date);
    // FormattedDate.setHours(0, 0, 0, 0);

    // const tomorrow = new Date(FormattedDate);
    // tomorrow.setDate(FormattedDate.getDate() + 1); // Set it to the start of the next day

    // console.log(date);

    const existingMeal = await TrackedMeal.findOne({
      date: formatDate(date),
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
        userid: userid,
        date: formatDate(date),
        mealime: mealime,
        subcatid: subcatid,
        qty: qty,
        unitid: unitid,
        protine: protine,
        carbs: carbs,
        fats: fats,
        fiber: fiber,
        cal: cal,
      });
      calData = await NewMeal.save();
    }

    return createResponse(res, calData);
  } catch (err) {
    next(err);
  }
};

//Delete Tracking Meal
const deleteMeal = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const recipe = await TrackedMeal.findById(id);
    if (!recipe) return queryErrorRelatedResponse(req, res, 404, "Tracked meal not found.");

    await TrackedMeal.deleteOne({ _id: id });
    deleteResponse(res, "Meal removed successfully.");
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

//Get All Tracked Meal
const getEatenCal = async (req, res, next) => {
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

    const recipes = await TrackedMeal.find({ date: formatDate(date), userid: userid });

    // Calculate the sum of "cal" values
    const totalUsedCalories = recipes.reduce((totalCalories, recipe) => {
      return totalCalories + parseFloat(recipe.cal);
    }, 0);

    const response = {
      totalCal: parseInt(user_cal),
      totalUsedCalories: parseInt(totalUsedCalories),
    };

    successResponse(res, response);
  } catch (err) {
    next(err);
  }
};

//Get All Calory Budget
const getAllCalBudget = async (req, res, next) => {
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

    const recipes = await TrackedMeal.find({ date: formatDate(date), userid: userid }).populate([
      {
        path: "subcatid",
        model: "recipesSubCat",
        populate: {
          path: "calData.unit",
          model: "recipeUnits", // Replace with your actual Unit model name
        },
      },
      {
        path: "unitid",
        model: "recipeUnits",
      },
    ]);

    // Calculate the sum of "cal" values
    const totalUsedCalories = recipes.reduce((totalCalories, recipe) => {
      return totalCalories + parseFloat(recipe.cal);
    }, 0);

    // Calculate the sum of "protine" values
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

    const cal_per = Math.round((totalUsedCalories * 100) / user_cal);

    const nutritionPer = await NutritionSettings.findOne();

    let totalProteinCalory = 0;
    let totalCarbCalory = 0;
    let totalFatCalory = 0;
    let totalFibreCalory = 0;

    if (nutritionPer) {
      totalProteinCalory = ((user_cal * nutritionPer.protein) / 100 / 4).toFixed(1);
      totalCarbCalory = ((user_cal * nutritionPer.carb) / 100 / 4).toFixed(1);
      totalFatCalory = ((user_cal * nutritionPer.fat) / 100 / 9).toFixed(1);
      totalFibreCalory = Number(nutritionPer.fibre).toFixed(1);
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
    const response = {
      totalCal: parseInt(user_cal),
      totalUsedCalories: parseInt(totalUsedCalories),
      calPercent: cal_per,
      macronutrients: macronutrients,
      recipes: recipes,
    };

    successResponse(res, response);
  } catch (err) {
    next(err);
  }
};

//Get Mealtimewise Calory Budget
const getMealwiseCalBudget = async (req, res, next) => {
  try {
    const { userid, date, mealtime } = req.body;

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
    let totalCalory = 0;
    let mealtimewisePer = 0;

    if (mealPer) {
      if (mealtime == 1) {
        totalCalory = parseInt((user_cal * mealPer.breakfast) / 100);
        mealtimewisePer = mealPer.breakfast;
      } else if (mealtime == 2) {
        totalCalory = parseInt((user_cal * mealPer.morning_snack) / 100);
        mealtimewisePer = mealPer.morning_snack;
      } else if (mealtime == 3) {
        totalCalory = parseInt((user_cal * mealPer.lunch) / 100);
        mealtimewisePer = mealPer.lunch;
      } else if (mealtime == 4) {
        totalCalory = parseInt((user_cal * mealPer.evening_snack) / 100);
        mealtimewisePer = mealPer.evening_snack;
      } else if (mealtime == 5) {
        totalCalory = parseInt((user_cal * mealPer.dinner) / 100);
        mealtimewisePer = mealPer.dinner;
      }
    }

    const recipesData = await getMealTimewiseRecipes(date, userid, mealtime);

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
      totalFibreCalory = Number((nutritionPer.fibre * mealtimewisePer) / 100).toFixed(1);
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
    const response = {
      totalCal: parseInt(totalCalory),
      totalUsedCalories: parseInt(recipesData.totalUsedCalories),
      calPercent: cal_per,
      macronutrients: macronutrients,
      recipes: recipes,
    };

    successResponse(res, response);
  } catch (err) {
    next(err);
  }
};
module.exports = { addMeal, getAllTrackedMeal, getEatenCal, getAllCalBudget, getMealwiseCalBudget, deleteMeal };
