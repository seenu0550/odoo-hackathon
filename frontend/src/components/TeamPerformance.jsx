import React from 'react';

function TeamPerformance({ technicians }) {
  return (
    <div>
      <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#2d3748', marginBottom: '20px' }}>
        Team Performance
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {technicians.map(tech => (
          <div key={tech.id} style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '10px' }}>
              {tech.name}
            </h4>
            <p style={{ fontSize: '14px', color: '#718096', margin: '5px 0' }}>
              Active: {tech.activeRequests} requests
            </p>
            <p style={{ fontSize: '14px', color: '#718096', margin: '5px 0' }}>
              Completed Today: {tech.completedToday}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamPerformance;