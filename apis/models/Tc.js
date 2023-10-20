const mongoose = require("mongoose");

const TcSchema = mongoose.Schema({
  description: {
    type: String,
    required: [true, "Description is required."],
    default: "Terms & Conditions",
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("terms_conditions", TcSchema);
