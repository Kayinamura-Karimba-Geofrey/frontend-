import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function AttendancePage() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice Smith', roll: 'ST-101', status: 'PRESENT' },
    { id: 2, name: 'Robert Johnson', roll: 'ST-102', status: 'PRESENT' },
    { id: 3, name: 'David Miller', roll: 'ST-103', status: 'ABSENT' },
    { id: 4, name: 'Emily Davis', roll: 'ST-104', status: 'LATE' },
  ]);

  const setStatus = (id, newStatus) => {
    setStudents(students.map((st) => (st.id === id ? { ...st, status: newStatus } : st)));
  };

  return (
    <div>
      <Card
        title="Classroom Attendance Marking Portal — Class 10-A"
        action={
          <Button variant="black">
            Submit Attendance Record
          </Button>
        }
      >
        <div style={{ marginBottom: '1.25rem', fontSize: '0.85rem', color: '#666' }}>
          Date: {new Date().toLocaleDateString()} • Session: Morning Academic Period
        </div>

        <div className="table-container">
          <table className="mono-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Current Status</th>
                <th>Mark Status (Monochrome)</th>
              </tr>
            </thead>
            <tbody>
              {students.map((st) => (
                <tr key={st.id}>
                  <td>{st.roll}</td>
                  <td style={{ fontWeight: 700 }}>{st.name}</td>
                  <td>
                    <Badge variant={st.status === 'PRESENT' ? 'black' : st.status === 'ABSENT' ? 'outline' : 'gray'}>
                      {st.status}
                    </Badge>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Button
                        variant={st.status === 'PRESENT' ? 'black' : 'ghost'}
                        style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                        onClick={() => setStatus(st.id, 'PRESENT')}
                      >
                        Present
                      </Button>
                      <Button
                        variant={st.status === 'ABSENT' ? 'outline' : 'ghost'}
                        style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                        onClick={() => setStatus(st.id, 'ABSENT')}
                      >
                        Absent
                      </Button>
                      <Button
                        variant={st.status === 'LATE' ? 'outline' : 'ghost'}
                        style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                        onClick={() => setStatus(st.id, 'LATE')}
                      >
                        Late
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
