import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import supabase from "../../config/supabaseClient";

import { AttendanceTable, NavBar, NavBarStu } from "../util";


const Attendance = () => {
    return (
        <div>
            <NavBarStu />
            Attendance
            <AttendanceTable />
        </div>
    )
}

export default Attendance