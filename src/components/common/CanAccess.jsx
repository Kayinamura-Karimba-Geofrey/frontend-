import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function CanAccess({ roles = [], children, fallback = null }) {
  const { role } = useAuth();

  if (!roles || roles.length === 0) return <>{children}</>;

  if (role && roles.includes(role)) {
    return <>{children}</>;
  }

  return fallback;
}
