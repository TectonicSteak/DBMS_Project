import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import supabase from "../../config/supabaseClient";

import { NavBar, NavBarStu } from "../util";


const Attendance = () => {
    return (
        <div>
            <NavBarStu />
            Attendance
        </div>
    )
}

export default Attendance