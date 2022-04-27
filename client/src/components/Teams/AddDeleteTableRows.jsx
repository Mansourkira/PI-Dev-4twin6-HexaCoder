import React ,{ useState,useEffect} from "react"
import TableRows from "./TableRows"
import axios from "axios";
export default function AddDeleteTableRows(){

    const bool = false;

    const [rowsData, setRowsData] = useState([]);

    const [chosedClass , SetChosedClass] = useState({class_id : ""});
  
    const [classes , SetClasses] = useState([{ClassName:"",createdAt:"",membres:[],updatedAt:"",_id:"",__v:0}]);
    useEffect(() => {
        axios.get("http://localhost:8095/api/class")
      .then((data) =>SetClasses(data.data.classes))
      .catch((err) => console.log(`Error: ${err}`));
    }, []); 


    const change = () => 
    {
        this.bool = true;
    SetChosedClass({...chosedClass,class_id :document.querySelector("#lang").value});
    
    console.log(chosedClass);
    }

    const addTableRows = ()=>
    {
        //console.log(document.querySelector("#lang").value);
        SetChosedClass({...chosedClass,class_id :document.querySelector("#lang").value});
        console.log(chosedClass);
        const rowsInput={
            fullName:'',
            emailAddress:'',
            salary:''  
        } 
        setRowsData([...rowsData, rowsInput])
      
    }
   const deleteTableRows = (index)=>{
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
   }
 
   const handleChange = (index, evnt)=>{
    
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  
 
 
}




    return(
        <div className="container">
            <div className="row">
                <div className="col-sm-10" style={{marginLeft:120}}>

                <label className="label">Choose Class: </label>
             
                <div className="form-group"> 
                 <select className="form-control" required id="lang" >
                 <option>Choose Class</option>

                 {
                  classes.map(obj=>(

                   <option value={obj._id}  onChange={change}>{obj.ClassName}</option>
                  ))
            
                  }
            </select>
        </div>
        {!bool && <div>
<h1>Welcome</h1>
<p>Welcome to my home.</p>
</div>}


                <button className="btn btn-outline-success" onClick={addTableRows} >Add</button>
                <table className="table">
                    <thead>
                      <tr>
                          <th>Full Name</th>
                          <th>Email Address</th>
                          <th>Salary</th>

                      </tr>

                    </thead>
                   <tbody>

                   <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />

                   </tbody> 
                </table>

                </div>
                <div className="col-sm-4">

                </div>
            </div>
        </div>
    )

}

