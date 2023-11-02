const mongoose = require("mongoose");

const EssSubcategoryLevel1Schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
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
        ref: "essSubCatlevel2",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("essSubCatlevel1", EssSubcategoryLevel1Schema);
