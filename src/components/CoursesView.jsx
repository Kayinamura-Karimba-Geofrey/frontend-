import React, { useEffect, useState } from 'react';
import { BookOpen, Layers, FileText, CheckCircle } from 'lucide-react';

export default function CoursesView() {
  const [courses, setCourses] = useState([
    { id: 1, title: 'Advanced Mathematics & Calculus', code: 'MATH-401', progress: 78, modulesCount: 6, materialsCount: 24 },
    { id: 2, title: 'Computer Science & Software Architecture', code: 'CS-302', progress: 92, modulesCount: 8, materialsCount: 32 },
    { id: 3, title: 'Physics & Quantum Mechanics', code: 'PHYS-201', progress: 60, modulesCount: 5, materialsCount: 18 },
  ]);

  useEffect(() => {
    fetch('/api/lms/courses')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setCourses(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Enrolled LMS Courses</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {courses.map((course) => (
          <div key={course.id} className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {course.code || 'COURSE'}
                </span>
                <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 700, marginTop: '0.2rem' }}>
                  {course.title}
                </h3>
              </div>
              <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
                <BookOpen size={20} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', margin: '1.25rem 0', color: '#9ca3af', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Layers size={16} />
                <span>{course.modulesCount || 6} Modules</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileText size={16} />
                <span>{course.materialsCount || 20} Materials</span>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span style={{ color: '#9ca3af' }}>Course Progress</span>
                <span style={{ fontWeight: 600, color: '#fff' }}>{course.progress || 75}%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${course.progress || 75}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
