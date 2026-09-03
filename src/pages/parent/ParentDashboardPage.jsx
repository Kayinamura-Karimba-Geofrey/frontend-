import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function ParentDashboardPage() {
  const children = [
    { id: 1, name: 'Alice Smith', class: 'Class 10-A', attendance: '96.5%', avgGrade: 'A (92%)', feeStatus: 'Paid' },
    { id: 2, name: 'Bob Smith', class: 'Class 7-B', attendance: '92.0%', avgGrade: 'B+ (86%)', feeStatus: '$450 Due' },
  ];

  return (
    <div>
      <div className="stats-row">
        <div className="stat-box">
          <div className="stat-box-title">Linked Children</div>
          <div className="stat-box-num">2</div>
          <div className="stat-box-sub">Enrolled Students</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">Avg Attendance</div>
          <div className="stat-box-num">94.2%</div>
          <div className="stat-box-sub">Combined Rate</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">Outstanding Balance</div>
          <div className="stat-box-num">$450.00</div>
          <div className="stat-box-sub">Term 2 Fees</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">Unread Teacher Messages</div>
          <div className="stat-box-num">1</div>
          <div className="stat-box-sub">Direct Inbox</div>
        </div>
      </div>

      <Card title="Children Academic & Attendance Progress Summary">
        <div className="table-container">
          <table className="mono-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Class</th>
                <th>Attendance</th>
                <th>Academic Average</th>
                <th>Fee Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {children.map((child) => (
                <tr key={child.id}>
                  <td style={{ fontWeight: 700 }}>{child.name}</td>
                  <td>{child.class}</td>
                  <td>{child.attendance}</td>
                  <td>{child.avgGrade}</td>
                  <td>
                    <Badge variant={child.feeStatus === 'Paid' ? 'black' : 'outline'}>{child.feeStatus}</Badge>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Button variant="black" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>
                        View Weekly Summary
                      </Button>
                      <Button variant="outline" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>
                        Contact Teacher
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
