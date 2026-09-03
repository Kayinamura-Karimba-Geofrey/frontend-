import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

export default function ClassManagementPage() {
  const [classes] = useState([
    { id: 1, name: 'Class 10-A', room: 'Room 204', teacher: 'Dr. Sarah Jenkins', studentCount: 32, performance: '88.5%' },
    { id: 2, name: 'Class 11-B', room: 'Room 108', teacher: 'Prof. Mark Davis', studentCount: 28, performance: '84.0%' },
    { id: 3, name: 'Class 9-C', room: 'Room 302', teacher: 'Elena Rostova', studentCount: 35, performance: '91.2%' },
  ]);

  return (
    <Card title="School Class Sections & Academic Rooms">
      <div className="table-container">
        <table className="mono-table">
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Assigned Room</th>
              <th>Class Teacher</th>
              <th>Enrolled Students</th>
              <th>Academic Average</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((c) => (
              <tr key={c.id}>
                <td style={{ fontWeight: 700 }}>{c.name}</td>
                <td>{c.room}</td>
                <td>{c.teacher}</td>
                <td>{c.studentCount} Students</td>
                <td>{c.performance}</td>
                <td>
                  <Button variant="black" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>
                    Class Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
