import { useContext } from "react";
import {Link,useNavigate} from "react-router-dom"
import supabase from "../../config/supabaseClient";
import NavBar from "../util/NavBar";

const StudentDashboard = () => {
    
    return (
        <>
            <NavBar/>
            <div className="mainDash">
                <h1 className="text-lg">STUDENT Dashboard</h1>
            </div>
        </>
    )
}

export default StudentDashboard