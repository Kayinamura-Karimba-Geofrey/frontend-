import React from 'react';

export default function Card({ title, action, children, className = '' }) {
  return (
    <div className={`mono-card ${className}`}>
      {title && (
        <div className="mono-card-header">
          <h3 className="mono-card-title">{title}</h3>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
