import React, { useState,useEffect } from "react";
import './AddQuestion.css';
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from '../../Backoffice/SideBar';
import NavBar from '../../Backoffice/NavBar';
import Footer from '../../Backoffice/footer';
import { Link } from "react-router-dom";

export default function AddStudent(){

  const [question , SetQuestion] = useState({  questionText:'', answersOption:null});
  //const [answersOption , SetAnswersOption] = useState([{answerText:"",isCorrect:false,questions:null,_id:"",__v:0}]);


  function  Add() {
 
//const classaa = document.querySelector('#lang').value;
   const Questionss = {
    questionText:question.questionText,


    answersOption:question.answersOption
   //il faut verfier answerOption


  }
   try{
    axios.post('http://localhost:8095/api/questions',Questionss).then(
     toast("question " + " created successfully" ,{ type: toast.TYPE.SUCCESS, autoClose: 3000 }));
      console.log(Questionss);
    }catch(err){  
         toast(err.message ,{ type: toast.TYPE.ERROR, autoClose: 3000 });}
    
  }
//   useEffect(() => {
//     axios.get("http://localhost:3000/api/class")
//   .then((data) =>SetClasses(data.data.classes))
//   .catch((err) => console.log(`Error: ${err}`));
// }, []); 
  function change(){
   SetQuestion(...question
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
        <h1>Add Question:</h1>
          <label htmlFor="name">QuestionText:</label>
          <input
            type="text"
            placeholder="Enter question of texthere"
            value={question.questionText} onChange={e =>SetQuestion({...question,questionText:e.target.value})}
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
          {/* <label htmlFor="email">Email: <b>(must be a valid email)</b></label>
                 <label htmlFor="questionText">QuestionText :</label>

              <input
            type="text"
            placeholder="enter your password"
            value={question.questionText} onChange={e =>SetQuestion({...question,questionText:e.target.value})}
            className="Add-Student-Input"
            required
          /> */}

           {/* <label htmlFor="classes">Postes</label>
                 <select  className="Add-Student-Input"required id="lang" style={{marginBottom:30}} >
                 {
                  postesTeacher.map(obj=>(
                   <option value={obj} onChange={e =>SetTeacher({...teacher,poste:e.target.value})}  >{obj}</option>
                  ))
            
                  }
            </select> */}
           
                  <Link to="/question" exact > 
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


