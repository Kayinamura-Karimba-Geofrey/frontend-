import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
  const { user, role } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || 'John',
    lastName: user?.lastName || 'Doe',
    email: user?.email || 'john.doe@educonnect.com',
    phoneNumber: user?.phoneNumber || '+123456789',
  });

  const handleSave = (e) => {
    e.preventDefault();
    alert('Profile settings updated successfully!');
  };

  return (
    <Card title="User Account Profile & Settings">
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '90px', height: '90px', backgroundColor: '#000', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800, margin: '0 auto 1rem auto' }}>
            {formData.firstName[0]}{formData.lastName[0]}
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#666', textTransform: 'uppercase' }}>
            {role?.replace('ROLE_', '') || 'USER'}
          </div>
        </div>

        <form onSubmit={handleSave} style={{ flex: 1 }}>
          <Input label="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
          <Input label="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
          <Input label="Email Address" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          <Input label="Phone Number" value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
            <Button variant="black" type="submit">
              Save Profile Changes
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}
