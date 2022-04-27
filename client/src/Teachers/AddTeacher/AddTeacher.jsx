import React, { useState,useEffect } from "react";
import './AddTeacher.css';
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from '../../Backoffice/SideBar';
import NavBar from '../../Backoffice/NavBar';
import Footer from '../../Backoffice/footer';
import { Link } from "react-router-dom";

export default function AddStudent(){

  const [teacher , SetTeacher] = useState({userName : '',email:'',password:'',tuto : false,poste:'',projects:null});
  const [project , SetProjects] = useState([{ClassName:"",createdAt:"",membres:[],updatedAt:"",_id:"",__v:0}]);
const postesTeacher=["securite_informatique","fullStack_js","angular","symfony","nodeJs","reactJs"];

  function  Add() {
 
const classaa = document.querySelector('#lang').value;
   const Teacherss = {
    userName:teacher.userName,

    email:teacher.email,
    password:teacher.password,
    tuto:teacher.tuto,
    poste:classaa,
    project:teacher.projects
   


  }
   try{
    axios.post('http://localhost:8095/api/teachers',Teacherss).then(
     toast("teacher " + " created successfully" ,{ type: toast.TYPE.SUCCESS, autoClose: 3000 }));
      console.log(Teacherss);
    }catch(err){  
         toast(err.message ,{ type: toast.TYPE.ERROR, autoClose: 3000 });}
    
  }
//   useEffect(() => {
//     axios.get("http://localhost:3000/api/class")
//   .then((data) =>SetClasses(data.data.classes))
//   .catch((err) => console.log(`Error: ${err}`));
// }, []); 
  function change(){
   SetTeacher(...teacher
   );

 }
 
  return (
    <div>
    <body className="g-sidenav-show  bg-gray-200">
    <SideBar />
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
  <NavBar></NavBar>

      <div>
          <div className="AddStudent-Wrapper">
        <h1>Add Teacher:</h1>
          <label htmlFor="name">user Name:</label>
          <input
            type="text"
            placeholder="Enter the name of the teacher here"
            value={teacher.userName} onChange={e =>SetTeacher({...teacher,userName:e.target.value})}
            className="Add-Student-Input"
            required
            minLength="3"
            maxLength="33"
          />
                    {/* <label htmlFor="name">Last Name:</label>

            <input
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

              <input
            type="password"
            placeholder="enter your password"
            value={teacher.password} onChange={e =>SetTeacher({...teacher,password:e.target.value})}
            className="Add-Student-Input"
            required
          />

           <label htmlFor="classes">Postes</label>
                 <select  className="Add-Student-Input"required id="lang" style={{marginBottom:30}} >
                 {
                  postesTeacher.map(obj=>(
                   <option value={obj} onChange={e =>SetTeacher({...teacher,poste:e.target.value})}  >{obj}</option>
                  ))
            
                  }
            </select>
           
                  <Link to="/teacher" exact > 
          <button type="submit" onClick={() => Add()} className="Add-Student-Submit fa fa-plus"></button>
         
          </Link>
              <ToastContainer />
          <button type="reset" className="Add-Student-Reset fa fa-refresh"></button>

      </div>
   
          </div>
      
          </main>
    <Footer></Footer>
      </body>
      </div>

    );
  }


