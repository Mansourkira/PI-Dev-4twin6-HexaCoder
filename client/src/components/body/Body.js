import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ActivationEmail from "./auth/ActivationEmail";
import ForgotPass from "../body/auth/ForgotPassword";
import ResetPass from "../body/auth/ResetPassword";
import NotFound from "../utils/NotFound/NotFound";
import Profile from "../body/profile/Profile";
import EditTeacher from "./profile/EditTeacher";
import { useSelector } from "react-redux";
import AdminDash from "../../Backoffice/AdminDash";
import Header from "../../FrontOffice/Header";

function Body() {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin } = auth;
  return (
    <section>
      <Switch>
        <Route
          path="/login"
          component={isLogged ? (isAdmin ? AdminDash : Header) : Login}
          exact
        />
        <Route
          path="/register"
          component={isLogged ? NotFound : Register}
          exact
        />
        <Route
          path="/forgot_password"
          component={isLogged ? NotFound : ForgotPass}
          exact
        />
        <Route
          path="/teacher/reset/:token"
          component={isLogged ? NotFound : ResetPass}
          exact
        />
        <Route
          path="/teacher/activate/:activation_token"
          component={ActivationEmail}
          exact
        />
        <Route path="/profile" component={isLogged ? Profile : Profile} exact />
        <Route
          path="/edit_teacher/:id"
          component={isAdmin ? EditTeacher : NotFound}
          exact
        />
      </Switch>
    </section>
  );
}

export default Body;
