import React, { useState } from "react";
import supabase from "../../config/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../util/TextInput";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('student');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [Class, setClass] = useState('');
  const [semester, setSemester] = useState('');
  const [rollno, setRollno] = useState();
  const [dept, setDept] = useState('');
  const departments = [[1, 'Computer Science and Engineering'],
  [2, 'Electrical and Electronics Engineering'],
  [3, 'Electronics and Communcation Engineering'],
  [4, 'Electronics and Biomedical Engineering']
  ];

  const classes = ['A', 'B', 'C', 'U']

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || (userType === 'student' && (!registrationNumber || !Class || !semester || !dept)) || (userType === 'teacher' && !teacherId)) {
      toast.error("Please fill in all required fields", {
        autoClose: 1500,
        position: "bottom-right"
      });
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid Gmail address", {
        autoClose: 1500,
        position: "bottom-right"
      });
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be having 6 or more characters", {
        autoClose: 1500,
        position: "bottom-right"
      });
      return;
    }

    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error(error.message);
        return;
      }

      const arr = name.split(" ");

      if (userType === 'student') {
        const { data: { user } } = await supabase.auth.getUser()

        const { data, error } = await supabase
          .from('Student')
          .insert([
            {
              f_name: arr[0],
              l_name: arr.slice(1).join(" "),
              reg_id: registrationNumber,
              user_id: user.id,
              class: Class,
              semester: semester,
              department: dept,
              roll_no: rollno
            }
          ])
          .select();

        handleSignupResponse(data, error);
      } else if (userType === 'teacher') {
        const { data: { user } } = await supabase.auth.getUser()
        const { data, error } = await supabase
          .from('Teacher')
          .insert([
            {
              f_name: arr[0],
              l_name: arr.slice(1).join(" "),
              teacher_id: teacherId,
              user_id: user.id,
            }
          ])
          .select();

        handleSignupResponse(data, error);
      }

    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  const handleSignupResponse = (data, error) => {
    if (error) {
      console.error('Error inserting data:', error.message);
    } else {
      toast.success('Signed Up', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        navigate(userType === 'student' ? "/student_dashboard/student_profile" : "/teacher_dashboard/teacher_profile");
      }, 3000);
    }
  };

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    return regex.test(email);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-300">
      <h1 className="text-6xl font-bold text-gray-700 mb-8 mt-8">Sign Up</h1>
      <form className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md" onSubmit={handleSignup}>

        <div className="mb-4">
          <label className="block text-xl font-medium text-gray-600 mb-2">Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-xl font-medium text-gray-600 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-xl font-medium text-gray-600 mb-2">Password</label>
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-xl font-medium text-gray-600 mb-2">User Type</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        {userType === 'student' && (
          <div>
            <div className="mb-4">
              <label className="block text-xl font-medium text-gray-600 mb-2">Registration Number</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-xl font-medium text-gray-600 mb-2">Roll No</label>
              <input
                type="number"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
                value={rollno}
                onChange={(e) => setRollno(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-xl font-medium text-gray-600 mb-2">Class:</label>
              <select
                value={Class}
                onChange={(e) => setClass(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="" disabled>Select Class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-xl font-medium text-gray-600 mb-2">Semester:</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="" disabled>Select Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>{sem}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-xl font-medium text-gray-600 mb-2">Department:</label>
              <select
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="" disabled>Select Department</option>
                {departments.map((dept) => (
                  <option key={dept[0]} value={dept[0]}>{dept[1]}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {userType === 'teacher' && (
          <div className="mb-4">
            <label className="block text-xl font-medium text-gray-600 mb-2">Teacher ID</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded cursor-pointer transition duration-300"
        >
          Sign Up
        </button>
      </form>
      <Link to='/' className="text-blue-500 font-medium mt-5 hover:text-blue-600 transition duration-300 mb-10">
        Already Registered?
      </Link>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default SignUp;
