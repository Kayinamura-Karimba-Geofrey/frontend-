import { request } from './apiClient';

export const schoolClassApi = {
  getAllClasses: () => request('/school-structure/classes'),
  getClassById: (id) => request(`/school-structure/classes/${id}`),
  createClass: (data) => request('/school-structure/classes', { method: 'POST', body: JSON.stringify(data) }),
  getAllSubjects: () => request('/school-structure/subjects'),
  createSubject: (data) => request('/school-structure/subjects', { method: 'POST', body: JSON.stringify(data) }),
};
