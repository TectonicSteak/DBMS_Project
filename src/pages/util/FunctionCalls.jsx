import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import supabase from "../../config/supabaseClient";

export const fetchStudentData = async (stdId) => {

    const { data, error } = await supabase
        .from('Student')
        .select('semester, department')
        .eq('reg_id', stdId)
        .single();

    if (error) {
        console.error('Error fetching student data', error);
        return null;
    }

    return data;
};

export const fetchCoursesData = async (semester, department) => {
    const { data, error } = await supabase
        .from('Courses')
        .select('*')
        .eq('sem', semester)
        .eq('department', department);

    if (error) {
        console.error('Error fetching courses data', error);
        return [];
    }

    return data;
};

// export const fetchAttendance = async () => {
//     return { data, error } = await supabase
//         .from("Attendance")
//         .select("*")
//         .eq("std_id", studentId)
//         .eq("course", courseId);
// }