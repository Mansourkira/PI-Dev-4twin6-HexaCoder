import React, { useState } from 'react';
import './Team.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Team = ({ _id, team_Name, EnrolledClass, removeTeam }) => {
const [classes , SetClasses] = useState('');
axios.get('http://localhost:8095/api/team/class/'+_id)
.then((data) =>SetClasses(data.data.classN.ClassName))
.catch((err) => console.log(`Error: ${err}`));
  return(
    <tr>
      
      <td>{team_Name }</td>
  
    <td>Projet 2</td>
    <td>{classes}</td>
    <td>
    <Link to={{pathname:`/view/team/${_id}`}}>
    <button onClick={ () => removeTeam(_id) } className="Action-Button fa fa-eye"></button>
</Link>
   <Link to={{pathname:`teams`}}>

        <button onClick={ () => removeTeam(_id) } className="Action-Button fa fa-trash"></button>
        </Link>
        <Link to={{pathname:`/edit/team/${_id}`}}>
         <button className="Action-Button fa fa-pencil"></button>
        </Link>
      </td>
    </tr>
  );
};

export default Team;
