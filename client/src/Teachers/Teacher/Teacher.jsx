import React from 'react';
import './Teacher.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Teacher = ({ _id, userName, email,password, tuto,poste,project, removeTeacher }) => {
//const [Classa , setCLASS] = React.useState('');
  // axios.get("http://localhost:3000/api/class/"+EnrolledClass)
  //     .then((data) =>setCLASS(data.data.classe.ClassName))
  //     .catch((err) => console.log(`Error: ${err}`));

  return(
    <tr>
    
      <td>{userName}</td>
      <td>{ email }</td> 
      <td>{ password }</td> 
      <td>{ poste }</td> 
    
      


      <td>
        <button onClick={ () => removeTeacher(_id) } className="Action-Button fa fa-trash"></button>
        <Link to={{pathname:`/editTeacher/${_id}`}}>
         <button className="Action-Button fa fa-pencil"></button>
        </Link>
         <Link to={{pathname:`/detailsTeacher/${_id}`}}>
         <button className="Action-Button fa fa-search-plus"></button>
        </Link>
      </td>

    </tr>
  );
};

export default Teacher;
