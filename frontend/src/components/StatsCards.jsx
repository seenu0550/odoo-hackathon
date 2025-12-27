import React from 'react';

function StatsCards({ stats }) {
  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  };

  const statCardStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '16px',
    padding: '25px',
    color: 'white',
    textAlign: 'center'
  };

  return (
    <div style={statsGridStyle}>
      <div style={statCardStyle}>
        <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>{stats.total}</div>
        <div style={{ fontSize: '14px', opacity: '0.9' }}>Total Requests</div>
      </div>
      <div style={statCardStyle}>
        <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>{stats.open}</div>
        <div style={{ fontSize: '14px', opacity: '0.9' }}>Open Requests</div>
      </div>
      <div style={statCardStyle}>
        <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>{stats.inProgress}</div>
        <div style={{ fontSize: '14px', opacity: '0.9' }}>In Progress</div>
      </div>
      <div style={statCardStyle}>
        <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>{stats.completed}</div>
        <div style={{ fontSize: '14px', opacity: '0.9' }}>Completed</div>
      </div>
    </div>
  );
}

export default StatsCards;