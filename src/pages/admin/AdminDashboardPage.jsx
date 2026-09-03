import React, { useEffect, useState } from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { analyticsApi } from '../../api/analyticsApi';

export default function AdminDashboardPage() {
  const [kpis, setKpis] = useState({
    totalStudents: 1240,
    totalTeachers: 68,
    totalParents: 950,
    totalClasses: 32,
    attendanceRate: 94.2,
    assignmentCompletion: 88.5,
    courseCompletion: 91.0,
    examPerformance: 84.6,
    feesCollected: '$485,000',
    outstandingFees: '$32,400',
  });

  const [atRisk, setAtRisk] = useState([
    { id: 1, name: 'Alice Smith', class: 'Class 10-A', attendance: '68.5%', score: '45%' },
    { id: 2, name: 'Robert Johnson', class: 'Class 11-B', attendance: '72.0%', score: '52%' },
    { id: 3, name: 'David Miller', class: 'Class 9-C', attendance: '65.0%', score: '40%' },
  ]);

  useEffect(() => {
    analyticsApi.getOverview()
      .then((data) => {
        if (data) setKpis((prev) => ({ ...prev, ...data }));
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* 10 KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="stat-box">
          <div className="stat-box-title">Total Students</div>
          <div className="stat-box-num">{kpis.totalStudents}</div>
          <div className="stat-box-sub">Active Enrolled</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">Total Teachers</div>
          <div className="stat-box-num">{kpis.totalTeachers}</div>
          <div className="stat-box-sub">Faculty Members</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">Total Parents</div>
          <div className="stat-box-num">{kpis.totalParents}</div>
          <div className="stat-box-sub">Guardians</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">Total Classes</div>
          <div className="stat-box-num">{kpis.totalClasses}</div>
          <div className="stat-box-sub">Sections</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">Attendance Rate</div>
          <div className="stat-box-num">{kpis.attendanceRate}%</div>
          <div className="stat-box-sub">Daily Average</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">Assignment Rate</div>
          <div className="stat-box-num">{kpis.assignmentCompletion}%</div>
          <div className="stat-box-sub">Submission Rate</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">Course Completion</div>
          <div className="stat-box-num">{kpis.courseCompletion}%</div>
          <div className="stat-box-sub">LMS Modules</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">Exam Avg Pass</div>
          <div className="stat-box-num">{kpis.examPerformance}%</div>
          <div className="stat-box-sub">Term Assessment</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">Fees Collected</div>
          <div className="stat-box-num">{kpis.feesCollected}</div>
          <div className="stat-box-sub">Academic Term</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">Outstanding Fees</div>
          <div className="stat-box-num">{kpis.outstandingFees}</div>
          <div className="stat-box-sub">Unpaid Balance</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <Card title="At-Risk Students Monitor (Low Attendance & Performance)">
          <div className="table-container">
            <table className="mono-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Attendance</th>
                  <th>Avg Mark</th>
                  <th>Risk Status</th>
                </tr>
              </thead>
              <tbody>
                {atRisk.map((st) => (
                  <tr key={st.id}>
                    <td>#{st.id}</td>
                    <td style={{ fontWeight: 700 }}>{st.name}</td>
                    <td>{st.class}</td>
                    <td>{st.attendance}</td>
                    <td>{st.score}</td>
                    <td>
                      <Badge variant="black">High Risk</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Quick System Actions">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ padding: '0.85rem', border: '1px solid #000', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700 }}>
              + Register New User Account
            </div>
            <div style={{ padding: '0.85rem', border: '1px solid #d9d9d9', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
              + Publish School Announcement
            </div>
            <div style={{ padding: '0.85rem', border: '1px solid #d9d9d9', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
              + Generate Financial Fee Report
            </div>
            <div style={{ padding: '0.85rem', border: '1px solid #d9d9d9', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
              + Audit Timetable Schedule
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
