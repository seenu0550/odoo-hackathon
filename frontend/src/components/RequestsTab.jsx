import React, { useState } from 'react';

function RequestsTab({ requests, setRequests, equipment }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    equipment: '',
    description: '',
    priority: 'medium',
    category: '',
    team: ''
  });

  const handleEquipmentChange = (e) => {
    const equipmentId = e.target.value;
    const selectedEquip = equipment.find(eq => eq.id === parseInt(equipmentId));
    
    setNewRequest({
      ...newRequest,
      equipment: equipmentId,
      category: selectedEquip?.category || '',
      team: selectedEquip?.team || ''
    });
  };

  const handleCreateRequest = (e) => {
    e.preventDefault();
    const selectedEquip = equipment.find(eq => eq.id === parseInt(newRequest.equipment));
    const request = {
      id: requests.length + 1,
      equipment: selectedEquip?.name || '',
      type: 'Corrective',
      status: 'New',
      date: new Date().toISOString().split('T')[0],
      description: newRequest.description,
      priority: newRequest.priority
    };
    setRequests([request, ...requests]);
    setNewRequest({ equipment: '', description: '', priority: 'medium', category: '', team: '' });
    setShowCreateForm(false);
  };

  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      display: 'inline-block'
    };
    
    switch (status) {
      case 'New': return { ...baseStyle, background: '#fed7d7', color: '#c53030' };
      case 'In Progress': return { ...baseStyle, background: '#feebc8', color: '#dd6b20' };
      case 'Repaired': return { ...baseStyle, background: '#c6f6d5', color: '#38a169' };
      default: return baseStyle;
    }
  };

  const styles = {
    createButton: {
      padding: '12px 24px',
      background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(72, 187, 120, 0.3)'
    },
    requestCard: {
      background: '#ffffff',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '15px'
    },
    form: {
      background: '#f7fafc',
      padding: '25px',
      borderRadius: '12px',
      marginBottom: '20px'
    },
    select: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '14px',
      marginBottom: '15px',
      outline: 'none',
      backgroundColor: 'white'
    },
    textarea: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '14px',
      marginBottom: '15px',
      outline: 'none',
      minHeight: '80px',
      resize: 'vertical'
    },
    submitButton: {
      padding: '12px 24px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer'
    },
    cancelButton: {
      padding: '12px 24px',
      background: '#e2e8f0',
      color: '#4a5568',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer'
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h2 style={{ margin: '0', fontSize: '20px', fontWeight: '600', color: '#2d3748' }}>
          Maintenance Requests
        </h2>
        <button
          style={styles.createButton}
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          ➕ Create Request
        </button>
      </div>

      {showCreateForm && (
        <form onSubmit={handleCreateRequest} style={styles.form}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#2d3748' }}>
            New Maintenance Request
          </h3>
          
          <select
            value={newRequest.equipment}
            onChange={handleEquipmentChange}
            style={styles.select}
            required
          >
            <option value="">Select Equipment</option>
            {equipment.map(eq => (
              <option key={eq.id} value={eq.id}>{eq.name}</option>
            ))}
          </select>

          {newRequest.equipment && (
            <div style={{ background: '#e6fffa', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
              <p style={{ margin: '0 0 5px 0', fontSize: '14px', fontWeight: '600', color: '#2d3748' }}>Auto-filled from Equipment:</p>
              <p style={{ margin: '0', fontSize: '14px', color: '#4a5568' }}>📂 Category: {newRequest.category}</p>
              <p style={{ margin: '0', fontSize: '14px', color: '#4a5568' }}>👥 Team: {newRequest.team}</p>
            </div>
          )}

          <textarea
            placeholder="Describe the issue..."
            value={newRequest.description}
            onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
            style={styles.textarea}
            required
          />

          <select
            value={newRequest.priority}
            onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value })}
            style={styles.select}
          >
            <option value="low">🟢 Low Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="high">🔴 High Priority</option>
          </select>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={styles.submitButton}>
              Submit Request
            </button>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={() => setShowCreateForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div>
        {requests.map(request => (
          <div key={request.id} style={styles.requestCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: '600', color: '#2d3748' }}>
                  {request.equipment}
                </h4>
                <p style={{ margin: '0', fontSize: '14px', color: '#718096' }}>
                  Request #{request.id} • {request.date}
                </p>
              </div>
              <span style={getStatusStyle(request.status)}>
                {request.status}
              </span>
            </div>
            <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#4a5568' }}>
              Type: {request.type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RequestsTab;