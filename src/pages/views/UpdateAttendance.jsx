import React, { useState, useEffect } from 'react';
import supabase from '../../config/supabaseClient';
import NavBarTeach from '../util/NavBarTeach';

const UpdateAttendance = () => {
  const [students, setStudents] = useState([]);
  const [semester, setSemester] = useState('');
  const [className, setClassName] = useState('');
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState('');
  const [courseName, setCourseName] = useState('');

  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const classes = ['A', 'B', 'C', 'U'];
  const departments = ['1', '2', '3', '4'];
  const courses = ['FLAT', 'MOSS', 'SS', 'MM'];

  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from('Student')
      .select('f_name, l_name, reg_id')
      .eq('semester', semester)
      .eq('class', className)
      .eq('department', department)
      .order('roll_no', { ascending: true });

    if (error) {
      console.error('Error fetching students:', error.message);
      return;
    }

    setStudents(data);
  };

  const handleSubmit = async () => {
    const attendanceData = students.map(student => ({
      std_id: student.reg_id,
      course: courseName, // Assuming this is the course code
      present: attendance[student.reg_id] || false, // Default to false if not checked
      date: date // Assuming this is in a correct date format
    }));

    try {
      const { error } = await supabase
        .from('Attendance')
        .upsert(attendanceData); // Using upsert to handle both insert and update

      if (error) throw error;

      console.log('Attendance updated successfully');
      // Additional actions upon successful submission
    } catch (error) {
      console.error('Error submitting attendance', error);
      // Handle errors
    }
  };


  return (
    <div className='bg-gray-100 min-h-screen'>
      <NavBarTeach />
      <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl mb-6 font-semibold">Update Attendance</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className='block text-sm font-medium text-gray-600'>Semester:</label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="border rounded-md p-2 w-full"
            >
              <option value="" disabled>Select Semester</option>
              {semesters.map((sem) => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-600'>Class:</label>
            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="border rounded-md p-2 w-full"
            >
              <option value="" disabled>Select Class</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-600'>Department:</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="border rounded-md p-2 w-full"
            >
              <option value="" disabled>Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-600'>Course:</label>
            <select
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="border rounded-md p-2 w-full"
            >
              <option value="" disabled>Select Course</option>
              {courses.map((course) => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
          <div className="">
            <label className='block text-sm font-medium text-gray-600'>Date:</label>
            <input type='date' className='border rounded-md p-2 w-full' onChange={(e) => setDate(e.target.value)} />
            {console.log(date)}
          </div>
        </div>
        <button className='bg-indigo-500 text-white px-4 py-2 mt-2 mb-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800' onClick={fetchStudents}>Search</button>

        {students.length > 0 && <table className="w-full border bg-transparent border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 text-left text-sm font-bold text-gray-600 uppercase">Name</th>
              <th className="py-3 px-6 text-left text-sm font-bold text-gray-600 uppercase">Present</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.reg_id} className="border-b text-center">
                <td className="py-2 px-6">{`${student.f_name} ${student.l_name}`}</td>
                <td className="py-2 px-6">
                  <input type="checkbox" className='w-5 h-5 text-indigo-500' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>}

        {students.length > 0 && (
          <button className='bg-indigo-500 text-white px-4 py-2 mt-6 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800'>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default UpdateAttendance;
