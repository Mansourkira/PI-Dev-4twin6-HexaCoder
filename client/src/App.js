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
