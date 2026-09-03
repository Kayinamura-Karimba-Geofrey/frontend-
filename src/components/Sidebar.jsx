import React from 'react';
import { LayoutDashboard, BookOpen, CalendarCheck, UploadCloud, ShieldCheck, GraduationCap } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'Courses & LMS', icon: BookOpen },
    { id: 'attendance', label: 'Attendance Tracker', icon: CalendarCheck },
    { id: 'files', label: 'File Storage', icon: UploadCloud },
    { id: 'auth', label: 'Security & Auth', icon: ShieldCheck },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <GraduationCap size={22} />
        </div>
        <span>EduConnect</span>
      </div>

      <ul className="nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
