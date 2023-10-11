const MedicalConditions = require("../../models/MedicalConditions");
const {
  createResponse,
  successResponse,
  queryErrorRelatedResponse,
  deleteResponse,
} = require("../../helper/sendResponse");

//Get Active Medical Conditions
const getAllMedicalCon = async (req, res, next) => {
  try {
    const medicalCon = await MedicalConditions.find({ status: true });
    if (!medicalCon) return queryErrorRelatedResponse(req, res, 404, "Medical Conditions not found.");
    successResponse(res, medicalCon);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllMedicalCon,
};
