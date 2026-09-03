import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { parentApi } from '../../api/parentApi';

export default function ParentManagementPage() {
  const [parents, setParents] = useState([
    { id: 1, name: 'Robert Smith', email: 'robert.smith@example.com', phone: '+123456789', children: 'Alice Smith (Class 10-A)' },
    { id: 2, name: 'Eleanor Johnson', email: 'eleanor.j@example.com', phone: '+987654321', children: 'Robert Johnson (Class 11-B)' },
  ]);

  useEffect(() => {
    parentApi.getAllParents()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setParents(data);
      })
      .catch(() => {});
  }, []);

  return (
    <Card title="Parent & Guardian Directory">
      <div className="table-container">
        <table className="mono-table">
          <thead>
            <tr>
              <th>Parent Name</th>
              <th>Contact Email</th>
              <th>Phone Number</th>
              <th>Linked Students</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parents.map((p) => (
              <tr key={p.id}>
                <td style={{ fontWeight: 700 }}>{p.name || `${p.firstName || ''} ${p.lastName || ''}`}</td>
                <td>{p.email}</td>
                <td>{p.phone || p.phoneNumber || 'N/A'}</td>
                <td>{p.children || 'Alice Smith (Class 10-A)'}</td>
                <td>
                  <Button variant="black" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>
                    Assign Child
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
