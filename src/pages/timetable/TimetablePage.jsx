import React from 'react';
import Card from '../../components/common/Card';

export default function TimetablePage() {
  const schedule = [
    { time: '08:00 - 09:30', mon: 'MATH-401 (Rm 204)', tue: 'PHYS-201 (Lab 2)', wed: 'MATH-401 (Rm 204)', thu: 'CS-302 (Lab 1)', fri: 'PHYS-201 (Lab 2)' },
    { time: '09:45 - 11:15', mon: 'CS-302 (Lab 1)', tue: 'MATH-401 (Rm 204)', wed: 'PHYS-201 (Lab 2)', thu: 'MATH-401 (Rm 204)', fri: 'CS-302 (Lab 1)' },
    { time: '11:30 - 13:00', mon: 'Study Hall', tue: 'CS-302 (Lab 1)', wed: 'Study Hall', thu: 'PHYS-201 (Lab 2)', fri: 'Assembly / Sports' },
    { time: '14:00 - 15:30', mon: 'PHYS-201 (Lab 2)', tue: 'Study Hall', wed: 'CS-302 (Lab 1)', thu: 'Study Hall', fri: 'Library Period' },
  ];

  return (
    <Card title="Weekly Class Timetable Schedule Grid (Monochrome)">
      <div className="table-container">
        <table className="mono-table">
          <thead>
            <tr>
              <th>Time Slot</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 700 }}>{row.time}</td>
                <td>{row.mon}</td>
                <td>{row.tue}</td>
                <td>{row.wed}</td>
                <td>{row.thu}</td>
                <td>{row.fri}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
