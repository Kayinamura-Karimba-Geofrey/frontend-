import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function StudentDashboardPage() {
  const upcomingAssignments = [
    { id: 1, title: 'Calculus Problem Set 3', course: 'MATH-401', deadline: 'Tomorrow, 23:59', status: 'Pending' },
    { id: 2, title: 'Physics Optics Lab Notes', course: 'PHYS-201', deadline: 'Friday, 17:00', status: 'Submitted' },
  ];

  const exams = [
    { id: 101, title: 'Midterm Mathematics Quiz', course: 'MATH-401', duration: '45 mins', date: 'Sept 5, 2026' },
  ];

  return (
    <div>
      <div className="stats-row">
        <div className="stat-box">
          <div className="stat-box-title">Attendance Rate</div>
          <div className="stat-box-num">96.5%</div>
          <div className="stat-box-sub">Good Standing</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">Enrolled Courses</div>
          <div className="stat-box-num">5</div>
          <div className="stat-box-sub">Active LMS Subjects</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">Pending Assignments</div>
          <div className="stat-box-num">1</div>
          <div className="stat-box-sub">Due Tomorrow</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">GPA / Avg Grade</div>
          <div className="stat-box-num">3.85</div>
          <div className="stat-box-sub">Top 5% Class Rank</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <Card title="Upcoming Assignment Deadlines">
          <div className="table-container">
            <table className="mono-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Course</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {upcomingAssignments.map((a) => (
                  <tr key={a.id}>
                    <td style={{ fontWeight: 700 }}>{a.title}</td>
                    <td>{a.course}</td>
                    <td>{a.deadline}</td>
                    <td>
                      <Badge variant={a.status === 'Submitted' ? 'black' : 'outline'}>{a.status}</Badge>
                    </td>
                    <td>
                      <Button variant="black" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>
                        Submit File
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Scheduled Examinations">
          <div className="table-container">
            <table className="mono-table">
              <thead>
                <tr>
                  <th>Exam Title</th>
                  <th>Course</th>
                  <th>Duration</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((ex) => (
                  <tr key={ex.id}>
                    <td style={{ fontWeight: 700 }}>{ex.title}</td>
                    <td>{ex.course}</td>
                    <td>{ex.duration}</td>
                    <td>
                      <Button variant="black" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>
                        Enter Exam Portal
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
