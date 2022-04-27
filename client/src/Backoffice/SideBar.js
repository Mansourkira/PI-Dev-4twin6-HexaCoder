import { Link } from "react-router-dom";
export default function SideBar() {
  return (
    <aside
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark"
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <i
          className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
        ></i>
        <a
          className="navbar-brand m-0"
          href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard "
          target="_blank"
        >
          <span className="ms-1 font-weight-bold text-white">
            Material Dashboard 2
          </span>
        </a>
      </div>

      <div
        className="collapse navbar-collapse  w-auto  max-height-vh-100"
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link text-white active bg-gradient-primary"
              href="BackofficeAdmin"
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">dashboard</i>
              </div>
              <span className="nav-link-text ms-1">projects</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white " href="simansour">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">table_view</i>
              </div>

              <span className="nav-link-text ms-1">Students</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white " href="classes">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">table_view</i>
              </div>
              <span className="nav-link-text ms-1">Clases</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link text-white" href="teams">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">
                  format_textdirection_r_to_l
                </i>
              </div>
              <span className="nav-link-text ms-1">Teams</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link text-white " href="teacher">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">
                  format_textdirection_r_to_l
                </i>
              </div>
              <span className="nav-link-text ms-1">Teacher</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white " href="projectsA">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">notifications</i>
              </div>
              <span className="nav-link-text ms-1">Projects Analyzed</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link text-white " href="./pages/sign-in.html">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">login</i>
              </div>
              <span className="nav-link-text ms-1">Sign In</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white " href="./pages/sign-up.html">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">assignment</i>
              </div>
              <span className="nav-link-text ms-1">Sign Up</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
