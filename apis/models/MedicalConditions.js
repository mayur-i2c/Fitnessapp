const mongoose = require("mongoose");

const MedicalConditionSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
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

module.exports = mongoose.model("medical_conditions", MedicalConditionSchema);
