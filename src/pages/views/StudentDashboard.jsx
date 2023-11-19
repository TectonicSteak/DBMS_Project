import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import supabase from "../../config/supabaseClient";
import { NavBar, NavBarStu } from "../util";



const StudentDashboard = () => {

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const { data: sessionData, error } = await supabase.auth.getUser()
                console.log(sessionData);
            }
            catch (error) {
                if (error) {
                    console.log("Error loading Session data : ", error.message);
                }
            }
        }
        fetchSessionData()
    }, [])


    return (
        <div className='bg-slate-300 h-screen'>
            <NavBarStu />
            <div className="mainDash">
                <h1 className="text-lg">STUDENT Dashboard</h1>
            </div>
        </div>
    )
}

export default StudentDashboard