import React, { useState, useEffect } from 'react';
import supabase from '../../config/supabaseClient';
import NavBarTeach from '../util/NavBarTeach';
import { fetchCoursesData } from '../util/FunctionCalls';
import { ToastContainer, toast } from 'react-toastify';

const DeleteAttendance = () => {
  const [semester, setSemester] = useState('');
  const [className, setClassName] = useState('');
  const [department, setDepartment] = useState('');
  const [courseName, setCourseName] = useState('');
  const [attendance, setAttendance] = useState({});
  const [courses, setCourses] = useState([]);

  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const classes = ['A', 'B', 'C', 'U'];
  const departments = [['1','Computer Science and Engineering'],
                       ['2','Electrical and Electronics Engineering'],
                       ['3','Electronics and Communcation Engineering'],
                       ['4','Electronics and Biomedical Engineering']
                      ];

const fetchAttendance = async () => {
  try {
    const { data, error } = await supabase
      .from('attendance_view')
      .select('date, course, hour')
      .eq('course',courseName)
      .order('date',{ascending: false});

    if (error) {
      console.error('Error fetching attendance:', error.message);
      return;
    }

    const getKey = item => `${item.date}-${item.course}-${item.hour}`;

    const uniqueKeys = new Set();

    const uniqueData = data.filter(item => {
      const key = getKey(item);
      if (!uniqueKeys.has(key)) {
        uniqueKeys.add(key);
        return true;
      }
      return false;
    });

    setAttendance(uniqueData);

    console.log(uniqueData);
  } catch (error) {
    console.error('Error fetching attendance:', error.message);
  }
};
                      


  const handleSubmit = async (date,hour) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this attendance?');
  
    if (isConfirmed) {
      try {
        const { error } = await supabase
          .from('Attendance')
          .delete()
          .eq('date', date)
          .eq('course', courseName)
          .eq('hour', hour);

        if (error) throw error;
  
        toast.success('Attendance deleted successfully', {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } catch (error) {
        console.error('Error deleting attendance', error);
      }
    }
  };
  

  const getCourses = async () => {
    if (semester && department) {
      setCourses(await fetchCoursesData(semester, department))
    }
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
      <NavBarTeach />
      <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl mb-6 font-semibold">Delete Attendance</h1>
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
                <option key={dept[0]} value={dept[0]}>{dept[1]}</option>
              ))}
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-600'>Course:</label>
            <select
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="border rounded-md p-2 w-full"
              onClick={getCourses}
            >
              <option value="" disabled>Select Course</option>
              {courses.map((course) => (
                <option key={course.course_code} value={course.course_code}>{course.course_code}</option>
              )
              )}
            </select>
          </div>
        </div>
        <button className='bg-indigo-500 text-white px-4 py-2 mt-2 mb-4 rounded-md hover:bg-indigo-600
          focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800'
          onClick={fetchAttendance}
        >
          Search
        </button>

        {attendance.length > 0 && (
          <table className="w-full border bg-transparent border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-6 text-left text-sm font-bold text-gray-600 uppercase">Date</th>
                <th className="py-3 px-6 text-left text-sm font-bold text-gray-600 uppercase">Hour</th>
                <th className="py-3 px-6 text-left text-sm font-bold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((atten) => (
                <tr key={[atten.date,atten.hour]} className="border-b text-center">
                  <td className="py-2 px-6">{atten.date}</td>
                  <td className="py-2 px-6">{atten.hour}</td>
                  <td className="py-2 px-6">
                    <button
                      className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600
                        focus:outline-none focus:shadow-outline-red active:bg-red-800'
                      onClick={() => handleSubmit(atten.date,atten.hour)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default DeleteAttendance;
