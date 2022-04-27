const Teachers = require("../models/Teachers");
const Project = require("../models/Project");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const sendMail = require("./sendMail");
const { OAuth2 } = google.auth;
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);
const { CLIENT_URL } = process.env;
const fetch = require("node-fetch");

const teacherCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid emails" });

      const teacher = await Teachers.findOne({ email });
      if (teacher)
        return res.status(400).json({ msg: "This email already exists" });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters" });

      const passwordHash = await bcrypt.hash(password, 12);

      const newTeacher = {
        name,
        email,
        password: passwordHash,
      };

      const activation_token = createActivationToken(newTeacher);

      const url = `${CLIENT_URL}/teacher/activate/${activation_token}`;
      sendMail(email, url, "Verify your email address");

      res.json({
        msg: "Register Sucess! Please activate your email to start ",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const teacher = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const { name, email, password } = teacher;

      const check = await Teachers.findOne({ email });
      if (check)
        return res.status(400).json({ msg: "This email already exists " });

      const newTeacher = new Teachers({
        name,
        email,
        password,
      });
      await newTeacher.save();

      res.json({ msg: "Account has been activated " });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const teacher = await Teachers.findOne({ email });
      if (!teacher)
        return res.status(400).json({ msg: "This email does not exist" });

      const isMatch = await bcrypt.compare(password, teacher.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect" });
      const refresh_token = createRefreshToken({ id: teacher._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/teacher/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
      });

      res.json({ msg: "Login success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, teacher) => {
        if (err) return res.status(400).json({ msg: "Please login now!" });

        const access_token = createAccessToken({ id: teacher.id });
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const teacher = await Teachers.findOne({ email });
      if (!teacher)
        return res.status(400).json({ msg: "This email does not exist " });

      const access_token = createAccessToken({ id: teacher._id });
      const url = `${CLIENT_URL}/teacher/reset/${access_token}`;

      sendMail(email, url, "Reset your password ");
      res.json({ msg: "Re-send the password, please check your email " });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;

      const passwordHash = await bcrypt.hash(password, 12);

      await Teachers.findOneAndUpdate(
        { _id: req.teacher.id },
        {
          password: passwordHash,
        }
      );

      res.json({ msg: "Password successfuly changed! " });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getTeacher: async (req, res) => {
    try {
      const teacher = await Teachers.find({}).select("-password");
      res.send({ teacher });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getbyid: async (req, res) => {
    try {
      const teacher = await Teachers.findById(req.params.id).select(
        "-password"
      );
      res.send({ teacher });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addteacher: async (req, res) => {
    try {
      const newTeacher = await Teachers.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.send({ newTeacher });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateteacher: async (req, res) => {
    try {
      const updatedTeacher = await Teachers.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.send({ message: "The teacher was updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteteacher: async (req, res) => {
    try {
      const removeTeacher = await Teachers.findByIdAndRemove(req.params.id);
      res.send({ message: "The teacher was removed" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getTeacherInfor: async (req, res) => {
    try {
      const teacher = await Teachers.findById(req.teacher.id).select(
        "-password"
      );
      res.json(teacher);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getTeachersAllInfor: async (req, res) => {
    try {
      const teachers = await Teachers.find().select("-password");

      res.json(teachers);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/teacher/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateTeacher: async (req, res) => {
    try {
      const { name, avatar } = req.body;
      await Teachers.findOneAndUpdate(
        { _id: req.teacher.id },
        {
          name,
          avatar,
        }
      );

      res.json({ msg: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateTeachersRole: async (req, res) => {
    try {
      const { role } = req.body;

      await Teachers.findOneAndUpdate(
        { _id: req.params.id },
        {
          role,
        }
      );

      res.json({ msg: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getprojects: async (req, res) => {
    try {
      const projects = await Project.findById(req.params.id);
      res.send({ projects });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteTeacher: async (req, res) => {
    try {
      await Teachers.findByIdAndDelete(req.params.id);

      res.json({ msg: "Deleted Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  googleLogin: async (req, res) => {
    try {
      const { tokenId } = req.body;

      const verify = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.MAILING_SERVICE_CLIENT_ID,
      });

      const { email_verified, email, name, picture } = verify.payload;

      const password = email + process.env.GOOGLE_SECRET;

      const passwordHash = await bcrypt.hash(password, 12);

      if (!email_verified)
        return res.status(400).json({ msg: "Email Verfication failed." });

      const teacher = await Teachers.findOne({ email });
      if (teacher) {
        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch)
          return res.status(400).json({ msg: "Password is incorrect" });

        const refresh_token = createRefreshToken({ id: teacher._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/teacher/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
        });

        res.json({ msg: "Login success" });
      } else {
        const newTeacher = new Teachers({
          name,
          email,
          password: passwordHash,
          avatar: picture,
        });
        await newTeacher.save();

        const refresh_token = createRefreshToken({ id: newTeacher._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/teacher/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
        });

        res.json({ msg: "Login success" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  facebookLogin: async (req, res) => {
    try {
      const { accessToken, userID } = req.body;

      const URL = `https://graph.facebook.com/v4.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

      const data = await fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          return res;
        });

      const { email, name, picture } = data;

      const password = email + process.env.FACEBOOK_SECRET;

      const passwordHash = await bcrypt.hash(password, 12);

      const teacher = await Teachers.findOne({ email });

      if (teacher) {
        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch)
          return res.status(400).json({ msg: "Password is incorrect" });

        const refresh_token = createRefreshToken({ id: teacher._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/teacher/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
        });

        res.json({ msg: "Login success" });
      } else {
        const newTeacher = new Teachers({
          name,
          email,
          password: passwordHash,
          avatar: picture.data.url,
        });
        await newTeacher.save();

        const refresh_token = createRefreshToken({ id: newTeacher._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/teacher/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
        });

        res.json({ msg: "Login success" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {});
};

module.exports = teacherCtrl;
