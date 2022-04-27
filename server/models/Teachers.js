const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please enter your email!"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password!"],
    },
    role: {
      type: Number,
      default: 0, //0 0 = teacher , 1 = admin
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dckkojyep/image/upload/v1648661505/avatar/t67net4bvcfn5q86z2hy.gif",
    },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Teachers", teacherSchema);
