import React, { useEffect, useState } from 'react';
import { Users, Calendar, CheckSquare, Award, AlertTriangle, TrendingUp } from 'lucide-react';

export default function DashboardView() {
  const [overview, setOverview] = useState({
    totalStudents: 1240,
    averageAttendanceRate: 94.2,
    assignmentCompletionRate: 88.5,
    courseCompletionRate: 91.0,
  });

  const [atRiskStudents, setAtRiskStudents] = useState([
    { id: 101, name: 'Alice Smith', attendance: 68.5, progress: 45.0 },
    { id: 102, name: 'Robert Johnson', attendance: 72.0, progress: 52.0 },
    { id: 103, name: 'David Miller', attendance: 65.0, progress: 40.5 },
  ]);

  useEffect(() => {
    fetch('/api/analytics/overview')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setOverview(data);
      })
      .catch(() => {});

    fetch('/api/analytics/at-risk-students?threshold=75')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setAtRiskStudents(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card glass-panel">
          <div className="stat-header">
            <span className="stat-label">Total Enrolled Students</span>
            <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
              <Users size={22} />
            </div>
          </div>
          <div className="stat-value">{overview.totalStudents}</div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-header">
            <span className="stat-label">Average Attendance Rate</span>
            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              <Calendar size={22} />
            </div>
          </div>
          <div className="stat-value">{overview.averageAttendanceRate}%</div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-header">
            <span className="stat-label">Assignment Completion</span>
            <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
              <CheckSquare size={22} />
            </div>
          </div>
          <div className="stat-value">{overview.assignmentCompletionRate}%</div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-header">
            <span className="stat-label">Course Completion Rate</span>
            <div className="stat-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#c084fc' }}>
              <Award size={22} />
            </div>
          </div>
          <div className="stat-value">{overview.courseCompletionRate}%</div>
        </div>
      </div>

      {/* At Risk Students Monitor */}
      <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        <div className="section-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <AlertTriangle size={22} style={{ color: '#f87171' }} />
            <h2 className="section-title">At-Risk Student Early Warning System</h2>
          </div>
          <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Threshold: &lt; 75% Attendance</span>
        </div>

        <table className="custom-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Attendance Rate</th>
              <th>Course Progress</th>
              <th>Status Risk</th>
            </tr>
          </thead>
          <tbody>
            {atRiskStudents.map((st) => (
              <tr key={st.id}>
                <td>#{st.id}</td>
                <td style={{ fontWeight: 600 }}>{st.name || st.studentName}</td>
                <td>
                  <span style={{ color: st.attendance < 70 ? '#f87171' : '#fbbf24', fontWeight: 600 }}>
                    {st.attendance?.toFixed(1)}%
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="progress-bar-bg" style={{ width: '100px' }}>
                      <div className="progress-bar-fill" style={{ width: `${st.progress}%` }}></div>
                    </div>
                    <span>{st.progress?.toFixed(0)}%</span>
                  </div>
                </td>
                <td>
                  <span className="badge-status" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                    High Alert
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
