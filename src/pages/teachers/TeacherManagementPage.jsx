import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { teacherApi } from '../../api/teacherApi';

export default function TeacherManagementPage() {
  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Dr. Sarah Jenkins', email: 'sarah.j@educonnect.com', subjects: 'Advanced Mathematics', classes: 'Class 10-A, Class 11-B', workload: '18 hrs/wk' },
    { id: 2, name: 'Prof. Mark Davis', email: 'mark.d@educonnect.com', subjects: 'Physics & Engineering', classes: 'Class 9-C, Class 12-A', workload: '16 hrs/wk' },
  ]);

  useEffect(() => {
    teacherApi.getAllTeachers()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setTeachers(data);
      })
      .catch(() => {});
  }, []);

  return (
    <Card title="Faculty & Teacher Workload Directory">
      <div className="table-container">
        <table className="mono-table">
          <thead>
            <tr>
              <th>Faculty Name</th>
              <th>Email</th>
              <th>Assigned Subjects</th>
              <th>Class Load</th>
              <th>Workload</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t.id}>
                <td style={{ fontWeight: 700 }}>{t.name || `${t.firstName || ''} ${t.lastName || ''}`}</td>
                <td>{t.email}</td>
                <td>{t.subjects || t.department || 'General Science'}</td>
                <td>{t.classes || 'Class 10-A'}</td>
                <td>
                  <Badge variant="outline">{t.workload || '18 hrs/wk'}</Badge>
                </td>
                <td>
                  <Button variant="black" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>
                    Assign Subject
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
