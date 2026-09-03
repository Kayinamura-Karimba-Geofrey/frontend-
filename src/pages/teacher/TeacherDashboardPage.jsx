import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function TeacherDashboardPage() {
  const classes = [
    { id: 1, name: 'Class 10-A', subject: 'Advanced Mathematics', students: 32, time: '09:00 - 10:30 AM' },
    { id: 2, name: 'Class 11-B', subject: 'Calculus & Physics', students: 28, time: '11:00 - 12:30 PM' },
    { id: 3, name: 'Class 9-C', subject: 'Algebra Fundamentals', students: 35, time: '02:00 - 03:30 PM' },
  ];

  const pendingGrades = [
    { id: 101, title: 'Calculus Assignment 4', course: 'MATH-401', submissions: 28, graded: 12 },
    { id: 102, title: 'Midterm Physics Lab Report', course: 'PHYS-201', submissions: 25, graded: 5 },
  ];

  return (
    <div>
      <div className="stats-row">
        <div className="stat-box">
          <div className="stat-box-title">Assigned Classes</div>
          <div className="stat-box-num">3</div>
          <div className="stat-box-sub">Active Sections</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">Total Students</div>
          <div className="stat-box-num">95</div>
          <div className="stat-box-sub">Enrolled Learners</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">Pending Submissions</div>
          <div className="stat-box-num">36</div>
          <div className="stat-box-sub">Requires Grading</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">Upcoming Exams</div>
          <div className="stat-box-num">2</div>
          <div className="stat-box-sub">Scheduled This Week</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <Card title="Today's Teaching Schedule">
          <div className="table-container">
            <table className="mono-table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Subject</th>
                  <th>Students</th>
                  <th>Time Slot</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((c) => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 700 }}>{c.name}</td>
                    <td>{c.subject}</td>
                    <td>{c.students}</td>
                    <td>{c.time}</td>
                    <td>
                      <Button variant="black" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>
                        Take Attendance
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Pending Assignment Grading Queue">
          <div className="table-container">
            <table className="mono-table">
              <thead>
                <tr>
                  <th>Assignment</th>
                  <th>Course</th>
                  <th>Graded</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingGrades.map((g) => (
                  <tr key={g.id}>
                    <td style={{ fontWeight: 700 }}>{g.title}</td>
                    <td>{g.course}</td>
                    <td>
                      <Badge variant="outline">
                        {g.graded} / {g.submissions}
                      </Badge>
                    </td>
                    <td>
                      <Button variant="outline" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>
                        Grade Submissions
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
