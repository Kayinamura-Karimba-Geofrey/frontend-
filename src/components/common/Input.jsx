import React from 'react';

export default function Input({ label, error, required, className = '', ...props }) {
  return (
    <div className="form-field">
      {label && (
        <label className="form-label">
          {label} {required && '*'}
        </label>
      )}
      <input className={`form-input ${className}`} {...props} />
      {error && <span style={{ fontSize: '0.75rem', color: '#666', fontWeight: 600, marginTop: '0.2rem', display: 'block' }}>{error}</span>}
    </div>
  );
}
