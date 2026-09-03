import { request } from './apiClient';

export const teacherApi = {
  getAllTeachers: () => request('/teachers'),
  getTeacherById: (id) => request(`/teachers/${id}`),
  createTeacher: (data) => request('/teachers', { method: 'POST', body: JSON.stringify(data) }),
  assignSubject: (id, data) => request(`/teachers/${id}/assign-subject`, { method: 'POST', body: JSON.stringify(data) }),
};
