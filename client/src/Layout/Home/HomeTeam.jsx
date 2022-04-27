import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import { PropagateLoader } from 'react-spinners';
// Components
import Student from "../../Students/Student/Student";

import SearchStudents from '../../Students/SearchStudent/SearchStudents';
import SideBar from '../../Backoffice/SideBar'
import NavBar from  '../../Backoffice/NavBar'
import Footer from '../../Backoffice/footer'
import { Link } from "react-router-dom";
import Team from "../../components/Teams/Team/Team"
import Header from "../../components/header/Header";
class HomeTeam extends Component {
  state = {
    data: null,
    allStudents: null,
    error: ""
  };

  async componentDidMount() {
    try {
      const students = await axios.get("http://localhost:8095/api/team/teams");
      this.setState({ data: students.data }); 
    } catch (err) { 
      this.setState({ error: err.message });
    }
  }

  removeTeam = async id => {
    try {
      const students = await axios.delete("http://localhost:8095/api/team/delete/"+id);
      this.setState({ data: students.data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  searchStudents = async username => {
    let allStudents = [...this.state.data.Team];
    if (this.state.allStudents === null) this.setState({ allStudents });

    let students = this.state.data.Team.filter(({ team_Name }) =>
    team_Name.toLowerCase().includes(username.toLowerCase())
    );
    if (Team.length > 0) this.setState({ data: { students } });

    if (username.trim() === "")
      this.setState({ data: { students: this.state.allStudents } });
  };

  render() {
    let students;

    if (this.state.data)
      students =
        this.state.data.Team &&
        this.state.data.Team.map(student => (
          <Team key={student._id} {...student} removeTeam={this.removeTeam} />
        ));
    

    if (this.state.error) return <h1>{this.state.error}</h1>;
    if (this.state.data !== null)
      if (!this.state.data.Team.length)
        return <h1 className="No-Students">No students!</h1>;

    return (     
      <div>
      <body className="g-sidenav-show  bg-gray-200">
      <SideBar />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
   <Header></Header>
 
      

      <div className="Table-Wrapper">
        <h1>Teams:</h1>
        <SearchStudents searchStudents={this.searchStudents} />
        <div style={{display:"flex"}}> 
        <Link to="/addTeam" exact>
        <button  className="btn btn-success" style={{justifyContent : "flex-end"}}>Add Team</button>
        </Link>
        </div>
        <table className="Table">
          <thead>
            <tr>
              
              <th>Team Name</th>
              <th>Project</th>
              <th>Enrollment Class</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{students}</tbody>
        </table>
      </div>
  
    
    </main>
    <Footer></Footer>
      </body>
      </div>

    );
  }
}

export default HomeTeam;
