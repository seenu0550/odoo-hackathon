import React from 'react';

function RequestsTable({ requests }) {
  return (
    <div>
      <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#2d3748', margin: '30px 0 20px 0' }}>
        Recent Requests
      </h3>
      
      <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc' }}>
              <th style={{ padding: '15px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Request</th>
              <th style={{ padding: '15px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>User</th>
              <th style={{ padding: '15px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Priority</th>
              <th style={{ padding: '15px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Status</th>
              <th style={{ padding: '15px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request => (
              <tr key={request.id}>
                <td style={{ padding: '15px', borderBottom: '1px solid #e2e8f0', fontSize: '14px' }}>{request.title}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #e2e8f0', fontSize: '14px' }}>{request.user}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #e2e8f0', fontSize: '14px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: request.priority === 'High' ? '#fed7d7' : request.priority === 'Medium' ? '#feebc8' : '#c6f6d5',
                    color: request.priority === 'High' ? '#c53030' : request.priority === 'Medium' ? '#dd6b20' : '#38a169'
                  }}>
                    {request.priority}
                  </span>
                </td>
                <td style={{ padding: '15px', borderBottom: '1px solid #e2e8f0', fontSize: '14px' }}>{request.status}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #e2e8f0', fontSize: '14px' }}>{request.assignedTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RequestsTable;