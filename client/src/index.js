import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { render } from "react-dom";
import ContDash from './components/backOfiice/ContDash';
import Home from './components/Layout/Home/Home';
import AddStudent from './components/Students/AddStudent/AddStudent';
import EditStudent from './components/Students/EditStudent/EditStudent';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// c1

// c2


ReactDOM.render(
  <BrowserRouter>
  <Routes>
  <Route exact path="/student" element={ <Home />}  />
  <Route exact path="/add" element={<AddStudent />} />
  <Route exact path="/edit/:id" element={<EditStudent />} />

  <Route  exact path="/admin" element={<ContDash />} />
    <Route exact path="/" element={<App />} />
   
  </Routes>
</BrowserRouter>,
  document.getElementById('root')
);







/*  c3  */


reportWebVitals();
