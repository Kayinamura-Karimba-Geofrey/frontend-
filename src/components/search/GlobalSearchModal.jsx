import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Badge from '../common/Badge';

export default function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  const sampleResults = [
    { type: 'Student', title: 'Alice Smith', category: 'Class 10-A' },
    { type: 'Course', title: 'MATH-401: Advanced Calculus', category: 'LMS Module' },
    { type: 'Assignment', title: 'Physics Quantum Lab Report', category: 'Due Sept 10' },
    { type: 'Exam', title: 'Term 1 Final Calculus Assessment', category: 'Scheduled' },
  ];

  const filtered = sampleResults.filter((r) =>
    `${r.title} ${r.type} ${r.category}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Global System Search (Ctrl + K)">
      <Input
        placeholder="Type to search students, courses, assignments, exams..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />

      <div style={{ marginTop: '1rem', maxHeight: '280px', overflowY: 'auto' }}>
        {filtered.map((item, idx) => (
          <div
            key={idx}
            style={{
              padding: '0.75rem',
              borderBottom: '1px solid #f5f5f5',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.title}</div>
              <div style={{ fontSize: '0.75rem', color: '#666' }}>{item.category}</div>
            </div>
            <Badge variant="black">{item.type}</Badge>
          </div>
        ))}
      </div>
    </Modal>
  );
}
