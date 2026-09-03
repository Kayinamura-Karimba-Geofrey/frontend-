import { request } from './apiClient';

export const timetableApi = {
  createSession: (data) => request('/timetables/sessions', { method: 'POST', body: JSON.stringify(data) }),
  getClassTimetable: (classId) => request(`/timetables/classes/${classId}`),
  getTeacherTimetable: (teacherId) => request(`/timetables/teachers/${teacherId}`),
};
