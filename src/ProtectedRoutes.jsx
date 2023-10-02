import {React,useContext}from 'react'
import { Outlet} from 'react-router-dom'
import Login from './pages/auth/Login'
import { UserContext } from './App'

const useAuth = async () =>{
    const user = useContext(UserContext);
    return user && user.loggedIn;
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