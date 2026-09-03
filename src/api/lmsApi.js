import { request } from './apiClient';

export const lmsApi = {
  getCourses: () => request('/lms/courses'),
  createCourse: (data) => request('/lms/courses', { method: 'POST', body: JSON.stringify(data) }),
  createModule: (courseId, data) => request(`/lms/courses/${courseId}/modules`, { method: 'POST', body: JSON.stringify(data) }),
  uploadMaterial: (moduleId, formData) => request(`/lms/modules/${moduleId}/materials`, { method: 'POST', body: formData }),
};
