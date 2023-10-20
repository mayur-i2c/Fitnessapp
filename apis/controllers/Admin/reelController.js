const Reels = require("../../models/Reels");
const {
  createResponse,
  successResponse,
  queryErrorRelatedResponse,
  deleteResponse,
} = require("../../helper/sendResponse");
const mongoose = require("mongoose");
const deleteFiles = require("../../helper/deleteFiles");

//Add Reel
const addReel = async (req, res, next) => {
  try {
    const addedReel = req.body;

    if (req.files["video"]) {
      addedReel.video = req.files["video"][0].filename;
    }

    if (req.files["image"]) {
      addedReel.image = req.files["image"][0].filename;
    }

    const NewReel = await new Reels(addedReel);

    const result = await NewReel.save();
    return createResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Update Reel
const updateReel = async (req, res, next) => {
  try {
    const reel = await Reels.findById(req.params.id);
    if (!reel) return queryErrorRelatedResponse(req, res, 404, "Reel not found.");

    const updatedData = req.body;
    updatedData.video = reel.video;
    updatedData.image = reel.image;

    if (req.files["video"]) {
      deleteFiles("reels/" + reel.video);
      updatedData.video = req.files["video"][0].filename;
    }

    if (req.files["image"]) {
      deleteFiles("reels/" + reel.image);
      updatedData.image = req.files["image"][0].filename;
    }

    const isUpdate = await Reels.findByIdAndUpdate(req.params.id, { $set: updatedData });
    if (!isUpdate) return queryErrorRelatedResponse(req, res, 401, "Something Went wrong!!");

    const result = await Reels.findById(req.params.id);
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Update Reel Status
const updateReelStatus = async (req, res, next) => {
  try {
    // Convert string is into Object id
    const id = new mongoose.Types.ObjectId(req.params.id);
    const reel = await Reels.findById(id);
    if (!reel) return queryErrorRelatedResponse(req, res, 404, "Reel not found.");

    reel.status = !reel.status;
    const result = await reel.save();
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Delete Single Reel
const deleteReel = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const reel = await Reels.findById(id);
    if (!reel) return queryErrorRelatedResponse(req, res, 404, "Reel not found.");
    deleteFiles("reels/" + reel.image);
    deleteFiles("reels/" + reel.video);
    await Reels.deleteOne({ _id: id });
    deleteResponse(res, "Reel deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Delete Multiple Reel
const deleteMultReel = async (req, res, next) => {
  try {
    const { Ids } = req.body;
    Ids.map(async (item) => {
      const id = new mongoose.Types.ObjectId(item);
      const reel = await Reels.findById(id);
      deleteFiles("reels/" + reel.image);
      deleteFiles("reels/" + reel.video);
      await Reels.deleteOne({ _id: id });
    });
    deleteResponse(res, "All selected records deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Get All Reel
const getAllReel = async (req, res, next) => {
  try {
    const reel = await Reels.find();
    if (!reel) return queryErrorRelatedResponse(req, res, 404, "Reel not found.");
    successResponse(res, reel);
  } catch (err) {
    next(err);
  }
};
module.exports = { addReel, updateReel, updateReelStatus, deleteReel, deleteMultReel, getAllReel };
