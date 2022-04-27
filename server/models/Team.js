const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const TeamSchema = new Schema(
  {
    team_Name: String,

    // One To Many [Team to Student]
    membres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    // One To One [Team To Project]
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Team || mongoose.model("Team", TeamSchema);
