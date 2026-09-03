import { request } from './apiClient';

export const timetableApi = {
  createSession: (data) => request('/timetable/sessions', { method: 'POST', body: JSON.stringify(data) }),
  getClassTimetable: (classId) => request(`/timetable/classes/${classId}`),
  getTeacherTimetable: (teacherId) => request(`/timetable/teachers/${teacherId}`),
};
