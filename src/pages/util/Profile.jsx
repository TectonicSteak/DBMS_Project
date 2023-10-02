import { useContext } from "react";
import {Link,useNavigate} from "react-router-dom"
import supabase from "../../config/supabaseClient";
import { UserContext } from "../../App";
import NavBar from "./NavBar";

const Profile = () => {
    const {user,setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const logOut = async () => {
        setUser({userloggedIn:false})

        const {data,error} = await supabase
            .from('loginTest')
            .update({'loggedIn' : false})
            .eq('username',user.username)
            .select();

        if(data){
            console.log(user)
            navigate("/")
        }
    }


    return(
        <>
            <div className="Profile">
                <h1>Profile</h1>
                <button onClick={logOut}>Log Out</button>
            </div>
        </>
    )
}

export default Profile

