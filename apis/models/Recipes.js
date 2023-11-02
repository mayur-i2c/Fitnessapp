const mongoose = require("mongoose");

const RecipesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    image: {
      type: String,
      required: [true, "Image is required."],
    },
    status: {
      type: Boolean,
      default: true,
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "recipesSubCat",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("recipes", RecipesSchema);
