import React, { useState, useEffect }  from 'react';
import FrontHeader from "./Header";
import axios from 'axios';
import "./styling.css"
import {useParams } from "react-router-dom"
import Footer from './FooterFront';
import FooterFront from './FooterFront';
import Carousel from './Carousel';
export default function Sponsors()
{
  var  id=useParams()
  id=id.id.slice(1,id.id.length)
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
        
        <section class="meetings-page" id="meetings">
        <div class="container">
      <div class="row">
        
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
      </div></div>
      <Carousel></Carousel>
        {
        sponsors.filter(x=>x.sponsor_name!="").map(s => ( 
            <div class="column">
                  
                
                                <div class="meeting-item">
                                  <div class="thumb">
                                    <div class="price">
                                      <span>{s.sponsor_name}</span>
                                    </div>
                                <a href={"https://www."+s.sponsor_name+".com"}><img width="200" height="200" src={s.img} ></img></a>
                                    
                                  </div>
                                 
                                
                                </div>
                              
                              </div>
                   
                    ))}
 </div></div> </section> <FooterFront></FooterFront>  </div>             
    
    )

}