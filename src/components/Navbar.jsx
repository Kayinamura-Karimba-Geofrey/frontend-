import React from 'react';
import { User, LogIn, CheckCircle2 } from 'lucide-react';

export default function Navbar({ title, subtitle, userToken, onOpenAuth }) {
  return (
    <header className="top-navbar">
      <div className="page-header">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="user-profile-widget">
        {userToken ? (
          <div className="badge-status">
            <CheckCircle2 size={15} />
            <span>Authenticated</span>
          </div>
        ) : (
          <button className="btn-primary" onClick={onOpenAuth}>
            <LogIn size={18} />
            <span>Sign In / Register</span>
          </button>
        )}
      </div>
    </header>
  );
}
