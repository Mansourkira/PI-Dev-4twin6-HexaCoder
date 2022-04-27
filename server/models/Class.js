const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema(
  {
    ClassName: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Class", ClassSchema);
