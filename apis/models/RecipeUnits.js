const mongoose = require("mongoose");

const RecipeUnitsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("recipeUnits", RecipeUnitsSchema);
