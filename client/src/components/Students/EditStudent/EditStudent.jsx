import React, { useState ,useEffect} from "react";
import './EditStudent.css';
import axios from "axios";
import { withRouter } from 'react-router';
import {toast, ToastContainer} from "react-toastify";
import SideBar from '../../backOfiice/SideBar';
import NavBar from '../../backOfiice/NavBar';
import Footer from '../../backOfiice/footer';
import useFetchData from './useFetchData'
import {useParams} from 'react-router-dom';

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
export default function EditStudent() {
 // const { data } = useFetchData("http://localhost:3000/api/students/623c9b3c9c54ff418e8f4d15");

 var {id} = useParams();
 const [student, SetStudent] = useState( {_id: '',
  fname: "",
  lname: "",
  email:"",
  password:"",
  avatar : "",
  EnrolledClass:null,
  team:null,
  createdAt: "",
        updatedAt: "",
        __v: 0});

  useEffect(() => {

        axios.get("http://localhost:3000/api/students/"+id)
      .then((data) =>SetStudent(data.data.student))
      .catch((err) => console.log(`Error: ${err}`));
  }, []);


function update(){
  axios.put("http://localhost:3000/api/students/${params.id}",student)
  console.log(student);
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
        <h1>Edit Student:</h1>
          <label htmlFor="name">First Name:</label>
          <input
            type="text"
            placeholder="Enter the name of the students here"
            value={student.fname} onChange={e =>SetStudent({...student,fname:e.target.value})}
            className="Add-Student-Input"
            required
            minLength="3"
            maxLength="33"
          />
                    <label htmlFor="name">Last Name:</label>

            <input
            type="text"
            placeholder="Enter the name of the students here"
            value={student.lname} onChange={e =>SetStudent({...student,lname:e.target.value})}
            className="Add-Student-Input"
            required
            minLength="3"
            maxLength="33"
          />
          <label htmlFor="email">Email: <b>(must be a valid email)</b></label>
          <input
            type="text"
            placeholder="enter your email here"
                       value={student.email} onChange={e =>SetStudent({...student,email:e.target.value})}

            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            className="Add-Student-Input"
            required
          />          <label htmlFor="password">Password :</label>

              <input
            type="password"
            placeholder="enter your password"
            value={student.password} onChange={e =>SetStudent({...student,password:e.target.value})}

            className="Add-Student-Input"
            required
          />
         
          <button className="btn btn-success" onClick={update}>Edit</button>

      </div>
      <ToastContainer />
          </div>
      
          </main>
    <Footer></Footer>
      </body>
      </div>

    );
  }


