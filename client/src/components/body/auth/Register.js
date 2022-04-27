import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notifications/Notification";
import {
  isEmpty,
  isEmail,
  isLength,
  isMatch,
} from "../../utils/validation/Validation";

const initialState = {
  name: "",
  email: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function Register() {
  const [teacher, setTeacher] = useState(initialState);

  const { name, email, password, cf_password, err, success } = teacher;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(name) || isEmpty(password))
      return setTeacher({
        ...teacher,
        err: "Please fill in all fields",
        success: "",
      });

    if (!isEmail(email))
      return setTeacher({ ...teacher, err: "Invalid emails", success: "" });

    if (isLength(password))
      return setTeacher({
        ...teacher,
        err: "Password must be at least 6 characters",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setTeacher({
        ...teacher,
        err: "Password did not match",
        success: "",
      });
    try {
      const res = await axios.post("/teacher/register", {
        name,
        email,
        password,
      });
      setTeacher({
        ...teacher,
        err: "",
        success: res.data.msg,
      });
    } catch (err) {
      err.response.data.msg &&
        setTeacher({
          ...teacher,
          err: err.response.data.msg,
          success: "",
        });
    }
  };

  return (
    <div className="login_page">
      <h2>
        <i className="fas fa-user-plus"></i>Register
      </h2>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            id="aneme"
            value={name}
            name="name"
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            placeholder="Enter email address"
            id="email"
            value={email}
            name="email"
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            id="password"
            value={password}
            name="password"
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <label htmlFor="cf_password">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            id="cf_password"
            value={cf_password}
            name="cf_password"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <button type="submit">Register</button>
        </div>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
