import { useContext } from "react";
import {Link,useNavigate} from "react-router-dom"
import supabase from "../../config/supabaseClient";
import { UserContext } from "../../App";

const Dashboard = () => {
    const {user,setUser} = useContext(UserContext);
    
    return (
        <>
            <div className="mainDash">
                <h1>Dashboard</h1>
            </div>
        </>
    )
}

export default Dashboard