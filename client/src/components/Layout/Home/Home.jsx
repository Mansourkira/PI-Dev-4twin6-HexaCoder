import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import { PropagateLoader } from 'react-spinners';
// Components
import Student from "../../Students/Student/Student";
import SearchStudents from '../../Students/SearchStudent/SearchStudents';
import SideBar from '../../backOfiice/SideBar';
import NavBar from '../../backOfiice/NavBar';
import Footer from '../../backOfiice/footer';
import { Link } from "react-router-dom";
class Home extends Component {
  state = {
    data: null,
    allStudents: null,
    error: ""
  };

  async componentDidMount() {
    try {
      const students = await axios.get("http://localhost:3000/api/students");
      this.setState({ data: students.data }); 
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  removeStudent = async id => {
    try {
      const studentRemoved = await axios.delete(`http://localhost:3000/api/students/${id}`);
      const students = await axios("http://localhost:3000/api/students/");
      this.setState({ data: students.data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  searchStudents = async username => {
    let allStudents = [...this.state.data.students];
    if (this.state.allStudents === null) this.setState({ allStudents });

    let students = this.state.data.students.filter(({ fname }) =>
    fname.toLowerCase().includes(username.toLowerCase())
    );
    if (students.length > 0) this.setState({ data: { students } });

    if (username.trim() === "")
      this.setState({ data: { students: this.state.allStudents } });
  };

  render() {
    let students;

    if (this.state.data)
      students =
        this.state.data.students &&
        this.state.data.students.map(student => (
          <Student key={student._id} {...student} removeStudent={this.removeStudent} />
        ));
    

    if (this.state.error) return <h1>{this.state.error}</h1>;
    if (this.state.data !== null)
      if (!this.state.data.students.length)
        return <h1 className="No-Students">No students!</h1>;

    return (     
      <div>
      <body className="g-sidenav-show  bg-gray-200">
      <SideBar />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    <NavBar></NavBar>
 
      

      <div className="Table-Wrapper">
        <h1>Students:</h1>
        <SearchStudents searchStudents={this.searchStudents} />
        <div style={{display:"flex"}}> 
        <Link to="/add" exact>
        <button  className="btn btn-success" style={{justifyContent : "flex-end"}}>Add Student</button>
        </Link>
        </div>
        <table className="Table">
          <thead>
            <tr>
              
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
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

export default Home;
