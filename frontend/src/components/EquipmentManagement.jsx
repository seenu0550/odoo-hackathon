import React from 'react';

const EquipmentManagement = ({ equipment, loading, onDelete, buttonStyle }) => {
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#2d3748', margin: 0 }}>Equipment Management</h2>
        <button style={{ ...buttonStyle, marginLeft: 'auto' }}>+ Add Equipment</button>
      </div>
      
      <table style={{ width: '100%', backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8fafc' }}>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Equipment Name</th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Category</th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Team</th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Location</th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Status</th>
            <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map(item => (
            <tr key={item._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{item.name}</td>
              <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{item.category}</td>
              <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{item.team}</td>
              <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{item.location}</td>
              <td style={{ padding: '16px' }}>
                <span style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '500',
                  backgroundColor: item.status === 'Active' ? '#c6f6d5' : '#fef3c7',
                  color: item.status === 'Active' ? '#22543d' : '#92400e'
                }}>{item.status}</span>
              </td>
              <td style={{ padding: '16px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ backgroundColor: '#667eea', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>✏️</button>
                  <button 
                    style={{ backgroundColor: '#e53e3e', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}
                    onClick={() => onDelete(item._id)}
                  >🗑️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentManagement;