import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import { NavBar, NavBarStu } from "../util";

const GradeCard = ({ semester }) => {
    return (
        <div className="btn glass bg-zinc-700 text-4xl h-48 mb-10 mx-10 flex justify-center items-center w-56 hover:bg-amber-500">
            {semester}
        </div>
    );
};

const Report = () => {
    const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div>
            <NavBarStu />
            <div className='container mx-auto p-6'>
                <h1 className='text-center text-5xl font-bold text-gray-700 mb-10'>Academic Report</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {semesters.map((semester, index) => (
                        <GradeCard key={index} semester={semester} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Report;
