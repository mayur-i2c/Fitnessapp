const mongoose = require("mongoose");

const helpSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
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
