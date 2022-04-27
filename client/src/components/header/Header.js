import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Header() {
  const auth = useSelector((state) => state.auth);

  const { teacher, isLogged } = auth;

  const handleLogout = async () => {
    try {
      await axios.get("/teacher/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/login";
    } catch (err) {
      window.location.href = "/login";
    }
  };

  const teacherLink = () => {
    return (
      <li className="drop-nav">
        <Link to="#" className="avatar">
          <img src={teacher.avatar} alt="" /> {teacher.name}
        </Link>

        <ul className="dropdown">
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </li>
    );
  };
  const transform = {
    transform: isLogged ? "translateY(-5px)" : 0,
  };
  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/">Balplatform</Link>
        </h1>
      </div>
      <ul style={transform}>
        {isLogged ? (
          teacherLink()
        ) : (
          <li>
            <Link to="/login">
              <i className="fas fa-user"></i>Sign in
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
