import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <X size={20} style={{ cursor: 'pointer', color: '#666' }} onClick={onClose} />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
