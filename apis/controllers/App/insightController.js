const express = require("express");
const TrackedMeal = require("../../models/TrackedMeal");
const RecipesSubCat = require("../../models/RecipesSubCat");
const User = require("../../models/User");
const CalCronData = require("../../models/CalCronData");
const { formatDate } = require("../../helper/formatterFiles");
const { getMealwiseRecipes } = require("../../helper/commonServices");
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
    const recipes = getMealwiseRecipes(date, userid, 1);
    // const recipes = await TrackedMeal.find({
    //   date: formatDate(date),
    //   userid: userid,
    //   mealime: 1,
    // }).populate({
    //   path: "subcatid",
    //   model: "recipesSubCat",
    //   populate: {
    //     path: "calData.unit",
    //     model: "recipeUnits", // Replace with your actual Unit model name
    //   },
    // });
    if (!recipes) return queryErrorRelatedResponse(req, res, 404, "Meal not found.");

    // Assuming you have a `baseUrl` variable
    const baseUrl = req.protocol + "://" + req.get("host") + process.env.BASE_URL_RECIPES_PATH; // Replace with your actual base URL

    // Modify the response objects to include a `url` property
    // const modifiedRecipes = recipes.map((data) => ({
    //   ...data.toObject(), // Convert the Mongoose document to a plain JavaScript object
    //   baseUrl: `${baseUrl}`,
    //   totalCal: user_cal,
    // }));
    const finalResponse = {
      recipes: recipes,
      baseUrl: baseUrl,
      totalCal: user_cal,
    };

    successResponse(res, finalResponse);
  } catch (err) {
    next(err);
  }
};

module.exports = { addMeal, getAllTrackedMeal };
