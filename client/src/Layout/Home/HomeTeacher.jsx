import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import { PropagateLoader } from 'react-spinners';
// Components
import Teacher from "../../Teachers/Teacher/Teacher";
import SearchTeachers from '../../Teachers/SearchTeacher/SearchTeachers';
import SideBar from '../../Backoffice/SideBar';
import NavBar from '../../Backoffice/NavBar';
import Footer from '../../Backoffice/footer';
import { Link } from "react-router-dom";
class HomeTeacher extends Component {
  state = {
    data: null,
    allTeachers: null,
    error: ""
  };

  async componentDidMount() {
    try {
      const teachers = await axios.get("http://localhost:8095/api/teachers");
      this.setState({ data: teachers.data }); 
      console.log(teachers.data);
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  removeTeacher = async id => {
    try {
      const teacherRemoved = await axios.delete(`http://localhost:8095/api/teachers/${id}`);
      const teachers = await axios("http://localhost:8095/api/teachers/");
      this.setState({ data: teachers.data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  searchTeachers = async username => {
    let allTeachers = [...this.state.data.teachers];
    if (this.state.allTeachers === null) this.setState({ allTeachers });

    let teachers = this.state.data.teachers.filter(({ userName }) =>
    userName.toLowerCase().includes(username.toLowerCase())
    );
    if (teachers.length > 0) this.setState({ data: { teachers } });

    if (username.trim() === "")
      this.setState({ data: { teachers: this.state.allTeachers } });
  };

  render() {
    let teachers;

    if (this.state.data)
      teachers =
        this.state.data.teachers &&
        this.state.data.teachers.map(teacher => (
          <Teacher key={teacher._id} {...teacher} removeTeacher={this.removeTeacher} />
        ));
    

    if (this.state.error) return <h1>{this.state.error}</h1>;
    if (this.state.data !== null)
      if (!this.state.data.teachers.length)
        return <h1 className="No-Students">No teachers!</h1>;

    return (     
      <div>
      <body className="g-sidenav-show  bg-gray-200">
      <SideBar />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    <NavBar></NavBar>
 
      

      <div className="Table-Wrapper">
        <h1>Teachers:</h1>
        <SearchTeachers searchTeachers={this.searchTeachers} />
        <div style={{display:"flex"}}> 
        <Link to="/addTeacher" exact>
        <button  className="btn btn-success" style={{justifyContent : "flex-end"}}>Add Teacher</button>
        </Link>
        </div>
        <table className="Table">
          <thead>
            <tr>
              
              <th>userName</th>
           
          
              <th>Email</th>
              <th>password</th>
                 <th>professeur_de</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{teachers}</tbody>
        </table>
      </div>
  
    
    </main>
    <Footer></Footer>
      </body>
      </div>

    );
  }
}

export default HomeTeacher;
