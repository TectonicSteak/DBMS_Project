import React, { useState, useContext } from "react";
import supabase from "../../config/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../util/TextInput";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { StudentDashboard } from "../views";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");

  const handleLogin = async (e) => {
    e.preventDefault();

    const isValidEmail = (email) => {
      const regex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
      return regex.test(email);
    };

    if (!isValidEmail(username) || !password) {
      toast.error("Please enter a valid Gmail address", {
        autoClose: 1500,
        position: "bottom-right",
      });
      return;
    }

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
      const currUser = await supabase.auth.getUser();

      const isStudent =  await supabase.from('Student').select('*').eq('user_id',currUser.data.user.id);
      const isTeacher =  await supabase.from('Teacher').select('*').eq('user_id',currUser.data.user.id);

      if (userType === "student" && isStudent.data.length!=0) {

          toast.success('Signed In', {
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
            navigate("/student_dashboard/report");
          }, 3000);

      } else if (userType === "teacher" && isTeacher.data.length!=0) {
        toast.success('Signed In', {
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
          navigate("/teacher_dashboard/update_attendence");
        }, 3000);
      } else{
        toast.error("User not Found", {
          autoClose: 1500,
          position: "bottom-right"
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-300">
      <h1 className="text-5xl font-semibold mb-5">Login</h1>
      <form className="w-1/3" onSubmit={handleLogin}>
        <TextInput label="Email" value={username} function={setUsername} />
        <div className="mb-4">
          <TextInput
            type="password"
            label="Password"
            value={password}
            function={setPassword}
          />
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

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer"
        >
          Login
        </button>
      </form>

      <Link
        to="/signup"
        className="text-blue-500 font-semibold mt-4 cursor-pointer"
      >
        No Account?
      </Link>

      <Link
        to="./forgot_password"
        className="text-blue-500 font-semibold mt-4 cursor-pointer"
      >
        Forgot password?
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
};

export default Login;
