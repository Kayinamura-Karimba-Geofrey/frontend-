import React, { useState } from 'react';
import { CalendarCheck, Plus, Check, X, Clock, AlertCircle } from 'lucide-react';

export default function AttendanceView() {
  const [records, setRecords] = useState([
    { id: 1, studentName: 'John Doe', rollNumber: 'ST-001', status: 'PRESENT' },
    { id: 2, studentName: 'Jane Smith', rollNumber: 'ST-002', status: 'PRESENT' },
    { id: 3, studentName: 'Michael Brown', rollNumber: 'ST-003', status: 'ABSENT' },
    { id: 4, studentName: 'Emily Davis', rollNumber: 'ST-004', status: 'LATE' },
  ]);

  const toggleStatus = (id, newStatus) => {
    setRecords(records.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
  };

  return (
    <div className="glass-panel" style={{ padding: '1.75rem' }}>
      <div className="section-header">
        <div>
          <h2 className="section-title">Attendance Tracker & Record Manager</h2>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '0.2rem' }}>Class 10-A • Date: {new Date().toLocaleDateString()}</p>
        </div>
        <button className="btn-primary">
          <Plus size={18} />
          <span>New Session</span>
        </button>
      </div>

      <table className="custom-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Student Name</th>
            <th>Attendance Status</th>
            <th>Quick Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec) => (
            <tr key={rec.id}>
              <td>{rec.rollNumber}</td>
              <td style={{ fontWeight: 600 }}>{rec.studentName}</td>
              <td>
                <span
                  className="badge-status"
                  style={{
                    background:
                      rec.status === 'PRESENT'
                        ? 'rgba(16, 185, 129, 0.15)'
                        : rec.status === 'ABSENT'
                        ? 'rgba(239, 68, 68, 0.15)'
                        : 'rgba(245, 158, 11, 0.15)',
                    color: rec.status === 'PRESENT' ? '#34d399' : rec.status === 'ABSENT' ? '#f87171' : '#fbbf24',
                    borderColor:
                      rec.status === 'PRESENT'
                        ? 'rgba(16, 185, 129, 0.3)'
                        : rec.status === 'ABSENT'
                        ? 'rgba(239, 68, 68, 0.3)'
                        : 'rgba(245, 158, 11, 0.3)',
                  }}
                >
                  {rec.status}
                </span>
              </td>
              <td>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={() => toggleStatus(rec.id, 'PRESENT')}>
                    <Check size={14} style={{ color: '#34d399' }} /> Present
                  </button>
                  <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={() => toggleStatus(rec.id, 'ABSENT')}>
                    <X size={14} style={{ color: '#f87171' }} /> Absent
                  </button>
                  <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={() => toggleStatus(rec.id, 'LATE')}>
                    <Clock size={14} style={{ color: '#fbbf24' }} /> Late
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
