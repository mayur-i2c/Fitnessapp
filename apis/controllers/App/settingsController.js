const MedicalConditions = require("../../models/MedicalConditions");
const TC = require("../../models/Tc");
const PrivacyPolicy = require("../../models/PrivacyPolicy");
const Faqs = require("../../models/Faqs");

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

//Get Medical Conditions
const getTC = async (req, res, next) => {
  try {
    const tc = await TC.find();
    if (!tc) return queryErrorRelatedResponse(req, res, 404, "Terms & Condition not found.");
    successResponse(res, tc);
  } catch (err) {
    next(err);
  }
};

//Get Privacy Policy
const getPrivacyPolicy = async (req, res, next) => {
  try {
    const tc = await PrivacyPolicy.find();
    if (!tc) return queryErrorRelatedResponse(req, res, 404, "Privacy Policy not found.");
    successResponse(res, tc);
  } catch (err) {
    next(err);
  }
};

//Get Active FAQs
const getAllFaqs = async (req, res, next) => {
  try {
    const faq = await Faqs.find({ status: true });
    if (!faq) return queryErrorRelatedResponse(req, res, 404, "FAQs not found.");
    successResponse(res, faq);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllMedicalCon,
  getTC,
  getPrivacyPolicy,
  getAllFaqs,
};
