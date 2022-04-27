import React from 'react'
import axios from 'axios'
import { useEffect } from 'react';

export default function ProjectsA() {
  
    useEffect(() => {

        axios.get("http://localhost:9111/api/project_branches/list?project=azeaze",
        {
            headers: {"Access-Control-Allow-Origin": "*"}
        }
        )
      
      .catch((err) => console.log(`Error: ${err}`));
  }, []);
  return (
    <div>
      <h1>OKKKKKK !!    </h1>
      <button onClick={test}></button>
    </div>
  )
}
