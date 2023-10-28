const mongoose = require("mongoose");

const MealSettingsSchema = mongoose.Schema(
  {
    breakfast: {
      type: String,
      required: [true, "Breakfast percent is required."],
      default: 20,
    },
    morning_snack: {
      type: String,
      required: [true, "Morning snack percent is required."],
      default: 50,
    },
    lunch: {
      type: String,
      required: [true, "Lunch percent is required."],
      default: 20,
    },
    evening_snack: {
      type: String,
      required: [true, "Evening snack percent is required."],
      default: 20,
    },
    dinner: {
      type: String,
      required: [true, "Dinner percent is required."],
      default: 20,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("mealSettings", MealSettingsSchema);
