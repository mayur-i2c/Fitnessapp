const express = require("express");
const Essentials = require("../../models/Essentials");
const EssSubcategoryLevel1 = require("../../models/EssSubcategoryLevel1");
const EssSubcategoryLevel2 = require("../../models/EssSubcategoryLevel2");

const {
  createResponse,
  successResponse,
  queryErrorRelatedResponse,
  deleteResponse,
} = require("../../helper/sendResponse");
const mongoose = require("mongoose");

//Get All Active Essentials
const getAllEssentials = async (req, res, next) => {
  try {
    const cat = await Essentials.find({ status: true });
    if (!cat) return queryErrorRelatedResponse(req, res, 404, "Essentials not found.");

    // Assuming you have a `baseUrl` variable
    const baseUrl = req.protocol + "://" + req.get("host"); // Replace with your actual base URL

    // Modify the response objects to include a `url` property
    const modifiedcategories = cat.map((subcategory) => ({
      ...subcategory.toObject(), // Convert the Mongoose document to a plain JavaScript object
      url: `${baseUrl}/public/essentials/`,
    }));

    successResponse(res, modifiedcategories);
  } catch (err) {
    next(err);
  }
};

//Get All Active Essentials Sub-Category Level 1
const getEssSubCat1 = async (req, res, next) => {
  try {
    const cat = await Essentials.findById(req.body.catId);
    if (!cat) return queryErrorRelatedResponse(req, res, 404, "Essentials not found.");

    // Get subcategories at level 1 for the specified category
    const subcategoriesLevel1 = await EssSubcategoryLevel1.find({
      _id: { $in: cat.subcategories },
      status: true,
    });

    // Assuming you have a `baseUrl` variable
    const baseUrl = req.protocol + "://" + req.get("host"); // Replace with your actual base URL

    // Modify the response objects to include a `url` property
    const modifiedSubcategories = subcategoriesLevel1.map((subcategory) => ({
      ...subcategory.toObject(), // Convert the Mongoose document to a plain JavaScript object
      url: `${baseUrl}/public/essentials/`,
    }));

    successResponse(res, modifiedSubcategories);
  } catch (err) {
    next(err);
  }
};

//Get All Sub-Category Level 2
const getEssSubCat2 = async (req, res, next) => {
  try {
    const subcat = await EssSubcategoryLevel1.findById(req.body.subCat1id);
    if (!subcat) return queryErrorRelatedResponse(req, res, 404, "Essentials not found.");

    // Get subcategories at level 2 for the specified category
    const subcategoriesLevel2 = await EssSubcategoryLevel2.find({
      _id: { $in: subcat.subcategories },
      status: true,
    });

    // Assuming you have a `baseUrl` variable
    const baseUrl = req.protocol + "://" + req.get("host"); // Replace with your actual base URL

    // Modify the response objects to include a `url` property
    const modifiedSubcategories = subcategoriesLevel2.map((subcategory) => ({
      ...subcategory.toObject(), // Convert the Mongoose document to a plain JavaScript object
      url: `${baseUrl}/public/essentials/`,
    }));

    successResponse(res, modifiedSubcategories);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllEssentials, getEssSubCat1, getEssSubCat2 };
