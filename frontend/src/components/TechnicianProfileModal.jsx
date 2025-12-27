import React from 'react';

const TechnicianProfileModal = ({ show, technician, onClose, buttonStyle }) => {
  if (!show || !technician) return null;

  console.log('Technician profile data:', technician);

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
            backgroundColor: '#3498db',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '20px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white'
          }}>
            {technician.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#2d3748', margin: 0 }}>
              {technician.name}
            </h2>
            <p style={{ fontSize: '16px', color: '#718096', margin: '5px 0' }}>
              {technician.email}
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
                {technician.role.charAt(0).toUpperCase() + technician.role.slice(1)}
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
                {technician.department || 'Not specified'}
              </div>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#4a5568', display: 'block', marginBottom: '5px' }}>
              User ID
            </label>
            <div style={{
              padding: '10px',
              backgroundColor: '#f7fafc',
              borderRadius: '6px',
              fontSize: '12px',
              color: '#718096',
              fontFamily: 'monospace'
            }}>
              {technician._id}
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

export default TechnicianProfileModal;