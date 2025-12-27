import React, { useState } from 'react';

const EquipmentManagement = ({ equipment, loading, onDelete, onAdd, buttonStyle }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEquipment, setNewEquipment] = useState({
    name: '',
    category: '',
    team: '',
    location: '',
    status: 'Active'
  });
  const handleAddEquipment = async () => {
    if (!newEquipment.name || !newEquipment.category || !newEquipment.location) {
      alert('Please fill in required fields');
      return;
    }
    
    try {
      await onAdd(newEquipment);
      setNewEquipment({ name: '', category: '', team: '', location: '', status: 'Active' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding equipment:', error);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#2d3748', margin: 0 }}>Equipment Management</h2>
        <button 
          style={{ ...buttonStyle, marginLeft: 'auto' }}
          onClick={() => setShowAddForm(true)}
        >
          + Add Equipment
        </button>
      </div>
      
      {showAddForm && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ marginBottom: '15px' }}>Add New Equipment</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Equipment Name *"
              value={newEquipment.name}
              onChange={(e) => setNewEquipment({...newEquipment, name: e.target.value})}
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                fontSize: '14px'
              }}
            />
            <input
              type="text"
              placeholder="Category *"
              value={newEquipment.category}
              onChange={(e) => setNewEquipment({...newEquipment, category: e.target.value})}
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                fontSize: '14px'
              }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Team"
              value={newEquipment.team}
              onChange={(e) => setNewEquipment({...newEquipment, team: e.target.value})}
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                fontSize: '14px'
              }}
            />
            <input
              type="text"
              placeholder="Location *"
              value={newEquipment.location}
              onChange={(e) => setNewEquipment({...newEquipment, location: e.target.value})}
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                fontSize: '14px'
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={buttonStyle} onClick={handleAddEquipment}>
              Add Equipment
            </button>
            <button 
              style={{...buttonStyle, background: '#6c757d'}}
              onClick={() => {
                setShowAddForm(false);
                setNewEquipment({ name: '', category: '', team: '', location: '', status: 'Active' });
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
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