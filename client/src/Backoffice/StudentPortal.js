import axios from "axios";
import { useEffect,useState } from "react";
import { useHistory } from "react-router-dom";
export default function StudentPortal()
{

    const [Email,SetEmail]=useState("");
    const [Password,SetPassword]=useState("")
    const[project,setProject]=useState()
    const handleChangeOnEmail =  event =>{
     // event.preventDefault()
      SetEmail({Email:event.target.value})
    }
    const navigate = useHistory();
    const handleChangeOnPassword =event =>{
        event.preventDefault()
        SetPassword({Password:event.target.value})
    }
    const HandleSubmit = event =>{
        event.preventDefault()
        axios.get("http://localhost:8095/api/students/loginstudent/"+Email.Email+"/"+Password.Password).then((res)=>{console.log(res.data)
                 navigate.push("/Front:"+res.data[0]._id);   
            })
    }
    useEffect(()=>e=>{
    
       // console.log(Email.Email+""+Password.Password)
      
    })
     return(
        <div className="login_page">      
  <form>   
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChangeOnEmail} placeholder="Enter email"></input>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handleChangeOnPassword}></input>
  </div>
  
  <button type="submit" class="btn btn-primary" onClick={HandleSubmit}>Submit</button>
</form>
</div>
     
     )
}