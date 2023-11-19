import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NavBarStu } from '../util'
import * as FnCalls from '../util/FunctionCalls'

// let allGradeFlag = 0;

const SemReportRow = ({ index, std_id, course, }) => {
  const [grade, setGrade] = useState('');

  const handleKeyDown = (e) => {

    if (e.key === 'Enter') {
      const x = FnCalls.updateGrade(std_id, course.course_code, grade)
        .then(() => console.log('Grade updated'))
        .catch((error) => console.error('Error updating grade', error));

      console.log(x)
    }
  }


  useEffect(() => {
    const fetchGrade = async () => {
      try {
        const data = await FnCalls.getGrade(std_id, course.course_code);
        setGrade(data.grade);

      } catch (error) {
        console.error('Error fetching grade', error);
        // allGradeFlag = 1;
      }
    };

    fetchGrade();


  }, [course.course_code]); // Depend on course_code



  return (
    <tr className='text-center'>
      <th className='border-2 border-slate-950'>{index + 1}</th>
      <td className='border-2 border-slate-950'>{course.course_code}</td>
      <td className='border-2 border-slate-950'>{course.course_name}</td>
      <td className='border-2 border-slate-950'>{course.credits}</td>
      {/* <td className='border-2 border-slate-950'>{grade}</td> */}
      <td><input
        name='grade'
        type='text'
        value={grade}
        placeholder='Input grade'
        className='grade-input p-2 w-10'
        onChange={(e) => setGrade(e.target.value)}
        onKeyDown={handleKeyDown} /></td>
    </tr>
  );
};

const SemReports = () => {

  const { semester } = useParams();

  const [courseData, setCourseData] = useState([]);

  const stdId = 100005;
  const stud_id = 'f66b2611-6481-4a37-a018-47a6c3e9a1e6';

  useEffect(() => {
    const getCourseData = async () => {
      const studentData = await FnCalls.fetchStudentData(stdId);
      const { sem, department } = studentData;

      const courses = await FnCalls.fetchCoursesData(semester, department);
      setCourseData(courses)
    }


    getCourseData();
  }, [])


  return (
    <>
      <NavBarStu />
      <h1 className='ring-black text-center text-4xl pt-6 pb-8 font-bold' >Semester : {semester}</h1>
      <>
        <div className="overflow-x-auto flex w-auto mx-32">
          <table className="table border-2 border-slate-950 border-solid">
            {/* head */}
            <thead className='bg-amber-400 border-2 border-slate-950'>
              <tr className=' text-center border-2 border-slate-950'>
                <th>No</th>
                <th className='border-2 border-slate-950'>Course Code</th>
                <th className='border-2 border-slate-950'>Course Name</th>
                <th className='border-2 border-slate-950'>Credits</th>
                <th className='border-2 border-slate-950'>Grade</th>
              </tr>
            </thead>
            <tbody>
              {courseData.map((course, index) =>
                <SemReportRow key={index} course={course} index={index} std_id={stud_id} />
              )}
            </tbody>
          </table>
        </div>
      </>
    </>
  )
}

export default SemReports