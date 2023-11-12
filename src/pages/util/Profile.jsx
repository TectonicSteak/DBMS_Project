import { useContext } from "react";
import {Link,useNavigate} from "react-router-dom"
import supabase from "../../config/supabaseClient";
import { UserContext } from "../../App";
import NavBar from "./NavBar";

const Profile = () => {
    const {user,setUser} = useContext(UserContext);

    return(
        <>
            <NavBar/>
            <div className="Profile">
                <h1>Profile</h1>
            </div>
        </>
    )
}

export default Profile

