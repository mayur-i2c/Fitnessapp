const mongoose = require("mongoose");

const helpSchema = mongoose.Schema({
  userid: {
    type: String,
    required: [true, "UserId is required."],
  },
  question: {
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

module.exports = mongoose.model("helpcenter", helpSchema);
