import React from 'react';
import Modal from './Modal';
import Button from './Button';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title = 'Confirm Action', message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p style={{ color: '#222', fontSize: '0.95rem', marginBottom: '1.5rem' }}>{message}</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="black" onClick={onConfirm}>
          Confirm & Proceed
        </Button>
      </div>
    </Modal>
  );
}
