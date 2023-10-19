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
    if (req.file) {
      addedReel.video = req.file.filename;
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
    if (req.file) {
      deleteFiles("reel/" + reel.video);
      updatedData.video = req.file.filename;
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
