import React, { useState } from 'react';
import { Search, Bell, LogOut, User as UserIcon, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Topbar({ title, onOpenSearch, onOpenNotifications }) {
  const { user, role, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getInitials = () => {
    if (!user) return 'U';
    const first = user.firstName ? user.firstName[0] : '';
    const last = user.lastName ? user.lastName[0] : '';
    return (first + last).toUpperCase() || 'U';
  };

  const getCleanRole = () => {
    if (!role) return 'GUEST';
    return role.replace('ROLE_', '');
  };

  return (
    <header className="mono-topbar">
      <div className="topbar-left">
        <h1 className="page-title">{title}</h1>
      </div>

      <div className="topbar-right">
        <div className="topbar-search" onClick={onOpenSearch} style={{ cursor: 'pointer' }}>
          <Search size={16} className="topbar-search-icon" />
          <input type="text" placeholder="Search system (Ctrl + K)" readOnly />
        </div>

        <button
          onClick={onOpenNotifications}
          style={{ background: 'none', border: '1px solid #d9d9d9', borderRadius: '6px', padding: '0.4rem', cursor: 'pointer', position: 'relative' }}
          title="Notifications"
        >
          <Bell size={18} color="#111" />
          <span style={{ position: 'absolute', top: '2px', right: '2px', width: '6px', height: '6px', backgroundColor: '#000', borderRadius: '50%' }} />
        </button>

        <div style={{ position: 'relative' }}>
          <div className="user-dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <div className="user-avatar">{getInitials()}</div>
            <div className="user-info">
              <span className="user-name">{user ? `${user.firstName || ''} ${user.lastName || user.email || ''}` : 'User'}</span>
              <span className="user-role">{getCleanRole()}</span>
            </div>
          </div>

          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '120%',
                width: '180px',
                backgroundColor: '#fff',
                border: '1px solid #000',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 50,
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #f5f5f5', fontSize: '0.8rem', color: '#666' }}>
                Signed in as <strong>{getCleanRole()}</strong>
              </div>
              <div
                onClick={logout}
                style={{
                  padding: '0.75rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#000',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#fff',
                }}
              >
                <LogOut size={16} /> Sign Out
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
