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

//Add Privay Policy
const addtc = async (req, res, next) => {
  try {
    const { description } = req.body;
    const newtc = await TC.create({
      description,
    });
    const result = await newtc.save();
    return createResponse(res, result);
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

//Get Terms &  Conditions
const gettc = async (req, res, next) => {
  try {
    const tc = await TC.find();
    if (!tc) return queryErrorRelatedResponse(req, res, 404, "Terms & Conditions not found.");
    successResponse(res, tc);
  } catch (err) {
    next(err);
  }
};

//Add Privay Policy
const addPrivacyPolicy = async (req, res, next) => {
  try {
    const { description } = req.body;
    const newpp = await PrivacyPolicy.create({
      description,
    });
    const result = await newpp.save();
    return createResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Update Terms &  Conditions
const updatepolicy = async (req, res, next) => {
  try {
    const { description } = req.body;
    const pp = await PrivacyPolicy.findById(req.params.id);
    if (!pp) return queryErrorRelatedResponse(req, res, 404, "Terms & Condition not found.");

    pp.description = description;
    const result = await pp.save();
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Get Terms &  Conditions
const getpolicy = async (req, res, next) => {
  try {
    const pp = await PrivacyPolicy.find();
    if (!pp) return queryErrorRelatedResponse(req, res, 404, "Privacy Policy not found.");
    successResponse(res, pp);
  } catch (err) {
    next(err);
  }
};

//Add FAQs
const addfaqs = async (req, res, next) => {
  try {
    const { question, answer } = req.body;
    const newFaqs = await Faqs.create({
      question,
      answer,
    });
    const result = await newFaqs.save();
    return createResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Get All FAQs
const getAllFaqs = async (req, res, next) => {
  try {
    const faq = await Faqs.find();
    if (!faq) return queryErrorRelatedResponse(req, res, 404, "FAQs not found.");
    successResponse(res, faq);
  } catch (err) {
    next(err);
  }
};

//Update FAQs
const updateFaq = async (req, res, next) => {
  try {
    const { question, answer } = req.body;
    const faqs = await Faqs.findById(req.params.id);
    if (!faqs) return queryErrorRelatedResponse(req, res, 404, "FAQs not found.");

    faqs.question = question;
    faqs.answer = answer;
    const result = await faqs.save();
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Update FAQs Status
const updateFaqStatus = async (req, res, next) => {
  try {
    // Convert string is into Object id
    const id = new mongoose.Types.ObjectId(req.params.id);
    const faq = await Faqs.findById(id);
    if (!faq) return queryErrorRelatedResponse(req, res, 404, "FAQs not found.");

    faq.status = !faq.status;
    const result = await faq.save();
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Delete Single FAQ
const deletefaq = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const faq = await Faqs.findById(id);
    if (!faq) return queryErrorRelatedResponse(req, res, 404, "FAQs not found.");

    await Faqs.deleteOne({ _id: id });
    deleteResponse(res, "FAQ deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Delete Multiple FAQs
const deleteMultFaq = async (req, res, next) => {
  try {
    const { Ids } = req.body;
    Ids.map(async (item) => {
      const id = new mongoose.Types.ObjectId(item);
      await Faqs.deleteOne({ _id: id });
    });
    deleteResponse(res, "All selected records deleted successfully.");
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
  gettc,
  addPrivacyPolicy,
  updatepolicy,
  getpolicy,
  addtc,
  addfaqs,
  getAllFaqs,
  updateFaq,
  updateFaqStatus,
  deleteMultFaq,
  deletefaq,
};
