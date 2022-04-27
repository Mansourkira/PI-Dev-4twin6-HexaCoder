import React from 'react';
import './Question.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Question = ({ _id, questionText, removeQuestion }) => {
//const [Classa , setCLASS] = React.useState('');
  // axios.get("http://localhost:3000/api/class/"+EnrolledClass)
  //     .then((data) =>setCLASS(data.data.classe.ClassName))
  //     .catch((err) => console.log(`Error: ${err}`));

  return(
    <tr>
    
      <td>{questionText}</td>
   
    
    
      


      <td>
        <button onClick={ () => removeQuestion(_id) } className="Action-Button fa fa-trash"></button>
        <Link to={{pathname:`/editQuestion/${_id}`}}>
         <button className="Action-Button fa fa-pencil"></button>
        </Link>
         <Link to={{pathname:`/detailsQuestion/${_id}`}}>
         <button className="Action-Button fa fa-search-plus"></button>
        </Link>
      </td>

    </tr>
  );
};

export default Question;
