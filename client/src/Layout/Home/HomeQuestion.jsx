import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import { PropagateLoader } from 'react-spinners';
// Components
import Question from "../../Questions/Question/Question";
import SideBar from '../../Backoffice/SideBar';
import NavBar from '../../Backoffice/NavBar';
import Footer from '../../Backoffice/footer';
import { Link } from "react-router-dom";
import SearchQuestions from "../../Questions/SearchQuestion/SearchQuestions";
class HomeQuestion extends Component {
  state = {
    data: null,
    allQuestions: null,
    error: ""
  };

   async componentDidMount() {
    try {
      const questions = await axios.get("http://localhost:8095/api/questions");
      this.setState({ data: questions.data }); 
      console.log("dat",questions.data.question);
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  removeQuestion = async id => {
    try {
      const questionRemoved = await axios.delete(`http://localhost:8095/api/questions/${id}`);
      const question = await axios("http://localhost:8095/api/questions/");
      this.setState({ data: question.data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  searchQuestions = async username => {
    let allQuestions = [...this.state.data.question];
    if (this.state.allQuestions === null) this.setState({ allQuestions });

    let questions = this.state.data.questions.filter(({ questionText  }) =>
    questionText .toLowerCase().includes(username.toLowerCase())
    );
    if (questions.length > 0) this.setState({ data: { questions } });

    if (username.trim() === "")
      this.setState({ data: { questions: this.state.allQuestions} });
  };

  render() {
    let questions;
console.log(this.state.data);
    if (this.state.data)
      questions =
        this.state.data.question &&
        this.state.data.question.map(question=> (
          <Question key={question._id} {...question} removeQuestion={this.removeQuestion} />
        ));

         if (this.state.error) return <h1>{this.state.error}</h1>;
    if (this.state.data !== null)
      if (!this.state.data.question.length)
        return <h1 className="No-Students">No teachers!</h1>;
    
console.log("this",questions);


    return (     
      <div>
      <body className="g-sidenav-show  bg-gray-200">
      <SideBar />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    <NavBar></NavBar>
 
      

      <div className="Table-Wrapper">
        <h1>Question:</h1>
        <SearchQuestions searchQuestions={this.searchQuestions} />
        <div style={{display:"flex"}}> 
        <Link to="/addQuestion" exact>
        <button  className="btn btn-success" style={{justifyContent : "flex-end"}}>Add Question</button>
        </Link>
        </div>
        <table className="Table">
          <thead>
            <tr>
              
              <th>questionText</th>
             
           
          
         
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{questions}</tbody>
        </table>
      </div>
  
    
    </main>
    <Footer></Footer>
      </body>
      </div>

    );
  }
}

export default HomeQuestion;
