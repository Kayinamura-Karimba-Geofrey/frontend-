import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

export default function NotificationCenter({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New assignment posted: Calculus Problem Set 4', time: '10 mins ago', read: false },
    { id: 2, text: 'Exam scheduled: Term 1 Physics Quiz', time: '1 hour ago', read: false },
    { id: 3, text: 'Fee receipt generated #PAY-8841', time: '2 hours ago', read: true },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Notification Center">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: '#666' }}>{notifications.filter((n) => !n.read).length} Unread Alerts</span>
        <Button variant="ghost" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }} onClick={markAllRead}>
          Mark All as Read
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '300px', overflowY: 'auto' }}>
        {notifications.map((n) => (
          <div
            key={n.id}
            style={{
              padding: '0.75rem',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              backgroundColor: n.read ? '#fff' : '#f5f5f5',
              fontWeight: n.read ? 400 : 600,
            }}
          >
            <div style={{ fontSize: '0.85rem' }}>{n.text}</div>
            <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.2rem' }}>{n.time}</div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
