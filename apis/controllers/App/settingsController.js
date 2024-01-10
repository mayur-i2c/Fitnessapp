const MedicalConditions = require("../../models/MedicalConditions");
const TC = require("../../models/Tc");
const PrivacyPolicy = require("../../models/PrivacyPolicy");
const GeneralSettings = require("../../models/GeneralSettings");
const Notification = require("../../models/Notification");
const Faqs = require("../../models/Faqs");
const HelpCenter = require("../../models/HelpCenter");
const User = require("../../models/User");
const { sendMail } = require("../../helper/emailSender");
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

//Send Mail to Helpcenter
const SendHelpMail = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userid);
    if (!user) return queryErrorRelatedResponse(req, res, 401, "Invalid User!!");

    const newhelp = await new HelpCenter({
      userid: req.body.userid,
      question: req.body.question,
    });
    const helpcenter = await newhelp.save();

    sendMail({
      from: user.email,
      to: process.env.EMAIL_USER,
      sub: "Fitness - Help Center - Issue Report",
      htmlFile: "./emailTemplate/helpcenter.html",
      extraData: {
        username: user.name,
        useremail: user.email,
        usermo: user.mo_no,
        question: req.body.question,
      },
    });
    console.log(user.name);
    successResponse(res, "Your request has been send successfully. We will respond you as soon as possible.");
  } catch (err) {
    next(err);
  }
};

//Get All Notification
const getAllNotification = async (req, res, next) => {
  try {
    const cat = await Notification.find({ status: true });
    if (!cat) return queryErrorRelatedResponse(req, res, 404, "Notification not found.");
    successResponse(res, cat);
  } catch (err) {
    next(err);
  }
};

//Get General Settings
const getGeneralSettings = async (req, res, next) => {
  try {
    const cat = await GeneralSettings.find();
    if (!cat) return queryErrorRelatedResponse(req, res, 404, "Data not found.");
    successResponse(res, cat);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getAllMedicalCon,
  getTC,
  getPrivacyPolicy,
  getAllFaqs,
  SendHelpMail,
  getAllNotification,
  getGeneralSettings,
};
