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
  const [rollno , setRollno] = useState();
  const [dept,setDept] = useState('');
  const departments = [[1,'Computer Science and Engineering'],
                       [2,'Electrical and Electronics Engineering'],
                       [3,'Electronics and Communcation Engineering'],
                       [4,'Electronics and Biomedical Engineering']
                      ];

  const classes = ['A','B','C','U']

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

    if(password.length < 6){
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
    <div className="h-screen flex flex-col items-center justify-center bg-slate-300">
      <h1 className="text-5xl font-semibold mb-5">Sign Up</h1>
      <form className="w-1/3" onSubmit={handleSignup}>
        <TextInput
          label="Name"
          value={name}
          function={setName}
        />

        <TextInput
          type="email"
          label="Email"
          value={email}
          function={setEmail}
        />

        <TextInput
          type="password"
          label="Password"
          value={password}
          function={setPassword}
        />

        <div className="mb-4">
          <label className="text-lg font-semibold  mb-2">User Type</label>
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
          <div>
            <TextInput
              label="Registration Number"
              value={registrationNumber}
              function={setRegistrationNumber}
            />

            <TextInput
              type="number"
              label="Roll No"
              value={rollno}
              function={setRollno}
            />

            <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">
                    Class:
                </label>
                <select
                    value={Class}
                    onChange={(e) => setClass(e.target.value)}
                    className="border rounded-md p-2 w-full"
                    >
                    <option value="" disabled>Select Class</option>
                    {classes.map((cls) => (
                        <option key={cls} value={cls}>{cls}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">
                    Class:
                </label>
                <select
                    value={Class}
                    onChange={(e) => setSemester(e.target.value)}
                    className="border rounded-md p-2 w-full"
                    >
                    <option value="" disabled>Select Semester</option>
                    {[1,2,3,4,5,6,7,8].map((sem) => (
                        <option key={sem} value={sem}>{sem}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">
                  Department:
              </label>
              <select
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  className="border rounded-md p-2 w-full"
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
          <TextInput
            label="Teacher ID"
            value={teacherId}
            function={setTeacherId}
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 font-semibold text-white py-2 px-4 rounded cursor-pointer"
        >
          Sign Up
        </button>
      </form>
      <Link to='/' className="text-blue-500 font-semibold mt-4 cursor-pointer">
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
