const express = require("express");
const WorkoutCollection = require("../../models/WorkoutCollection");
const {
  successResponse,
  deleteResponse,
  queryErrorRelatedResponse,
  createResponse,
} = require("../../helper/sendResponse");
const mongoose = require("mongoose");
const deleteFiles = require("../../helper/deleteFiles");

//Add Workout Collections
const addWorkCollection = async (req, res, next) => {
  try {
    const addedCollection = req.body;
    if (req.file) {
      addedCollection.image = req.file.filename;
    }
    const newCollection = await new WorkoutCollection(addedCollection);

    const result = await newCollection.save();
    return createResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Update Workout Collections
const updateWorkCollection = async (req, res, next) => {
  try {
    const collection = await WorkoutCollection.findById(req.params.id);
    if (!collection) return queryErrorRelatedResponse(req, res, 404, "Workout Collection not found.");

    const updatedData = req.body;
    updatedData.image = collection.image;
    if (req.file) {
      deleteFiles("workoutCollection/" + collection.image);
      updatedData.image = req.file.filename;
    }

    const isUpdate = await WorkoutCollection.findByIdAndUpdate(req.params.id, { $set: updatedData });
    if (!isUpdate) return queryErrorRelatedResponse(req, res, 401, "Something Went wrong!!");

    const result = await WorkoutCollection.findById(req.params.id);
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Update Workout Collections Status
const updateCollectionStatus = async (req, res, next) => {
  try {
    // Convert string is into Object id
    const id = new mongoose.Types.ObjectId(req.params.id);
    const collection = await WorkoutCollection.findById(id);
    if (!collection) return queryErrorRelatedResponse(req, res, 404, "Workout Collection not found.");

    collection.status = !collection.status;
    const result = await collection.save();
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Delete Single Workout Collections
const deletecollection = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const collection = await WorkoutCollection.findById(id);
    if (!collection) return queryErrorRelatedResponse(req, res, 404, "Workout Collection not found.");
    await deleteFiles("workoutCollection/" + collection.image);
    await WorkoutCollection.deleteOne({ _id: id });
    deleteResponse(res, "Workout Collection deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Delete Multiple Workout Collections
const deleteMultCollection = async (req, res, next) => {
  try {
    const { Ids } = req.body;
    Ids.map(async (item) => {
      const id = new mongoose.Types.ObjectId(item);
      const collection = await WorkoutCollection.findById(id);
      await deleteFiles("workoutCollection/" + collection.image);
      await WorkoutCollection.deleteOne({ _id: id });
    });
    deleteResponse(res, "All selected records deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Get All Workout Collection
const getAllCollection = async (req, res, next) => {
  try {
    const collection = await WorkoutCollection.find();
    if (!collection) return queryErrorRelatedResponse(req, res, 404, "Workout Collection not found.");
    successResponse(res, collection);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addWorkCollection,
  updateWorkCollection,
  updateCollectionStatus,
  deletecollection,
  deleteMultCollection,
  getAllCollection,
};
