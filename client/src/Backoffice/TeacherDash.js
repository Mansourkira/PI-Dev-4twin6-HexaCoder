import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Footer from "./footer";
import { useEffect } from "react";
import { useState } from "react";
import React from "react";
import axios from "axios";
import { useParams, useQuery } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import {
  PieSeries,
  Title,
  LineSeries,
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from "@devexpress/dx-react-chart-material-ui";
import Table from "./table";
import AddProjectForm from "./AddProjectForm";
export default function TeacherDash(props) {
  var id = useParams();
  console.log(id.id.slice(1, id.id.length));

  // var id=useParams()
  // console.log(id)
  const data = [
    { argument: "Monday", value: 30 },
    { argument: "Tuesday", value: 20 },
    { argument: "Wednesday", value: 10 },
    { argument: "Thursday", value: 50 },
    { argument: "Friday", value: 60 },
  ];
  const [chartdata, setchartdata] = useState([]);
  const [chartdata1, setchartdata1] = useState([]);
  const [chartdata2, setchartdata2] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState();
  const [projects, setProjects] = useState([]);

  const tab = [{ argument: "", value: 0 }];
  const tab2 = [{ argument: "", value: 0 }];
  const tab3 = [{ argument: "", value: 0 }];
  useEffect(() => {
    fetch("http://localhost:8095/votes/stats2")
      .then((res) => res.json())
      .then(
        (datachart) => {
          for (let i = 0; i < datachart.length; i++) {
            let o = {
              argument: datachart[i]._id.team.team_Name,
              value: datachart[i].total,
            };
            tab3.push(o);
          }
          setIsLoaded(true);
          setchartdata2(tab3);
        },
        (error) => {},
        console.log(chartdata2)
      );
  }, [setIsLoaded == true]);
  useEffect(() => {
    fetch("http://localhost:8095/projects/findAll")
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          let d = data.filter(
            (x) => x.teacher._id == id.id.slice(1, id.id.length)
          );
          setProjects(d);
          console.log(d);
        },
        (error) => {
          setIsLoaded(true);
          //setError(error);
        }
      );
  }, [setIsLoaded == true]);
  useEffect(() => {
    fetch("http://localhost:8095/votes/stats3")
      .then((res) => res.json())
      .then(
        (datachart) => {
          // console.log(datachart)
          for (let i = 0; i < datachart.length; i++) {
            //  console.log(datachart[i]._id.option)

            //   console.log(datachart[i].nb_qualified_project)

            let o = {
              argument: datachart[i]._id.option,
              value: datachart[i].nb_qualified_project,
            };
            //  console.log(o)
            tab.push(o);
            setIsLoaded(true);
          }

          setchartdata(tab);
        },
        (error) => {},
        console.log(chartdata)
      );
  }, [setIsLoaded == true]);
  useEffect(() => {
    fetch("http://localhost:8095/votes/stats1")
      .then((res) => res.json())
      .then(
        (datachart) => {
          for (let i = 0; i < datachart.length; i++) {
            let o = {
              argument:
                datachart[i]._id.month +
                "/" +
                datachart[i]._id.day +
                "/" +
                datachart[i]._id.year,
              value: datachart[i].total,
            };
            tab2.push(o);
          }
          setIsLoaded(true);
          setchartdata1(tab2);
        },
        (error) => {},
        console.log(chartdata1)
      );
  }, [setIsLoaded == true]);
  useEffect(() => {
    fetch("http://localhost:8095/votes/stats3")
      .then((res) => res.json())
      .then(
        (datachart) => {
          // console.log(datachart)
          for (let i = 0; i < datachart.length; i++) {
            //  console.log(datachart[i]._id.option)

            //   console.log(datachart[i].nb_qualified_project)

            let o = {
              argument: datachart[i]._id.option,
              value: datachart[i].nb_qualified_project,
            };
            //  console.log(o)
            tab.push(o);
            setIsLoaded(true);
          }

          setchartdata(tab);
        },
        (error) => {},
        console.log(chartdata)
      );
  }, []);
  const handleSubmit = (text) => (event) => {
    event.preventDefault();
    console.log(text);
    axios
      .put(`http://localhost:8095/projects/qualifyproject/` + text._id, {
        mode: "no-cors",
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    console.log("a");
    //  BrowserRouter.push("/dashboard")
  };
  return (
    <div>
      <div>
        <body className="g-sidenav-show  bg-gray-200">
          <SideBar></SideBar>

          <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
            <div class="container-fluid py-4">
              <div class="row">
                <NavBar></NavBar>
                <div class="row mt-4">
                  <div class="col-lg-4 col-md-6 mt-4 mb-4">
                    <div class="card z-index-2 ">
                      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                        <div class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                          <div class="chart">
                            <Paper>
                              <Chart data={chartdata}>
                                <ArgumentAxis></ArgumentAxis>
                                <ValueAxis></ValueAxis>
                                <BarSeries
                                  valueField="value"
                                  argumentField="argument"
                                />
                                <Title text="Number of Qualified Projects for Bal-projects Per Option" />
                              </Chart>
                            </Paper>
                          </div>
                        </div>
                      </div>
                      <div class="card-body">
                        <h6 class="mb-0 "></h6>
                        <p class="text-sm ">Last Campaign Performance</p>
                        <div class="dark horizontal">
                          <div class="d-flex ">
                            <i class="material-icons text-sm my-auto me-1">
                              schedule
                            </i>
                            <p class="mb-0 text-sm">
                              {" "}
                              campaign sent 2 days ago{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 mt-4 mb-4">
                    <div class="card z-index-2  ">
                      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                        <div class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1">
                          <div class="chart">
                            <Paper>
                              <Chart data={chartdata1}>
                                <ArgumentAxis></ArgumentAxis>
                                <ValueAxis></ValueAxis>
                                <LineSeries
                                  valueField="value"
                                  argumentField="argument"
                                />
                                <Title text="Number of Votes Per day" />
                              </Chart>
                            </Paper>
                          </div>
                        </div>
                      </div>
                      <div class="card-body">
                        <h6 class="mb-0 "> Daily Sales </h6>
                        <p class="text-sm ">
                          {" "}
                          (<span class="font-weight-bolder">+15%</span>)
                          increase in today sales.{" "}
                        </p>
                        <div class="dark horizontal">
                          <div class="d-flex ">
                            <i class="material-icons text-sm my-auto me-1">
                              schedule
                            </i>
                            <p class="mb-0 text-sm"> updated 4 min ago </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 mt-4 mb-3">
                    <div class="card z-index-2 ">
                      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                        <div class="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                          <div class="chart">
                            <Paper>
                              <Chart data={chartdata2}>
                                <ArgumentAxis></ArgumentAxis>
                                <ValueAxis></ValueAxis>
                                <BarSeries
                                  valueField="value"
                                  argumentField="argument"
                                />
                                <Title text="Number of Votes Per Team" />
                              </Chart>
                            </Paper>
                          </div>
                        </div>
                      </div>
                      <div class="card-body">
                        <h6 class="mb-0 ">Completed Tasks</h6>
                        <p class="text-sm ">Last Campaign Performance</p>
                        <div class="dark horizontal">
                          <div class="d-flex ">
                            <i class="material-icons text-sm my-auto me-1">
                              schedule
                            </i>
                            <p class="mb-0 text-sm">just updated</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="row mb-4">
                      <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
                        <div class="card">
                          <div class="card-header pb-0">
                            <div class="row">
                              <div class="col-lg-6 col-7">
                                <h6>Projects</h6>
                                <p class="text-sm mb-0">
                                  <i
                                    class="fa fa-check text-info"
                                    aria-hidden="true"
                                  ></i>
                                  <span class="font-weight-bold ms-1">
                                    30 done
                                  </span>{" "}
                                  this month
                                </p>
                              </div>
                              <div class="col-lg-6 col-5 my-auto text-end">
                                <div class="dropdown float-lg-end pe-4">
                                  <a
                                    class="cursor-pointer"
                                    id="dropdownTable"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i class="fa fa-ellipsis-v text-secondary"></i>
                                  </a>
                                  <ul
                                    class="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5"
                                    aria-labelledby="dropdownTable"
                                  >
                                    <li>
                                      <a
                                        class="dropdown-item border-radius-md"
                                        href="javascript:;"
                                      >
                                        Action
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item border-radius-md"
                                        href="javascript:;"
                                      >
                                        Another action
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item border-radius-md"
                                        href="javascript:;"
                                      >
                                        Something else here
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="card-body px-0 pb-2">
                            <div class="table-responsive">
                              <table class="table align-items-center mb-0">
                                <thead>
                                  <tr>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                      Project_name
                                    </th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                      Project_theme
                                    </th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                      Team
                                    </th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                      Project_orientaion
                                    </th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                      Qualified
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {projects.map((project) => (
                                    <tr>
                                      <td>{project.project_name}</td>
                                      <td>{project.project_theme}</td>

                                      <td>{project.project_option}</td>

                                      <td>
                                        {project.state_qualified.toString()}
                                      </td>
                                      <td>
                                        <a href={project.project_link}>
                                          Link to project
                                        </a>
                                      </td>
                                      <td>
                                        <button
                                          onClick={handleSubmit(project)}
                                          className="btn btn-success"
                                        >
                                          <i class="bi bi-check"></i>
                                        </button>{" "}
                                      </td>
                                    </tr>
                                  ))}

                                  <tr>
                                    <td>
                                      <div class="d-flex px-2 py-1">
                                        <div>
                                          <img
                                            src="../assets/img/small-logos/logo-atlassian.svg"
                                            class="avatar avatar-sm me-3"
                                            alt="atlassian"
                                          ></img>
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                          <h6 class="mb-0 text-sm">
                                            Add Progress Track
                                          </h6>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="avatar-group mt-2">
                                        <a
                                          href="javascript:;"
                                          class="avatar avatar-xs rounded-circle"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="bottom"
                                          title="Romina Hadid"
                                        ></a>
                                        <a
                                          href="javascript:;"
                                          class="avatar avatar-xs rounded-circle"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="bottom"
                                          title="Jessica Doe"
                                        ></a>
                                      </div>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                      <span class="text-xs font-weight-bold">
                                        {" "}
                                        $3,000{" "}
                                      </span>
                                    </td>
                                    <td class="align-middle">
                                      <div class="progress-wrapper w-75 mx-auto">
                                        <div class="progress-info">
                                          <div class="progress-percentage">
                                            <span class="text-xs font-weight-bold">
                                              10%
                                            </span>
                                          </div>
                                        </div>
                                        <div class="progress">
                                          <div
                                            class="progress-bar bg-gradient-info w-10"
                                            role="progressbar"
                                            aria-valuenow="10"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                          ></div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <script src="../assets/js/core/popper.min.js"></script>
                <script src="../assets/js/core/bootstrap.min.js"></script>
                <script src="../assets/js/plugins/perfect-scrollbar.min.js"></script>
                <script src="../assets/js/plugins/smooth-scrollbar.min.js"></script>
                <script src="../assets/js/plugins/chartjs.min.js"></script>
              </div>
            </div>
          </main>
          <Footer></Footer>
        </body>
      </div>
    </div>
  );
}
