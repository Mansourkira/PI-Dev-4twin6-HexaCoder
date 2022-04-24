import { useEffect} from "react";
import { useState } from "react";
export default function Selector()
{

  
        const [selectedClient,setSelectedClient] = useState([]);
    
        function handleSelectChange(event) {
            event.preventDefault()
            setSelectedClient(event.target.value);
            alert(event.target.value)
            console.log(selectedClient)
        }
    return ( <select  value={selectedClient} onChange={handleSelectChange}> //set value here
    {selectedClient}
    <option  value="one">One</option>
    <option value="two">Two</option>
    <option  value="three">Three</option>
    
</select>)
}