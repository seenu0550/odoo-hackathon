import React from 'react';

const ScheduleManagement = ({ requests, loading }) => {
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  return (
    <div>
      <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#2d3748', marginBottom: '30px' }}>Schedule Management</h2>
      
      <table style={{ width: '100%', backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8fafc' }}>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Equipment</th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Task</th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Assigned To</th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Due Date</th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Frequency</th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? requests.map((item, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{item.equipment}</td>
              <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{item.task}</td>
              <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{item.assignedTo}</td>
              <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{item.dueDate}</td>
              <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{item.frequency}</td>
              <td style={{ padding: '16px' }}>
                <span style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '500',
                  backgroundColor: item.status === 'Pending' ? '#fef3c7' : '#dbeafe',
                  color: item.status === 'Pending' ? '#92400e' : '#1e40af'
                }}>{item.status}</span>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="6" style={{ padding: '50px', textAlign: 'center', color: '#718096' }}>No maintenance requests found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleManagement;