const mongoose = require("mongoose");

const NutritionSettingsSchema = mongoose.Schema(
  {
    protein: {
      type: String,
      required: [true, "Protein is required."],
      default: 20,
    },
    carb: {
      type: String,
      required: [true, "Carb is required."],
      default: 50,
    },
    fat: {
      type: String,
      required: [true, "Fat is required."],
      default: 30,
    },
    fibre: {
      type: String,
      required: [true, "Fibre is required."],
      default: 30,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("nutritionSettings", NutritionSettingsSchema);
