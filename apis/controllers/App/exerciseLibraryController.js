const express = require("express");
const ExerciseLibrary = require("../../models/ExerciseLibrary");

const {
  createResponse,
  successResponse,
  queryErrorRelatedResponse,
  deleteResponse,
} = require("../../helper/sendResponse");
const mongoose = require("mongoose");

//Get All Active Exercise Library
const getAllExeLibrary = async (req, res, next) => {
  try {
    const exeLib = await ExerciseLibrary.find({ status: true });
    if (!exeLib) return queryErrorRelatedResponse(req, res, 404, "Exercise Library not found.");

    // Assuming you have a `baseUrl` variable
    const baseUrl = req.protocol + "://" + req.get("host") + process.env.BASE_URL_EXELIBRARY_PATH; // Replace with your actual base URL

    // Modify the response objects to include a `url` property
    const modifiedReels = exeLib.map((data) => ({
      ...data.toObject(), // Convert the Mongoose document to a plain JavaScript object
      baseUrl: `${baseUrl}`,
    }));

    successResponse(res, modifiedReels);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllExeLibrary,
};
