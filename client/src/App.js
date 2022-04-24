import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Switch,Link  ,Route } from 'react-router-dom';

import ContDash from './Backoffice/ContDash';

import FrontPage from './FrontOffice/Frontpge';

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
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
}
  from "./redux/actions/authAction"
  import Header from "./components/header/Header";
  import Body from "./components/body/Body";
import axios from 'axios';
import Login from './components/body/auth/Login';
import StudentPortal from './Backoffice/StudentPortal';
import Register from './components/body/auth/Register';
import ForgotPassword from './components/body/auth/ForgotPassword';
import UpdateProject from './Backoffice/UpdateProject';



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
          <Header></Header>
          <Switch>
          <Route path='/forgot_password' element={<ForgotPassword></ForgotPassword>}><ForgotPassword></ForgotPassword></Route>
          <Route path="/Studentportal" element={<StudentPortal/>}><StudentPortal/></Route>
          <Route path='/login' element={<Login/>}><Login/></Route>
          <Route path='/register' element={<Register/>}><Register/></Route>
          <Route path='/BackofficeTeacher:id' element={<TeacherDash />} ><ContDash/></Route>
          <Route path='/Front:id' element={<FrontPage />} ><FrontPage/></Route>
          <Route path='/vote:id' element={<VotingInterface />}><VotingInterface/></Route>
          <Route path='/sponsors:id' element={<Sponsors />} exact><Sponsors /></Route>
          <Route path='/BackofficeAdmin' element={<AdminDash />}><AdminDash/></Route>
          <Route path='/selector' element={<Selector />}exact><Selector /></Route>
          <Route path ='/simansour' element={<Home/>}exact><Home/></Route>
          <Route path='/add' element={<AddStudent/>}exact><AddStudent/></Route>
          <Route path ='/student' element={<Home/>}exact><Home/></Route>
          <Route path ='/edit:id' element={<EditStudent/>}exact><EditStudent/></Route>
          <Route path="/upload:id" element={<Upload/>}exact><Upload/></Route>
          <Route path="/update:id" element={<UpdateProject/>}exact><UpdateProject/></Route>
          </Switch>
          </div>

        </BrowserRouter>
    </div>
  );
}

export default App;
