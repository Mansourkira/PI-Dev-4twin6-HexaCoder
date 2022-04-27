import React, { useState ,useEffect} from "react";
import './EditQuestion.css';
import axios from "axios";
import { Navigate, withRouter } from 'react-router';
import {toast, ToastContainer} from "react-toastify";
import SideBar from '../../Backoffice/SideBar';
import NavBar from '../../Backoffice/NavBar';
import Footer from '../../Backoffice/footer';
import useFetchData from './useFetchData'
import {useParams,Redirect} from 'react-router-dom';
import { Link } from "react-router-dom";


export default function EditQuestion() {
 // const { data } = useFetchData("http://localhost:3000/api/students/623c9b3c9c54ff418e8f4d15");

 var {id} = useParams();
 const [question, SetQuestion] = useState( {_id: '',
 questionText: "",
 answersOptions:null
  });

  useEffect(() => {

        axios.get("http://localhost:8095/api/questions/"+id)
      .then((data) =>{SetQuestion(data.data.question);
      console.log(data.data);})
      .catch((err) => console.log(`Error: ${err}`));
  }, []);


function update(){
  axios.put(`http://localhost:8095/api/questions/${id}`,question)
  console.log(question);
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
        <h1>Edit question:</h1>
          <label htmlFor="name">questionText :</label>
          <input
            type="text"
            placeholder="Enter the name of the question here"
            value={question.questionText} onChange={e =>SetQuestion({...question,questionText:e.target.value})}
            className="Add-Student-Input"
            required
            minLength="3"
            maxLength="33"
          />
                 
         

           <Link to="/question" exact > 
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


