const MedicalConditions = require("../../models/MedicalConditions");
const TC = require("../../models/Tc");
const {
  createResponse,
  successResponse,
  queryErrorRelatedResponse,
  deleteResponse,
} = require("../../helper/sendResponse");
const mongoose = require("mongoose");

//Add Medical Conditions
const addMedicalCon = async (req, res, next) => {
  try {
    console.log("Add Medical Conditions");
    const { title } = req.body;
    const newMedicalCon = await MedicalConditions.create({
      title,
    });
    const result = await newMedicalCon.save();
    return createResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Get All Medical Conditions
const getAllMedicalCon = async (req, res, next) => {
  try {
    const medicalCon = await MedicalConditions.find();
    if (!medicalCon) return queryErrorRelatedResponse(req, res, 404, "Medical Conditions not found.");
    successResponse(res, medicalCon);
  } catch (err) {
    next(err);
  }
};

//Update Medical Conditions
const updateMedicalCon = async (req, res, next) => {
  try {
    const { title } = req.body;
    const medicalCon = await MedicalConditions.findById(req.params.id);
    if (!medicalCon) return queryErrorRelatedResponse(req, res, 404, "Medical Condition not found.");

    medicalCon.title = title;
    const result = await medicalCon.save();
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Update Status Medical Conditions
const updateMedicalConStatus = async (req, res, next) => {
  try {
    // Convert string is into Object id
    const id = new mongoose.Types.ObjectId(req.params.id);
    const medicalCon = await MedicalConditions.findById(id);
    if (!medicalCon) return queryErrorRelatedResponse(req, res, 404, "Medical Condition not found.");

    medicalCon.status = !medicalCon.status;
    const result = await medicalCon.save();
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Delete Single Medical Conditions
const deleteMedicalCon = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const medicalCon = await MedicalConditions.findById(id);
    if (!medicalCon) return queryErrorRelatedResponse(req, res, 404, "Medical Condition not found.");

    await MedicalConditions.deleteOne({ _id: id });
    deleteResponse(res, "Medical Condition deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Delete Multiple Medical Conditions
const deleteMultMedicalCon = async (req, res, next) => {
  try {
    const { Ids } = req.body;
    Ids.map(async (item) => {
      const id = new mongoose.Types.ObjectId(item);
      await MedicalConditions.deleteOne({ _id: id });
    });
    deleteResponse(res, "All selected records deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Get Active Medical Conditions
const getActiveMedicalCon = async (req, res, next) => {
  try {
    const medicalCon = await MedicalConditions.find({ status: true });
    if (!medicalCon) return queryErrorRelatedResponse(req, res, 404, "Medical Conditions not found.");
    successResponse(res, medicalCon);
  } catch (err) {
    next(err);
  }
};

//Update Terms &  Conditions
const updatetc = async (req, res, next) => {
  try {
    const { description } = req.body;
    const tc = await TC.findById(req.params.id);
    if (!tc) return queryErrorRelatedResponse(req, res, 404, "Terms & Condition not found.");

    tc.description = description;
    const result = await tc.save();
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addMedicalCon,
  getAllMedicalCon,
  updateMedicalCon,
  deleteMedicalCon,
  deleteMultMedicalCon,
  updateMedicalConStatus,
  getActiveMedicalCon,
  updatetc,
};
