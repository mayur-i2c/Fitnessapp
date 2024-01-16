const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email Id is required."],
      unique: [true, "Email Id already exist."],
      trim: true,
    },
    password: {
      type: String,
    },
    mo_no: {
      type: String,
      default: null,
    },
    dob: {
      type: Number,
    },
    otp: {
      type: String,
      maxlength: [6, "OTP should be maximum six characters long."],
      default: "",
    },
    expireOtpTime: {
      type: Date,
      default: null,
    },
    sex: {
      type: String,
      default: "",
    },
    age: {
      type: String,
      default: "",
    },
    active_status: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "",
    },
    height_measure: {
      type: String,
      default: "",
    },
    c_weight: {
      type: String,
      default: "",
    },
    t_weight: {
      type: String,
      default: "",
    },
    cal: {
      type: String,
      default: "",
    },
    medical_condition: {
      type: Array,
      default: "",
    },
    remember_token: {
      type: String,
    },
    image: {
      type: String,
    },
    fcm_token: {
      type: String,
      default: "",
    },
    status: {
      type: Boolean,
      default: true,
    },
    created: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true, // Add this option to enable timestamps
  }
);

// Bcrypt password before save
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 12);
  }
  next();
});

module.exports = mongoose.model("user", UserSchema);
