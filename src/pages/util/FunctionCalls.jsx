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

export const getGrade = async (std_id, course_code) => {

    const { data, error } = await supabase
        .from('Marks')
        .select('*')
        .eq('student_id', std_id)
        .eq('course_id', course_code)
        .single()

    if (error) {
        console.log('Error fetching Grade for student :', std_id, 'for course : ', course_code, error);
        return []
    }

    return data;
}

export const calculateGP = (grade) => {
    const gradePoints = { 'A+': 9, 'A': 8.5, 'B+': 8, 'B': 7.5, 'C+': 7, 'C': 6.5, 'D': 6, 'P': 5.5, 'F': 0, 'FE': 0, 'I': 0 }
    return gradePoints[grade] !== undefined ? gradePoints[grade] : 0;
}

export const updateGrade = async (stdId, courseCode, newGrade) => {
    try {
        const { error, data } = await supabase
            .from('Marks')
            .update({ grade: newGrade })
            .eq('student_id', stdId)
            .eq('course_id', courseCode);

        if (error) throw error;

        return data; // You might return the updated data or a success message
    } catch (error) {
        console.error('Error updating grade for student:', stdId, 'Error:', error.message);
        return error; // Returning the error for handling in the calling function
    }
}