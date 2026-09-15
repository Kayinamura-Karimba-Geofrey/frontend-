import React, { useState } from 'react';
import Sidebar from '../components/navigation/Sidebar';
import Topbar from '../components/navigation/Topbar';
import GlobalSearchModal from '../components/search/GlobalSearchModal';
import NotificationCenter from '../components/notifications/NotificationCenter';
import { useAuth } from '../context/AuthContext';

// Pages
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import TeacherDashboardPage from '../pages/teacher/TeacherDashboardPage';
import StudentDashboardPage from '../pages/student/StudentDashboardPage';
import ParentDashboardPage from '../pages/parent/ParentDashboardPage';
import UserManagementPage from '../pages/users/UserManagementPage';
import StudentManagementPage from '../pages/students/StudentManagementPage';
import TeacherManagementPage from '../pages/teachers/TeacherManagementPage';
import ParentManagementPage from '../pages/parents/ParentManagementPage';
import ClassManagementPage from '../pages/classes/ClassManagementPage';
import AttendancePage from '../pages/attendance/AttendancePage';
import AssignmentPage from '../pages/assignments/AssignmentPage';
import LmsCoursePage from '../pages/lms/LmsCoursePage';
import ExamPage from '../pages/exams/ExamPage';
import ResultsPage from '../pages/results/ResultsPage';
import TimetablePage from '../pages/timetable/TimetablePage';
import FeesPage from '../pages/fees/FeesPage';
import MessagingPage from '../pages/messages/MessagingPage';
import AnnouncementsPage from '../pages/announcements/AnnouncementsPage';
import AnalyticsPage from '../pages/analytics/AnalyticsPage';
import ProfilePage from '../pages/profile/ProfilePage';
import SubjectManagementPage from '../pages/subjects/SubjectManagementPage';
import ForbiddenAccess from '../components/common/ForbiddenAccess';

export default function AppShell() {
  const { role } = useAuth();
  const [activeNav, setActiveNav] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const renderDashboardByRole = () => {
    switch (role) {
      case 'ROLE_ADMIN':
        return <AdminDashboardPage />;
      case 'ROLE_TEACHER':
        return <TeacherDashboardPage />;
      case 'ROLE_STUDENT':
        return <StudentDashboardPage />;
      case 'ROLE_PARENT':
        return <ParentDashboardPage />;
      default:
        return <AdminDashboardPage />;
    }
  };

  const titles = {
    dashboard: 'Executive Dashboard',
    users: 'System User Administration',
    students: 'Student Directory & Profiles',
    teachers: 'Faculty & Teacher Management',
    parents: 'Parents & Guardians',
    classes: 'School Classes & Rooms',
    attendance: 'Classroom Attendance Tracker',
    assignments: 'Academic Coursework & Submissions',
    courses: 'Learning Management System (LMS)',
    exams: 'Online Examination Portal',
    results: 'Results & Student Report Cards',
    timetable: 'Weekly Timetable Schedule',
    fees: 'Tuition Fee Management & Payments',
    messages: 'Parent-Teacher Messaging',
    announcements: 'Official School Bulletins',
    analytics: 'Smart School Analytics',
    profile: 'User Profile & Account Settings',
    subjects: 'Curriculum Subjects & Course Mapping',
  };

  const renderPage = () => {
    // Role-Based Page Authorization Definitions
    const pagePermissions = {
      users: ['ROLE_ADMIN'],
      teachers: ['ROLE_ADMIN'],
      students: ['ROLE_ADMIN', 'ROLE_TEACHER'],
      parents: ['ROLE_ADMIN', 'ROLE_TEACHER'],
      classes: ['ROLE_ADMIN', 'ROLE_TEACHER'],
      subjects: ['ROLE_ADMIN', 'ROLE_TEACHER'],
      fees: ['ROLE_ADMIN', 'ROLE_PARENT'],
      analytics: ['ROLE_ADMIN', 'ROLE_TEACHER'],
    };

    if (pagePermissions[activeNav] && (!role || !pagePermissions[activeNav].includes(role))) {
      return <ForbiddenAccess />;
    }

    switch (activeNav) {
      case 'dashboard':
        return renderDashboardByRole();
      case 'users':
        return <UserManagementPage />;
      case 'students':
        return <StudentManagementPage />;
      case 'teachers':
        return <TeacherManagementPage />;
      case 'parents':
        return <ParentManagementPage />;
      case 'classes':
        return <ClassManagementPage />;
      case 'subjects':
        return <SubjectManagementPage />;
      case 'attendance':
        return <AttendancePage />;
      case 'assignments':
        return <AssignmentPage />;
      case 'courses':
        return <LmsCoursePage />;
      case 'exams':
        return <ExamPage />;
      case 'results':
        return <ResultsPage />;
      case 'timetable':
        return <TimetablePage />;
      case 'fees':
        return <FeesPage />;
      case 'messages':
        return <MessagingPage />;
      case 'announcements':
        return <AnnouncementsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return renderDashboardByRole();
    }
  };

  return (
    <div className="mono-app">
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        role={role}
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      <main className={`mono-main ${isCollapsed ? 'expanded' : ''}`}>
        <Topbar
          title={titles[activeNav] || 'EduConnect OS'}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
        />

        <div className="content-body">{renderPage()}</div>
      </main>

      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <NotificationCenter isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
    </div>
  );
}
