import { useContext } from "react";
import {Link,useNavigate} from "react-router-dom"
import supabase from "../../config/supabaseClient";
import {NavBar, NavBarStu } from "../util";

const StudentDashboard = () => {
    
    return (
        <>
            <NavBarStu />
            <div className="mainDash">
                <h1 className="text-lg">STUDENT Dashboard</h1>
            </div>
        </>
    )
}

export default StudentDashboard