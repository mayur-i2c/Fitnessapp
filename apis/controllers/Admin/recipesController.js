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

//Add Recipes SubCategory
const addRecipesSubCat = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const cat = await Recipes.findById(id);
    if (!cat) return queryErrorRelatedResponse(req, res, 404, "Recipes not found.");
    console.log(req.body);
    // Create a new subcategory at level 1
    const addedSubCat = req.body;
    if (req.file) {
      addedSubCat.image = req.file.filename;
    }
    const newSubCat = await new RecipesSubCat(addedSubCat);
    // Save the new subcategory
    const result = await newSubCat.save();

    // Add the new subcategory to the category's subcategories array
    cat.subcategories.push(result);
    // Save the category with the new subcategory
    await cat.save();

    return createResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Get All Recipes SubCategory
const getAllRecSubCat = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const cat = await Recipes.findById(id);
    if (!cat) return queryErrorRelatedResponse(req, res, 404, "Recipes not found.");

    // Get subcategories at level 1 for the specified category
    const subcategoriesLevel = await RecipesSubCat.find({
      _id: { $in: cat.subcategories },
    });

    successResponse(res, subcategoriesLevel);
  } catch (err) {
    next(err);
  }
};

//Update Recipes SubCategory
const updateRecSubcat = async (req, res, next) => {
  try {
    const subcat = await RecipesSubCat.findById(req.params.id);
    if (!subcat) return queryErrorRelatedResponse(req, res, 404, "Subacategory not found.");

    const updatedData = req.body;
    updatedData.image = subcat.image;
    if (req.file) {
      deleteFiles("recipes/" + subcat.image);
      updatedData.image = req.file.filename;
    }

    const isUpdate = await RecipesSubCat.findByIdAndUpdate(req.params.id, { $set: updatedData });
    if (!isUpdate) return queryErrorRelatedResponse(req, res, 401, "Something Went wrong!!");

    const result = await RecipesSubCat.findById(req.params.id);
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Delete Recipes SubCategory
const deleteRecSubCat = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const subcat = await RecipesSubCat.findById(id);
    if (!subcat) return queryErrorRelatedResponse(req, res, 404, "Sub-category not found.");
    deleteFiles("recipes/" + subcat.image);
    await RecipesSubCat.deleteOne({ _id: id });
    deleteResponse(res, "Sub-category deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Delete Multiple Recipes Subacategory
const deleteMultRecSubcat = async (req, res, next) => {
  try {
    const { Ids } = req.body;
    Ids.map(async (item) => {
      const id = new mongoose.Types.ObjectId(item);
      const subcat = await RecipesSubCat.findById(id);
      if (!subcat) return queryErrorRelatedResponse(req, res, 404, "Sub-category not found.");
      deleteFiles("recipes/" + subcat.image);
      await RecipesSubCat.deleteOne({ _id: id });
    });
    deleteResponse(res, "All selected records deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Update Recipes Subacategory Status
const updateRecSubCatStatus = async (req, res, next) => {
  try {
    // Convert string is into Object id
    const id = new mongoose.Types.ObjectId(req.params.id);
    const subCat = await RecipesSubCat.findById(id);
    if (!subCat) return queryErrorRelatedResponse(req, res, 404, "Sub-category not found.");

    subCat.status = !subCat.status;
    const result = await subCat.save();
    return successResponse(res, result);
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
  addRecipesSubCat,
  getAllRecSubCat,
  updateRecSubcat,
  deleteRecSubCat,
  deleteMultRecSubcat,
  updateRecSubCatStatus,
};
