import React from 'react';

function EquipmentTab({ equipment }) {
  const styles = {
    requestCard: {
      background: '#ffffff',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '15px'
    }
  };

  return (
    <div>
      <h2 style={{ margin: '0 0 25px 0', fontSize: '20px', fontWeight: '600', color: '#2d3748' }}>
        Equipment Directory
      </h2>
      <div>
        {equipment.map(eq => (
          <div key={eq.id} style={styles.requestCard}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: '600', color: '#2d3748' }}>
              {eq.name}
            </h4>
            <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#718096' }}>
              <span>📂 {eq.category}</span>
              <span>👥 {eq.team}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EquipmentTab;