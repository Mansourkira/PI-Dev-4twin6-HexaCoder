import React, { useState, useEffect } from "react";
import FrontHeader from "./Header";
import axios from "axios";
import "./styling.css";
export default function VotingInterface() {
  const [projects, setProjects] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [transactions, setTransaction] = useState([]);
  const handleSubmit = (text) => (event) => {
    event.preventDefault();
    console.log(text);
    const z = "voter13";

    transactions[1] = text[0];
    transactions[0] = z;
    setTransaction(transactions);
    console.log(transactions);

    axios
      .post(
        `http://localhost:8095/votes/addvotes`,
        { transactions },
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };
  useEffect(() => {
    fetch("http://localhost:8095/projects/findAll")
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          let d = data.filter((x) => x.state_qualified == true);
          setProjects(d);
          console.log(d);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [setIsLoaded == true]);
  var url = "frontassets/images/";
  return (
    <div>
      <FrontHeader></FrontHeader>
      <section class="meetings-page" id="meetings">
        <div class="container">
          <div class="row">
            {projects.map((project) => (
              <div class="column">
                <div class="meeting-item">
                  <div class="thumb">
                    <div class="price">
                      <span>{project.project_name}</span>
                    </div>
                    <a href="meeting-details.html">
                      <img src={url + project.logo} alt=""></img>
                    </a>
                  </div>
                  <div class="down-content">
                    <div class="date">
                      <h6>
                        Team
                        <span>
                          {project.Team.map((e) => (
                            <td>{e.team_Name}</td>
                          ))}
                        </span>
                      </h6>
                    </div>
                    <a href="meeting-details.html">
                      <h4>Description</h4>
                    </a>
                    <p>{project.description}</p>
                    <video width="320" height="240" controls>
                      <source
                        src={url + project.Marketing}
                        type="video/mp4"
                      ></source>
                    </video>
                  </div>
                  <button
                    onClick={handleSubmit(project.Team.map((e) => e.team_Name))}
                  >
                    vote Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>{" "}
      </section>{" "}
    </div>
  );
}
