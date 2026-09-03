import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Phone, Shield } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    role: 'ROLE_STUDENT',
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isLogin ? { email: formData.email, password: formData.password } : formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      onAuthSuccess(data);
      onClose();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 700 }}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </h2>
          <X size={20} style={{ cursor: 'pointer', color: '#9ca3af' }} onClick={onClose} />
        </div>

        {errorMsg && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', padding: '0.75rem', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '1rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input type="text" name="firstName" className="form-control" placeholder="John" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input type="text" name="lastName" className="form-control" placeholder="Doe" value={formData.lastName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input type="text" name="phoneNumber" className="form-control" placeholder="+123456789" value={formData.phoneNumber} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Account Role</label>
                <select name="role" className="form-control" value={formData.role} onChange={handleChange}>
                  <option value="ROLE_STUDENT">Student</option>
                  <option value="ROLE_TEACHER">Teacher</option>
                  <option value="ROLE_ADMIN">Administrator</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-control" placeholder="john.doe@example.com" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }} disabled={loading}>
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Register Account'}
          </button>
        </form>

        <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.85rem', color: '#9ca3af' }}>
          {isLogin ? "Don't have an account? " : 'Already registered? '}
          <span style={{ color: '#818cf8', fontWeight: 600, cursor: 'pointer' }} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register now' : 'Sign in here'}
          </span>
        </div>
      </div>
    </div>
  );
}
