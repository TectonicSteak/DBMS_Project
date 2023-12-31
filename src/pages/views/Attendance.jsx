import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import supabase from "../../config/supabaseClient";

import { NavBar, NavBarStu } from "../util";
import * as FnCalls from '../util/FunctionCalls';
import { data } from "autoprefixer";


const AttendanceCard = ({ userId, courseId, courseName }) => {

    const [percentage, setPercentage] = useState(0);
    const [totalHours, setTotalHours] = useState(0);
    const [presentCount, setPresentCount] = useState(0);

    useEffect(() => {
        const fetchAttendance = async () => {
            const { data, error } = await supabase
                .from("Attendance")
                .select("*")
                .eq("std_id", userId)
                .eq("course", courseId);

            if (error) {
                console.error("Error fetching attendance data", error);
            } else {
                const totalHours = data.length;
                const presentCount = data.filter(row => row.present).length;
                const percentage = totalHours > 0 ? (presentCount / totalHours) * 100 : 0;

                setTotalHours(totalHours);
                setPresentCount(presentCount);
                setPercentage(percentage);
            }
        };

        fetchAttendance();


    }, [userId, courseId]);

    const textColor = percentage < 75 ? "#dc2626" : "#65a30d";

    return (
        <div className="card w-60 shadow-xl border align-middle justify-center pt-4 mx-1 my-4 hover:scale-105 transition ease-in-out delay-100 hover:-translate-y-0 bg-slate-100">
            <div className="relative radial-progress mx-auto my-auto" style={{ "--value": percentage, "--size": "8rem", "--thickness": "1rem", color: textColor }} role="progressbar">{percentage.toFixed(2)}%</div>
            <div className="card-body align-middle">
                <h2 className="card-title justify-center pb-4">{courseId}</h2>
                <h2 className="card-subtitle justify-center pb-4 text-center font-bold">{courseName}</h2>
                <h3>Total Hours : {totalHours}</h3>
                <h3>Present : {presentCount}</h3>
                <h3>Absent : {totalHours - presentCount}</h3>
            </div>
        </div>
    );
};

const Attendance = () => {

    const [courseData, setCourseData] = useState([]);
    const [user, setUser] = useState('');

    useEffect(() => {
        const fetchAndSetUser = async () => {
            try {
                const userId = await FnCalls.fetchUserId();
                if (userId) {
                    setUser(userId);
                }
            } catch (error) {
                console.error("Error fetching User", error);
            }
        };

        const getCourseData = async (user) => {
            const studentData = await FnCalls.fetchStudentData(user);
            const { semester: sem, department } = studentData;

            console.log(studentData)

            const courses = await FnCalls.fetchCoursesData(sem, department);
            console.log(courses)
            setCourseData(courses)

        }

        fetchAndSetUser();

        if (user) {
            getCourseData(user);    
        }
    }, [user])

    // useEffect(() => {
    //     const getCourseData = async () => {
    //         const studentData = await FnCalls.fetchStudentData(stdId);

    //         if (studentData) {
    //             const { semester, department } = studentData;
    //             const courses = await FnCalls.fetchCoursesData(semester, department);
    //             setCourseData(courses);
    //         }
    //     };

    //     getCourseData();
    // }, []);

    return (
        <div className='bg-gray-100'>
            <NavBarStu />
            <div className='relative attendance_report flex flex-col w-10/12 mx-auto my-auto'>
                <h1 className='ring-black text-center text-4xl pt-6 pb-8 font-bold'>Attendance Report</h1>
                <div className="overflow-x-auto flex flex-row justify-center space-x-4 align-middle flex-wrap">
                    {courseData.map((course, index) => (
                        <AttendanceCard key={index} userId={user} courseId={course.course_code} courseName={course.course_name} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Attendance