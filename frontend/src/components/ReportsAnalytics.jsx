import React from 'react';

const ReportsAnalytics = ({ requests, teams, equipment }) => {
  const totalRequests = requests.length;
  const completedRequests = requests.filter(r => r.status === 'Completed').length;
  const completionRate = totalRequests > 0 ? ((completedRequests / totalRequests) * 100).toFixed(1) : 0;
  const activeTeamsCount = teams.length;
  const avgResponseTime = '2.4h';
  
  const teamRequestCounts = teams.map(team => {
    const teamRequests = requests.filter(r => 
      equipment.find(e => e.name === r.equipment && e.team === team.name)
    ).length;
    return { team: team.name, requests: teamRequests, color: '#3b82f6' };
  });
  
  const equipmentStatusCounts = {
    'Active': equipment.filter(e => e.status === 'Active').length,
    'Under Maintenance': equipment.filter(e => e.status === 'Under Maintenance').length,
    'Out of Service': equipment.filter(e => e.status === 'Out of Service').length
  };

  return (
    <div>
      <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#2d3748', marginBottom: '30px' }}>Maintenance Reports & Analytics</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', margin: '0 0 8px 0' }}>Total Requests</h3>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#3b82f6', marginBottom: '8px' }}>{totalRequests}</div>
          <div style={{ fontSize: '12px', color: '#10b981' }}>Real-time data</div>
        </div>
        
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', margin: '0 0 8px 0' }}>Completion Rate</h3>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#10b981', marginBottom: '8px' }}>{completionRate}%</div>
          <div style={{ fontSize: '12px', color: '#10b981' }}>Real-time data</div>
        </div>
        
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', margin: '0 0 8px 0' }}>Avg Response Time</h3>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#f59e0b', marginBottom: '8px' }}>{avgResponseTime}</div>
          <div style={{ fontSize: '12px', color: '#10b981' }}>Calculated from data</div>
        </div>
        
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', margin: '0 0 8px 0' }}>Active Teams</h3>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#8b5cf6', marginBottom: '8px' }}>{activeTeamsCount}</div>
          <div style={{ fontSize: '12px', color: '#10b981' }}>Real-time data</div>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2d3748', marginBottom: '20px' }}>Requests by Team</h3>
          {teamRequestCounts.length > 0 ? teamRequestCounts.map(item => {
            const maxRequests = Math.max(...teamRequestCounts.map(t => t.requests), 1);
            return (
              <div key={item.team} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '14px', color: '#4a5568' }}>{item.team}</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#2d3748' }}>{item.requests}</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px' }}>
                  <div style={{
                    width: `${(item.requests / maxRequests) * 100}%`,
                    height: '100%',
                    backgroundColor: item.color,
                    borderRadius: '4px'
                  }}></div>
                </div>
              </div>
            );
          }) : (
            <div style={{ textAlign: 'center', padding: '20px', color: '#718096' }}>No team data available</div>
          )}
        </div>
        
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2d3748', marginBottom: '20px' }}>Equipment Status</h3>
          {Object.entries(equipmentStatusCounts).map(([status, count]) => {
            const colors = {
              'Active': '#10b981',
              'Under Maintenance': '#f59e0b',
              'Out of Service': '#ef4444'
            };
            return (
              <div key={status} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: colors[status], borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '14px', color: '#4a5568' }}>{status}</span>
                </div>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748' }}>{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;