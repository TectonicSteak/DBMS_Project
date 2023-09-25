import { useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";


const Login = () =>{
    const navigate = useNavigate()

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [formError,setFormError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!username || !password){
            setFormError("Fill all fields properly");
            return;
        }

        const {data, error} = await supabase
            .from("loginTest")
            .select()

        if(error){
            console.log(error)
        }
        if(data){
            console.log(data)
            navigate("/dashboard");
        }

    }

    return(
        <>
            <div className="loginDiv">
                <form onSubmit={handleSubmit} className="loginForm">
                <div className="UserDiv">
                    <label className="UserLabel">Username</label>
                    <input type="text"onChange={(e) => {setUsername(e.target.value)}}/>
                </div>
                <div className="PassDiv">
                    <label className="PassLabel">Password</label>
                    <input type="text" onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                <button>Login</button>
                </form>
            </div>
        </>
    );
}

export default Login