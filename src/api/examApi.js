import { request } from './apiClient';

export const examApi = {
  getExams: () => request('/exams'),
  createExam: (data) => request('/exams', { method: 'POST', body: JSON.stringify(data) }),
  addQuestion: (examId, data) => request(`/exams/${examId}/questions`, { method: 'POST', body: JSON.stringify(data) }),
  submitAttempt: (examId, data) => request(`/exams/${examId}/submit`, { method: 'POST', body: JSON.stringify(data) }),
};
