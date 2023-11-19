import React from "react";
import { Route,Routes,Link } from "react-router-dom";
import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import ProtectedRoutes from "./ProtectedRoutes";
import { SemReports, Report, Attendance, UpdateMarks, UpdateAttendance, StudentProfile, TeacherProfile, StudentDashboard, TeacherDashboard } from './pages/views'

import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import MarkEntry from "./pages/views/MarkEntry";


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
                    <Route path="/student_dashboard/student_profile" element={<StudentProfile/>}/>
                    <Route path="/teacher_dashboard/teacher_profile" element={<TeacherProfile/>}/>
                    <Route path="/student_dashboard/attendance" element={<Attendance />} />
                    <Route path="/student_dashboard/report" element={<Report />} />
                    <Route path="/student_dashboard/report/:semester" element={<SemReports />} />
                    <Route path="/teacher_dashboard/mark_entry" element={<MarkEntry/>}/>
                    <Route path="/teacher_dashboard/update_marks" element={<UpdateMarks/>}/>
                    <Route path="/teacher_dashboard/update_attendence" element={<UpdateAttendance/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default Views;  