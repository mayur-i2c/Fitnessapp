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
    cal: {
      type: String,
      required: [true, "Calory is required."],
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

module.exports = mongoose.model("recipesSubCat", RecipesSubCatSchema);
