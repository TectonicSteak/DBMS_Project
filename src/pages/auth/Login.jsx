import { useState } from "react";
import supabase from "../../config/supabaseClient";
import "./login.css"


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
            <div className="box-form">
                <div className="left">
                    <div className="overlay">
                        <h1>Std.Hub</h1>
                        <p>One stop solution for Student Data Management</p>
                    </div>
                </div>
                    <div className="right">
                        <h5>Login</h5>
                        <p>Don't have an account? <a href="#">Creat Your Account</a> it takes less than a minute</p>
                        <div className="inputs">
                            <input type="text" placeholder="user name" onChange={(e) => {setUsername(e.target.value)}}/>
                            <input type="password" placeholder="password" onChange={(e) => {setPassword(e.target.value)}}/>
                        </div>
                        <div className="forgot-password">
                            <p><a>Forgot password?</a></p>
                        </div>
                        <button onClick={handleSubmit}>Login</button>
                    </div>                
            </div>
            
        </>
    );
}

export default Login