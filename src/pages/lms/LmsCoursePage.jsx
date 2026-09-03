import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function LmsCoursePage() {
  const [courses] = useState([
    { id: 1, title: 'MATH-401: Advanced Calculus & Analysis', modules: 8, lessons: 32, progress: 85 },
    { id: 2, title: 'CS-302: Enterprise Software Architecture', modules: 10, lessons: 45, progress: 92 },
    { id: 3, title: 'PHYS-201: Modern Quantum Mechanics', modules: 6, lessons: 24, progress: 60 },
  ]);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {courses.map((course) => (
          <Card key={course.id} title={course.title}>
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>
              {course.modules} Curriculum Modules • {course.lessons} Video & PDF Materials
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                <span>Course Completion Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="mono-progress">
                <div className="mono-progress-fill" style={{ width: `${course.progress}%` }} />
              </div>
            </div>

            <Button variant="black" style={{ width: '100%' }}>
              Open Learning Interface
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
