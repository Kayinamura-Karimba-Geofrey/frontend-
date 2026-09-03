import React from 'react';
import {
  LayoutDashboard, Users, GraduationCap, UserCheck, HeartHandshake, BookOpen,
  CalendarCheck, FileText, Award, Calendar, CreditCard, MessageSquare,
  Bell, BarChart3, Settings, ShieldCheck, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function Sidebar({ activeNav, setActiveNav, role, isCollapsed, toggleCollapse }) {
  const allNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_STUDENT', 'ROLE_PARENT'] },
    { id: 'users', label: 'User Management', icon: Users, roles: ['ROLE_ADMIN'] },
    { id: 'students', label: 'Students', icon: GraduationCap, roles: ['ROLE_ADMIN', 'ROLE_TEACHER'] },
    { id: 'teachers', label: 'Teachers', icon: UserCheck, roles: ['ROLE_ADMIN'] },
    { id: 'parents', label: 'Parents', icon: HeartHandshake, roles: ['ROLE_ADMIN', 'ROLE_TEACHER'] },
    { id: 'classes', label: 'Classes & Subjects', icon: ShieldCheck, roles: ['ROLE_ADMIN', 'ROLE_TEACHER'] },
    { id: 'attendance', label: 'Attendance Tracker', icon: CalendarCheck, roles: ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_STUDENT', 'ROLE_PARENT'] },
    { id: 'assignments', label: 'Assignments', icon: FileText, roles: ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_STUDENT', 'ROLE_PARENT'] },
    { id: 'courses', label: 'LMS & Courses', icon: BookOpen, roles: ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_STUDENT', 'ROLE_PARENT'] },
    { id: 'exams', label: 'Exams & Quizzes', icon: Award, roles: ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_STUDENT', 'ROLE_PARENT'] },
    { id: 'results', label: 'Results & Reports', icon: Award, roles: ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_STUDENT', 'ROLE_PARENT'] },
    { id: 'timetable', label: 'Weekly Timetable', icon: Calendar, roles: ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_STUDENT', 'ROLE_PARENT'] },
    { id: 'fees', label: 'Fee Management', icon: CreditCard, roles: ['ROLE_ADMIN', 'ROLE_PARENT'] },
    { id: 'messages', label: 'Parent-Teacher Messages', icon: MessageSquare, roles: ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_STUDENT', 'ROLE_PARENT'] },
    { id: 'announcements', label: 'Announcements', icon: Bell, roles: ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_STUDENT', 'ROLE_PARENT'] },
    { id: 'analytics', label: 'Smart Analytics', icon: BarChart3, roles: ['ROLE_ADMIN', 'ROLE_TEACHER'] },
  ];

  const filteredItems = allNavItems.filter((item) => !role || item.roles.includes(role));

  return (
    <aside className={`mono-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="brand-icon">E</div>
        {!isCollapsed && <span className="brand-text">EduConnect OS</span>}
        <button
          onClick={toggleCollapse}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginLeft: 'auto' }}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {!isCollapsed && <div className="nav-group-title">Navigation Menu</div>}
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <div
              key={item.id}
              className={`nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setActiveNav(item.id)}
              title={isCollapsed ? item.label : ''}
            >
              <Icon size={18} />
              {!isCollapsed && <span>{item.label}</span>}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
