const { formatDate } = require("../helper/formatterFiles");
const TrackedMeal = require("../models/TrackedMeal");

const getMealwiseRecipes = async (date, userid, mealtime) => {
  try {
    const recipes = await TrackedMeal.find({
      date: formatDate(date),
      userid: userid,
      mealtime: mealtime,
    }).populate({
      path: "subcatid",
      model: "recipesSubCat",
      populate: {
        path: "calData.unit",
        model: "recipeUnits", // Replace with your actual Unit model name
      },
    });
    // Use .lean() to obtain plain JavaScript objects
    console.error("recipes:", recipes);
    return recipes;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

module.exports = { getMealwiseRecipes };
