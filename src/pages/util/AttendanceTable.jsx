import React from 'react';

const AttendanceRow = ({ date }) => (
  <tr>
    <th>{date}</th>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
);

const AttendanceTable = () => {
  return (
    <div className='attendance_report container flex flex-col p-3 space-y-4 '>
      <p className='hover:bg-slate-950 ring-1 ring-black text-center'>Attendance Report</p>
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
