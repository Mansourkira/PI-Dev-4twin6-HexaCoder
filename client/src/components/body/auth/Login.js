import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notifications/Notification";
import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

function Login() {
  const [teacher, setTeacher] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const { email, password, err, success } = teacher;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/teacher/login", { email, password });
      setTeacher({
        ...teacher,
        err: "",
        success: res.data.msg,
      });
      localStorage.setItem("firstLogin", true);
      dispatch(dispatchLogin());
    } catch (err) {
      err.response.data.msg &&
        setTeacher({
          ...teacher,
          err: err.response.data.msg,
          success: "",
        });
    }
  };
  const responseGoogle = async (response) => {
    try {
      const res = await axios.post("/teacher/google_login", {
        tokenId: response.tokenId,
      });

      setTeacher({
        ...teacher,
        err: "",
        success: res.data.msg,
      });
      localStorage.setItem("firstLogin", true);
      dispatch(dispatchLogin());
      history.push("/FrontHeader");
    } catch (err) {
      err.response.data.msg &&
        setTeacher({
          ...teacher,
          err: err.response.data.msg,
          success: "",
        });
    }
  };
  const responseFacebook = async (response) => {
    try {
      const { accessToken, userID } = response;
      const res = await axios.post("/teacher/facebook_login", {
        accessToken,
        userID,
      });

      setTeacher({
        ...teacher,
        err: "",
        success: res.data.msg,
      });
      localStorage.setItem("firstLogin", true);
      dispatch(dispatchLogin());
      history.push("/FrontHeader");
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
        <i className="fa fa-american-sign-language-interpreting"></i> Login
      </h2>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}

      <form onSubmit={handleSubmit}>
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

        <div className="row">
          <button type="submit">Login</button>
          <Link to="/forgot_password">Forgot your password?</Link>
        </div>
      </form>

      <div className="hr">Or Login With</div>

      <div className="social">
        <GoogleLogin
          clientId="445662560917-fd8tln17tv60hthoksql81lj112c963u.apps.googleusercontent.com"
          buttonText="Login with google"
          onSuccess={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />

        <FacebookLogin
          appId="1206868563051705"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
        />
      </div>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
