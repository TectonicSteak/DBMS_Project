import React, { useState, useEffect } from 'react';
import supabase from '../../config/supabaseClient';
import NavBarTeach from '../util/NavBarTeach';

const MarkEntry = () => {
  const [students, setStudents] = useState([]);
  const [semester, setSemester] = useState('');
  const [className, setClassName] = useState('');
  const [department, setDepartment] = useState('');
  const [courseName,setCourseName] = useState('');
  const [exam,setExam] = useState('');

  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const classes = ['A', 'B', 'C'];
  const departments = [1,'Math', 'Science', 'Arts'];
  const courses = ['FLAT','MOSS','SS','MM'];
  const exams = ['Series 1','Series 2'];


  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from('Student')
      .select('f_name ,l_name, reg_id')
      .eq('semester', semester)
      .eq('class', className)
      .eq('department', department);

    if (error) {
      console.error('Error fetching students:', error.message);
      return;
    }

    setStudents(data);
  };

  return (
     <div className='bg-gray-100 min-h-screen'>
      <NavBarTeach />
      <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl mb-6 font-semibold">Mark Entry</h1>
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
          <div>
            <label className='block text-sm font-medium text-gray-600'>Exam:</label>
            <select
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              className="border rounded-md p-2 w-full"
            >
              <option value="" disabled>Select Course</option>
              {exams.map((examType) => (
                <option key={examType} value={examType}>{examType}</option>
              ))}
            </select>
          </div>
          
        </div>
        <button className='bg-indigo-500 text-white px-4 py-2 mt-2 mb-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800' onClick={fetchStudents}>Search</button>

        {students.length > 0 && <table className="w-full border bg-transparent border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 text-left text-sm font-bold text-gray-600 uppercase">Name</th>
              <th className="py-3 px-6 text-left text-sm font-bold text-gray-600 uppercase">Mark</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.reg_id} className="border-b text-center">
                <td className="py-2 px-6">{`${student.f_name} ${student.l_name}`}</td>
                <td className="py-2 px-6">
                  <div className="">
                    <input type="number" className=' text-center w-full' />
                  </div>
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
export default MarkEntry;
