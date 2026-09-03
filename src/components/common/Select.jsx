import React from 'react';

export default function Select({ label, options = [], required, className = '', ...props }) {
  return (
    <div className="form-field">
      {label && (
        <label className="form-label">
          {label} {required && '*'}
        </label>
      )}
      <select className={`form-select ${className}`} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
