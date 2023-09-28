import { useState } from "react";
import supabase from "../../config/supabaseClient";
import "./login.css"
import { Link } from "react-router-dom";


const Login = () =>{

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
        }

    }

    return(
        <>
            <div className="login-box-form">
                <div className="login-left">
                    <div className="login-overlay">
                        <h1>Std.Hub</h1>
                        <p>One stop solution for Student Data Management</p>
                    </div>
                </div>
                    <div className="login-right">
                        <h5>Login</h5>
                        <span>Don't have an account?<Link to={"/signup"}>Create an account</Link> it takes less than a minute</span>
                        <div className="login-inputs">
                            <input type="text" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}}/>
                            <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                            <select>
                                <option value="Student">Student</option>
                                <option value="Teacher">Teacher</option>
                            </select>
                        </div>
                        <div className="login-forgot-password">
                            <p><a>Forgot password?</a></p>
                        </div>
                        <button onClick={handleSubmit}>Login</button>
                    </div>                
            </div>
            
        </>
    );
}

export default Login