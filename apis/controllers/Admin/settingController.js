const MedicalConditions = require("../../models/MedicalConditions");
const TC = require("../../models/Tc");
const PrivacyPolicy = require("../../models/PrivacyPolicy");
const GeneralSettings = require("../../models/GeneralSettings");
const Faqs = require("../../models/Faqs");
const NutritionSettings = require("../../models/NutritionSettings");
const MealSettings = require("../../models/MealSettings");
const RecipeUnits = require("../../models/RecipeUnits");

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

//Add Nutrition Settings
const addNutritionSettings = async (req, res, next) => {
  try {
    const { protein, carb, fat, fibre } = req.body;
    const newpp = await NutritionSettings.create({
      protein,
      carb,
      fat,
      fibre,
    });
    const result = await newpp.save();
    return createResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Update Nutrition Settings
const updateNutritionSettings = async (req, res, next) => {
  try {
    const { protein, carb, fat, fibre } = req.body;
    const nutrition = await NutritionSettings.findById(req.params.id);
    if (!nutrition) return queryErrorRelatedResponse(req, res, 404, "Nutrition Settings not found.");
    const proteinNum = Number(protein);
    const carbNum = Number(carb);
    const fatNum = Number(fat);
    const sum = proteinNum + carbNum + fatNum;

    if (sum !== 100) {
      return queryErrorRelatedResponse(req, res, 400, "Protein, carb, and fat must sum to 100.");
    }

    nutrition.protein = protein;
    nutrition.carb = carb;
    nutrition.fat = fat;
    nutrition.fibre = fibre;
    const result = await nutrition.save();
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Get Nutrition Settings
const getNutrition = async (req, res, next) => {
  try {
    const nutrition = await NutritionSettings.find();
    if (!nutrition) return queryErrorRelatedResponse(req, res, 404, "Nutrition Settings not found.");
    successResponse(res, nutrition);
  } catch (err) {
    next(err);
  }
};

//Add Meal Settings
const addMealSettings = async (req, res, next) => {
  try {
    const { breakfast, morning_snack, lunch, evening_snack, dinner } = req.body;
    const newMeal = await MealSettings.create({
      breakfast,
      morning_snack,
      lunch,
      evening_snack,
      dinner,
    });
    const result = await newMeal.save();
    return createResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Update Meal Settings
const updateMealSettings = async (req, res, next) => {
  try {
    const { breakfast, morning_snack, lunch, evening_snack, dinner } = req.body;
    const meal = await MealSettings.findById(req.params.id);
    if (!meal) return queryErrorRelatedResponse(req, res, 404, "Meal Settings not found.");
    const breakfastNum = Number(breakfast);
    const morning_snackNum = Number(morning_snack);
    const lunchNum = Number(lunch);
    const evening_snackNum = Number(evening_snack);
    const dinnerNum = Number(dinner);
    const sum = breakfastNum + morning_snackNum + lunchNum + evening_snackNum + dinnerNum;

    if (sum !== 100) {
      return queryErrorRelatedResponse(
        req,
        res,
        400,
        "Breakfast, Morning snack, Lunch, Evening Snack and Dinner must sum to 100."
      );
    }

    meal.breakfast = breakfastNum;
    meal.morning_snack = morning_snackNum;
    meal.lunch = lunchNum;
    meal.evening_snack = evening_snackNum;
    meal.dinner = dinnerNum;
    const result = await meal.save();
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Get Meal Settings
const getMeal = async (req, res, next) => {
  try {
    const meal = await MealSettings.find();
    if (!meal) return queryErrorRelatedResponse(req, res, 404, "Meal Settings not found.");
    successResponse(res, meal);
  } catch (err) {
    next(err);
  }
};

//Add Recipe Units
const addRecipeUnits = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newUnit = await RecipeUnits.create({
      name,
    });
    const result = await newUnit.save();
    return createResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Get All Recipe Units
const getAllRecipeUnits = async (req, res, next) => {
  try {
    const units = await RecipeUnits.find();
    if (!units) return queryErrorRelatedResponse(req, res, 404, "Recipe Units not found.");
    successResponse(res, units);
  } catch (err) {
    next(err);
  }
};

//Update Recipe Units
const updateRecipeUnits = async (req, res, next) => {
  try {
    const { name } = req.body;
    const unit = await RecipeUnits.findById(req.params.id);
    if (!unit) return queryErrorRelatedResponse(req, res, 404, "Recipe Units not found.");

    unit.name = name;
    const result = await unit.save();
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Update Recipe Units Status
const updateRecipeUnitsStatus = async (req, res, next) => {
  try {
    // Convert string is into Object id
    const id = new mongoose.Types.ObjectId(req.params.id);
    const unit = await RecipeUnits.findById(id);
    if (!unit) return queryErrorRelatedResponse(req, res, 404, "Recipe Units not found.");

    unit.status = !unit.status;
    const result = await unit.save();
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Delete Single Recipe Units
const deleteRecipeUnit = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const unit = await RecipeUnits.findById(id);
    if (!unit) return queryErrorRelatedResponse(req, res, 404, "Recipe Units not found.");

    await RecipeUnits.deleteOne({ _id: id });
    deleteResponse(res, "Recipe Unit deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Delete Multiple Recipe Units
const deleteMultRecipeUnit = async (req, res, next) => {
  try {
    const { Ids } = req.body;
    Ids.map(async (item) => {
      const id = new mongoose.Types.ObjectId(item);
      await RecipeUnits.deleteOne({ _id: id });
    });
    deleteResponse(res, "All selected records deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Add General Settings
const addGeneralSettings = async (req, res, next) => {
  try {
    const { fcm_token, email, password } = req.body;
    const newpp = await GeneralSettings.create({
      fcm_token,
      email,
      password,
    });
    const result = await newpp.save();
    return createResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Update General Settings
const updateGeneralSetting = async (req, res, next) => {
  try {
    const { fcm_token, email, password } = req.body;
    const pp = await GeneralSettings.findById(req.params.id);
    if (!pp) {
      const settings = await GeneralSettings.create({
        fcm_token,
        email,
        password,
      });
      let result = await settings.save();
      return successResponse(res, result);
    } else {
      pp.fcm_token = fcm_token;
      pp.email = email;
      pp.password = password;
      let result = await pp.save();
      return successResponse(res, result);
    }

    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Get  General Settings
const getGeneralSettings = async (req, res, next) => {
  try {
    const pp = await GeneralSettings.find();
    if (!pp) return queryErrorRelatedResponse(req, res, 404, "Data not found.");
    successResponse(res, pp);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getGeneralSettings,
  addGeneralSettings,
  updateGeneralSetting,
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
  addNutritionSettings,
  updateNutritionSettings,
  getNutrition,
  addMealSettings,
  updateMealSettings,
  getMeal,
  addRecipeUnits,
  getAllRecipeUnits,
  updateRecipeUnits,
  updateRecipeUnitsStatus,
  deleteRecipeUnit,
  deleteMultRecipeUnit,
};
