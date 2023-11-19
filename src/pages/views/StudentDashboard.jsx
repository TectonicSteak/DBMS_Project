import { useContext } from "react";
import {Link,useNavigate} from "react-router-dom"
import supabase from "../../config/supabaseClient";
import {NavBar, NavBarStu } from "../util";

const StudentDashboard = () => {
    
    return (
        <div className='bg-slate-300 h-screen'>
            <NavBarStu />
            <div className="mainDash">
                <h1 className="text-lg">STUDENT Dashboard</h1>
            </div>
        </div>
    )
}

export default StudentDashboard