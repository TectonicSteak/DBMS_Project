import { useContext, } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import { NavBar, NavBarStu } from "../util";

const GradeCard = ({ semester }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/student_dashboard/marks/${semester}`);
    };

    return (
        <div className="btn glass  bg-blue-500 text-4xl h-48 mb-10 mx-10 flex justify-center items-center w-56  hover:bg-amber-500" onClick={handleClick}>
            {semester}
        </div>
    );
};

const Marks = () => {
    const semesters = [1, 2, 3, 4, 5, 6, 7, 8]

    return (
        <div className='h-auto'>
            <NavBarStu />
            <div className='container mx-auto p-6'>
                <h1 className='text-center text-5xl font-bold text-gray-700 mb-10'>Internal Marks Report</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 text-slate-200 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {semesters.map((semester, index) => (
                        <GradeCard key={index} semester={semester} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Marks;