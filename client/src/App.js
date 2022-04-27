import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Switch,Link  ,Route } from 'react-router-dom';

import ContDash from './Backoffice/ContDash';
import { Portal } from '@material-ui/core';
import FrontPage from './FrontOffice/Frontpge';
import FrontHeader from './FrontOffice/Header';
import VotingInterface from './FrontOffice/votingInterface';
import AdminDash from './Backoffice/AdminDash';
import Sponsors from './FrontOffice/Sponsors';
import TeacherDash from './Backoffice/TeacherDash';
import Selector from './Backoffice/selector';
import AddStudent from './Students/AddStudent/AddStudent';
import Student from './Students/Student/Student';
import Home from './Layout/Home/Home';
import EditStudent from './Students/EditStudent/EditStudent';
import Upload from './FrontOffice/uploadvideo';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux"
import HomeTeacher from './Layout/Home/HomeTeacher';
import AddTeacher from './Layout/Add/AddTeacher';
import EditTeacher from './Layout/Edit/EditTeacher';
import DetailsTeacher from './Teachers/DetailsTeacher/DetailsTeacher';
import DetailsQuestion from './Questions/DetailsQuestion/DetailsQuestion';


import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
}
  from "./redux/actions/authAction"
  import Header from "./components/header/Header";
  import Body from "./components/body/Body";
import axios from 'axios';

import HomeTeam from './Layout/Home/HomeTeam'
import AddTeam from './components/Teams/AddTeam/AddTeam'
import AddClass from './components/Classes/AddClass/AddClass'
import HomeClass from './Layout/Home/HomeClass'
import EditClass from './components/Classes/EditClass/EditClass'
import EditTeam from './components/Teams/EditTeam/EditTeam'
import ShowTeam from './components/Teams/ShowTeam/ShowTeam'
import ProjectsA from './components/ProjectsA/ProjectsA';
import HomeQuestion from './Layout/Home/HomeQuestion';
import HomeAnswerOptions from './Layout/Home/HomeAnswers';
import AddQuestion from './Layout/Add/AddQuestion';
import AddAnswerOptions from './Layout/Add/AddAnswer';
import EditQuestion from './Layout/Edit/EditQuestion';
import EditAnswerOptions from './Layout/Edit/EditAnswer';

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state)=> state.token);
  const auth = useSelector((state)=>state.auth);
  useEffect(()=> {
    const firstLogin = localStorage.getItem("firstlogin");
    if(firstLogin) {
      const getToken = async () => {
        const res = await axios.post("/user/refresh_token", null);
        dispatch({ type:"GET_TOKEN", payload: res.data.access_token });
      }
      getToken();
    }
  }, [auth.isLogged, dispatch]);
  useEffect(()=> {
    if(token) {
      const getUser = () => {
        dispatch(dispatchLogin());
        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        })
      }
      getUser();
    }




        (function(d, m){
        var kommunicateSettings = 
            {"appId":"1d4a29b9a0037251fbe73ad229b113851","popupWidget":true,"automaticChatOpenOnNavigation":true,
        
  "automaticChatOpenOnNavigation":true,
             "voiceOutput":true,"voiceInput":true,"emojilibrary":true,
             "voiceName":"Microsoft David Desktop - English (United States)", // Replace Google Deutsch with the voiceName or an array of voiceNames from the below mentioned table list
             "voiceRate":0,"locShare":true


      ,  
        };
        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
         kommunicateSettings.restartConversationByUser = true;
           
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
        window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, [token, dispatch] )
  return (
    

    
    
  
   <div>
      
           
               
     
      <BrowserRouter>
        <div className='App'>
           <Header/>
           <Body/>
          <Route path='/BackofficeTeacher' element={<ContDash />} ><ContDash/></Route>
          <Route path='/vote' element={<VotingInterface />}><VotingInterface/></Route>
          <Route path='/sponsors' element={<Sponsors />} exact><Sponsors /></Route>
          <Route path='/Frontoffice' element={<FrontPage />}><FrontPage/></Route>
          <Route path='/BackofficeAdmin' element={<AdminDash />}><AdminDash/></Route>
          <Route path='/selector' element={<Selector />}exact><Selector /></Route>
          <Route path ='/simansour' element={<Home/>}exact><Home/></Route>
          <Route path='/add' element={<AddStudent/>}exact><AddStudent/></Route>
          <Route path ='/student' element={<Home/>}exact><Home/></Route>
          <Route path ='/edit:id' element={<EditStudent/>}exact><EditStudent/></Route>
          <Route path="/upload:id" element={<Upload/>}exact><Upload/></Route>




          <Route path ='/teacher' element={<HomeTeacher/>}exact><HomeTeacher/></Route>
          <Route path ='/addTeacher' element={<AddTeacher/>}exact><AddTeacher/></Route>
          <Route path ="/editTeacher/:id" element={<EditTeacher/>}exact><EditTeacher/></Route>
          <Route path ="/detailsTeacher/:id" element={<DetailsTeacher/>}exact><DetailsTeacher/></Route>
          <Route path ="/projectsA" element={<ProjectsA/>}exact><ProjectsA/></Route>

    <Route path ='/question' element={<HomeQuestion/>}exact><HomeQuestion/></Route>
          <Route path ='/addQuestion' element={<AddQuestion/>}exact><AddQuestion/></Route>
          <Route path ="/editQuestion/:id" element={<EditQuestion/>}exact><EditQuestion/></Route>

          <Route path ="/detailsQuestion/:id" element={<DetailsQuestion/>}exact><DetailsQuestion/></Route>



           <Route path ='/answerOptions' element={<HomeAnswerOptions/>}exact><HomeAnswerOptions/></Route>
          <Route path ='/addAnswerOptions' element={<AddAnswerOptions/>}exact><AddAnswerOptions/></Route>
          <Route path ="/editAnswerOptions/:id" element={<EditAnswerOptions/>}exact><EditAnswerOptions/></Route>

         

  <Route path="/teams" element={<HomeTeam/>}exact><HomeTeam/></Route>


<Route path="/addTeam" element={<AddTeam/>}exact><AddTeam/></Route>

<Route path="/addClass" element={<AddClass/>}exact><AddClass/></Route>


<Route path="/classes" element={<HomeClass/>}exact><HomeClass/></Route>

<Route path ='/edit/classes/:id' element={<EditClass/>}exact><EditClass/></Route>



<Route path="/edit/team/:id" element={<EditTeam/>}exact><EditTeam/></Route>

<Route path="/view/team/:id" element={<ShowTeam/>}exact><ShowTeam/></Route>




          </div>
        </BrowserRouter>

       
    </div>
    
  );
}

export default App;
