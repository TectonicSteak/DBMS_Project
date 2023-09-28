import { useState } from "react";
import supabase from "../../config/supabaseClient";
import "./signup.css"
import { Link } from "react-router-dom";


const SignUp = () =>{

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
            <div className="signup-box-form">
                <div className="signup-left">
                    <div className="signup-overlay">
                        <h1>Std.Hub</h1>
                        <p>One stop solution for Student Data Management</p>
                    </div>
                </div>
                    <div className="signup-right">
                        <h5>Sign Up</h5>
                        <p>Already have an account? <Link to={"/"}>Login</Link></p>
                        <div className="signup-inputs">
                            <input type="text" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}}/>
                            <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                            <input type="text" placeholder="Register Number" onChange={(e) => {}}/>
                            <input type="text" placeholder="" onChange={(e) => {}}/>
                        </div>
                        <button onClick={handleSubmit}>Sign Up</button>
                    </div>                
            </div>
            
        </>
    );
}

export default SignUp