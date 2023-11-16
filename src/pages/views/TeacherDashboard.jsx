import { useContext } from "react";
import {Link,useNavigate} from "react-router-dom"
import supabase from "../../config/supabaseClient";
import NavBar from "../util/NavBar";

const TeacherDashboard = () => {
    
    return (
        <>
            <NavBar/>
            <div className="mainDash">
                <h1 className="font-lg">TEACHER Dashboard</h1>
            </div>
        </>
    )
}

export default TeacherDashboard