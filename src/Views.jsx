import React from "react";
import { Route,Routes,Link } from "react-router-dom";
import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import ProtectedRoutes from "./ProtectedRoutes";
import Profile from "./pages/views/Profile";
import StudentDashboard from "./pages/views/StudentDashboard";
import TeacherDashboard from "./pages/views/TeacherDashboard";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

const Views = () =>{
    return(
        <>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/forgot_password' element={<ForgotPassword/>}/>
                <Route path='/reset_password' element={<ResetPassword/>}/>
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/student_dashboard" element={<StudentDashboard/>}/>
                    <Route path="/teacher_dashboard" element={<TeacherDashboard/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default Views;  