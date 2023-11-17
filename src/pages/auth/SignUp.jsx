import { useState } from "react";
import supabase from "../../config/supabaseClient";
import { Link } from "react-router-dom";
import TextInput from "../util/TextInput";


const SignUp = () =>{
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [userType, setUserType] = useState('student'); // Default user type
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [teacherId, setTeacherId] = useState('');

    const handleSignup = async (e) => {
      e.preventDefault();
  
      try {
        const { user, error } = await supabase.auth.signUp({
          email,
          password,
        });
      } catch (error) {
        console.error('Error signing up:', error.message);
      }
    };
  
    const createProfileInDatabase = async ({ username, email, password }) => {
      const { data, error } = await supabase
        .from('users')
        .insert([
          { username, email, password },
        ])
        .select();
  
      if (error) {
        console.error('Error creating user profile:', error.message);
      } else {
        console.log('User profile created successfully:', data);
      }
    };

    
  return (
    <div className="signup-page h-screen flex flex-col items-center justify-center bg-gray-200">
      <h1 className="text-3xl mb-5">Sign Up</h1>
      <form className="w-1/3" onSubmit={handleSignup}>
        <TextInput label="Name" value={username} function={setUsername} />

        <TextInput label="Email" value={email} function={setEmail} />

        <TextInput label="Password" value={password} function={setPassword} />
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

        {userType === 'student' && (
          <TextInput label="Registration Number" value={registrationNumber} function={setRegistrationNumber} />
        )}

        {userType === 'teacher' && (
          <TextInput label="Teacher ID" value={teacherId} function={setTeacherId} />
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer"
        >
          Sign Up
        </button>
      </form>
      <Link to='/' className="forgot-password text-blue-500 mt-4 cursor-pointer">
        Already Registered?
    </Link>
    </div>
  );
}

export default SignUp