const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userShema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "traveller",
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userShema);
