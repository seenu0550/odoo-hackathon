import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

const CreateTeamModal = ({ show, newTeam, setNewTeam, onClose, onCreate, buttonStyle }) => {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      console.log('CreateTeamModal opened, loading technicians...');
      loadTechnicians();
    }
  }, [show]);

  const loadTechnicians = async () => {
    setLoading(true);
    try {
      console.log('Loading technicians...');
      const users = await api.getUsers();
      console.log('All users:', users);
      const technicianUsers = users.filter(user => user.role === 'technician');
      console.log('Filtered technicians:', technicianUsers);
      setTechnicians(technicianUsers);
    } catch (error) {
      console.error('Error loading technicians:', error);
      setTechnicians([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTechnicianToggle = (technicianId) => {
    console.log('Toggling technician:', technicianId);
    console.log('Current members:', newTeam.members);
    
    const currentMembers = newTeam.members || [];
    const isSelected = currentMembers.includes(technicianId);
    
    let updatedMembers;
    if (isSelected) {
      updatedMembers = currentMembers.filter(id => id !== technicianId);
    } else {
      updatedMembers = [...currentMembers, technicianId];
    }
    
    console.log('Updated members:', updatedMembers);
    
    setNewTeam({
      ...newTeam,
      members: updatedMembers
    });
  };

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '30px',
        width: '500px',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#2d3748', marginBottom: '20px' }}>Create New Team</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#4a5568', marginBottom: '5px' }}>Team Name</label>
          <input
            type="text"
            value={newTeam.name}
            onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
            placeholder="Enter team name"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#4a5568', marginBottom: '5px' }}>Description</label>
          <textarea
            value={newTeam.description}
            onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
            placeholder="Enter team description"
            rows={3}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              fontSize: '14px',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#4a5568', marginBottom: '10px' }}>Select Team Members</label>
          
          {/* Debug info */}
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
            Selected: {(newTeam.members || []).length} members
            {(newTeam.members || []).length > 0 && (
              <span> - IDs: {(newTeam.members || []).join(', ')}</span>
            )}
          </div>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#718096' }}>Loading technicians...</div>
          ) : technicians.length > 0 ? (
            <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px' }}>
              {technicians.map(technician => (
                <div key={technician._id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  backgroundColor: (newTeam.members || []).includes(technician._id) ? '#e6f3ff' : 'transparent',
                  border: (newTeam.members || []).includes(technician._id) ? '1px solid #3498db' : '1px solid transparent'
                }}
                onClick={() => handleTechnicianToggle(technician._id)}
                >
                  <input
                    type="checkbox"
                    checked={(newTeam.members || []).includes(technician._id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleTechnicianToggle(technician._id);
                    }}
                    style={{ marginRight: '10px' }}
                  />
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#3498db',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '10px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: 'white'
                  }}>
                    {technician.name ? technician.name.charAt(0).toUpperCase() : 'T'}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#2d3748' }}>{technician.name || 'Unknown'}</div>
                    <div style={{ fontSize: '12px', color: '#718096' }}>{technician.department || 'No Department'}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px', color: '#718096' }}>
              No technicians available. Please add technicians first in the Technicians tab.
            </div>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#e2e8f0',
              color: '#4a5568',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={onCreate}
            style={buttonStyle}
          >
            Create Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeamModal;