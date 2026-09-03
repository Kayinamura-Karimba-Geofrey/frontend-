import { request } from './apiClient';

export const teacherApi = {
  getAllTeachers: () => request('/school-structure/teachers'),
  getTeacherById: (id) => request(`/school-structure/teachers/${id}`),
  createTeacher: (data) => request('/school-structure/teachers', { method: 'POST', body: JSON.stringify(data) }),
  assignSubject: (id, data) => request(`/school-structure/teachers/${id}/assign-subject`, { method: 'POST', body: JSON.stringify(data) }),
};
