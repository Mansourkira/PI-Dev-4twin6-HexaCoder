import FrontHeader from "./Header";
import { useParams } from "react-router-dom";
import {useState,useEffect} from "react"
import axios from "axios";
import FooterFront from "./FooterFront";
import CarouselFront from "./Carousel";
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
    return(<div>
        <div  className="header-area header-sticky bg-dark">
      <div class="container">
          <div class="row">
              <div class="col-12">
                  <nav class="main-nav">
                     
                      <a href="index.html" class="logo">
                          Bal_Platf
                      </a>
                     
                      <ul class="nav">
                      <li class="scroll-to-section"><a href={"http://localhost:3000/vote:"+id} class="active">View Projects</a></li>
                          <li><a href={"http://localhost:3000/sponsors:"+id}>Our Sponsors</a></li>
                          <li class="scroll-to-section"><a href={"http://localhost:3000/upload:"+id}>upload project video</a></li>
                          <li class="has-sub">
                              <a href="javascript:void(0)">Pages</a>
                              <ul class="sub-menu">
                                  <li><a href="meetings.html">Upcoming Meetings</a></li>
                                  <li><a href="meeting-details.html">Meeting Details</a></li>
                              </ul>
                          </li>
                         
                          <li class="scroll-to-section"><a href="#contact">Contact Us</a></li> 
                      </ul>        
                      <a class='menu-trigger'>
                          <span>Menu</span>
                      </a>
                     
                  </nav>
              </div>
          </div>
      </div>
  </div>
 
  <CarouselFront/>
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
     <FooterFront></FooterFront>   
    </div>
    </div>)
}