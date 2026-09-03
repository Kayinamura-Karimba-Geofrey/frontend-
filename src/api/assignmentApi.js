import { request } from './apiClient';

export const assignmentApi = {
  createAssignment: (data) => request('/assignments', { method: 'POST', body: JSON.stringify(data) }),
  getAssignmentById: (id) => request(`/assignments/${id}`),
  submitAssignment: (assignmentId, data) => request(`/assignments/${assignmentId}/submit`, { method: 'POST', body: JSON.stringify(data) }),
  gradeSubmission: (submissionId, gradeData) => request(`/assignments/submissions/${submissionId}/grade`, { method: 'PUT', body: JSON.stringify(gradeData) }),
};
