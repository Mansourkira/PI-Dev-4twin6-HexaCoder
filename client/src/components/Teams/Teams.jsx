import NavBar from "../backOfiice/NavBar";
import SideBar from "../backOfiice/SideBar";
import Footer from "../backOfiice/footer";
import { useState } from "react";
import AddDeleteTableRows from './AddDeleteTableRows';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default function Teams()
{

    const [team , setTeam] = useState({team_Name : '' , membre :null,project :null });


     

   

    return (

        <div>
        <body className="g-sidenav-show  bg-gray-200">
        <SideBar />
        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    <NavBar></NavBar>
   
      
        <div  className="AddStudent-Wrapper">
        <h1>Teams</h1>
        <label className="label">Add Team Name :</label>
        <input type="text"     className="Add-Student-Input" require placeholder="Enter your Teams Name" />
        <AddDeleteTableRows />
        </div>

    </main>
    <Footer></Footer>
    </body>
    </div>
    );
}