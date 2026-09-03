import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { userApi } from '../../api/userApi';

export default function UserManagementPage() {
  const [users, setUsers] = useState([
    { id: 1, firstName: 'Admin', lastName: 'User', email: 'admin@educonnect.com', role: 'ROLE_ADMIN', status: 'ACTIVE' },
    { id: 2, firstName: 'Sarah', lastName: 'Jenkins', email: 'sarah.j@educonnect.com', role: 'ROLE_TEACHER', status: 'ACTIVE' },
    { id: 3, firstName: 'Alice', lastName: 'Smith', email: 'alice.s@educonnect.com', role: 'ROLE_STUDENT', status: 'ACTIVE' },
    { id: 4, firstName: 'Robert', lastName: 'Smith', email: 'robert.s@educonnect.com', role: 'ROLE_PARENT', status: 'ACTIVE' },
  ]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'ROLE_STUDENT',
  });

  const loadUsers = () => {
    userApi.getAllUsers()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setUsers(data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await userApi.createUser(formData);
      loadUsers();
      setIsModalOpen(false);
      setFormData({ firstName: '', lastName: '', email: '', password: '', role: 'ROLE_STUDENT' });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    if (selectedUser) {
      try {
        await userApi.deleteUser(selectedUser.id);
        setUsers(users.filter((u) => u.id !== selectedUser.id));
        setIsDeleteOpen(false);
        setSelectedUser(null);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch = `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div>
      <Card
        title="System User Management"
        action={
          <Button variant="black" onClick={() => setIsModalOpen(true)}>
            + Create New User
          </Button>
        }
      >
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ flex: 1 }}>
            <Input placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div style={{ width: '200px' }}>
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              options={[
                { value: 'ALL', label: 'All System Roles' },
                { value: 'ROLE_ADMIN', label: 'Administrators' },
                { value: 'ROLE_TEACHER', label: 'Teachers' },
                { value: 'ROLE_STUDENT', label: 'Students' },
                { value: 'ROLE_PARENT', label: 'Parents' },
              ]}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="mono-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Assigned Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td>#{u.id}</td>
                  <td style={{ fontWeight: 700 }}>{u.firstName} {u.lastName}</td>
                  <td>{u.email}</td>
                  <td>
                    <Badge variant={u.role === 'ROLE_ADMIN' ? 'black' : 'outline'}>{u.role?.replace('ROLE_', '')}</Badge>
                  </td>
                  <td>
                    <Badge variant="gray">{u.status || 'ACTIVE'}</Badge>
                  </td>
                  <td>
                    <Button
                      variant="ghost"
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                      onClick={() => {
                        setSelectedUser(u);
                        setIsDeleteOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create User Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create System User">
        <form onSubmit={handleCreate}>
          <Input label="First Name" required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
          <Input label="Last Name" required value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
          <Input label="Email Address" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <Input label="Password" type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          <Select
            label="User Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            options={[
              { value: 'ROLE_STUDENT', label: 'Student' },
              { value: 'ROLE_TEACHER', label: 'Teacher' },
              { value: 'ROLE_ADMIN', label: 'Administrator' },
              { value: 'ROLE_PARENT', label: 'Parent' },
            ]}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="black" type="submit">Create User Account</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete User Account"
        message={`Are you sure you want to permanently remove ${selectedUser?.firstName} ${selectedUser?.lastName}? This action cannot be undone.`}
      />
    </div>
  );
}
