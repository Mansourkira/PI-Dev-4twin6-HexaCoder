const express = require("express");
const Class = require("../models/Class");
const Student = require("../models/Student");
const router = express.Router();
const TeamSchema = require("../Models/Team");

router.get("/teams", async (req, res) => {
  try {
    const Team = await TeamSchema.find({});
    res.send({ Team });
  } catch (err) {
    res.status(404).send({ error: err });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const Team = await TeamSchema.findById(req.params.id);
    res.send({ Team });
  } catch (err) {
    res.status(404).send({ error: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const Team = await TeamSchema.find({});
    const TeamN = {
      team_Name: "",
    };
    //    res.send({Team});
    Team.forEach((element) => {
      TeamN.team_Name = element.team_Name;
    });

    res.send({ Team });
  } catch (err) {
    res.status(404).send({ error: err });
  }
});

//Get Class By Team
router.get("/class/:id", async (req, res) => {
  try {
    const Team = await TeamSchema.findById(req.params.id);
    const membres = Team.membres;
    console.log(membres);

    //     const Student = await StudentSchema.findById();
    const student = await Student.findById(membres.slice(0, 1).shift());
    //   clas = student.EnrolledClass

    const classN = await Class.findById(student.EnrolledClass);
    res.send({ classN });
  } catch (err) {
    res.status(404).send({ error: err });
  }
});

router.post("/", async (req, res) => {
  try {
    var Team = new TeamSchema({ team_Name: req.body.team_Name });
    //   var team_Name = {team_Name : req.body.team_Name};
    //    Team.team_Name = team_Name;
    Team.membres = req.body.membres;

    Team.save();
    console.log(Team);
    res.send({ Team });
    //       ObjectId()
  } catch (err) {
    res.status(404).send({ error: err });
  }
});

router.get("/students/:id", async (req, res) => {
  try {
    s = [];
    const Team = await TeamSchema.findById(req.params.id);
    // res.send(Team.membres);
    for (let index = 0; index < Object.keys(Team.membres).length; index++) {
      const element = await Student.findById(Team.membres[index]);
      console.log(element);
      s.push(element);
    }
    json = { ...s };

    res.send(s);
  } catch (err) {
    res.status(404).send({ error: err });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const Team = await TeamSchema.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: "The Team was updated" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const removeTeam = await TeamSchema.findByIdAndRemove(req.params.id);
    res.send({ message: "The Team was removed" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});
module.exports = router;
