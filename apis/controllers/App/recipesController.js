const express = require("express");
const Recipes = require("../../models/Recipes");
const RecipesSubCat = require("../../models/RecipesSubCat");

const {
  createResponse,
  successResponse,
  queryErrorRelatedResponse,
  deleteResponse,
} = require("../../helper/sendResponse");
const mongoose = require("mongoose");

//Get All Active Receipes
const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipes.find({ status: true }).populate({
      path: "subcategories",
      match: { status: true },
      populate: {
        path: "calData.unit",
        model: "recipeUnits", // Replace with your actual Unit model name
      },
    });
    if (!recipes) return queryErrorRelatedResponse(req, res, 404, "Recipes not found.");

    // Assuming you have a `baseUrl` variable
    const baseUrl = req.protocol + "://" + req.get("host") + process.env.BASE_URL_RECIPES_PATH; // Replace with your actual base URL

    // Modify the response objects to include a `url` property
    const modifiedRecipes = recipes.map((data) => ({
      ...data.toObject(), // Convert the Mongoose document to a plain JavaScript object
      baseUrl: `${baseUrl}`,
    }));

    successResponse(res, modifiedRecipes);
  } catch (err) {
    next(err);
  }
};

//Get Search Receipes
const getSearchRecipes = async (req, res, next) => {
  try {
    const recipes = await RecipesSubCat.find({
      status: true,
      name: { $regex: new RegExp(req.body.search, "i") },
    }).populate({
      path: "calData.unit",
      model: "recipeUnits",
    });
    if (!recipes) return queryErrorRelatedResponse(req, res, 404, "Recipes not found.");

    // Assuming you have a `baseUrl` variable
    const baseUrl = req.protocol + "://" + req.get("host") + process.env.BASE_URL_RECIPES_PATH; // Replace with your actual base URL

    // Modify the response objects to include a `url` property
    const modifiedRecipes = recipes.map((data) => ({
      ...data.toObject(), // Convert the Mongoose document to a plain JavaScript object
      baseUrl: `${baseUrl}`,
    }));

    successResponse(res, modifiedRecipes);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllRecipes,
  getSearchRecipes,
};
