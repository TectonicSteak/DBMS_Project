import { useState,useContext } from "react";
import supabase from "../../config/supabaseClient";
import "./login.css"
import { Link, useNavigate} from "react-router-dom";
import { UserContext } from "../../App";

const Login = () =>{
    const navigate =  useNavigate();
    const {user,setUser} = useContext(UserContext);

    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [formError,setFormError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!userName || !password){
            setFormError("Fill all fields properly");
            return;
        }

        const {data, error} = await supabase
        .from("loginTest")
        .update({'loggedIn':true})
        .eq('username',userName)
        .select()


        if(error){
            console.log(error)
        }
        if(data){
            console.log(data)
            if(!user.loggedIn){
                setUser({username : userName,loggedIn : true})
                console.log(user)

            }
            navigate("/dashboard")
            console.log(user)
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
                            <input type="text" placeholder="Username" onChange={(e) => {setUserName(e.target.value)}}/>
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