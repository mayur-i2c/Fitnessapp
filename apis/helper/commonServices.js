const { formatDate } = require("../helper/formatterFiles");
const TrackedMeal = require("../models/TrackedMeal");
const CalCronData = require("../models/CalCronData");

const getMealTimewiseRecipes = async (date, userid, mealtime) => {
  try {
    const recipes = await TrackedMeal.find({
      date: formatDate(date),
      userid: userid,
      mealime: mealtime,
    })
      .populate({
        path: "subcatid",
        model: "recipesSubCat",
        populate: {
          path: "calData.unit",
          model: "recipeUnits", // Replace with your actual Unit model name
        },
      })
      .lean();
    // Use .lean() to obtain plain JavaScript objects

    // Calculate the sum of "cal" values
    const totalUsedCalories = recipes.reduce((totalCalories, recipe) => {
      return totalCalories + parseFloat(recipe.cal);
    }, 0);

    const lastResponse = {
      totalUsedCalories: totalUsedCalories,
      recipes: recipes,
    };
    return lastResponse;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const AddDailyCalCronData = () => {
  const newCal = CalCronData.create({
    userId: "123",
    cal: "1000",
    date: new Date(),
  });
  const result = CalCronData.save();
  return result;
};

module.exports = { getMealTimewiseRecipes, AddDailyCalCronData };
