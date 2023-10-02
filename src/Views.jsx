import React from "react";
import { Route,Routes,Link } from "react-router-dom";
import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "./pages/util/Dashboard";
import Profile from "./pages/util/Profile";
import NavBar from "./pages/util/NavBar";

const Views = () =>{
    return(
        <>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default Views;  