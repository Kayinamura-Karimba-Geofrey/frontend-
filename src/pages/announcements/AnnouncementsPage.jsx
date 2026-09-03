import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Term 2 Final Examination Schedule Released', author: 'School Administration', date: '2026-09-02', content: 'The complete examination schedule for Term 2 has been published in the Timetable section. Please review all room allocations.' },
    { id: 2, title: 'Parent-Teacher Academic Conference', author: 'Principal Office', date: '2026-08-28', content: 'Annual Parent-Teacher meetings are scheduled for Friday, Sept 12th. Booking slots will open tomorrow.' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '' });

  const handleCreate = (e) => {
    e.preventDefault();
    setAnnouncements([{ id: Date.now(), title: formData.title, author: 'School Admin', date: new Date().toISOString().split('T')[0], content: formData.content }, ...announcements]);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Card
        title="Official School Bulletins & Announcements"
        action={
          <Button variant="black" onClick={() => setIsModalOpen(true)}>
            + Publish Announcement
          </Button>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {announcements.map((ann) => (
            <div key={ann.id} style={{ border: '1px solid #d9d9d9', borderRadius: '8px', padding: '1.25rem', backgroundColor: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{ann.title}</h3>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>{ann.date}</span>
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', uppercase: 'true', marginBottom: '0.75rem' }}>
                Posted by {ann.author}
              </div>
              <p style={{ fontSize: '0.9rem', color: '#222', lineHeight: '1.6' }}>{ann.content}</p>
            </div>
          ))}
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Publish Official School Bulletin">
        <form onSubmit={handleCreate}>
          <Input label="Bulletin Title" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          <div className="form-field">
            <label className="form-label">Bulletin Message / Details</label>
            <textarea
              className="form-textarea"
              rows={5}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="black" type="submit">Broadcast Bulletin</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
