import React from "react";
import { Link } from "react-router-dom";
import SideBar from "./../../../Backoffice/SideBar";
import NavBar from "./../../../Backoffice/NavBar";
function NotFound() {
  return (
    <body className="g-sidenav-show  bg-gray-200">
      <SideBar></SideBar>

      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <div class="container-fluid py-4">
          <div class="row">
            <NavBar></NavBar>
            <div>
              <i id="err-icon" className="fa fa-exclamation-circle"></i>
              <h1>404 Not Found!</h1>
              <p>The file or directory you are looking for isn't here!</p>
              <Link to="/profile">Refresh page</Link>
            </div>
          </div>
        </div>
      </main>
    </body>
  );
}

export default NotFound;
