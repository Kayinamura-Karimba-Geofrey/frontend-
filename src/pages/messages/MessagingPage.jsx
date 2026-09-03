import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function MessagingPage() {
  const [conversations] = useState([
    { id: 1, name: 'Dr. Sarah Jenkins (Math Teacher)', lastMsg: 'Alice performed exceptionally in today\'s quiz.', time: '10:45 AM' },
    { id: 2, name: 'Robert Smith (Parent)', lastMsg: 'Will there be a parent-teacher meeting next Friday?', time: 'Yesterday' },
  ]);

  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Dr. Sarah Jenkins', text: 'Hello Mr. Smith, I wanted to discuss Alice\'s progress in Advanced Mathematics.', time: '10:30 AM' },
    { id: 2, sender: 'You', text: 'Hello Dr. Jenkins! How is she doing?', time: '10:35 AM' },
    { id: 3, sender: 'Dr. Sarah Jenkins', text: 'Alice performed exceptionally in today\'s quiz.', time: '10:45 AM' },
  ]);

  const [textInput, setTextInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'You', text: textInput, time: 'Just now' }]);
    setTextInput('');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem', minHeight: '70vh' }}>
      <Card title="Conversations">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveChat(c)}
              style={{
                padding: '0.75rem',
                border: activeChat.id === c.id ? '2px solid #000' : '1px solid #d9d9d9',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: activeChat.id === c.id ? '#f5f5f5' : '#fff',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{c.name}</div>
              <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {c.lastMsg}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title={`Conversation with ${activeChat.name}`}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  alignSelf: m.sender === 'You' ? 'flex-end' : 'flex-start',
                  maxWidth: '70%',
                  backgroundColor: m.sender === 'You' ? '#000' : '#f5f5f5',
                  color: m.sender === 'You' ? '#fff' : '#000',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: m.sender === 'You' ? 'none' : '1px solid #d9d9d9',
                }}
              >
                <div style={{ fontSize: '0.7rem', opacity: 0.8, marginBottom: '0.25rem' }}>{m.sender} • {m.time}</div>
                <div style={{ fontSize: '0.9rem' }}>{m.text}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ flex: 1 }}>
              <Input placeholder="Type message..." value={textInput} onChange={(e) => setTextInput(e.target.value)} />
            </div>
            <Button variant="black" type="submit">
              Send Message
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
