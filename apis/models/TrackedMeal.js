const mongoose = require("mongoose");

const TrackedMealSchema = mongoose.Schema(
  {
    userid: {
      type: String,
      required: [true, "Name is required."],
    },
    date: {
      type: Date,
      required: [true, "Date is required."],
    },
    mealime: {
      type: String,
      required: [true, "Meal Time is required."], // 1-Breakfast, 2- Morning Snack, 3-Lunch, 4-Evening Snacks, 5- Dinner
    },
    subcatid: {
      type: String,
      required: [true, "Sub-Category is required."],
    },
    qty: {
      type: String,
      required: [true, "Quantity is required."],
    },
    unitid: {
      type: String,
      required: [true, "Unit is required."],
    },
    protine: {
      type: String,
      required: [true, "Protine is required."],
    },
    carbs: {
      type: String,
      required: [true, "Carbs is required."],
    },
    fats: {
      type: String,
      required: [true, "Fats is required."],
    },
    fiber: {
      type: String,
      required: [true, "Image is required."],
    },
    cal: {
      type: String,
      required: [true, "Calory is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("trackedMeal", TrackedMealSchema);
