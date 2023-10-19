const express = require("express");
const Reels = require("../../models/Reels");

const {
  createResponse,
  successResponse,
  queryErrorRelatedResponse,
  deleteResponse,
} = require("../../helper/sendResponse");
const mongoose = require("mongoose");

//Get All Active Reels
const getAllReels = async (req, res, next) => {
  try {
    const reel = await Reels.find({ status: true });
    if (!reel) return queryErrorRelatedResponse(req, res, 404, "Reels not found.");

    // Assuming you have a `baseUrl` variable
    const baseUrl = req.protocol + "://" + req.get("host") + process.env.BASE_URL_REEL_PATH; // Replace with your actual base URL

    // Modify the response objects to include a `url` property
    const modifiedReels = reel.map((data) => ({
      ...data.toObject(), // Convert the Mongoose document to a plain JavaScript object
      baseUrl: `${baseUrl}`,
    }));

    successResponse(res, modifiedReels);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllReels,
};
