import React, { useState, useEffect } from 'react';
import supabase from '../../config/supabaseClient';
import NavBarTeach from '../util/NavBarTeach';

const UpdateAttendance = () => {
  const [students, setStudents] = useState([]);
  const [semester, setSemester] = useState('');
  const [className, setClassName] = useState('');
  const [department, setDepartment] = useState(1);
  const [date, setDate] = useState('');

  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const classes = ['A', 'B', 'C'];
  const departments = ['1','Math', 'Science', 'Arts'];

  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from('Student')
      .select('f_name, l_name, reg_id')
      .eq('semester', semester)
      .eq('class', className)
      .eq('department', department)
      .order('roll_no', { ascending: true});

      console.log(data);

    if (error) {
      console.error('Error fetching students:', error.message);
      return;
    }

    setStudents(data);
  };

  return (
    <div className='bg-slate-300 h-screen'>
      <NavBarTeach/>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl mb-4">Update Attendance</h1>
        <div className="flex space-x-4 mb-4">
          <div>
            <label className='pr-2'>Semester:</label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="border pt-1 pl-2 pr-2 pb-1"
            >
              <option value="" disabled>Select Semester</option>
              {semesters.map((sem) => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>
          <div>
            <label className='pr-2'>Class:</label>
            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="border pt-1 pl-2 pr-2 pb-1"
            >
              <option value="" disabled>Select Class</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          <div>
            <label className='pr-2'>Department:</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="border pt-1 pl-2 pr-2 pb-1"
            >
              <option value="" disabled>Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div className="">
            <label className='pr-2'>Date:</label>
            <input type='date' className='border pt-1 pl-2 pr-2 pb-1' onChange={(e)=>setDate(e.target.value)}/>
          </div>
          <button className='bg-gray-700 text-white pr-2 pl-2 rounded-md' onClick={fetchStudents}>Search</button>
        </div>
        

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Present</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.reg_id} className="border-b text-center">
                <td className="py-2 px-4">{`${student.f_name} ${student.l_name}`}</td>
                <td className="py-2 px-4">
                  <input type="checkbox"  className='w-4 h-4'/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateAttendance;
