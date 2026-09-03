import { request } from './apiClient';

export const feeApi = {
  createFeeStructure: (data) => request('/fees/structures', { method: 'POST', body: JSON.stringify(data) }),
  getAllFeeStructures: () => request('/fees/structures'),
  recordPayment: (data) => request('/payments', { method: 'POST', body: JSON.stringify(data) }),
  getAllPayments: () => request('/payments'),
  getStudentFeeSummary: (studentId) => request(`/students/${studentId}/fees`),
};
