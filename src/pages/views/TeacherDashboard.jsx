import { useContext } from "react";
import {Link,useNavigate} from "react-router-dom"
import supabase from "../../config/supabaseClient";
import NavBarTeach from "../util/NavBarTeach";

const TeacherDashboard = () => {
    
    return (
        <>
            <NavBarTeach/>
            <div className="">
                <h1 className="font-lg">TEACHER Dashboard</h1>
            </div>
        </>
    )
}

export default TeacherDashboard