import React, { useState ,useEffect} from "react";
import './EditStudent.css';
import axios from "axios";
import { withRouter } from 'react-router';
import {toast, ToastContainer} from "react-toastify";
import SideBar from "../../Backoffice/SideBar";
import NavBar from '../../Backoffice/NavBar';
import Footer from '../../Backoffice/footer';
import useFetchData from './useFetchData'
import {useParams} from 'react-router-dom';
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
export default function EditStudent() {
 // const { data } = useFetchData("http://localhost:3000/api/students/623c9b3c9c54ff418e8f4d15");

 var id = useParams();

 console.log(id.id.slice(1,id.id.length))
 id=id.id.slice(1,id.id.length);
 const [student, SetStudent] = useState( {_id: '',
 answerText : '',isCorrect:false,questions:null,
        __v: 0});

  useEffect(() => {

        axios.get("http://localhost:8095/api/answerOptions/"+id)
      .then((data) =>SetStudent(data.data.answerOptions))
      .catch((err) => console.log(`Error: ${err}`));
  }, []);


function update(){
  axios.put("http://localhost:8095/api/answerOptions/"+id,student)
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
        <h1>Edit answerOptions:</h1>
          <label htmlFor="name">First Name:</label>
          <input
            type="text"
            placeholder="Enter the name of the students here"
            value={student.answerText} onChange={e =>SetStudent({...student,answerText:e.target.value})}
            className="Add-Student-Input"
            required
            minLength="3"
            maxLength="33"
          />
                    <label htmlFor="name">Last Name:</label>

         
          <Link to="/students" exact > 
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


