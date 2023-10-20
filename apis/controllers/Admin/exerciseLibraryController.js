const express = require("express");
const ExerciseLibrary = require("../../models/ExerciseLibrary");

const {
  createResponse,
  successResponse,
  queryErrorRelatedResponse,
  deleteResponse,
} = require("../../helper/sendResponse");
const mongoose = require("mongoose");
const deleteFiles = require("../../helper/deleteFiles");

//Add Exercise Library
const addExeLibrary = async (req, res, next) => {
  try {
    // Create a Exercise Library
    const addedExeLibrary = req.body;
    if (req.files["video"]) {
      addedExeLibrary.video = req.files["video"][0].filename;
    }

    if (req.files["icon"]) {
      addedExeLibrary.icon = req.files["icon"][0].filename;
    }

    const exeLibrary = await new ExerciseLibrary(addedExeLibrary);
    // Save the  Exercise Library
    const result = await exeLibrary.save();

    return createResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Get All Exercise Library
const getAllExeLibrary = async (req, res, next) => {
  try {
    const exeLibarary = await ExerciseLibrary.find();
    if (!exeLibarary) return queryErrorRelatedResponse(req, res, 404, " Exercise Library not found.");
    successResponse(res, exeLibarary);
  } catch (err) {
    next(err);
  }
};

//Update Exercise Library Status
const updateExeLibraryStatus = async (req, res, next) => {
  try {
    // Convert string is into Object id
    const id = new mongoose.Types.ObjectId(req.params.id);
    const exeLibrary = await ExerciseLibrary.findById(id);
    if (!exeLibrary) return queryErrorRelatedResponse(req, res, 404, "Exercise Library not found.");

    exeLibrary.status = !exeLibrary.status;
    const result = await exeLibrary.save();
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Delete Single Exercise Library
const deleteExeLibrary = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const exeLibrary = await ExerciseLibrary.findById(id);
    if (!exeLibrary) return queryErrorRelatedResponse(req, res, 404, "Exercise Library not found.");
    deleteFiles("exerciseLibrary/" + exeLibrary.video);
    deleteFiles("exerciseLibrary/" + exeLibrary.icon);
    await ExerciseLibrary.deleteOne({ _id: id });
    deleteResponse(res, "Exercise Library deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Delete Multiple Exercise Library
const deleteMultExeLibrary = async (req, res, next) => {
  try {
    const { Ids } = req.body;
    Ids.map(async (item) => {
      const id = new mongoose.Types.ObjectId(item);
      const exeLibrary = await ExerciseLibrary.findById(id);
      deleteFiles("exerciseLibrary/" + exeLibrary.video);
      deleteFiles("exerciseLibrary/" + exeLibrary.icon);

      await ExerciseLibrary.deleteOne({ _id: id });
    });
    deleteResponse(res, "All selected records deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Update Exercise Library
const updateExeLibrary = async (req, res, next) => {
  try {
    const exeLibrary = await ExerciseLibrary.findById(req.params.id);
    if (!exeLibrary) return queryErrorRelatedResponse(req, res, 404, "Exercise Library not found.");

    const updatedData = req.body;
    updatedData.video = exeLibrary.video;
    updatedData.icon = exeLibrary.icon;

    if (req.files["video"]) {
      deleteFiles("exerciseLibrary/" + exeLibrary.video);
      updatedData.video = req.files["video"][0].filename;
    }

    if (req.files["icon"]) {
      deleteFiles("exerciseLibrary/" + exeLibrary.icon);
      updatedData.icon = req.files["icon"][0].filename;
    }

    const isUpdate = await ExerciseLibrary.findByIdAndUpdate(req.params.id, { $set: updatedData });
    if (!isUpdate) return queryErrorRelatedResponse(req, res, 401, "Something Went wrong!!");

    const result = await ExerciseLibrary.findById(req.params.id);
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addExeLibrary,
  getAllExeLibrary,
  deleteExeLibrary,
  deleteMultExeLibrary,
  updateExeLibraryStatus,
  updateExeLibrary,
};
