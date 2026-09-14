import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Modal from '../../components/common/Modal';
import { schoolClassApi } from '../../api/schoolClassApi';
import { request } from '../../api/apiClient';

export default function SubjectManagementPage() {
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Advanced Mathematics', className: 'Class 10-A' },
    { id: 2, name: 'Quantum Physics', className: 'Class 11-B' },
    { id: 3, name: 'Computer Science & Software', className: 'Class 9-C' },
  ]);
  const [classes, setClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', classId: '' });

  useEffect(() => {
    request('/subjects')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setSubjects(data);
      })
      .catch(() => {});

    schoolClassApi.getAllClasses()
      .then((data) => {
        if (Array.isArray(data)) setClasses(data);
      })
      .catch(() => {});
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const created = await request('/subjects', {
        method: 'POST',
        body: JSON.stringify({ name: formData.name, classId: parseInt(formData.classId) }),
      });
      setSubjects([...subjects, created]);
    } catch {
      setSubjects([
        ...subjects,
        { id: Date.now(), name: formData.name, className: classes.find(c => c.id === parseInt(formData.classId))?.name || 'Class Section' },
      ]);
    }
    setIsModalOpen(false);
    setFormData({ name: '', classId: '' });
  };

  return (
    <div>
      <Card
        title="Curriculum Subjects & Course Mapping"
        action={
          <Button variant="black" onClick={() => setIsModalOpen(true)}>
            + Create New Subject
          </Button>
        }
      >
        <div className="table-container">
          <table className="mono-table">
            <thead>
              <tr>
                <th>Subject ID</th>
                <th>Subject Title / Course Name</th>
                <th>Assigned Class Section</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((sub) => (
                <tr key={sub.id}>
                  <td>#{sub.id}</td>
                  <td style={{ fontWeight: 700 }}>{sub.name}</td>
                  <td>{sub.className || sub.schoolClassName || 'Class Section'}</td>
                  <td>
                    <Button variant="black" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>
                      Edit Subject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Academic Subject">
        <form onSubmit={handleCreate}>
          <Input label="Subject Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Organic Chemistry" />
          <Select
            label="Assigned School Class"
            required
            value={formData.classId}
            onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
            options={[
              { value: '', label: 'Select Target Class...' },
              ...classes.map(c => ({ value: c.id, label: c.name })),
              { value: '1', label: 'Class 10-A' },
              { value: '2', label: 'Class 11-B' },
            ]}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="black" type="submit">Save Subject</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
