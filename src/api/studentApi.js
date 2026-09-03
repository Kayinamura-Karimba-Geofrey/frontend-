import { request } from './apiClient';

export const studentApi = {
  getAllStudents: () => request('/school-structure/students'),
  getStudentById: (id) => request(`/school-structure/students/${id}`),
  createStudent: (data) => request('/school-structure/students', { method: 'POST', body: JSON.stringify(data) }),
  deleteStudent: (id) => request(`/school-structure/students/${id}`, { method: 'DELETE' }),
};
