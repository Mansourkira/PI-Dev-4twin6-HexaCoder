import react, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
export default function AddProjectForm() {
  // let history = useNavigate()
  const [name, setname] = useState("");
  const [option, setoption] = useState("");
  const [link, setlink] = useState("");
  const [theme, settheme] = useState("");
  const [team, setteam] = useState("");
  const [teacher, setteacher] = useState({});
  const [Marketingvid, setvid] = useState("");
  const [logo, setLogo] = useState("");
  const [date, setdate] = useState(Date.now());
  const [description, setdescription] = useState("");
  const [Teachers, setTeachers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [Teams, setTeams] = useState([]);
  const List = [
    "Twin",
    "SAE",
    "Mobile",
    "Iot",
    "Cloud",
    "Data Science",
    "Bi",
    "NIDS",
    "Win",
  ];
  useEffect(() => {
    fetch("http://localhost:8095/projects/getTeachers")
      .then((res) => res.json())
      .then(
        (data) => {
          //setIsLoaded(true);
          setTeachers(data);

          console.log(data);
          console.log(teacher);
          console.log(Teams);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8095/Teams/getTeams")
      .then((data) => setTeams(data.data.teams), console.log(Teams))
      .catch((err) => console.log(`Error: ${err}`));
  }, []);
  const selectTeacher = (text) => (event) => {
    event.preventDefault();
    setteacher(text);
    console.log(text);
  };
  const handleChange1 = (event) => {
    setname({ name: event.target.value });
    console.log(name);
  };
  const handleChange2 = (event) => {
    event.preventDefault();
    setoption({ option: event.target.value });
  };
  const handleChange3 = (event) => {
    setlink({ link: event.target.value });
  };
  const handleChange4 = (event) => {
    settheme({ theme: event.target.value });
  };
  const handleChange5 = (event) => {
    setteam({ team: event.target.value });
  };
  const handleChange6 = (event) => {
    setteacher({ teacher: event.target.value });
  };
  const handleChange7 = (event) => {
    setdescription({ description: event.target.value });
  };
  const handlchange8 = (event) => {
    setLogo({ logo: event.target.files[0] });
  };
  const handlchange9 = (event) => {
    setvid({ Marketingvid: event.target.files[0] });
  };
  const handleChange10 = (event) => {
    setdate({ date: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const classaa = document.querySelector("#lang").value;
    const Project = {
      project_name: name.name,
      project_theme: theme.theme,
      project_option: option.option,
      project_link: link.link,

      team: team.team,
      date_of_creaction: date.date,
      teacher: teacher,
      state_qualified: false,
      logo: logo.logo.name,
      Marketing: "",
      description: description.description,
    };
    console.log(classaa);
    console.log(Project);
    var url = "http://localhost:8095/projects/addproject";
    axios
      .post(url, Project, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    // history('/dashboard')*/
  };

  return (
    <div>
      <main id="main" className="main">
        <div class="col-lg-4 col-md-6">
          <div class="card h-100">
            <div class="card-header pb-0">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Add Project</h5>
                  <h>select teacher</h>
                  <select onChange={handleChange6}>
                    {" "}
                    //set value here
                    {Teachers.map((e) => (
                      <option>{e.email}</option>
                    ))}
                  </select>

                  <form>
                    <div className="col-12">
                      <label for="inputNanme4" className="form-label">
                        project_name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputNanme4"
                        onChange={handleChange1}
                      ></input>
                    </div>
                    <br></br>
                    <div className="col-12">
                      <label for="i" className="form-label">
                        project_option
                      </label>
                      <select onChange={handleChange2}>
                        {" "}
                        //set value here
                        {List.map((e) => (
                          <option value={e}>{e}</option>
                        ))}
                      </select>
                    </div>
                    <br></br>
                    <div className="col-12">
                      <label for="inputAddress" className="form-label">
                        project_link
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        onChange={handleChange3}
                        placeholder=""
                      ></input>
                    </div>
                    <br></br>
                    <div className="col-12">
                      <label for="inputAddress" className="form-label">
                        creation_date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="inputAddress"
                        onChange={handleChange10}
                        placeholder=""
                      ></input>
                    </div>
                    <br></br>
                    <div className="col-12">
                      <label for="inputAddress" className="form-label">
                        project_theme
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        onChange={handleChange4}
                        placeholder=""
                      ></input>
                    </div>
                    <br></br>
                    <div className="col-12">
                      <select
                        onChange={(e) => setteam({ team: e.target.value })}
                        required
                        id="lang"
                        style={{ marginBottom: 30 }}
                      >
                        {Teams.map((obj) => (
                          <option value={obj._id}>{obj.team_Name}</option>
                        ))}
                      </select>
                    </div>
                    <br></br>

                    <div className="col-12"></div>
                    <br></br>
                    <div className="col-12">
                      <label for="inputAddress" className="form-label">
                        Description
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        onChange={handleChange7}
                        placeholder=""
                      ></textarea>
                    </div>
                    <br></br>
                    <div className="col-12">
                      <label for="inputAddress" className="form-label">
                        logo
                      </label>
                      <input
                        type="file"
                        id="myFile"
                        name="filename"
                        onChange={handlchange8}
                      ></input>
                    </div>
                    <br></br>
                    <div className="col-12"></div>
                    <br></br>

                    <div className="text-center">
                      <button
                        type="submit"
                        class="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
