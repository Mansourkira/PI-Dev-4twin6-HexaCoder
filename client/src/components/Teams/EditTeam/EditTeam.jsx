import {Link, useParams} from 'react-router-dom';
import SideBar from '../../../Backoffice/SideBar'
import NavBar from '../../../Backoffice/NavBar'
import { ToastContainer } from 'react-toastify';
import Footer from '../../../Backoffice/footer'
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

export default function EditTeam()
{
    var {id} = useParams();
    const [TeamN , setTeamN]=useState('');
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
var membres =[]
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
            for (let index = 0; index < 6; index++) {
              const element = data.data[index];
          
          
          if (element === undefined || element.fname ==="" || element===null) {
              console.log("not ok");
          }
          else{
          
            setStudents(data.data)

            
            
          }
        
        }})
          .catch((err) => console.log(`Error: ${err}`));

          axios.get('http://localhost:8095/api/team/class/'+id)
.then((data) =>SetClasses(data.data.classN.ClassName))
.catch((err) => console.log(`Error: ${err}`));
      }, []);
const handleRemove = (id) => {
  const newStudents = students.filter((student) => student._id !== id);

  setStudents(newStudents);
  console.log(student);
};

const updateTeam = () =>{

  students.map(e=>{
    if(e._id !=="")
    {
    membres.push(e._id)
    }
  })
  const Team = {
    teamName:TeamN,
    membres:membres,
    createdAt: "2022-04-02T19:51:13.810Z",
    updatedAt: "2022-04-02T19:51:13.810Z",
    __v: 0
}
  
  console.log(Team);
s=  JSON.stringify(Team)
console.log(s);
  axios.put('http://localhost:8095/api/team/update/'+id,Team)
  console.log(s);
}

      return(
        <div>
           
         
    <body className="g-sidenav-show  bg-gray-200">
    <SideBar />
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
  <NavBar></NavBar>

      <div>
          <div className="AddStudent-Wrapper">
        <h2>Edit Team Name:</h2>
        <div  className="AddStudent-Wrapper">
      
        <label className="label">Team Name :</label>
        <input type="text" className="Add-Student-Input"  value={classes} onChange={e =>setTeamN({...TeamN,teamName :e.target.value})}
 />

        </div>
        <label className='label' ><h2>Edit Team Membres</h2></label>

        <table className="Table">
          <thead>
            <tr>
               <th>Fname</th> 
               <th>Fname</th>       
               <th>email</th>
               <th>Enrolled Class</th>   
               <th>Actions</th>
            </tr>
          </thead>
          <tbody>{students.filter(v => v !== null).map(e=>(<tr><td>{e.fname}</td><td>{e.lname}</td><td>{e.email}</td><td>{e.EnrolledClass}</td><td>
          <button onClick={() => handleRemove(e._id)} className="Action-Button fa fa-trash"></button>

            </td></tr>))}</tbody>
        </table>
        <Link to="/teams" exact>
        <button  className="btn btn-success" onClick={() => updateTeam()}style={{justifyContent : "flex-end"}}>Update Team</button>
        </Link>        </div>
      <ToastContainer />
          </div>
      
          </main>
    <Footer></Footer>
      </body>
      
        </div>
    )
}
      
