const mongoose = require("mongoose");

const RecipesSubCatSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    image: {
      type: String,
      required: [true, "Image is required."],
    },
    calData: [
      {
        unit: String,
        cal: Number,
        qty: Number,
        protein: Number,
        fat: Number,
        carb: Number,
        fiber: Number,
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("recipesSubCat", RecipesSubCatSchema);
