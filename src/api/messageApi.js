import { request } from './apiClient';

export const messageApi = {
  getConversations: () => request('/conversations'),
  createConversation: (data) => request('/conversations', { method: 'POST', body: JSON.stringify(data) }),
  sendMessage: (data) => request('/messages', { method: 'POST', body: JSON.stringify(data) }),
  getMessagesByConversation: (conversationId) => request(`/messages/conversation/${conversationId}`),
};
