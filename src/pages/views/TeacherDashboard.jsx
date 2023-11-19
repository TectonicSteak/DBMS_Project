import { useContext } from "react";
import {Link,useNavigate} from "react-router-dom"
import supabase from "../../config/supabaseClient";
import NavBarTeach from "../util/NavBarTeach";

const TeacherDashboard = () => {
    
    return (
        <div className='bg-slate-300 h-screen'>
            <NavBarTeach/>
            <div className="">
                <h1 className="font-lg">TEACHER Dashboard</h1>
            </div>
        </div>
    )
}

export default TeacherDashboard