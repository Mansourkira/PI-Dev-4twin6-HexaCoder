// import React, { Component } from "react";
// import "./Home.css";
// import axios from "axios";
// import { PropagateLoader } from 'react-spinners';
// // Components
// import Teacher from "../../Teachers/Teacher/Teacher";
// import SearchTeachers from '../../Teachers/SearchTeacher/SearchTeachers';
// import SideBar from '../../backOfiice/SideBar';
// import NavBar from '../../backOfiice/NavBar';
// import Footer from '../../backOfiice/footer';
// import { Link } from "react-router-dom";
// class DetailsTeacher extends Component {
   

//   state = {
//     id:'',
//     data: null,
//     allTeachers: null,
//     error: ""
//   };

//   async componentDidMount() {
//    let search =  this.props.location.search,
//       id = search.substring(1, search.length);
//     console.log(id);
//     try {
//       const teachers = await axios.get("http://localhost:3000/api/teachers"+id);
//       this.setState({ data: teachers.data }); 
//       console.log(teachers.data);
//     } catch (err) {
//       this.setState({ error: err.message });
//     }
//   }

//   removeTeacher = async id => {
//     try {
//       const teacherRemoved = await axios.delete(`http://localhost:3000/api/teachers/${id}`);
//       const teachers = await axios("http://localhost:3000/api/teachers/");
//       this.setState({ data: teachers.data });
//     } catch (err) {
//       this.setState({ error: err.message });
//     }
//   };

//   searchTeachers = async username => {
//     let allTeachers = [...this.state.data.teachers];
//     if (this.state.allTeachers === null) this.setState({ allTeachers });

//     let teachers = this.state.data.teachers.filter(({ firstName }) =>
//     firstName.toLowerCase().includes(username.toLowerCase())
//     );
//     if (teachers.length > 0) this.setState({ data: { teachers } });

//     if (username.trim() === "")
//       this.setState({ data: { teachers: this.state.allTeachers } });
//   };

//   render() {
//     let teachers;

//     if (this.state.data)
//       teachers =
//         this.state.data.teachers &&
//         this.state.data.teachers.map(teacher => (
//           <Teacher key={teacher._id} {...teacher} removeTeacher={this.removeTeacher} />
//         ));
    

//     if (this.state.error) return <h1>{this.state.error}</h1>;
//     if (this.state.data !== null)
//       if (!this.state.data.teachers.length)
//         return <h1 className="No-Students">No teachers!</h1>;

//     return (     
//       <div>
//       <body className="g-sidenav-show  bg-gray-200">
//       <SideBar />
//       <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
//     <NavBar></NavBar>
 
      

//       <div className="Table-Wrapper">
//         <h1>Teachers:</h1>
//         <SearchTeachers searchTeachers={this.searchTeachers} />
//         <div style={{display:"flex"}}> 
//         <Link to="/addTeacher" exact>
//         <button  className="btn btn-success" style={{justifyContent : "flex-end"}}>Add Teacher</button>
//         </Link>
//         </div>
//         <table className="Table">
//           <thead>
//             <tr>
              
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Email</th>
              
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>{teachers}</tbody>
//         </table>
//       </div>
  
    
//     </main>
//     <Footer></Footer>
//       </body>
//       </div>

//     );
//   }
// }

// export default DetailsTeacher;
import React, { useState ,useEffect} from "react";

import axios from "axios";
import { Navigate, withRouter } from 'react-router';
import {toast, ToastContainer} from "react-toastify";
import SideBar from '../../Backoffice/SideBar';
import NavBar from '../../Backoffice/NavBar';
import Footer from '../../Backoffice/footer';

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
export default function detailsQuestion() {

 var {id} = useParams();
 const [question, SetQuestion] = useState( {_id: '',
 questionText: "",
 answersOptions:[]
  });
  const [answersOptions, SetanswersOptions] = useState([]);

  useEffect(() => {

        axios.get("http://localhost:8095/api/questions/"+id)
      .then((data) =>{SetQuestion(data.data.question);
      console.log("data",data.data);})
      .catch((err) => console.log(`Error: ${err}`));


//        axios.get("http://localhost:8095/api/teachers/TeacherProject/"+id).then((data)=>{
//         // s.push(data);
      
// SetProjects(data.data);
//         console.log("list",projects);

      
   


     
       
//        console.log("this data",data.data);})  
//   .catch((err) => console.log(`Error: ${err}`));
//   console.log("project",projects);
 }, []);


      


  //console.log(dataa);
  
 

    return (
    <div>
    <body className="g-sidenav-show  bg-gray-200">
    <SideBar />
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
  <NavBar></NavBar>

      <div>
          <div className="AddStudent-Wrapper">
        <h1>DeatilsQuestion:</h1>
    
            {/* <input
            type="text"
            placeholder="Enter the name of the teacher here"
            value={teacher.lastName} onChange={e =>SetTeacher({...teacher,lastName:e.target.value})}
            className="Add-Student-Input"
            required
            minLength="3"
            maxLength="33"
          /> */}
       
{/* <p>{teacher.projects.map( ( {name, email} ) => {
    return <p key={email}>{name} - {email}</p>
})}</p> */}
     <table className="Table">
          <thead>
            <tr>
              
              <th>questionText</th>
           
          
         
              <th>answerOption</th>
            </tr>
          </thead>
          <tbody>     
     <td > {question.questionText}</td> 
     <td > {question.answersOptions}</td> 
   
     <td >
     {/* {
                (() => {if (teacher.tuto.toString()===false) {
      return( <i class="fa fa-check" aria-hidden="true"></i>)
     }else{ return(
<i class="fa fa-ban"></i>)
                  }  })()} */}
     </td>
  
     <td > 
       
       {/* <div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{projects.map(e=>(<p>{e.project_name}</p>))}</h5>
     
    </div> 
   
    
  </a>

</div>*/}
       
       
       
       
       
       
       
       
       
       
       </td> 
     
     
     </tbody>
        </table>
      </div>
      <ToastContainer />
          </div>
      
          </main>
    <Footer></Footer>
      </body>
      </div>

    );
  }
