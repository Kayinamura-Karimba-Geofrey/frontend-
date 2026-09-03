import { request } from './apiClient';

export const parentApi = {
  getAllParents: () => request('/parents'),
  getParentById: (id) => request(`/parents/${id}`),
  createParent: (data) => request('/parents', { method: 'POST', body: JSON.stringify(data) }),
};
