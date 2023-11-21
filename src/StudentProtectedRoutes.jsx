import {React,useContext}from 'react'
import { Outlet} from 'react-router-dom'
import Login from './pages/auth/Login'
import supabase from './config/supabaseClient'

const useAuth = async () =>{
    const currUser = await supabase.auth.getUser();
    const isStudent =  await supabase.from('Student').select('*').eq('user_id',currUser.data.user.id);
    if(isStudent.data.length!=0 && currUser){
        return true
    }
    return false
}

function StudentProtectedRoutes(props) {
    const isAuth = useAuth();
    return isAuth 
    ? <>
        <Outlet/>
    </>
    
    : <Login/>;
}

export default StudentProtectedRoutes