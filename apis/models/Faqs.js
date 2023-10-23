const mongoose = require("mongoose");

const FaqsSchema = mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question is required."],
  },
  answer: {
    type: String,
    required: [true, "Answer is required."],
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

module.exports = mongoose.model("faqs", FaqsSchema);
