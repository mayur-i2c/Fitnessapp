const express = require("express");
const Recipes = require("../../models/Recipes");
const {
  createResponse,
  successResponse,
  queryErrorRelatedResponse,
  deleteResponse,
} = require("../../helper/sendResponse");
const mongoose = require("mongoose");

//Add Recipes
const addRecipes = async (req, res, next) => {
  try {
    const addedRec = req.body;
    if (req.file) {
      addedRec.image = req.file.filename;
    }
    const newRec = await new Recipes(addedRec);

    const result = await newRec.save();
    return createResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Update Recipes
const updateRecipes = async (req, res, next) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) return queryErrorRelatedResponse(req, res, 404, "Recipes not found.");

    const updatedData = req.body;
    updatedData.image = recipe.image;
    if (req.file) {
      deleteFiles("recipes/" + recipe.image);
      updatedData.image = req.file.filename;
    }

    const isUpdate = await Recipes.findByIdAndUpdate(req.params.id, { $set: updatedData });
    if (!isUpdate) return queryErrorRelatedResponse(req, res, 401, "Recipes Went wrong!!");

    const result = await Recipes.findById(req.params.id);
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Update Recipes Status
const updateRecStatus = async (req, res, next) => {
  try {
    // Convert string is into Object id
    const id = new mongoose.Types.ObjectId(req.params.id);
    const recipe = await Recipes.findById(id);
    if (!recipe) return queryErrorRelatedResponse(req, res, 404, "Recipes not found.");

    recipe.status = !recipe.status;
    const result = await recipe.save();
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Delete Single Recipes
const deleteRecipe = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const recipe = await Recipes.findById(id);
    if (!recipe) return queryErrorRelatedResponse(req, res, 404, "Recipes not found.");
    deleteFiles("recipes/" + recipe.image);
    await Recipes.deleteOne({ _id: id });
    deleteResponse(res, "Recipe deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Delete Multiple Recipes
const deleteMultRecipe = async (req, res, next) => {
  try {
    const { Ids } = req.body;
    Ids.map(async (item) => {
      const id = new mongoose.Types.ObjectId(item);
      const recipe = await Recipes.findById(id);
      if (!recipe) return queryErrorRelatedResponse(req, res, 404, "Recipes not found.");
      deleteFiles("recipes/" + recipe.image);
      await Recipes.deleteOne({ _id: id });
    });
    deleteResponse(res, "All selected records deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Get All Recipes
const getAllRecipes = async (req, res, next) => {
  try {
    const recipe = await Recipes.find();
    if (!recipe) return queryErrorRelatedResponse(req, res, 404, "Recipes not found.");
    successResponse(res, recipe);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addRecipes,
  updateRecipes,
  updateRecStatus,
  deleteMultRecipe,
  getAllRecipes,
  deleteRecipe,
};
