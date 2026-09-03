import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../api/authApi';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';

export default function LoginPage() {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      let response;
      if (isRegister) {
        response = await authApi.register(formData);
      } else {
        response = await authApi.login({ email: formData.email, password: formData.password });
      }

      if (response && response.token) {
        login(response);
      } else {
        throw new Error('Authentication response did not contain a valid JWT token');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5', padding: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: '420px', backgroundColor: '#fff', border: '2px solid #000', borderRadius: '12px', padding: '2.25rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: '#000', color: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, margin: '0 auto 0.75rem auto' }}>
            E
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#000', letterSpacing: '-0.02em' }}>EduConnect OS</h1>
          <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
            {isRegister ? 'Register your account to access portal' : 'Enterprise School Management & LMS Portal'}
          </p>
        </div>

        {errorMsg && (
          <div style={{ backgroundColor: '#f5f5f5', border: '1px solid #000', color: '#000', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1.25rem', fontWeight: 600 }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <Input label="First Name" name="firstName" placeholder="John" value={formData.firstName} onChange={handleChange} required />
              <Input label="Last Name" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange} required />
              <Input label="Phone Number" name="phoneNumber" placeholder="+123456789" value={formData.phoneNumber} onChange={handleChange} />
              <Select
                label="Account Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                options={[
                  { value: 'ROLE_STUDENT', label: 'Student' },
                  { value: 'ROLE_TEACHER', label: 'Teacher' },
                  { value: 'ROLE_ADMIN', label: 'Administrator' },
                  { value: 'ROLE_PARENT', label: 'Parent' },
                ]}
              />
            </>
          )}

          <Input label="Email Address" type="email" name="email" placeholder="john.doe@example.com" value={formData.email} onChange={handleChange} required />
          <Input label="Password" type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />

          <Button type="submit" variant="black" style={{ width: '100%', marginTop: '0.75rem' }} disabled={loading}>
            {loading ? 'Authenticating...' : isRegister ? 'Register Account' : 'Sign In'}
          </Button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#666' }}>
          {isRegister ? 'Already registered? ' : 'Need an account? '}
          <span
            style={{ color: '#000', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Sign in here' : 'Register now'}
          </span>
        </div>
      </div>
    </div>
  );
}
