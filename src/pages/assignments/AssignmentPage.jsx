import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';

export default function AssignmentPage() {
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Advanced Calculus Assignment 3', course: 'MATH-401', deadline: '2026-09-06', status: 'Graded', score: '95/100' },
    { id: 2, title: 'Physics Quantum Lab Report', course: 'PHYS-201', deadline: '2026-09-10', status: 'Submitted', score: 'Pending' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', course: 'MATH-401', deadline: '', description: '' });

  const handleCreate = (e) => {
    e.preventDefault();
    setAssignments([...assignments, { id: Date.now(), ...formData, status: 'Active', score: 'N/A' }]);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Card
        title="Academic Coursework & Assignments"
        action={
          <Button variant="black" onClick={() => setIsModalOpen(true)}>
            + Create New Assignment
          </Button>
        }
      >
        <div className="table-container">
          <table className="mono-table">
            <thead>
              <tr>
                <th>Assignment Title</th>
                <th>Course</th>
                <th>Deadline</th>
                <th>Submission Status</th>
                <th>Grade / Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a) => (
                <tr key={a.id}>
                  <td style={{ fontWeight: 700 }}>{a.title}</td>
                  <td>{a.course}</td>
                  <td>{a.deadline}</td>
                  <td>
                    <Badge variant={a.status === 'Graded' ? 'black' : 'outline'}>{a.status}</Badge>
                  </td>
                  <td>{a.score}</td>
                  <td>
                    <Button variant="black" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>
                      View Details & Grade
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Course Assignment">
        <form onSubmit={handleCreate}>
          <Input label="Assignment Title" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          <Select
            label="Target Course"
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            options={[
              { value: 'MATH-401', label: 'MATH-401: Advanced Calculus' },
              { value: 'PHYS-201', label: 'PHYS-201: Quantum Mechanics' },
              { value: 'CS-302', label: 'CS-302: Software Architecture' },
            ]}
          />
          <Input label="Deadline Date" type="date" required value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="black" type="submit">Publish Assignment</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
