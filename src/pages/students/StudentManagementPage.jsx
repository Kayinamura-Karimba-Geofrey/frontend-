import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Tabs from '../../components/common/Tabs';
import { studentApi } from '../../api/studentApi';

export default function StudentManagementPage() {
  const [students, setStudents] = useState([
    { id: 1, rollNumber: 'ST-101', name: 'Alice Smith', email: 'alice@educonnect.com', class: 'Class 10-A', attendance: '96.5%', feeStatus: 'Paid' },
    { id: 2, rollNumber: 'ST-102', name: 'Robert Johnson', email: 'robert@educonnect.com', class: 'Class 11-B', attendance: '72.0%', feeStatus: '$200 Due' },
    { id: 3, rollNumber: 'ST-103', name: 'David Miller', email: 'david@educonnect.com', class: 'Class 9-C', attendance: '65.0%', feeStatus: 'Paid' },
  ]);
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [profileTab, setProfileTab] = useState('info');

  useEffect(() => {
    studentApi.getAllStudents()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setStudents(data);
      })
      .catch(() => {});
  }, []);

  const filtered = students.filter((st) =>
    `${st.name} ${st.rollNumber} ${st.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Card title="Student Directory & Academic Profiles">
        <div style={{ marginBottom: '1.25rem' }}>
          <Input placeholder="Search student by name, roll number, or email..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="table-container">
          <table className="mono-table">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>Attendance</th>
                <th>Fee Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((st) => (
                <tr key={st.id}>
                  <td>{st.rollNumber}</td>
                  <td style={{ fontWeight: 700 }}>{st.name}</td>
                  <td>{st.class}</td>
                  <td>{st.attendance}</td>
                  <td>
                    <Badge variant={st.feeStatus === 'Paid' ? 'black' : 'outline'}>{st.feeStatus}</Badge>
                  </td>
                  <td>
                    <Button variant="black" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }} onClick={() => setSelectedStudent(st)}>
                      View Tabbed Profile
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Tabbed Profile Modal */}
      <Modal isOpen={!!selectedStudent} onClose={() => setSelectedStudent(null)} title={`Student Profile: ${selectedStudent?.name}`}>
        <Tabs
          tabs={[
            { id: 'info', label: 'Overview' },
            { id: 'attendance', label: 'Attendance' },
            { id: 'results', label: 'Results' },
            { id: 'fees', label: 'Fee History' },
          ]}
          activeTab={profileTab}
          onChange={setProfileTab}
        />

        {profileTab === 'info' && (
          <div style={{ fontSize: '0.9rem', lineHeight: '1.8' }}>
            <p><strong>Roll Number:</strong> {selectedStudent?.rollNumber}</p>
            <p><strong>Full Name:</strong> {selectedStudent?.name}</p>
            <p><strong>Email Address:</strong> {selectedStudent?.email}</p>
            <p><strong>Enrolled Class:</strong> {selectedStudent?.class}</p>
            <p><strong>Account Status:</strong> Active Learner</p>
          </div>
        )}

        {profileTab === 'attendance' && (
          <div style={{ fontSize: '0.9rem' }}>
            <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Attendance Record: {selectedStudent?.attendance}</p>
            <div className="mono-progress" style={{ marginBottom: '1rem' }}>
              <div className="mono-progress-fill" style={{ width: selectedStudent?.attendance }} />
            </div>
            <p style={{ color: '#666', fontSize: '0.85rem' }}>Total Sessions: 120 • Present: 115 • Absent: 5</p>
          </div>
        )}

        {profileTab === 'results' && (
          <div style={{ fontSize: '0.9rem' }}>
            <p style={{ fontWeight: 700 }}>Academic Performance Marks:</p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
              <li>Calculus & Math: 94% (Grade A)</li>
              <li>Physics Fundamentals: 88% (Grade A-)</li>
              <li>Computer Science: 96% (Grade A+)</li>
            </ul>
          </div>
        )}

        {profileTab === 'fees' && (
          <div style={{ fontSize: '0.9rem' }}>
            <p><strong>Current Balance:</strong> {selectedStudent?.feeStatus}</p>
            <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.5rem' }}>Term 1 Receipt #8842 - Paid in full ($1,200.00)</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
