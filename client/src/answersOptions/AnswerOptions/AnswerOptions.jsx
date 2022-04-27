import React from 'react';
import './Student.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AnswerOptions = ({ _id, answerText,isCorrect , questions, removeanswerOptions }) => {
const [Classa , setCLASS] = React.useState('');
  axios.get("http://localhost:8095/api/questions/"+questions)
      .then((data) =>setCLASS(data.data.question.questionText))
      .catch((err) => console.log(`Error: ${err}`));

  return(
    <tr>
      <td>{answerText }</td>
      <td>{isCorrect}</td>
      <td>{questions}</td>
      
      <td>{Classa}</td> 


      <td>
        <button onClick={ () => removeanswerOptions(_id) } className="Action-Button fa fa-trash"></button>
        <Link to={{pathname:`/edit:${_id}`}}>
         <button className="Action-Button fa fa-pencil"></button>
        </Link>
      </td>

    </tr>
  );
};

export default AnswerOptions;
