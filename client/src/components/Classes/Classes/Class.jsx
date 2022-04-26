import React from 'react';
import './Class.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Class = ({ _id, ClassName, removeClass }) => {
 

  return(
    <tr>
      <td>{ClassName}</td>
  <td></td>

      <td>
        <button onClick={ () => removeClass(_id) } className="Action-Button fa fa-trash"></button>
        <Link to={{pathname:`/edit/classes/${_id}`}}>
         <button className="Action-Button fa fa-pencil"></button>
        </Link>
      </td>

    </tr>
  );
};

export default Class;
