const mongoose = require("mongoose");

const GeneralSettingsSchema = mongoose.Schema({
  fcm_token: {
    type: String,
    required: [true, "FCM Token is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("general_setting", GeneralSettingsSchema);
