import { request } from './apiClient';

export const analyticsApi = {
  getOverview: () => request('/analytics/overview'),
  getAttendanceHeatmap: (classId) => request(`/analytics/attendance/heatmap?classId=${classId}`),
  getAtRiskStudents: (threshold = 75) => request(`/analytics/at-risk-students?threshold=${threshold}`),
  getCourseEngagement: () => request('/analytics/course-engagement'),
};
