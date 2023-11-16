import {Link,useNavigate} from "react-router-dom"
import supabase from "../../config/supabaseClient";
import {NavBar, NavBarStu } from "../util";

const Profile = () => {

    return(
        <>
            <NavBarStu />
            <div className="Profile">
                <h1>Profile</h1>
            </div>
        </>
    )
}

export default Profile

