const mongoose = require("mongoose");

const CalCronDataSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "UserId is required."],
    },
    cal: {
      type: String,
      required: [true, "Calory is required."],
    },
    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("calCronData", CalCronDataSchema);
