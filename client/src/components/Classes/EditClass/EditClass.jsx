import React, { useState ,useEffect} from "react";
import './EditClass.css';
import axios from "axios";
import { withRouter } from 'react-router';
import {toast, ToastContainer} from "react-toastify";
import SideBar from '../../../Backoffice/SideBar'
import NavBar from '../../../Backoffice/NavBar'
import Footer from '../../../Backoffice/footer'
import {Link, useParams} from 'react-router-dom';

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
export default function EditClass() {
 // const { data } = useFetchData("http://localhost:3000/api/students/623c9b3c9c54ff418e8f4d15");

 var {id} = useParams();
 const [Class, SetClass] = useState( {_id: '',
  ClassName :"",
  createdAt: "",
        updatedAt: "",
        __v: 0});

  useEffect(() => {

        axios.get("http://localhost:8095/api/class/"+id)
      .then((data) =>SetClass(data.data.classe))
      .catch((err) => console.log(`Error: ${err}`));
  }, []);


function update(){
  axios.put("http://localhost:8095/api/class/update/"+id,Class)
  console.log(Class);
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
        <h1>Edit Class:</h1>
          <label htmlFor="name">Class Name:</label>
          <input
            type="text"
            placeholder="Enter the name of the class here"
            value={Class.ClassName} onChange={e =>SetClass({...Class,ClassName:e.target.value})}
            className="Add-Student-Input"
            required
            minLength="3"
            maxLength="33"
          />
               <Link to="/classes" exact>
             
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


