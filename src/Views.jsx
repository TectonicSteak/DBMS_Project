import React from "react";
import { Route,Routes,Link } from "react-router-dom";
import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import ProtectedRoutes from "./ProtectedRoutes";
import Profile from "./pages/util/Profile";
import StudentDashboard from "./pages/util/StudentDashboard";
import TeacherDashboard from "./pages/util/TeacherDashboard";

const Views = () =>{
    return(
        <>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/signup' element={<SignUp/>}/>
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