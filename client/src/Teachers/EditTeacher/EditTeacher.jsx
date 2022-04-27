import React, { useState ,useEffect} from "react";
import './EditTeacher.css';
import axios from "axios";
import { Navigate, withRouter } from 'react-router';
import {toast, ToastContainer} from "react-toastify";
import SideBar from '../../Backoffice/SideBar';
import NavBar from '../../Backoffice/NavBar';
import Footer from '../../Backoffice/footer';
import useFetchData from './useFetchData'
import {useParams,Redirect} from 'react-router-dom';
import { Link } from "react-router-dom";

/*
{
  _id: '',
  fname:"",
  lname:"",
  email: "",
  password:"",
  EnrolledClass: "",
  avatar : "",
  team :"",
  response: ""
};
*/
export default function EditTeacher() {
 // const { data } = useFetchData("http://localhost:3000/api/students/623c9b3c9c54ff418e8f4d15");

 var {id} = useParams();
 const [teacher, SetTeacher] = useState( {_id: '',
  userName: "",
 
  email:"",
  password:"",
 tuto:false,
  projects:null});

  useEffect(() => {

        axios.get("http://localhost:8095/api/teachers/"+id)
      .then((data) =>{SetTeacher(data.data.teacher);
      console.log(data.data);})
      .catch((err) => console.log(`Error: ${err}`));
  }, []);


function update(){
  axios.put(`http://localhost:8095/api/teachers/${id}`,teacher)
  console.log(teacher);
}

  //console.log(dataa);
  
 

    return (
    <div>
    <body className="g-sidenav-show  bg-gray-200">
    <SideBar />
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
  <NavBar></NavBar>

      <div>
          <div className="AddStudent-Wrapper">
        <h1>Edit Teacher:</h1>
          <label htmlFor="name">userName :</label>
          <input
            type="text"
            placeholder="Enter the name of the teacher here"
            value={teacher.userName} onChange={e =>SetTeacher({...teacher,userName:e.target.value})}
            className="Add-Student-Input"
            required
            minLength="3"
            maxLength="33"
          />
                 
            {/* <input
            type="text"
            placeholder="Enter the name of the teacher here"
            value={teacher.lastName} onChange={e =>SetTeacher({...teacher,lastName:e.target.value})}
            className="Add-Student-Input"
            required
            minLength="3"
            maxLength="33"
          /> */}
          <label htmlFor="email">Email: <b>(must be a valid email)</b></label>
          <input
            type="text"
            placeholder="enter your email here"
                       value={teacher.email} onChange={e =>SetTeacher({...teacher,email:e.target.value})}

            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            className="Add-Student-Input"
            required
          />          <label htmlFor="password">Password :</label>
<p>              <input
            type="password"
            placeholder="enter your password"
            value={teacher.password} onChange={e =>SetTeacher({...teacher,password:e.target.value})}

            className="Add-Student-Input"
            required
          />
            <i class="bi bi-eye-slash" id="togglePassword"></i></p>

           <Link to="/teacher" exact > 
          <button className="btn btn-success" onClick={update}>Edit</button>
</Link>
      </div>
      <ToastContainer />
          </div>
      
          </main>
    <Footer></Footer>
      </body>
      </div>

    );
  }


