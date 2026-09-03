import { request } from './apiClient';

export const parentApi = {
  getAllParents: () => request('/school-structure/parents'),
  getParentById: (id) => request(`/school-structure/parents/${id}`),
  createParent: (data) => request('/school-structure/parents', { method: 'POST', body: JSON.stringify(data) }),
};
