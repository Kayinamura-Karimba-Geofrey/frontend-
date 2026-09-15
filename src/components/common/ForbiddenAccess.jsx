import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function ForbiddenAccess() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div style={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        color: '#ef4444',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem'
      }}>
        <ShieldAlert size={32} />
      </div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
        403 - Access Restricted
      </h2>
      <p style={{ color: '#94a3b8', maxWidth: 460, fontSize: '0.95rem', lineHeight: 1.5 }}>
        You do not possess the required system authorities to view or perform actions on this section.
        This security event has been logged for system auditing.
      </p>
    </div>
  );
}
