import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import { PropagateLoader } from 'react-spinners';
// Components
import AnswerOptions from "../../answersOptions/AnswerOptions/AnswerOptions";

import SideBar from  '../../Backoffice/SideBar'
import NavBar from  '../../Backoffice/NavBar'
import Footer from  '../../Backoffice/footer'
import { Link } from "react-router-dom";
import SearchanswerOptions from "../../answersOptions/SearchanswerOptions/SearchanswerOptions";
class HomeAnswers extends Component {
  state = {
    data: [],
    allanswerOptions: null,
    error: ""

  };

  async componentDidMount() {
    try {
      axios.get("http://localhost:8095/api/answerOptions")
      .then((data) => {
        this.setState({ data : data.data.answerOptions })
        console.log("data",this.state.data)
      console.log(data.data.answerOptions)})
    
      console.log(this.state.data)
    } catch (err) {
      this.setState({ error: err.message });
    }




    
  }

  //  async componentDidMount() {
  //   try {
  //     const answerOptions = await axios.get("http://localhost:8095/api/answerOptions");
  //     this.setState({ data: answerOptions.data }); 
  //     console.log("dat",answerOptions.data.question);
  //   } catch (err) {
  //     this.setState({ error: err.message });
  //   }
  // }

  removeAnswerOptions = async id => {
    try {
      const answersRemoved = await axios.delete(`http://localhost:8095/api/answerOptions/${id}`);
      const answers = await axios("http://localhost:8095/api/answerOptions/")
      this.setState({data: answers.data });
     
    } catch (err) {
      this.setState({ error: err.message });
    }
  };


  //   removeQuestion = async id => {
  //   try {
  //     const questionRemoved = await axios.delete(`http://localhost:8095/api/questions/${id}`);
  //     const question = await axios("http://localhost:8095/api/questions/");
  //     this.setState({ data: question.data });
  //   } catch (err) {
  //     this.setState({ error: err.message });
  //   }
  // };


  

  // searchStudents = async username => {
  //   let allanswerOptions = [...this.state.data.data.answerOptions];
  //   if (this.state.allanswerOptions === null) this.setState({ allanswerOptions });
  //   console.log(this.state.data.answerOptions)
  //   let answerOptions =this.state.data.answerOptions.filter(({ fname }) =>
  //   fname.toLowerCase().includes(username.toLowerCase())
  //   );
  //   if (answerOptions.length > 0) this.setState({ data: { answerOptions } });

  //   if (username.trim() === "")
  //     this.setState({ data: { answerOptions: this.state.allanswerOptions } });
  // };

  render() {
    let students=[];

    if (this.state.data)
      students =
        this.state.data.answerOptions &&
        this.state.data.answerOptions.map(answerOptions => (
          <AnswerOptions key={answerOptions._id} {...answerOptions} removeanswerOptions={this.removeAnswerOptions} />
        ));
    

  

    return (     
      <div>
      <body className="g-sidenav-show  bg-gray-200">
      <SideBar />
      
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
      <NavBar></NavBar>
 
      

      <div className="Table-Wrapper">
       
        <h1>answerOptions:</h1>
        <SearchanswerOptions searchanswerOptions={this.searchanswerOptions} />
        <div style={{display:"flex"}}> 
        <Link to="/addAnswerOptions" exact>
        <button  className="btn btn-success" style={{justifyContent : "flex-end"}}>Add answerOptions</button>
        </Link>
        </div>
        <table className="Table">
          <thead>
            <tr>
              
              <th>answerText</th>
              <th>isCorrect</th>
           
              <th>questions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
           
            { this.state.data.map(answerOptions => (
          <AnswerOptions key={answerOptions._id} {...answerOptions} removeanswerOptions={this.removeanswerOptions} />
        ))}
          </tbody>
        </table>
      </div>
  
    
    </main>
    <Footer/>
      </body>
      </div>

    );
  }
}

export default HomeAnswers;
