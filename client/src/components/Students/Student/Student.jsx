import React from 'react';
import './Student.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Student = ({ _id, fname, lname, email,password, avatar , EnrolledClass, removeStudent }) => {
const [Classa , setCLASS] = React.useState('');
  axios.get("http://localhost:3000/api/class/"+EnrolledClass)
      .then((data) =>setCLASS(data.data.classe.ClassName))
      .catch((err) => console.log(`Error: ${err}`));

  return(
    <tr>
      <td>{fname }</td>
      <td>{lname}</td>
      <td>{ email }</td> 
      <td>{Classa}</td>


      <td>
        <button onClick={ () => removeStudent(_id) } className="Action-Button fa fa-trash"></button>
        <Link to={{pathname:`/edit/${_id}`}}>
         <button className="Action-Button fa fa-pencil"></button>
        </Link>
      </td>

    </tr>
  );
};

export default Student;
