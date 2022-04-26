import React, { useState, useEffect }  from 'react';
import FrontHeader from "./Header";
import axios from 'axios';
import "./styling.css"
export default function Sponsors()
{
    const [sponsors, setsponsors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [transactions,setTransaction]=useState([])
  
    useEffect(() => {
        fetch("http://127.0.0.1:5000/sponsors")
            .then(res => res.json())
            .then(
                (data) => {
                    setsponsors(data)
                    console.log(data)
                    setIsLoaded(true);
                  
                },
                (error) => {
                    //setIsLoaded(true);
                    setError(error);
                }
            )
      }, [setIsLoaded==true])
    var url="frontassets/images/"
    return  (
        <div>
        <FrontHeader></FrontHeader>
        <section class="meetings-page" id="meetings">
        <div class="container">
      <div class="row">
        
        
        {
        sponsors.filter(x=>x.sponsor_name!="").map(s => ( 
            <div class="column">
                  
                            
                              
                                <div class="meeting-item">
                                  <div class="thumb">
                                    <div class="price">
                                      <span>{s.sponsor_name}</span>
                                    </div>
                                    <a href="meeting-details.html"><img width="200" height="200" src={s.img} ></img>
                                    </a>
                                  </div>
                                 
                                
                                </div>
                              
                              </div>
                   
                    ))}
 </div></div> </section>   </div>             
    
    )

}