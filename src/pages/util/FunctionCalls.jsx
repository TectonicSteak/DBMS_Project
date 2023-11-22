import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import supabase from "../../config/supabaseClient";

export const fetchStudentData = async (stdId) => {

    try {
        const { data, error } = await supabase
            .from('Student')
            .select('semester, department')
            .eq('user_id', stdId)
            .single()

        return data;

    }
    catch (error) {
        console.error("Error fetching Student Data for user:", stdId)
        return error
    }

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
        .eq('exam_type', 'semester')
        .single()

    if (error) {
        console.log('Error fetching Grade for student :', std_id, 'for course : ', course_code, error);
        return []
    }

    return data;
}

export const getMark = async (std_id, course_code) => {

    const { data, error } = await supabase
        .from('Marks')
        .select('*')
        .eq('student_id', std_id)
        .eq('course_id', course_code)
        .eq('exam_type', 'internals')
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

export const updateStudentProfile = async (stdId, newDob, newFName, newLName, newPhone, newEmail, newAddress, newCgpa, newGender) => {
    try {
        const { error, data } = await supabase
            .from('Student')
            .update({ dob: newDob, f_name: newFName, l_name: newLName, ph_no: newPhone, email: newEmail, address: newAddress, CGPA: newCgpa, gender: newGender })
            .eq('user_id', stdId)

        return data;
    }
    catch (error) {
        console.error("Erorr updating Student Profile for student : ", stdId)
        return error;
    }
}


export const updateTeacherProfile = async (teachId, newFname, newLname, newDept, newPhone) => {
    try {
        const { error, data } = await supabase
            .from('Teacher')
            .update({ f_name: newFname, l_name: newLname, dept_ID: newDept, ph_no: newPhone })
            .eq('user_id', teachId)

        return data;
    }
    catch (error) {
        console.error("Erorr updating Teacher Profile for Teacher: ", teachId)
        return error;
    }
}


export const fetchUserId = async () => {
    try {
        const { data: { user } } = await supabase.auth.getUser()
        return user.id
    }
    catch (error) {
        console.error("Error fetching User");
        return error
    }
}

export const fetchUserData = async (userId) => {
    try {
        const { data: userData } = await supabase
            .from('Student')
            .select('*')
            .eq('user_id', userId)

        console.log(userData);
        return userData[0]
    }
    catch (error) {
        console.log('Error fetching user data');
    }
}

export const fetchTeacherData = async (userId) => {
    try {
        const { data: userData } = await supabase
            .from('Teacher')
            .select('*')
            .eq('user_id', userId)

        console.log(userData);
        return userData[0]
    }
    catch (error) {
        console.log('Error fetching user data');
    }
}