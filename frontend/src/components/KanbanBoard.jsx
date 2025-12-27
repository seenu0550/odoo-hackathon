import React, { useState } from 'react';
import RequestCard from './RequestCard.jsx';
import RequestModal from './RequestModal.jsx';

const KanbanBoard = ({ requests, onUpdateRequest }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [draggedOver, setDraggedOver] = useState(null);

  const columns = [
    { id: 'NEW', title: 'New', color: '#dbeafe', borderColor: '#93c5fd', icon: '📋' },
    { id: 'IN_PROGRESS', title: 'In Progress', color: '#fef3c7', borderColor: '#fbbf24', icon: '🔧' },
    { id: 'REPAIRED', title: 'Repaired', color: '#dcfce7', borderColor: '#4ade80', icon: '✅' },
    { id: 'SCRAP', title: 'Scrap', color: '#fee2e2', borderColor: '#f87171', icon: '❌' }
  ];

  const getRequestsByStatus = (status) => {
    return requests.filter(request => request.status === status);
  };

  const handleDragStart = (e, requestId) => {
    e.dataTransfer.setData('text/plain', requestId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e, columnId) => {
    e.preventDefault();
    setDraggedOver(columnId);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDraggedOver(null);
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    setDraggedOver(null);
    const requestId = parseInt(e.dataTransfer.getData('text/plain'));
    const request = requests.find(r => r.id === requestId);
    
    if (request && request.status !== newStatus) {
      // Validate workflow rules
      if (request.status === 'NEW' && newStatus !== 'IN_PROGRESS' && newStatus !== 'NEW') {
        alert('New requests must be picked up first (moved to In Progress)');
        return;
      }
      
      let updates = { status: newStatus };
      
      // Auto-assign when moving to IN_PROGRESS
      if (newStatus === 'IN_PROGRESS' && !request.assignedTo) {
        updates.assignedTo = 'John Smith';
      }
      
      onUpdateRequest(requestId, updates);
    }
  };

  return (
    <>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px' 
      }}>
        {columns.map(column => {
          const columnRequests = getRequestsByStatus(column.id);
          const isDraggedOver = draggedOver === column.id;
          
          return (
            <div
              key={column.id}
              style={{
                backgroundColor: isDraggedOver ? '#f0f9ff' : column.color,
                border: `2px dashed ${isDraggedOver ? '#0ea5e9' : column.borderColor}`,
                borderRadius: '8px',
                padding: '16px',
                minHeight: '400px',
                transition: 'all 0.2s ease'
              }}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px' }}>{column.icon}</span>
                  <h3 style={{ fontWeight: '600', color: '#374151', margin: 0, fontSize: '16px' }}>{column.title}</h3>
                </div>
                <span style={{
                  backgroundColor: isDraggedOver ? '#0ea5e9' : '#e5e7eb',
                  color: isDraggedOver ? 'white' : '#374151',
                  padding: '4px 8px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: '500',
                  minWidth: '24px',
                  textAlign: 'center'
                }}>
                  {columnRequests.length}
                </span>
              </div>
              
              {isDraggedOver && (
                <div style={{
                  padding: '12px',
                  backgroundColor: '#e0f2fe',
                  borderRadius: '6px',
                  marginBottom: '12px',
                  textAlign: 'center',
                  fontSize: '14px',
                  color: '#0369a1',
                  fontWeight: '500'
                }}>
                  Drop here to move to {column.title}
                </div>
              )}
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {columnRequests.length === 0 && !isDraggedOver ? (
                  <div style={{
                    padding: '20px',
                    textAlign: 'center',
                    color: '#9ca3af',
                    fontSize: '14px',
                    fontStyle: 'italic'
                  }}>
                    No requests in {column.title.toLowerCase()}
                  </div>
                ) : (
                  columnRequests.map(request => (
                    <RequestCard
                      key={request.id}
                      request={request}
                      onDragStart={handleDragStart}
                      onClick={() => setSelectedRequest(request)}
                      onPickup={(id) => onUpdateRequest(id, { assignedTo: 'John Smith', status: 'IN_PROGRESS' })}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedRequest && (
        <RequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onUpdate={onUpdateRequest}
        />
      )}
    </>
  );
};

export default KanbanBoard;