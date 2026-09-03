import React from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

export default function AnalyticsPage() {
  const heatmapDays = Array.from({ length: 28 }, (_, i) => ({
    day: i + 1,
    attendance: 85 + Math.floor(Math.sin(i) * 12),
  }));

  return (
    <div>
      <div className="stats-row">
        <div className="stat-box">
          <div className="stat-box-title">System Attendance Avg</div>
          <div className="stat-box-num">94.2%</div>
          <div className="stat-box-sub">Monochrome Heatmap Tracked</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">Avg Assignment Rate</div>
          <div className="stat-box-num">88.5%</div>
          <div className="stat-box-sub">Submission Compliance</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">Course LMS Engagement</div>
          <div className="stat-box-num">91.0%</div>
          <div className="stat-box-sub">Module Active Users</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">At-Risk Count</div>
          <div className="stat-box-num">3</div>
          <div className="stat-box-sub">Early Warning Triggered</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <Card title="Monthly Classroom Attendance Heatmap (Strict Black & White Contrast)">
          <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>
            Daily Attendance Rate Grid (Darker Shading = Higher Attendance Rate)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {heatmapDays.map((d) => (
              <div
                key={d.day}
                style={{
                  height: '45px',
                  backgroundColor: d.attendance > 92 ? '#000' : d.attendance > 85 ? '#666' : '#d9d9d9',
                  color: d.attendance > 85 ? '#fff' : '#000',
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}
              >
                <span>Day {d.day}</span>
                <span style={{ fontSize: '0.65rem', opacity: 0.9 }}>{d.attendance}%</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#666' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ width: '12px', height: '12px', backgroundColor: '#000' }}></span> &gt; 92% (High)</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ width: '12px', height: '12px', backgroundColor: '#666' }}></span> 85-92% (Medium)</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ width: '12px', height: '12px', backgroundColor: '#d9d9d9' }}></span> &lt; 85% (Low)</span>
          </div>
        </Card>

        <Card title="LMS Course Active Engagement">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                <span>MATH-401 Calculus</span>
                <span>94%</span>
              </div>
              <div className="mono-progress"><div className="mono-progress-fill" style={{ width: '94%' }} /></div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                <span>CS-302 Software Arch</span>
                <span>88%</span>
              </div>
              <div className="mono-progress"><div className="mono-progress-fill" style={{ width: '88%' }} /></div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                <span>PHYS-201 Quantum Physics</span>
                <span>78%</span>
              </div>
              <div className="mono-progress"><div className="mono-progress-fill" style={{ width: '78%' }} /></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
