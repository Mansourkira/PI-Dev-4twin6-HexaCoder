import {Link, useParams} from 'react-router-dom';
import SideBar from '../../../Backoffice/SideBar'
import NavBar from '../../../Backoffice/NavBar'
import { ToastContainer } from 'react-toastify';
import Footer from '../../../Backoffice/footer'
import { useEffect,useState } from 'react';
import axios from 'axios';
export default function ShowTeam()
{
    var {id} = useParams();
    const [classes , SetClasses] = useState('');
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
          __v: 0} );

          var s = [
            {_id: '',
            fname: "",
            lname: "",
            email:"",
            password:"",
            avatar : "",
            EnrolledClass:null,
            team:null,
            createdAt: "",
                  updatedAt: "",
                  __v: 0}
          ]
      const[students,setStudents]=useState([])
          useEffect(() => {

            axios.get("http://localhost:8095/api/team/students/"+id)
          .then((data) =>{
         console.log(data.data);
            setStudents(data.data)
            for (let index = 0; index < 6; index++) {
              const element = data.data[index];
          
          
          if (element === undefined || element.fname ==="") {
              console.log("not ok");
          }
          else{
          
            
            s.push(element)
            SetStudent(element)
            
          }
        
        }})
          .catch((err) => console.log(`Error: ${err}`));
        
          axios.get("http://localhost:8095/api/team/students/"+id)
.then((data) =>console.log(data.data))
.catch((err) => console.log(`Error: ${err}`));
      }, []);
console.log(students);
      return(
        <div>
           
         
    <body className="g-sidenav-show  bg-gray-200">
    <SideBar />
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
  <NavBar></NavBar>

      <div>
          <div className="AddStudent-Wrapper">
        <h1>Show Team:</h1>
        <div  className="AddStudent-Wrapper">
      
        <label className="label">Team Name :</label>
        <input type="text"    className="Add-Student-Input"  value={classes} disabled
 />

        </div>
        <label className='label' ><h2>Team Membres</h2></label>

        <table className="Table">
          <thead>
            <tr>
               <th>Fname</th> 
               <th>Fname</th>       
               <th>email</th>
               <th>Enrolled Class</th>   
            </tr>
          </thead>
          <tbody>{students.map(e=>(<tr><td>{e.fname}</td><td>{e.lname}</td><td>{e.email}</td><td>{e.EnrolledClass}</td></tr>))}</tbody>
        </table>

        </div>
      <ToastContainer />
          </div>
      
          </main>
    <Footer></Footer>
      </body>
      
        </div>
    )
}
      
