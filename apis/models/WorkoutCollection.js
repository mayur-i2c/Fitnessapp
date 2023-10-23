const mongoose = require("mongoose");

const WorkoutCollectionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    image: {
      type: String,
      required: [true, "Image is required."],
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

module.exports = mongoose.model("workoutCollection", WorkoutCollectionSchema);
