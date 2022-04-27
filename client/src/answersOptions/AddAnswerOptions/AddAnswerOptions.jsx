import React, { useState,useEffect } from "react";
import './AddStudent.css';
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';

import SideBar from "../../Backoffice/SideBar";
import NavBar from '../../Backoffice/NavBar';
import Footer from '../../Backoffice/footer';
import { Link } from "react-router-dom";
export default function AddStudent(){

  const [student , SetStudent] = useState({answerText : '',isCorrect:false,questions:null});
  const [classes , SetClasses] = useState([{questionText:"",class:"",_id:""}]);
const isCor=[true,false];
  


  function  Add() {
 
   const classaa = document.querySelector('#lang').value;
   const correct = document.querySelector('#lang1').value;
   const finalst = {
    answerText :student.answerText,
    isCorrect:correct,
   
    questions:classaa,


  }
    console.log(classaa);
    axios.post('http://localhost:8095/api/answerOptions',finalst).then(res => {
      console.log(finalst);
     
    })
    .catch(err => alert('Something went wrong'))
  }
  useEffect(() => {
    axios.get("http://localhost:8095/api/questions")
  .then((data) =>SetClasses(data.data.question))
  .catch((err) => console.log(`Error: ${err}`));
}, []); 
 function change(){
  SetStudent(...student,{classes :
    {ClassName:document.querySelector('#lang').value}
  });

}
 
  return (
    <div>
    <body className="g-sidenav-show  bg-gray-200">
    <SideBar></SideBar>
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
  <NavBar></NavBar>

      <div>
          <div className="AddStudent-Wrapper">
        <h1>Add AnswerText:</h1>
          <label htmlFor="name">answerText:</label>
          <input
            type="text"
            placeholder="Enter the anwers option here"
            value={student.answerText} onChange={e =>SetStudent({...student,answerText:e.target.value})}
            className="Add-Student-Input"
            required
            minLength="3"
            maxLength="100"
          />
                <label htmlFor="classes">isCorrect</label>
                 <select  className="Add-Student-Input"required id="lang1" style={{marginBottom:30}} >
                 {
                  isCor.map(obj=>(
                   <option value={obj} onChange={e =>SetStudent({...student,isCorrect:e.target.value})}  >{obj.toString()}</option>
                  ))
            
                  }
            </select>

            {/* <input
            type="text"
            placeholder="Enter the name of the students here"
            value={student.lname} onChange={e =>SetStudent({...student,lname:e.target.value})}
            className="Add-Student-Input"
            required
            minLength="3"
            maxLength="33"
          /> */}
          {/* <label htmlFor="email">Email: <b>(must be a valid email)</b></label>
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
          /> */}



                 <label htmlFor="classes">Question</label>
                 <select  className="Add-Student-Input"required id="lang" style={{marginBottom:30}} >
                 {
                  classes.map(obj=>(
                   <option value={obj._id} onChange={e =>SetStudent({...student,questions:e.target.value})}  >{obj.questionText}</option>
                  ))
            
                  }
            </select>

        <div className="form-group">
                  <Link to="/answerOptions" exact > 
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


