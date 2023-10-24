const express = require("express");
const WorkoutCollection = require("../../models/WorkoutCollection");

const {
  createResponse,
  successResponse,
  queryErrorRelatedResponse,
  deleteResponse,
} = require("../../helper/sendResponse");
const mongoose = require("mongoose");

//Get All Active Workout Collection
const getAllCollections = async (req, res, next) => {
  try {
    const collection = await WorkoutCollection.find({ status: true });
    if (!collection) return queryErrorRelatedResponse(req, res, 404, "Workout Collection not found.");

    // Assuming you have a `baseUrl` variable
    const baseUrl = req.protocol + "://" + req.get("host") + process.env.BASE_URL_WORKOUT_PATH; // Replace with your actual base URL

    // Modify the response objects to include a `url` property
    const modifiedWorkoutCollection = collection.map((data) => ({
      ...data.toObject(), // Convert the Mongoose document to a plain JavaScript object
      baseUrl: `${baseUrl}`,
    }));

    successResponse(res, modifiedWorkoutCollection);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCollections,
};
