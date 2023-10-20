const mongoose = require("mongoose");

const ReelsSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  image: {
    type: String,
    required: [true, "Image is required."],
  },
  video: {
    type: String,
    required: [true, "Video is required."],
  },
  status: {
    type: Boolean,
    default: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("reels", ReelsSchema);
