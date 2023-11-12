import { useState,useContext } from "react";
import supabase from "../../config/supabaseClient";
import { Link, useNavigate} from "react-router-dom";
import { UserContext } from "../../App";

const Login = () =>{
    const navigate =  useNavigate();
    const {user,setUser} = useContext(UserContext);

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [userType, setUserType] = useState('student');

    const handleLogin = async (e) => {
        e.preventDefault();

        if(!username || !password){
            return;
        }

        const {data, error} = await supabase
        .from("loginTest")
        .update({'loggedIn':true})
        .eq('username',username)
        .select()


        if(error){
            console.log(error)
        }
        if(data){
            console.log(data)
            if(!user.loggedIn){
                setUser({username : username,loggedIn : true})
                console.log(user)

            }
            navigate("/dashboard")
            console.log(user)
        }

    }

    return (
        <div className="login-page h-screen flex flex-col items-center justify-center bg-gray-200">
        <h1 className="text-3xl mb-5">Login</h1>
        <form className="w-1/3" onSubmit={handleLogin}>
            <div className="mb-4">
            <label className="text-lg mb-2">Username</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded outline-none"
            />
            </div>
    
            <div className="mb-4">
            <label className="text-lg mb-2">User Type</label>
            <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full px-3 py-2 border rounded outline-none"
            >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
            </select>
            </div>
    
            <div className="mb-4">
            <label className="text-lg mb-2">Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded outline-none"
            />
            </div>
    
            <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer"
            >
            Login
            </button>
        </form>
    
        <Link to='/signup' className="forgot-password text-blue-500 mt-4 cursor-pointer">
            No Account?
        </Link>
    
        <p className="forgot-password text-blue-500 mt-4 cursor-pointer">
            Forgot password?
        </p>
        </div>
      );
}

export default Login