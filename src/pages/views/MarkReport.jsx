


import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NavBarStu } from '../util'
import * as FnCalls from '../util/FunctionCalls'
import supabase from '../../config/supabaseClient';


const MarksReportRow = ({ index, std_id, course }) => {
    const [grade, setGrade] = useState('');


    useEffect(() => {
        const fetchGrade = async () => {
            try {
                const data = await FnCalls.getMark(std_id, course.course_code);
                setGrade(data.grade);

            } catch (error) {
                console.error('Error fetching grade', error);
            }
        };

        fetchGrade();



    }, [course.course_code]); // Depend on course_code

    if (grade) {

        return (
            <tr className='text-center hover:bg-slate-200'>
                <th className='border-2 border-slate-950'>{index + 1}</th>
                <td className='border-2 border-slate-950'>{course.course_code}</td>
                <td className='border-2 border-slate-950'>{course.course_name}</td>
                <td className='border-2 border-slate-950'>{course.credits}</td>
                <td>{grade}</td>
            </tr>
        );
    }
};

const MarkReport = () => {

    const { semester } = useParams();
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
            const { sem, department } = studentData;

            const courses = await FnCalls.fetchCoursesData(semester, department);
            setCourseData(courses)

        }

        fetchAndSetUser();

        if (user) {
            getCourseData(user);
        }
    }, [user])



    useEffect(() => {

    }, [])


    return (
        <div className=' h-screen'>
            <NavBarStu />
            <h1 className='ring-black text-center text-4xl pt-6 pb-8 font-bold' >Semester : {semester}</h1>
            <>
                <div className="overflow-x-auto flex w-auto mx-32">
                    <table className="table border-2 border-slate-950 border-solid">
                        {/* head */}
                        <thead className='bg-amber-400 border-2 border-slate-950 p-10'>
                            <tr className=' hover:bg-slate-300 text-center border-2 border-slate-950'>
                                <th className='p-4'>No</th>
                                <th className='border-2 border-slate-950'>Course Code</th>
                                <th className='border-2 border-slate-950'>Course Name</th>
                                <th className='border-2 border-slate-950'>Credits</th>  
                                <th className='border-2 border-slate-950'>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseData.map((course, index) =>
                                <MarksReportRow
                                    key={index} course={course} index={index} std_id={user} />
                            )}
                        </tbody>
                    </table>
                </div>
            </>
        </div>
    )
}

export default MarkReport;
