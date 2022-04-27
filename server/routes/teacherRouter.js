const router = require("express").Router();
const teacherCtrl = require("../controllers/teacherCtrl");

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
//REGISTER Teacher
router.post("/register", teacherCtrl.register);
//Activation
router.post("/activation", teacherCtrl.activateEmail);
//Login
router.post("/login", teacherCtrl.login);
//Refresh token
router.post("/refresh_token", teacherCtrl.getAccessToken);
//Forgot password
router.post("/forgot", teacherCtrl.forgotPassword);
//Reset Password
router.post("/reset", auth, teacherCtrl.resetPassword);
//Get Teachers
router.get("/infor", auth, teacherCtrl.getTeacherInfor);
//Get all teachers
router.get("/all_infor", auth, authAdmin, teacherCtrl.getTeachersAllInfor);
//Logout
router.get("/logout", teacherCtrl.logout);
//Update teacher
router.patch("/update", auth, teacherCtrl.updateTeacher);
//Upsate role teacher
router.patch(
  "/update_role/:id",
  auth,
  authAdmin,
  teacherCtrl.updateTeachersRole
);
//Delete teacher
router.delete("/delete/:id", auth, authAdmin, teacherCtrl.deleteTeacher);

//Social Login
router.post("/google_login", teacherCtrl.googleLogin);
router.post("/facebook_login", teacherCtrl.facebookLogin);

module.exports = router;
