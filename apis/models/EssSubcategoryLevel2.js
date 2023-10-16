const mongoose = require("mongoose");

const EssSubcategoryLevel2Schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    icon: {
      type: String,
      required: [true, "Icon is required."],
    },
    image_video: {
      type: String,
      required: [true, "Image or Video is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
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

module.exports = mongoose.model("essSubCatlevel2", EssSubcategoryLevel2Schema);
