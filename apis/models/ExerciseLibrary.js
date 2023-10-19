const mongoose = require("mongoose");

const ExerciseLibrarySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    subtitle: {
      type: String,
      required: [true, "Subtitle is required."],
    },
    icon: {
      type: String,
      required: [true, "Icon is required."],
    },
    video: {
      type: String,
      required: [true, "Video is required."],
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

module.exports = mongoose.model("exerciseLibrary", ExerciseLibrarySchema);
