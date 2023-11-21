import {React,useContext}from 'react'
import { Outlet} from 'react-router-dom'
import Login from './pages/auth/Login'
import supabase from './config/supabaseClient'

const useAuth = async () =>{
    const currUser = await supabase.auth.getUser();
    const isTeacher =  await supabase.from('Teacher').select('*').eq('user_id',currUser.data.user.id);
    if(isTeacher.data.length!=0 && currUser){
        return true
    }
    return false
}

function TeacherProtectedRoutes(props) {
    const isAuth = useAuth();
    return isAuth 
    ? <>
        <Outlet/>
    </>
    
    : <Login/>;
}

export default TeacherProtectedRoutes