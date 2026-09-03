import { request } from './apiClient';

export const feeApi = {
  createFeeStructure: (data) => request('/fees/structures', { method: 'POST', body: JSON.stringify(data) }),
  recordPayment: (data) => request('/fees/payments', { method: 'POST', body: JSON.stringify(data) }),
  getStudentFeeSummary: (studentId) => request(`/fees/students/${studentId}`),
};
