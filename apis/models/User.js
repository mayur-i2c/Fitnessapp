const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required : [true, "Name is required."]
    },
    email: {
        type: String,
        required: [true, "Email Id is required."],
        unique: [true, "Email Id already exist."],
        trim: true,
    },
    password: {
        type: String,
        // minlength: [5, "Password should be at least five characters long."],
        // maxlength: [16, "Password should be at maximum 16 characters long."],
        required: [true, "Password is required."],
    },
    mo_no:{
        type: String,
        required: [true, "Mobile no is required."],
        unique: [true, "Mobile number is already exists."],
        trim: true,
        validate: {
            validator: function (v) {
              return /^\d{10}$/.test(v);
            },
            message: `Mobile number is not valid.`,
          },
    },
    dob:{
        type: Date,
        required: [true, "Date of Birth is required."]
    },
    otp: {
        type: String,
        maxlength: [6, "OTP should be maximum six characters long."],
        default: "",
    },
    expireOtpTime:{
        type:Date,
        default:null
    },
    sex:{
        type: String,
        default: "",
    },
    age:{
        type: String,
        default: "",
    },
    active_status:{
        type: String,
        default: "",
    },
    height:{
        type: String,
        default: "",
    },
    c_weight: {
        type: String,
        default: "",
    },
    t_weight:{
        type: String,
        default: "",
    },
    medical_condition:{
        type: Array,
        default: "",
    },
    remember_token:{
        type: String
    },
    image:{
        type:String
    },
    created:{
        type:Date,
        default:Date.now()
    }
});

// Bcrypt password before save
UserSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 12);
    }
    next();
  });
  
  module.exports = mongoose.model("user", UserSchema);