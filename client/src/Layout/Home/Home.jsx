import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import { PropagateLoader } from 'react-spinners';
// Components
import Student from "../../Students/Student/Student";
import SearchStudents from '../../Students/SearchStudent/SearchStudents';
import SideBar from "../../Backoffice/SideBar";
import NavBar from '../../Backoffice/NavBar';
import Footer from '../../Backoffice/footer';
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
class Home extends Component {
  state = {
    data: [],
    allStudents: null,
    error: ""

  };

  async componentDidMount() {
    try {
      axios.get("http://localhost:8095/api/students")
      .then((data) => {
        this.setState({ data : data.data.students })
        console.log(this.state.data)
      console.log(data.data.students)})
    
      console.log(this.state.data)
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  removeStudent = async id => {
    try {
      const studentRemoved = await axios.delete(`http://localhost:8095/api/students/${id}`);
      const students = await axios("http://localhost:8095/api/students/")
      this.setState({data: students.data.students });
     
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  searchStudents = async username => {
    let allStudents = [...this.state.data.data.students];
    if (this.state.allStudents === null) this.setState({ allStudents });
    console.log(this.state.data.students)
    let students =this.state.data.students.filter(({ fname }) =>
    fname.toLowerCase().includes(username.toLowerCase())
    );
    if (students.length > 0) this.setState({ data: { students } });

    if (username.trim() === "")
      this.setState({ data: { students: this.state.allStudents } });
  };

  render() {
    let students=[];

    if (this.state.data)
      students =
        this.state.data.students &&
        this.state.data.students.map(student => (
          <Student key={student._id} {...student} removeStudent={this.removeStudent} />
        ));
    

  

    return (     
      <div>
      <body className="g-sidenav-show  bg-gray-200">
        <Header></Header>
      <SideBar />
      
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
      
 
      

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
          <tbody>
           
            { this.state.data.map(student => (
          <Student key={student._id} {...student} removeStudent={this.removeStudent} />
        ))}
          </tbody>
        </table>
      </div>
  
    
    </main>
    <Footer/>
      </body>
      </div>

    );
  }
}

export default Home;
