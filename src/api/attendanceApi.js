import { request } from './apiClient';

export const attendanceApi = {
  createSession: (data) => request('/attendance/sessions', { method: 'POST', body: JSON.stringify(data) }),
  markBatchAttendance: (sessionId, records) => request(`/attendance/sessions/${sessionId}/records`, { method: 'POST', body: JSON.stringify(records) }),
  getStudentAttendance: (studentId) => request(`/attendance/students/${studentId}`),
};
