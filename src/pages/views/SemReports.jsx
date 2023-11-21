import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NavBarStu } from '../util'
import * as FnCalls from '../util/FunctionCalls'
import supabase from '../../config/supabaseClient';


const SemReportRow = ({ index, std_id, course }) => {
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
      }
    };

    fetchGrade();



  }, [course.course_code]); // Depend on course_code

  return (
    <tr className='text-center hover:bg-slate-200'>
      <th className='border-2 border-slate-950'>{index + 1}</th>
      <td className='border-2 border-slate-950'>{course.course_code}</td>
      <td className='border-2 border-slate-950'>{course.course_name}</td>
      <td className='border-2 border-slate-950'>{course.credits}</td>
      <td>
        <div className='flex flex-row justify-center align-bottom text-center'>
          <input
            name='grade'
            type='text'
            value={grade ? grade : 0}
            placeholder='Input grade'
            className='p-2 w-10 text-center bg-inherit'
            onChange={(e) => setGrade(e.target.value)}
            onKeyDown={handleKeyDown} />
        </div>

      </td>
    </tr>
  );
};

const SemReports = () => {

  const { semester } = useParams();

  const [courseData, setCourseData] = useState([]);

  const stud_id = 'f66b2611-6481-4a37-a018-47a6c3e9a1e6';

  useEffect(() => {
    const getCourseData = async () => {
      const studentData = await FnCalls.fetchStudentData(stud_id);
      const { sem, department } = studentData;

      const courses = await FnCalls.fetchCoursesData(semester, department);
      setCourseData(courses)
    }


    getCourseData();
  }, [])


  return (
    <div className=' h-screen'>
      <NavBarStu />
      <h1 className='ring-black text-center text-4xl pt-6 pb-8 font-bold' >Semester : {semester}</h1>
      <>
        <div className="overflow-x-auto flex w-auto mx-32">
          <table className="table border-2 border-slate-950 border-solid">
            {/* head */}
            <thead className='bg-amber-400 border-2 border-slate-950 p-10'>
              <tr className=' hover:bg-slate-300 text-center border-2 border-slate-950'>
                <th className='p-4'>No</th>
                <th className='border-2 border-slate-950'>Course Code</th>
                <th className='border-2 border-slate-950'>Course Name</th>
                <th className='border-2 border-slate-950'>Credits</th>
                <th className='border-2 border-slate-950 text-center'>
                  <div className='flex flex-row justify-center w-auto'>
                    <p className='text-center'>
                      Grade
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                  </div>
                </th>
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
    </div>
  )
}

export default SemReports

// import { React, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { NavBarStu } from '../util'
// import * as FnCalls from '../util/FunctionCalls'

// const SemReportRow = ({ index, std_id, course, }) => {
//   const [grade, setGrade] = useState('');
//   const Grades = ['Ab', 'F', 'S', 'P', 'C', 'B', 'B+', 'A', 'A+', 'S'];

//   const handleKeyDown = (e) => {

//     if (e.key === 'Enter') {
//       const x = FnCalls.updateGrade(std_id, course.course_code, grade)
//         .then(() => console.log('Grade updated'))
//         .catch((error) => console.error('Error updating grade', error));

//       console.log(x)
//     }
//   }


//   useEffect(() => {
//     const fetchGrade = async () => {
//       try {
//         const data = await FnCalls.getGrade(std_id, course.course_code);
//         setGrade(data.grade);

//       } catch (error) {
//         console.error('Error fetching grade', error);

//       }
//     };

//     fetchGrade();


//   }, [course.course_code]);



//   return (
//     <tr className='text-center hover:bg-slate-200'>
//       <th className='border-2 border-slate-950'>{index + 1}</th>
//       <td className='border-2 border-slate-950'>{course.course_code}</td>
//       <td className='border-2 border-slate-950'>{course.course_name}</td>
//       <td className='border-2 border-slate-950'>{course.credits}</td>
//       <td>
//         <div className='flex flex-row justify-center align-bottom text-center'>
//           <select
//             value={grade}
//             onChange={(e) => {handleKeyDown('Enter');setGrade(e.target.value);}}
//             className="border p-2"
//           >
//             {Grades.map((grades) => (
//               <option key={grades} value={grades}>{grades}</option>
//             ))}
//           </select>

//         </div>

//       </td>
//     </tr>
//   );
// };

// const SemReports = () => {

//   const { semester } = useParams();

//   const [courseData, setCourseData] = useState([]);

//   const stdId = 100005;
//   const stud_id = 'f66b2611-6481-4a37-a018-47a6c3e9a1e6';

//   useEffect(() => {
//     const getCourseData = async () => {
//       const studentData = await FnCalls.fetchStudentData(stdId);
//       const { sem, department } = studentData;

//       const courses = await FnCalls.fetchCoursesData(semester, department);
//       setCourseData(courses)
//     }


//     getCourseData();
//   }, [])


//   return (
//     <>
//       <NavBarStu />
//       <h1 className='ring-black text-center text-4xl pt-6 pb-8 font-bold' >Semester : {semester}</h1>
//       <>
//         <div className="overflow-x-auto flex w-auto mx-32">
//           <table className="table border-2 border-slate-950 border-solid">
//             {/* head */}
//             <thead className='bg-amber-400 border-2 border-slate-950 p-10'>
//               <tr className=' text-center border-2 border-slate-950'>
//                 <th className='p-4'>No</th>
//                 <th className='border-2 border-slate-950'>Course Code</th>
//                 <th className='border-2 border-slate-950'>Course Name</th>
//                 <th className='border-2 border-slate-950'>Credits</th>
//                 <th className='border-2 border-slate-950 text-center'>
//                   <div className='flex flex-row justify-center w-auto'>
//                     <p className='text-center'>
//                       Grade
//                     </p>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
//                     </svg>
//                   </div>
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {courseData.map((course, index) =>
//                 <SemReportRow key={index} course={course} index={index} std_id={stud_id} />
//               )}
//             </tbody>
//           </table>
//         </div>
//       </>
//     </>
//   )
// }

// export default SemReports