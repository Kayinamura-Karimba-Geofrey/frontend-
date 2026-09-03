import React from 'react';

export default function Badge({ children, variant = 'black' }) {
  const variantClass = {
    black: 'badge-black',
    outline: 'badge-outline',
    gray: 'badge-gray',
  }[variant] || 'badge-black';

  return <span className={`badge ${variantClass}`}>{children}</span>;
}
