import {React,useContext}from 'react'
import { Outlet} from 'react-router-dom'
import Login from './pages/auth/Login'
import { UserContext } from './App'
import supabase from './config/supabaseClient'

const useAuth = async () =>{
    const user = await supabase.auth.getUser();
    return user;
}

function ProtectedRoutes(props) {
    const isAuth = useAuth();
    return isAuth 
    ? <>
        <Outlet/>
    </>
    
    : <Login/>;
}

export default ProtectedRoutes