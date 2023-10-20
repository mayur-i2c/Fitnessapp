const mongoose = require("mongoose");

const PrivacyPolicySchema = mongoose.Schema({
  description: {
    type: String,
    required: [true, "Description is required."],
    default: "Privacy Policy",
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("privacy_policy", PrivacyPolicySchema);
