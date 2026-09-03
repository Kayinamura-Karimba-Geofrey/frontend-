import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';

export default function FeesPage() {
  const [payments, setPayments] = useState([
    { id: 'PAY-8841', student: 'Alice Smith', class: 'Class 10-A', amount: '$1,200.00', date: '2026-08-15', status: 'PAID' },
    { id: 'PAY-8842', student: 'Robert Johnson', class: 'Class 11-B', amount: '$450.00', date: '2026-08-20', status: 'PARTIAL' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ student: '', amount: '', paymentMethod: 'CASH' });

  const handleRecordPayment = (e) => {
    e.preventDefault();
    setPayments([
      { id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`, student: formData.student, class: 'Class 10-A', amount: `$${formData.amount}`, date: new Date().toISOString().split('T')[0], status: 'PAID' },
      ...payments,
    ]);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="stats-row">
        <div className="stat-box">
          <div className="stat-box-title">Total Expected Fees</div>
          <div className="stat-box-num">$517,400</div>
          <div className="stat-box-sub">Academic Term</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">Total Collected</div>
          <div className="stat-box-num">$485,000</div>
          <div className="stat-box-sub">Received Revenue</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-title">Outstanding Fees</div>
          <div className="stat-box-num">$32,400</div>
          <div className="stat-box-sub">Pending Payments</div>
        </div>
      </div>

      <Card
        title="Student Tuition & Financial Transaction Ledger"
        action={
          <Button variant="black" onClick={() => setIsModalOpen(true)}>
            + Record Fee Payment
          </Button>
        }
      >
        <div className="table-container">
          <table className="mono-table">
            <thead>
              <tr>
                <th>Receipt ID</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>Amount Paid</th>
                <th>Transaction Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td style={{ fontWeight: 700 }}>{p.student}</td>
                  <td>{p.class}</td>
                  <td>{p.amount}</td>
                  <td>{p.date}</td>
                  <td>
                    <Badge variant={p.status === 'PAID' ? 'black' : 'outline'}>{p.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record Student Fee Payment">
        <form onSubmit={handleRecordPayment}>
          <Input label="Student Name" required value={formData.student} onChange={(e) => setFormData({ ...formData, student: e.target.value })} />
          <Input label="Payment Amount ($)" type="number" required value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
          <Select
            label="Payment Method"
            value={formData.paymentMethod}
            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
            options={[
              { value: 'CASH', label: 'Cash Payment' },
              { value: 'BANK_TRANSFER', label: 'Bank Wire Transfer' },
              { value: 'CARD', label: 'Credit / Debit Card' },
            ]}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="black" type="submit">Confirm Payment Receipt</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
