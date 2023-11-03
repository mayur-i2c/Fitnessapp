const express = require("express");
const TrackedMeal = require("../../models/TrackedMeal");
const RecipesSubCat = require("../../models/RecipesSubCat");
const User = require("../../models/User");
const CalData = require("../../models/CalData");

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
    const FormattedDate = new Date(date);
    FormattedDate.setHours(0, 0, 0, 0);

    const user_id = new mongoose.Types.ObjectId(userid);
    const user = await User.findById(user_id);
    const today_cal = user.cal;

    const existingDoc = await CalData.findOne({ date: FormattedDate, userId: userid });
    if (existingDoc) {
      const last_cal = existingDoc.cal;
      console.log(existingDoc);
    } else {
      // If the exact date doesn't exist, find the nearest date that exists
      const nearestDoc = await CalData.findOne({ date: { $lte: FormattedDate }, userId: userid })
        .sort({ date: -1 })
        .limit(1);

      console.log(nearestDoc);
    }

    console.log(today_cal);

    // const recipes = await TrackedMeal.find({
    //   date: FormattedDate,
    //   userid: userid,
    // }).populate({
    //   path: "subcatid",
    //   model: "recipesSubCat",
    //   populate: {
    //     path: "calData.unit",
    //     model: "recipeUnits", // Replace with your actual Unit model name
    //   },
    // });
    // if (!recipes) return queryErrorRelatedResponse(req, res, 404, "Meal not found.");

    // // Assuming you have a `baseUrl` variable
    // const baseUrl = req.protocol + "://" + req.get("host") + process.env.BASE_URL_RECIPES_PATH; // Replace with your actual base URL

    // // Modify the response objects to include a `url` property
    // const modifiedRecipes = recipes.map((data) => ({
    //   ...data.toObject(), // Convert the Mongoose document to a plain JavaScript object
    //   baseUrl: `${baseUrl}`,
    // }));

    // successResponse(res, modifiedRecipes);
  } catch (err) {
    next(err);
  }
};

module.exports = { addMeal, getAllTrackedMeal };
