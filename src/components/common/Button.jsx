import React from 'react';

export default function Button({ children, variant = 'black', disabled, className = '', ...props }) {
  const variantClass = {
    black: 'btn-black',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
  }[variant] || 'btn-black';

  return (
    <button
      className={`btn ${disabled ? 'btn-disabled' : variantClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
