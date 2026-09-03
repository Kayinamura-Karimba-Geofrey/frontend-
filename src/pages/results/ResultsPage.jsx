import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

export default function ResultsPage() {
  const printReportCard = () => {
    window.print();
  };

  return (
    <div>
      <Card
        title="Student Academic Report Card & Transcripts"
        action={
          <Button variant="outline" onClick={printReportCard}>
            Print Official Report Card
          </Button>
        }
      >
        <div style={{ border: '2px solid #000', borderRadius: '8px', padding: '1.75rem', backgroundColor: '#fff', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #000', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>EduConnect International School</h2>
              <p style={{ fontSize: '0.85rem', color: '#666' }}>Official Academic Transcript & Performance Certificate</p>
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.85rem' }}>
              <p><strong>Academic Term:</strong> Term 2 (2026)</p>
              <p><strong>Student:</strong> Alice Smith (#ST-101)</p>
              <p><strong>Class:</strong> Class 10-A</p>
            </div>
          </div>

          <table className="mono-table" style={{ marginBottom: '1.25rem' }}>
            <thead>
              <tr>
                <th>Subject Name</th>
                <th>Instructor</th>
                <th>Marks Obtained</th>
                <th>Grade</th>
                <th>Teacher Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700 }}>Advanced Mathematics</td>
                <td>Dr. Sarah Jenkins</td>
                <td>95 / 100</td>
                <td>A+</td>
                <td>Exceptional analytical and calculus performance.</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700 }}>Quantum Physics</td>
                <td>Prof. Mark Davis</td>
                <td>88 / 100</td>
                <td>A</td>
                <td>Strong conceptual understanding in lab work.</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700 }}>Computer Science</td>
                <td>Elena Rostova</td>
                <td>98 / 100</td>
                <td>A+</td>
                <td>Outstanding software development skills.</td>
              </tr>
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #d9d9d9', pt: '1rem', marginTop: '1rem', fontSize: '0.9rem' }}>
            <div><strong>Overall Term GPA:</strong> 3.92 / 4.0</div>
            <div><strong>Class Rank:</strong> 1st / 32 Students</div>
            <div><strong>Attendance:</strong> 96.5%</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
