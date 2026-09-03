import { request } from './apiClient';

export const studentApi = {
  getAllStudents: () => request('/students'),
  getStudentById: (id) => request(`/students/${id}`),
  createStudent: (data) => request('/students', { method: 'POST', body: JSON.stringify(data) }),
  deleteStudent: (id) => request(`/students/${id}`, { method: 'DELETE' }),
};
