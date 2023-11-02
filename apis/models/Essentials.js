const mongoose = require("mongoose");

const EssentialsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    image: {
      type: String,
      required: [true, "Image is required."],
    },
    status: {
      type: Boolean,
      default: true,
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "essSubCatlevel1",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("essentials", EssentialsSchema);
