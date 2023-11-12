import { useContext } from "react";
import {Link,useNavigate} from "react-router-dom"
import supabase from "../../config/supabaseClient";
import { UserContext } from "../../App";
import NavBar from "./NavBar";
import "./dashboard.css"

const Dashboard = () => {
    const {user,setUser} = useContext(UserContext);
    
    return (
        <>
            <NavBar/>
            <div className="mainDash">
                <h1 className="dash">Dashboard</h1>
            </div>
        </>
    )
}

export default Dashboard