import FrontHeader from "./Header";
import { useParams } from "react-router-dom";
import {useState,useEffect} from "react"
import axios from "axios";
export default function Upload()
{ 
    var  id=useParams()
    id=id.id.slice(1,id.id.length)
    const[project,setProject]=useState()
    const [vid,setvid]=useState("")
    useEffect(()=>{
        fetch("http://localhost:8095/projects/GetProject/"+id)
        .then(res => res.json())
        .then(
            (data) => {
                //setIsLoaded(true);
                setProject(data);
                console.log(data)
             
            },
            (error) => {
                //setIsLoaded(true);
                //setError(error);
            }
        )
    },[])
    const handlchange = event =>{
        setvid({vid:event.target.files[0].name})
        console.log(vid)
      }
      const handleSubmit = event =>{
        event.preventDefault();
       
        console.log(vid)
       var url = "http://localhost:8095/projects/GetProjectByStudent/"+id+"/"+vid.vid
      axios.put(url,{
        method: 'PUT',     
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }})
      .then(res => {
        console.log(res); 
        console.log(res.data);
      })
     // history('/dashboard')*/
      }
    return(<div><FrontHeader></FrontHeader>
    <div>
    <section class="meetings-page" id="meetings">
        <div class="container">
          <div class="row">
          <div className="col-12">
                  <label for="inputAddress" className="form-label">Marketingvid</label>
                  <input type="file" id="myFile" name="filename" onChange={handlchange}></input>
                </div><br></br>

                <div className="text-center">
                  <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>
          </div>
        </div>
    </section>  
        
    </div>
    </div>)
}