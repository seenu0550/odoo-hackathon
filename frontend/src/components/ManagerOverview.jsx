import React from 'react';
import StatsCards from './StatsCards.jsx';
import TeamPerformance from './TeamPerformance.jsx';
import RequestsTable from './RequestsTable.jsx';

function ManagerOverview({ stats, technicians, requests }) {
  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#2d3748', marginBottom: '30px' }}>
        Manager Overview
      </h2>
      
      <StatsCards stats={stats} />
      <TeamPerformance technicians={technicians} />
      <RequestsTable requests={requests} />
    </div>
  );
}

export default ManagerOverview;