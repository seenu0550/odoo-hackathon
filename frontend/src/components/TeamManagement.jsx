import React from 'react';

const TeamManagement = ({ teams, loading, onCreateTeam, buttonStyle }) => {
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#2d3748', margin: 0 }}>Team Management</h2>
        <button 
          style={{ ...buttonStyle, marginLeft: 'auto' }}
          onClick={onCreateTeam}
        >
          + Create Team
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        {teams.length > 0 ? teams.map(team => (
          <div key={team._id} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2d3748', margin: 0 }}>🔧 {team.name}</h3>
              <span style={{ fontSize: '12px', color: '#718096' }}>Team Members ({team.members.length})</span>
            </div>
            <p style={{ color: '#718096', fontSize: '14px', marginBottom: '15px' }}>{team.description}</p>
            <div style={{ marginBottom: '15px' }}>
              {team.members.map((member, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  <span style={{ fontSize: '14px', color: '#2d3748' }}>{member}</span>
                  <button style={{
                    backgroundColor: '#e53e3e',
                    color: 'white',
                    border: 'none',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}>Remove</button>
                </div>
              ))}
            </div>
            <select style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #e2e8f0',
              fontSize: '14px'
            }}>
              <option>Select technician to add...</option>
            </select>
          </div>
        )) : (
          <div style={{ textAlign: 'center', padding: '50px', color: '#718096' }}>No teams found</div>
        )}
      </div>
    </div>
  );
};

export default TeamManagement;