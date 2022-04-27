import React, { useState,useEffect } from "react";
import './AddClass.css';
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from '../../../Backoffice/SideBar'
import NavBar from '../../../Backoffice/NavBar'
import Footer from '../../../Backoffice/footer'
import { Link } from "react-router-dom";
export default function AddClass(){

  const [Class , setClass] = useState({ClassName :''});
  const [classes , SetClasses] = useState([{ClassName:"",createdAt:"",membres:[],updatedAt:"",_id:"",__v:0}]);

  


  function  Add() {
 
   const finalst = {
  ClassName : Class.ClassName


  }
    //console.log(classaa);
    axios.post('http://localhost:8095/api/class',finalst).then(res => {
      console.log(finalst);
     
    })
    .catch(err => alert('Something went wrong'))
  }

 
  return (
    <div>
    <body className="g-sidenav-show  bg-gray-200">
    <SideBar />
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
  <NavBar></NavBar>

      <div>
          <div className="AddStudent-Wrapper">
        <h1>Add Class:</h1>
          <label htmlFor="name">Class Name:</label>
          <input
            type="text"
            placeholder="Enter the name of the class here"
            value={Class.ClassName} onChange={e =>setClass({...Class,ClassName:e.target.value})}
            className="Add-Student-Input"
            required
            minLength="3"
            maxLength="33"
          />
                  
                  <div className="form-group">
                  <Link to="/classes" exact > 
          <button type="submit" onClick={() => Add()} className="Add-Student-Submit fa fa-plus"></button>
          </Link>
          <button type="reset" className="Add-Student-Reset fa fa-refresh"></button>
          </div>
          </div>
          
      <ToastContainer />
          </div>
      
          </main>
    <Footer></Footer>
      </body>
      </div>

    );
  }


