import { request } from './apiClient';

export const messageApi = {
  sendMessage: (data) => request('/messages', { method: 'POST', body: JSON.stringify(data) }),
  getConversation: (userId) => request(`/messages/conversation/${userId}`),
};
