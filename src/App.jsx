import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import CoursesView from './components/CoursesView';
import AttendanceView from './components/AttendanceView';
import FileUploadView from './components/FileUploadView';
import AuthModal from './components/AuthModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [userToken, setUserToken] = useState(localStorage.getItem('token') || null);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user') || 'null'));

  const handleAuthSuccess = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
    setUserToken(data.token);
    setUserData(data);
  };

  const titles = {
    dashboard: { title: 'Executive Analytics Dashboard', subtitle: 'Real-time performance, attendance, and student risk metrics.' },
    courses: { title: 'Learning Management System', subtitle: 'Manage academic courses, modules, and learning materials.' },
    attendance: { title: 'Student Attendance Tracker', subtitle: 'Record and track daily classroom session attendance.' },
    files: { title: 'File Storage & Material Repository', subtitle: 'Upload and distribute educational documents and media.' },
    auth: { title: 'Security & Access Control', subtitle: 'User authentication, roles, and token security credentials.' },
  };

  const currentMeta = titles[activeTab] || titles.dashboard;

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        <Navbar
          title={currentMeta.title}
          subtitle={currentMeta.subtitle}
          userToken={userToken}
          onOpenAuth={() => setIsAuthOpen(true)}
        />

        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'courses' && <CoursesView />}
        {activeTab === 'attendance' && <AttendanceView />}
        {activeTab === 'files' && <FileUploadView />}
        {activeTab === 'auth' && (
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>User Authentication & Permissions</h2>
            {userToken ? (
              <div>
                <p style={{ color: '#34d399', fontWeight: 600, marginBottom: '0.5rem' }}>Active JWT Token Session</p>
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '10px', wordBreak: 'break-all', fontFamily: 'monospace', fontSize: '0.85rem', color: '#818cf8' }}>
                  {userToken}
                </div>
              </div>
            ) : (
              <div>
                <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>No active JWT token detected. Please sign in or create an account.</p>
                <button className="btn-primary" onClick={() => setIsAuthOpen(true)}>
                  Launch Authentication Portal
                </button>
              </div>
            )}
          </div>
        )}

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      </main>
    </div>
  );
}
