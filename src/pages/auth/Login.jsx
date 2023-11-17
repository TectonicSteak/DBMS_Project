import { useState,useContext } from "react";
import supabase from "../../config/supabaseClient";
import { Link, useNavigate} from "react-router-dom";
import { UserContext } from "../../App";
import TextInput from "../util/TextInput";

const Login = () =>{
    const navigate =  useNavigate();
    const {user,setUser} = useContext(UserContext);

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [userType, setUserType] = useState('student');

    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (!username || !password) {
          return;
        }
    
        try {
          const { user, error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password,
          });
    
          if (error) {
            console.error(error.message);
            return;
          }
    
          if (userType === 'student') {
            navigate('/student_dashboard')
          } else if (userType === 'teacher') {
            navigate('/teacher_dashboard')
          }
        } catch (error) {
          console.error(error.message);
        }
      };
    
    return (
        <div className="login-page h-screen flex flex-col items-center justify-center bg-gray-200">
        <h1 className="text-3xl mb-5">Login</h1>
        <form className="w-1/3" onSubmit={handleLogin}>
            <TextInput label="Email" value={username} function={setUsername} />
            <div className="mb-4">
            <TextInput type="password" label="Password" value={password} function={setPassword} />
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
    
        <Link to='./forgot_password' className="forgot-password text-blue-500 mt-4 cursor-pointer">
            Forgot password?
        </Link>
        </div>
      );
}

export default Login