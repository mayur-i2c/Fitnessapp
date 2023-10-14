const express = require("express");
const Essentials = require("../../models/Essentials");
const {
  createResponse,
  successResponse,
  queryErrorRelatedResponse,
  deleteResponse,
} = require("../../helper/sendResponse");
const mongoose = require("mongoose");

//Add Essentials
const addEssentials = async (req, res, next) => {
  try {
    const addedEss = req.body;
    if (req.file) {
      addedEss.image = req.file.filename;
    }
    const newCat = await new Essentials(addedEss);

    const result = await newCat.save();
    return createResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Update Essentials
const updateEssentials = async (req, res, next) => {
  try {
    const cat = await Essentials.findById(req.params.id);
    if (!cat) return queryErrorRelatedResponse(req, res, 404, "Essentials not found.");

    const updatedData = req.body;
    updatedData.image = cat.image;
    if (req.file) {
      deleteFiles("essentials/" + cat.image);
      updatedData.image = req.file.filename;
    }

    const isUpdate = await Essentials.findByIdAndUpdate(req.params.id, { $set: updatedData });
    if (!isUpdate) return queryErrorRelatedResponse(req, res, 401, "Something Went wrong!!");

    const result = await Essentials.findById(req.params.id);
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Update Essentials Status
const updateEssStatus = async (req, res, next) => {
  try {
    // Convert string is into Object id
    const id = new mongoose.Types.ObjectId(req.params.id);
    const cat = await Essentials.findById(id);
    if (!cat) return queryErrorRelatedResponse(req, res, 404, "Essentials not found.");

    cat.status = !cat.status;
    const result = await cat.save();
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Delete Single Essentials
const deleteEssentials = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const cat = await Essentials.findById(id);
    if (!cat) return queryErrorRelatedResponse(req, res, 404, "Essentials not found.");

    await Essentials.deleteOne({ _id: id });
    deleteResponse(res, "Essentials deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Delete Multiple Essentials
const deleteMultEssentials = async (req, res, next) => {
  try {
    const { Ids } = req.body;
    Ids.map(async (item) => {
      const id = new mongoose.Types.ObjectId(item);
      await Essentials.deleteOne({ _id: id });
    });
    deleteResponse(res, "All selected records deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Get All Essentials
const getAllEssentials = async (req, res, next) => {
  try {
    const cat = await Essentials.find();
    if (!cat) return queryErrorRelatedResponse(req, res, 404, "Essentials not found.");
    successResponse(res, cat);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  addEssentials,
  updateEssentials,
  updateEssStatus,
  deleteEssentials,
  deleteMultEssentials,
  getAllEssentials,
};
