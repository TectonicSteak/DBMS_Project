import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import supabase from "../../config/supabaseClient";

import { NavBar, NavBarStu } from "../util";


const Report = () => {
    return (
        <div>
            <NavBarStu />
            Report
        </div>
    )
}

export default Report