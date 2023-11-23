import React, { useState, useEffect } from 'react';
import supabase from '../../config/supabaseClient';
import NavBarTeach from '../util/NavBarTeach';
import { fetchStudentData, fetchCoursesData } from '../util/FunctionCalls';
import { ToastContainer, toast } from 'react-toastify';

const UpdateMarks = () => {
  const [students, setStudents] = useState([]);
  const [semester, setSemester] = useState('');
  const [className, setClassName] = useState('');
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [grade, setGrade] = useState({});
  const [hour, setHour] = useState();
  const [courses, setCourses] = useState([]);

  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const classes = ['A', 'B', 'C', 'U'];
  const departments = [['1', 'Computer Science and Engineering'],
  ['2', 'Electrical and Electronics Engineering'],
  ['3', 'Electronics and Communcation Engineering'],
  ['4', 'Electronics and Biomedical Engineering']
  ];

  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from('Student')
      .select('f_name, l_name, reg_id, user_id')
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

    for (const student of students) {
      const studentGrade = grade[student.user_id];
      if (studentGrade < 0 || studentGrade > 50) {
        toast.error('Invalid Marks. Must be in the range [0-50]', {
          autoClose: 2000
        });
        return;
      }
    }

    let markData;

    // students.map((student) => {
    //   if (grade[student.user_id] > 50 || grade[student.user_id] < 0) {
    //     toast.error('Invalid Marks. Must be in the range [0-50]', {
    //       autoClose: 2000
    //     })
    //     markData = 0;
    //     return
    //   }
    //   else {

    //   }
    // })

    markData = students.map(student => ({
      student_id: student.user_id,
      course_id: courseCode,
      grade: grade[student.user_id],
      exam_type: 'internals'
    }));

    if (markData) {
      try {

        const { error } = await supabase
          .from('Marks')
          .upsert(markData, { onConflict: ['student_id', 'course_id', 'exam_type'] });

        if (error) throw error;

        toast.success('Marks updated successfully', {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        console.error('Error submitting attendance', error);
      }
    }
  };


  const getCourses = async () => {
    if (semester && department) {
      setCourses(await fetchCoursesData(semester, department))
    }
  }

  return (
    <div className='bg-gray-100 min-h-screen '>
      <NavBarTeach />
      <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl mb-6 font-semibold">Update Marks</h1>
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
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="border rounded-md p-2 w-full"
              onClick={getCourses}
            >
              <option value="" disabled>Select Course</option>
              {courses.map((course) => (
                <option key={course.course_code} value={course.course_code}>{course.course_code} {course.course_name}</option>
              )
              )}
            </select>
          </div>
        </div>
        <button className='bg-indigo-500 text-white px-4 py-2 mt-2 mb-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800' onClick={fetchStudents}>Search</button>

        {students.length > 0 && <table className="w-full border bg-transparent border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 text-left text-sm font-bold text-gray-600 uppercase">Name</th>
              <th className="py-3 px-6 text-left text-sm font-bold text-gray-600 uppercase">Marks</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.user_id} className="border-b text-center">
                <td className="py-2 px-6">{`${student.f_name} ${student.l_name}`}</td>
                <td className="py-2 px-6">
                  <input
                    name='grade'
                    type='number'
                    value={grade[student.user_id]}
                    placeholder='Input marks'
                    className='p-2 w-auto text-center bg-inherit border-solid border-2 border-slate-500'
                    onChange={(e) => setGrade({ ...grade, [student.user_id]: e.target.value })}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>}

        {students.length > 0 && (
          <div className='flex'>
            <button className='bg-indigo-500 text-white px-4 py-2 mt-6 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800'
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateMarks;
