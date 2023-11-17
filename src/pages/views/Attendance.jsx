import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import supabase from "../../config/supabaseClient";

import { AttendanceTable, NavBar, NavBarStu } from "../util";

const AttendanceCard = ({ percentage }) => {

    const textColor = percentage < 75 ? "#dc2626" : "#65a30d";

    return (
        <div className="card w-60 bg-base-100 shadow-xl border align-middle justify-center pt-4 mx-1 my-4 hover:scale-105 transition ease-in-out delay-100 hover:-translate-y-0">
            <div className="relative radial-progress mx-auto my-auto" style={{ "--value": "70", "--size": "8rem", "--thickness": "1rem", color: textColor }} role="progressbar">{percentage}%</div>
            <div className="card-body align-middle">
                <h2 className="card-title justify-center pb-4">Course Name</h2>
                <h3>Total Hours : </h3>
                <h3>Present : </h3>
                <h3>Absent : </h3>
            </div>
        </div>
    )
}


const Attendance = () => {

    const attendanceData = [80, 91, 54, 76, 89, 53]

    return (
        <div>
            <NavBarStu />
            <div className='relative attendance_report flex flex-col w-10/12 mx-auto my-auto'>
                <h1 className='ring-black text-center text-4xl pt-6 pb-8'>Attendance Report</h1>
                <div className="overflow-x-auto flex flex-row justify-center space-x-4 align-middle flex-wrap">
                    {attendanceData.map((percentage, index) => (
                        <AttendanceCard key={index} percentage={percentage} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Attendance