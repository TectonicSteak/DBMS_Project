import {Link,useNavigate} from "react-router-dom"
import supabase from "../../config/supabaseClient";
import NavBar from "./NavBar";

const Profile = () => {

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

