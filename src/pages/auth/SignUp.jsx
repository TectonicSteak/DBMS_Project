import { useState } from "react";
import supabase from "../../config/supabaseClient";
import { Link } from "react-router-dom";


const SignUp = () =>{
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [userType, setUserType] = useState('student'); // Default user type
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [teacherId, setTeacherId] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        if(!username || !password){
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

    
  return (
    <div className="signup-page h-screen flex flex-col items-center justify-center bg-gray-200">
      <h1 className="text-3xl mb-5">Sign Up</h1>
      <form className="w-1/3" onSubmit={handleSignup}>
        <div className="mb-4">
          <label className="text-lg mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded outline-none"
          />
        </div>

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

        {userType === 'student' && (
          <div className="mb-4">
            <label className="text-lg mb-2">Registration Number</label>
            <input
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded outline-none"
            />
          </div>
        )}

        {userType === 'teacher' && (
          <div className="mb-4">
            <label className="text-lg mb-2">Teacher ID</label>
            <input
              type="text"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded outline-none"
            />
          </div>
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