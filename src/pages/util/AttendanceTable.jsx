import React from 'react';
import { useState } from 'react';
import supabase from "../../config/supabaseClient";

const AttendanceCard = ({ percentage }) => {

  const textColor = percentage < 75 ? "#dc2626" : "#65a30d";

  return (
    <div className="card w-60 bg-base-100 shadow-xl border align-middle justify-center pt-6">
      <div className="relative radial-progress mx-auto my-auto" style={{ "--value": "70", "--size": "8rem", "--thickness": "1rem", color: textColor }} role="progressbar">{percentage}%</div>
      <div className="card-body align-middle">
        <h2 className="card-title justify-center pb-4">Course Name</h2>
        <h3>Total Hours : </h3>
        <h3>Present : </h3>
        <h3>Absent : </h3>
      </div>
    </div>
  )
}

const AttendanceTable = () => {

  return (
    <div className='relative attendance_report flex flex-col w-10/12 mx-auto '>
      <h1 className='ring-black text-center text-4xl py-'>Attendance Report</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Date</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <AttendanceRow date="16/11/2023" />
            {/* row 2 */}
            <AttendanceRow date="17/11/2023" />
            {/* row 3 */}
            <AttendanceRow date="18/11/2023" />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
