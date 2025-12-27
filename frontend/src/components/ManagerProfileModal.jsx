import React from 'react';

const ManagerProfileModal = ({ show, manager, onClose, buttonStyle }) => {
  if (!show || !manager) return null;

  const modalOverlayStyle = {
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
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    width: '500px',
    maxWidth: '90vw',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#e74c3c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '20px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white'
          }}>
            {manager.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#2d3748', margin: 0 }}>
              {manager.name}
            </h2>
            <p style={{ fontSize: '16px', color: '#718096', margin: '5px 0' }}>
              {manager.email}
            </p>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#4a5568', display: 'block', marginBottom: '5px' }}>
                Role
              </label>
              <div style={{
                padding: '10px',
                backgroundColor: '#f7fafc',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#2d3748'
              }}>
                {manager.role ? manager.role.charAt(0).toUpperCase() + manager.role.slice(1) : 'Manager'}
              </div>
            </div>
            
            <div>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#4a5568', display: 'block', marginBottom: '5px' }}>
                Department
              </label>
              <div style={{
                padding: '10px',
                backgroundColor: '#f7fafc',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#2d3748'
              }}>
                {manager.department || 'Management'}
              </div>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#4a5568', display: 'block', marginBottom: '5px' }}>
              Access Level
            </label>
            <div style={{
              padding: '10px',
              backgroundColor: '#f7fafc',
              borderRadius: '6px',
              fontSize: '14px',
              color: '#2d3748'
            }}>
              Full Administrative Access
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button 
            style={{...buttonStyle, background: '#6c757d'}}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagerProfileModal;