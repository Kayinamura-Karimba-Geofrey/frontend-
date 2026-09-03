import { request } from './apiClient';

export const schoolClassApi = {
  getAllClasses: () => request('/classes'),
  getClassById: (id) => request(`/classes/${id}`),
  createClass: (data) => request('/classes', { method: 'POST', body: JSON.stringify(data) }),
  getAllSubjects: () => request('/subjects'),
  getSubjectById: (id) => request(`/subjects/${id}`),
  createSubject: (data) => request('/subjects', { method: 'POST', body: JSON.stringify(data) }),
};
